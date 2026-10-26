const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data/publications.json'), 'utf8'));
const {records, areas} = data;
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const types = {'journal':'Journal','conference':'Conference','book-chapter':'Book chapter','preprint':'Preprint','poster':'Poster','unspecified':'Unspecified'};
const status = {'under-review':'Under review','accepted':'Accepted (as listed)','listed':''};
const years = [...new Set(records.map(p=>p.year).filter(Boolean))].sort((a,b)=>b-a);
if (records.some(p=>!p.year)) years.push(null);
const yearLabel = year => year || 'Year not specified';
const yearId = year => 'year-' + (year || 'unspecified');
const safeUrl = url => {
  assert.ok(/^(https?:\/\/|papers\/)/.test(url), `Unsupported publication link: ${url}`);
  return escape(url);
};
assert.equal(new Set(records.map(p=>p.id)).size, records.length, 'Duplicate publication IDs');
for (const p of records) {
  assert.ok(p.title && p.authors && p.source.citation, `Incomplete entry: ${p.id}`);
  assert.ok(p.types.every(t=>types[t]), `Unknown type: ${p.id}`);
  assert.ok(p.areas.every(a=>areas.some(area=>area.id===a)), `Unknown area: ${p.id}`);
}
function links(p) {
  return p.links.map(l=>`<a href="${safeUrl(l.url)}"${l.kind==='bibtex'?' download':''} title="${escape(l.label)}">${{doi:'DOI',pdf:'PDF',bibtex:'BibTeX',paper:'Paper'}[l.kind]}</a>`).join('');
}
function entry(p) {
  const metadata=[yearLabel(p.year), ...p.types.filter(t=>t!=='unspecified').map(t=>types[t]),status[p.status]].filter(Boolean).join(' · ');
  const evidence=p.areaEvidence.length?`<p class="detail-label">Research-area sources</p><ul>${p.areaEvidence.map(e=>`<li><a href="${escape(e.page)}">${escape(areas.find(a=>a.id===e.area).label)}</a></li>`).join('')}</ul>`:'';
  return `<article class="publication-entry" id="${escape(p.id)}" data-year="${p.year||'unspecified'}" data-area="${p.areas.join(' ')||'unclassified'}" data-type="${p.types.join(' ')}" data-status="${p.status}" aria-labelledby="title-${escape(p.id)}">
<p class="publication-meta">${escape(metadata)}</p>
<h4 id="title-${escape(p.id)}">${escape(p.title)}</h4>
<p class="publication-authors">${escape(p.authors)}</p>
<p class="publication-venue">${escape(p.venue||'Venue not specified in source')}</p>
<div class="publication-links">${links(p)}<a class="permalink" href="#${escape(p.id)}" aria-label="Permanent link: ${escape(p.title)}">Permalink</a></div>
<details class="publication-details"><summary>Abstract &amp; citation${p.issues.length?' <span class="metadata-flag">Metadata note</span>':''}</summary>
${p.abstract?`<p class="detail-label">Abstract</p><p class="publication-abstract">${escape(p.abstract)}</p>`:''}
<p class="detail-label">Original citation</p><p class="original-citation">${escape(p.source.citation)}</p>
${p.source.answers.filter(a=>!/^Abstract:/i.test(a)).map(a=>`<p class="original-paper-note">${escape(a)}</p>`).join('')}
${p.issues.length?`<ul class="metadata-issues">${p.issues.map(i=>`<li>${escape(i)}</li>`).join('')}</ul>`:''}
${evidence}
</details></article>`;
}
const featured=records.filter(p=>p.featured).map(p=>`<article class="featured-publication"><p class="publication-meta">${escape(yearLabel(p.year))} · ${p.types.map(t=>types[t]).join(' / ')}</p><h3><a href="#${escape(p.id)}">${escape(p.title)}</a></h3><p>${escape(p.authors)}</p><p class="featured-venue">${escape(p.venue)}</p><a class="text-link" href="#${escape(p.id)}">Publication details <span aria-hidden="true">&rarr;</span></a></article>`).join('\n');
const bibliography=years.map(year=>{
  const group=records.filter(p=>p.year===year);
  return `<section class="publication-year" id="${yearId(year)}" aria-labelledby="heading-${yearId(year)}"><h3 id="heading-${yearId(year)}">${yearLabel(year)} <span class="year-count">${group.length}</span></h3><div class="year-entries">${group.map(entry).join('\n')}</div></section>`;
}).join('\n');
const option=(value,label)=>`<option value="${escape(value)}">${escape(label)}</option>`;
const values={FEATURED:featured,BIBLIOGRAPHY:bibliography,TOTAL:records.length,AREA_OPTIONS:areas.map(a=>option(a.id,a.label)).join(''),TYPE_OPTIONS:Object.entries(types).filter(([key])=>records.some(p=>p.types.includes(key))).map(([key,label])=>option(key,label)).join(''),YEAR_OPTIONS:years.map(y=>option(y||'unspecified',yearLabel(y))).join(''),YEAR_JUMPS:years.map(y=>`<a href="#${yearId(y)}">${yearLabel(y)}</a>`).join('')};
const template=fs.readFileSync(path.join(root,'templates/publications.html'),'utf8');
const output='<!-- Generated from data/publications.json. Run node scripts/build-publications.cjs. -->\n'+template.replace(/\{\{([A-Z_]+)\}\}/g,(_,key)=>{assert.ok(key in values);return values[key];});
fs.writeFileSync(path.join(root,'page-publication.html'),output);
console.log(`Built ${records.length} publications in ${years.length} year groups (${Buffer.byteLength(output)} bytes).`);
