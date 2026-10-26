// One-time migration. The archived citation, abstract, and links remain authoritative.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const original = JSON.parse(fs.readFileSync(path.join(root, 'data/publications-legacy.json')));
const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const titles = {
  5: 'Safe Multi-Robot Collaborative Transport Using Density Functions',
  6: 'Positive Koopman Envelope Model for Random Dynamical Systems',
  7: 'Dynamical Systems based Approach for Robust Distributed Optimization',
  10: 'Data-Driven Distance Metric for Nonlinear Systems using Koopman-Behavioral Theory',
  12: 'Meta-Adaptive Koopman Operators for Multi-Regime Vehicle Control',
  13: 'Koopman-based Ensemble Model Selection Framework for Predictive Control of Unmanned Ground Vehicles',
  14: "Kernel Methods for Some Transport Equations with Application to Learning Kernels for the Approximation of Koopman Eigenfunctions: A Unified Approach via Variational Methods, Green's Functions and the Method of Characteristics",
  31: 'Identifying lateral stability regions in vehicle dynamics: a Koopman spectral approach',
  32: 'Performance-Oriented Data-Driven Control: Fusing Koop- man Operator and MPC-based Reinforcement Learning',
  35: 'Spectral Koopman Approach for Identifying Stability Boundary',
  49: 'Off-Road Navigation of Legged Robots Using Linear Transfer Operators',
  52: 'SE(3) Koopman-MPC: Data-driven Learning and Control of Quadrotor UAVs',
  57: 'On Quantification and Maximization of InformationTransfer in Network Dynamical Systems',
  61: 'Reachability Analysis using Koopman Spectrum',
  62: 'Spectral Analysis of Koopman Operator for Nonlinear Optimal Control',
  72: 'Convex formulation for navigation with probabilistic safety constraints',
  76: 'Convex Approach to Data-driven Optimal Control using Perron-Frobenius and Koopman Operators',
  79: 'Convex Approach for Stochastic Optimal Control using Linear Operators',
  88: 'Data-Driven Feedback Stabilization Using Koopman Operator',
  90: 'A Saddle-Point Dynamical System Approach for Robust Deep Learning',
  93: 'Synchronization in large scale nonlinear network with uncertain links',
  96: 'Robust approximation of Koopman operator and prediction in random dynamical systems',
  101: 'Optimal quadratic regulation of nonlinear systems using Koopman operator',
  102: 'Sample complexity for nonlinear dynamics',
  105: 'Mean Square Stability-based Analysis and Synthesis of Continuous-Time Linear Network Systems',
  107: 'Solving Robust AC-OPF via Primal-Dual Gradient Dynamics',
  114: 'Primal-dual based distributed optimization over stochastic communication channels',
  117: 'Synchronization in large scale nonlinear network with uncertain links',
  118: 'Primal-dual based distributed optimization over stochastic communication channels',
  121: 'Transfer operator based approach for opitmal sensor placement under uncertain operating conditions',
  122: 'Identifying causal interactions in power system: Information based approach',
  123: 'Fragility of decentralized load-side frequency control with stochastic renewables',
  124: 'Transfer operator based method for optimal stabilization of stochastic system',
  125: 'Dynamical system based approach for distributed particle vector machine',
  126: 'On causality preserving measure for information transfer in control dynamical system',
  130: 'Limitations and tradeoff in synchronization of large scale networks with uncertain links',
  133: 'Operator theoretic framework for optimal placement of actuators and sensors for control of nonequilibrium dynamics',
  135: 'Control of Inter-Area Oscillation with Noise Corrputed Wide Area Measurement',
  136: 'Information-Based Causal Measure for Influnece Characterization in Dynamical System With Applications',
  139: 'Formalism for information transfer in dynamic networks',
  140: 'Computation of Lyapunov measure for almost everywhere stochastic system',
  142: 'Vulnerability analysis of power networks to stochastic link failure attacks',
  146: 'Entropy-based characterization of delayed voltage recovery',
  147: 'Contigency analysis and identification of dynamic voltage control areas',
  148: 'Control of systems in lure form over uncertain channels',
  151: 'On optimal link removals for controllability degradation in dynamical networks',
  152: 'Synchronization in complex network systems with uncertainty',
  153: 'Stochastic positive real lemma and synchronization over uncertain networks',
  154: 'Optimal stabilization using Lyapunov measure',
  155: 'Stabilization of LTV systems over uncertain channels',
  160: 'Optimal placements of actuators and sensors for control of nonequilibrium dynamics',
  161: 'On Optimal sensors placement for mitigation of vulnerabilities to cyber-attacks in large scale netowrks',
  164: 'Limitations for nonlinear observation over erasure channels',
  165: 'Identification of critical interaction in uncertain network systems with complex dynamics',
  168: 'Stabilization of nonlinear sysems over packet drop links: Scalar Case',
  169: 'Stabilization of systems in Lure form over uncertain channels'
};
function splitCitation(citation, title) {
  const positions = [];
  let normalized = '';
  for (let i = 0; i < citation.length; i++) {
    if (/[a-z0-9]/i.test(citation[i])) { positions.push(i); normalized += citation[i].toLowerCase(); }
  }
  const start = normalized.indexOf(norm(title));
  if (start < 0 || !title) throw new Error(`Title needs review: ${citation}`);
  const from = positions[start], to = positions[start + norm(title).length - 1] + 1;
  return {
    authors: citation.slice(0, from).replace(/[\s,“”"]+$/g, ''),
    title: citation.slice(from, to),
    venue: citation.slice(to).replace(/^[\s,.“”"]+/, '').replace(/\.$/, '')
  };
}
const counts = {};
const records = original.map((source, i) => {
  const fields = splitCitation(source.citation, titles[i + 1] || source.links[0]?.label || '');
  const issues = [];
  const occurrence = counts[source.anchor] = (counts[source.anchor] || 0) + 1;
  const id = source.anchor + (occurrence > 1 ? `-${occurrence}` : '');
  const sectionYear = source.section.match(/\d{4}/)?.[0];
  const explicitYear = source.citation.match(/\b(?:19|20)\d{2}\b/g)?.at(-1);
  let year = sectionYear ? Number(sectionYear) : explicitYear ? Number(explicitYear) : null;
  let yearSource = sectionYear ? 'Original year heading' : explicitYear ? 'Original citation' : null;
  const status = source.section === 'Under Review' ? 'under-review' : /accepted/i.test(source.citation) ? 'accepted' : 'listed';
  if (i === 1) { year = 2026; yearSource = 'papers/data-to-certificates-d2c-koopman-supereigenfunctions.bib'; }
  if (!year) issues.push('No year supplied in the original citation.');
  if (sectionYear && explicitYear && sectionYear !== explicitYear) issues.push('Citation year differs from the original year heading.');
  if (occurrence > 1) issues.push(`The original anchor #${source.anchor} was duplicated; this entry now has a unique anchor.`);
  if (/^\d{4}$/.test(fields.venue)) fields.venue = '';
  if (!fields.venue) issues.push('No venue supplied in the original citation.');
  if (!source.links.length) issues.push('No paper link supplied.');
  if (source.links[0] && norm(source.links[0].label) !== norm(fields.title)) issues.push('The original paper-link title differs from the citation title; both are preserved.');
  if ([7,31,32].includes(i+1)) issues.push('The original linked paper appears unrelated to this citation; verify before citing.');
  if (i === 183) issues.push('Listed under 2009 in the source, but a same-title entry also appears under 2025. Year needs verification.');
  const types = [];
  if (/Book Chapter/i.test(fields.venue)) types.push('book-chapter');
  else if (/Poster/i.test(fields.venue)) types.push('poster');
  else {
    if (/Journal|Int\. J\.|Transact|Transacat|Transaction|Letters|Automatica|Physica|Scientific Report|Information Sciences?|nformation Science|Buildings? and Environment|Energy and Building|Measurement Science|Applicable Analysis|Building simulation/i.test(fields.venue)) types.push('journal');
    if (/Conference|Symposium|symposium|ICRA|ICML|MECC|CDC|General Meeting|IFAC-PapersOnLine/i.test(fields.venue)) types.push('conference');
    if (/arXiv|preprint/i.test(fields.venue)) types.push('preprint');
  }
  if (!types.length) types.push('unspecified');
  const abstract = source.answers.filter(a => /^Abstract:/i.test(a)).map(a => a.replace(/^Abstract:\s*/i, '')).join('\n\n');
  if (!abstract || /updated soon|available soon/i.test(abstract)) issues.push('Abstract missing or a placeholder.');
  const links = source.links.map(l => ({ ...l, kind: /doi\.org\//i.test(l.url) ? 'doi' : /\.pdf(?:$|[?#])|\/doi\/(e?pdf)\//i.test(l.url) ? 'pdf' : /\.bib(?:$|[?#])/i.test(l.url) ? 'bibtex' : 'paper' }));
  for (const link of [...links]) {
    const match = link.url.match(/\/doi\/(?:abs|full|epdf|pdf)\/(10\.[^?#]+)|link\.springer\.com\/article\/(10\.[^?#]+)/i);
    if (match) {
      const url = 'https://doi.org/' + (match[1] || match[2]);
      if (!links.some(l => l.url === url)) links.push({kind:'doi',label:'DOI',url,sourceUrl:link.url});
    }
  }
  if (i === 1) links.push({kind:'bibtex',label:'BibTeX',url:'papers/data-to-certificates-d2c-koopman-supereigenfunctions.bib'});
  return {id, ...fields, year, yearSource, status, types, areas:[], areaEvidence:[], abstract, links, featured:[11,17,59].includes(i+1), issues, source};
});
for (const record of records) {
  const duplicates = records.filter(p => p.id !== record.id && norm(p.title) === norm(record.title));
  if (duplicates.length) record.issues.push('Same-title entries also exist in the source bibliography; all have been retained separately.');
}
fs.writeFileSync(path.join(root,'data/publications.json'),JSON.stringify({schemaVersion:1,records},null,2)+'\n');
console.log(`Migrated ${records.length} entries without removing duplicates.`);
