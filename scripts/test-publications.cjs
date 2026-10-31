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
assert.ok(records.length >= legacy.length, 'Original bibliography entries removed');
for (const [index, original] of legacy.entries()) {
  const record = records[index];
  assert.ok(record, `Original entry missing: ${original.anchor}`);
  assert.deepEqual(record.source, original, `Source changed: ${original.anchor}`);
}
assert.equal(new Set(records.map(p => p.id)).size, records.length);
assert.equal((html.match(/class="publication-entry"/g) || []).length, records.length);
records.forEach(p => {
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
assert.ok(records.filter(p => !p.year).every(p => p.status === 'under-review'), 'Undated group contains a publication that is not under review');
assert.ok(!html.includes('Year not specified'), 'Old category label remains');
assert.ok(html.includes('<option value="unspecified">Publications Under Review</option>'));
assert.ok(html.includes('<a href="#year-unspecified">Publications Under Review</a>'));
assert.ok(html.includes('<h3 id="heading-year-unspecified">Publications Under Review <span'));
const corl = records.filter(p => norm(p.title) === norm('When Are World-Model Rollout Errors Correctable? Adaptive Koopman Residual Learning for Legged Locomotion'));
assert.equal(corl.length, 1, 'CoRL publication missing or duplicated');
assert.equal(corl[0].year, 2026);
assert.equal(corl[0].status, 'accepted');
assert.deepEqual(corl[0].types, ['conference']);
assert.equal(corl[0].authors, 'Yinhong Qin, Sriram S. K. S. Narayanan, Luyang Zhao, and Umesh Vaidya');
console.log(`PASS: ${records.length} records, original citations, abstracts, links, anchors, years, and classification evidence preserved.`);
