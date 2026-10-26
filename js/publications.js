(() => {
  const form = document.querySelector('.publication-filters');
  if (!form) return;
  const normalize = value => value.normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const fields = Object.fromEntries(['q','area','type','year','status'].map(name => [name, form.elements.namedItem(name)]));
  const entries = [...document.querySelectorAll('.publication-entry')].map(element => ({element, text:normalize(element.textContent), areas:element.dataset.area.split(' '), types:element.dataset.type.split(' ')}));
  const groups = [...document.querySelectorAll('.publication-year')];
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('.empty-results');
  let timer;
  function applyFilters(updateUrl = true) {
    const words = normalize(fields.q.value).split(' ').filter(Boolean);
    let visible = 0;
    entries.forEach(({element,text,areas,types}) => {
      const matches = words.every(word=>text.includes(word)) && (!fields.area.value || areas.includes(fields.area.value)) && (!fields.type.value || types.includes(fields.type.value)) && (!fields.year.value || element.dataset.year === fields.year.value) && (!fields.status.value || element.dataset.status === fields.status.value);
      element.hidden = !matches;
      if (matches) visible++;
    });
    groups.forEach(group => {
      const number = group.querySelectorAll('.publication-entry:not([hidden])').length;
      group.hidden = number === 0;
      group.querySelector('.year-count').textContent = number;
      document.querySelector('.year-jumps a[href="#' + group.id + '"]').hidden = number === 0;
    });
    count.textContent = visible === entries.length ? `${visible} publications` : `${visible} of ${entries.length} publications`;
    empty.hidden = visible !== 0;
    if (updateUrl) {
      const url = new URL(location.href);
      Object.entries(fields).forEach(([key,field]) => field.value ? url.searchParams.set(key,field.value) : url.searchParams.delete(key));
      try { history.replaceState(null, '', url); } catch { /* Local file previews may restrict history changes. */ }
    }
  }
  function reset() {
    clearTimeout(timer);
    Object.values(fields).forEach(field=>{ field.value=''; });
    applyFilters();
  }
  function reveal(hash, scroll = false) {
    let target;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
    if (!target || !target.matches('.publication-entry,.publication-year')) return;
    if (target.hidden) reset();
    if (target.matches('.publication-entry')) target.querySelector('details').open = true;
    if (scroll) target.scrollIntoView({behavior:'instant',block:'start'});
  }
  const params = new URLSearchParams(location.search);
  Object.entries(fields).forEach(([key,field]) => {
    const value=params.get(key);
    if (value && (key==='q'||[...field.options].some(option=>option.value===value))) field.value=value;
  });
  form.hidden=false;
  form.addEventListener('submit',event=>event.preventDefault());
  form.addEventListener('reset',event=>{event.preventDefault();reset();});
  fields.q.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(applyFilters,120);});
  Object.entries(fields).filter(([key])=>key!=='q').forEach(([,field])=>field.addEventListener('change',()=>{clearTimeout(timer);applyFilters();}));
  document.addEventListener('click',event=>{
    const link=event.target.closest('a[href^="#"]');
    if(link) reveal(link.getAttribute('href'));
  });
  window.addEventListener('hashchange',()=>reveal(location.hash,true));
  applyFilters(false);
  reveal(location.hash,true);
})();
