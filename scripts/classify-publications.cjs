// Optional migration helper: only exact title matches in existing research lists qualify.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const areas = [
  {id:'operators',label:'Operator-Theoretic Methods',page:'page-project-details-4.html'},
  {id:'information',label:'Information Flow and Networks',page:'page-project-details-5.html'},
  {id:'robotics',label:'Off-road Autonomy and Robotics',page:'page-project-details-2.html'},
  {id:'power',label:'Power and Energy Systems',page:'page-project-details-3.html'},
  {id:'cyber',label:'Cyber-Physical Systems',page:'page-project-details-1.html'}
];
(async()=>{
  const data=JSON.parse(fs.readFileSync(path.join(root,'data/publications.json')));
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try {
    const page=await browser.newPage();
    await page.route('**/*',r=>r.abort());
    for(const area of areas){
      await page.setContent(fs.readFileSync(path.join(root,area.page),'utf8'),{waitUntil:'domcontentloaded'});
      const citations=await page.locator('.job-details-wrapper li').allTextContents();
      for(const p of data.records){
        const citation=citations.find(c=>norm(c).includes(norm(p.title)));
        if(citation){
          if(!p.areas.includes(area.id))p.areas.push(area.id);
          if(!p.areaEvidence.some(e=>e.area===area.id && e.page===area.page)) {
            p.areaEvidence.push({area:area.id,page:area.page,citation:citation.replace(/\s+/g,' ').trim()});
          }
        }
      }
    }
    data.areas=areas;
    fs.writeFileSync(path.join(root,'data/publications.json'),JSON.stringify(data,null,2)+'\n');
    console.log(areas.map(a=>({area:a.label,count:data.records.filter(p=>p.areas.includes(a.id)).length})));
    console.log('Unclassified:',data.records.filter(p=>!p.areas.length).length);
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
