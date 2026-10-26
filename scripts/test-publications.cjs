const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const {records, areas} = JSON.parse(read('data/publications.json'));
const legacy = [...JSON.parse(read('data/publications-legacy.json')), ...JSON.parse(read('data/publications-upstream-additions.json'))];
const html = read('page-publication.html');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = value => value.toLowerCase().replace(/[^a-z0-9]/g, '');
assert.equal(records.length, legacy.length);
assert.equal(new Set(records.map(p => p.id)).size, records.length);
assert.equal((html.match(/class="publication-entry"/g) || []).length, records.length);
records.forEach((p, index) => {
  assert.deepEqual(p.source, legacy[index], `Source changed: ${p.id}`);
  assert.ok(html.includes(escape(p.source.citation)), `Citation missing: ${p.id}`);
  for (const answer of p.source.answers) {
    if (/^Abstract:/i.test(answer)) {
      assert.equal(p.abstract, answer.replace(/^Abstract:\s*/i, ''), `Abstract changed: ${p.id}`);
    } else assert.ok(html.includes(escape(answer)), `Source note missing: ${p.id}`);
  }
  if (p.abstract) assert.ok(html.includes(escape(p.abstract)), `Abstract missing: ${p.id}`);
  for (const link of p.source.links) {
    assert.ok(p.links.some(l => l.url === link.url && l.label === link.label), `Original link changed: ${p.id}`);
    assert.ok(html.includes(`href="${escape(link.url)}"`), `Link missing: ${p.id}`);
  }
  for (const link of p.links) {
    if (!/^https?:/.test(link.url)) assert.ok(fs.existsSync(path.join(root, link.url)), `Local file missing: ${link.url}`);
  }
  if (p.source.section !== 'Under Review') assert.equal(p.year, Number(p.source.section.replace('Year ', '')));
  for (const area of p.areas) {
    const evidence = p.areaEvidence.find(e => e.area === area);
    assert.ok(areas.some(a => a.id === area) && evidence, `Area lacks evidence: ${p.id}`);
    assert.ok(norm(evidence.citation).includes(norm(p.title)), `Area title mismatch: ${p.id}`);
    assert.ok(fs.existsSync(path.join(root, evidence.page)));
  }
});
for (const anchor of new Set(legacy.map(p => p.anchor))) assert.ok(records.some(p => p.id === anchor), `Old anchor missing: ${anchor}`);
assert.ok(!/\{\{[A-Z_]+\}\}/.test(html), 'Unrendered template placeholder');
console.log(`PASS: ${records.length} records, original citations, abstracts, links, anchors, years, and classification evidence preserved.`);
