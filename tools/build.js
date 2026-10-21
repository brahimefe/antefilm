#!/usr/bin/env node
/* antefilm — static site build.
 * Reads data/records.js, data/corpus-source.tsv and data/coding-beckert.tsv;
 * writes all pages, data/corpus.csv, data/corpus.json and data/records.json.
 * Run from the repository root:  node tools/build.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const PREVIEW = !!process.env.PREVIEW;
const OUT = process.env.OUT_DIR ? path.resolve(process.env.OUT_DIR) : ROOT;
const IX = PREVIEW ? 'index.html' : '';
const write = (p, s) => {
  const full = path.join(OUT, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, s);
};

const { RECORDS } = require(path.join(ROOT, 'data/records.js'));
const SITE_URL = 'https://antefilm.com';
const UPDATED = '21 October 2026';

/* ---------- vocabularies ---------- */
const TYPES = {
  'integrative':     { label: 'Integrative', def: 'The future as collective progress open to all' },
  'anomic-collapse': { label: 'Anomic: collapse', def: 'Breakdown to be endured, or destruction as the path to a purified order' },
  'anomic-escape':   { label: 'Anomic: escape', def: 'Transformation delegated to technology; escape or survival for a select group' },
  'retrotopian':     { label: 'Retrotopian', def: 'Return to an idealised past order' },
  'restoration':     { label: 'Restoration', def: 'No new future: the present order is defended or restored' },
  'personal':        { label: 'Personal', def: 'No collective future is at stake' },
  'uncoded':         { label: 'Not yet coded', def: 'Not known well enough to code with confidence' }
};
const TYPE_ORDER = ['integrative', 'anomic-collapse', 'anomic-escape', 'retrotopian', 'restoration', 'personal', 'uncoded'];
const PAYOFF = { 'positive-sum': 'Positive-sum', 'zero-sum': 'Zero-sum', 'negative-sum': 'Negative-sum', 'n/a': 'Not applicable', '': '—' };
const PERIODS = [
  { from: 2001, to: 2008, label: 'I', name: 'invasion grammar' },
  { from: 2009, to: 2016, label: 'II', name: 'exit imperialism, drone grammar' },
  { from: 2017, to: 2020, label: 'III', name: 'withdrawal grammar' },
  { from: 2021, to: 2099, label: 'IV', name: 'post-withdrawal grammar' }
];
const ATTENTIONS = [
  { key: 'construction', ord: 'I', name: 'Construction', q: 'What is built as problem, what is left as given' },
  { key: 'address', ord: 'II', name: 'Address', q: 'Who stands in for the species' },
  { key: 'exclusion', ord: 'III', name: 'Exclusion', q: 'Which carriers of the same keyword stay off-record' },
  { key: 'prescription', ord: 'IV', name: 'Prescription', q: 'What the framing proposes as future-reality' }
];
/* scene markers that still need checking against the film itself */
const VERIFY_SCENES = new Set(['interstellar:exclusion']);

/* ---------- helpers ---------- */
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const strip = (s) => String(s || '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
const recNo = (n) => String(n).padStart(3, '0');
const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const periodOf = (y) => PERIODS.find((p) => y >= p.from && y <= p.to);
function tsv(p) {
  const [head, ...lines] = read(p).trim().split('\n');
  const cols = head.split('\t');
  return lines.map((l) => { const v = l.split('\t'); const o = {}; cols.forEach((c, i) => { o[c] = (v[i] || '').trim(); }); return o; });
}
const csvCell = (v) => { const s = String(v == null ? '' : v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };

/* ---------- data ---------- */
const recordsBySlug = {};
RECORDS.forEach((r) => { recordsBySlug[r.slug] = r; });
const coding = {};
tsv('data/coding-beckert.tsv').forEach((c) => { coding[c.year + '-' + c.rank] = c; });

const corpus = tsv('data/corpus-source.tsv').map((r) => {
  const year = +r.year, rank = +r.rank;
  const c = coding[year + '-' + rank] || {};
  const slug = slugify(r.title);
  const rec = recordsBySlug[slug] && recordsBySlug[slug].year === year ? recordsBySlug[slug] : null;
  return {
    id: year + '-' + rank, year, rank, title: r.title, slug, distributor: r.distributor,
    grossUSD: +r.gross_usd, grossM: Math.round(+r.gross_usd / 1e6),
    imaginaryType: c.imaginaryType || 'uncoded', payoffStructure: c.payoffStructure || '', note: c.note || '',
    period: periodOf(year).label,
    record: rec ? { num: recNo(rec.recNum), slug: rec.slug, imagination: rec.imagination, href: 'records/' + rec.slug + '/' + IX } : null
  };
});
if (corpus.length !== 250) console.warn('Warning: corpus has ' + corpus.length + ' rows, expected 250');
const unmatched = RECORDS.filter((r) => r.threshold.inCorpus && !corpus.some((c) => c.record && c.record.slug === r.slug));
if (unmatched.length) console.warn('Warning: records marked inCorpus but not matched: ' + unmatched.map((r) => r.slug).join(', '));

/* ---------- layout ---------- */
const NAV = [
  ['atlas', 'Atlas', 'index.html'],
  ['records', 'Records', 'records/index.html'],
  ['compare', 'Compare', 'compare.html'],
  ['method', 'Method', 'method.html'],
  ['data', 'Data', 'data.html'],
  ['about', 'About', 'about.html'],
  ['submit', 'Submit', 'submit.html']
];
function layout({ depth = 0, title, description, active, body, scripts = [], bodyAttr = '', bare = false }) {
  const up = '../'.repeat(depth);
  const nav = NAV.map(([k, label, href]) =>
    `<a href="${up}${href}"${k === active ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="stylesheet" href="${up}assets/site.css">
</head>
<body${bodyAttr}>
<a class="skip" href="#main">Skip to content</a>
<header class="mast"><div class="wrap">
  <a class="brand" href="${up}index.html">ante<span>film</span></a>
  <nav class="nav" aria-label="Main">${nav}</nav>
</div></header>
<main id="main"><div class="wrap">
${body}
</div></main>
<footer class="foot"><div class="wrap">
  <span>Antefilm: a record of global cinema's political imagination. Edited by İbrahim Efe. Updated ${UPDATED}.</span>
  <span><a href="${up}data.html">Data and licence</a></span>
</div></footer>
${scripts.map((s) => `<script src="${up}${s}"></script>`).join('\n')}
</body>
</html>
`;
  if (bare) {
    /* artifact preview entry page: the host supplies the document skeleton */
    return html.replace(/^<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport"[^>]*>\n/, '')
      .replace('<title>', '<meta name="claude:viewport-fit-sides" content="cover">\n<title>')
      .replace(/<\/head>\n<body[^>]*>\n/, '').replace(/<\/body>\n<\/html>\n$/, '');
  }
  return html;
}

/* rewrite relative links inside content fragments for pages at depth > 0 (not needed now: fragments live at root) */
const fragment = (name) => read('tools/content/' + name);

/* ---------- shared bits ---------- */
const swatch = (type) => `<span class="swatch t-${type}" aria-hidden="true"></span>`;
const typeChip = (type) => `<span class="chip">${swatch(type)}${esc((TYPES[type] || { label: type }).label)}</span>`;

function recordList(depth) {
  const up = '../'.repeat(depth);
  const items = RECORDS.slice().sort((a, b) => b.recNum - a.recNum).map((r) => `
  <li><a href="${up}records/${r.slug}/${IX}">
    <span class="rl-num">Record ${recNo(r.recNum)}</span>
    <span class="rl-title">${esc(r.title)}<small>${r.year}, dir. ${esc(r.director)}${r.draft ? ', draft' : ''}${r.threshold.inCorpus ? '' : ', outside threshold'}</small></span>
    <span class="rl-imag">${esc(r.imagination)}</span>
    <span class="rl-type">${typeChip(r.beckert.imaginaryType)}</span>
  </a></li>`).join('');
  return `<ul class="record-list">${items}</ul>`;
}

/* ---------- home / atlas ---------- */
function buildHome() {
  const coded = corpus.filter((c) => c.imaginaryType !== 'uncoded');
  const counts = {};
  TYPE_ORDER.forEach((t) => { counts[t] = corpus.filter((c) => c.imaginaryType === t).length; });

  const filters = ['<button class="btn" data-filter="all" aria-pressed="true">All films</button>']
    .concat(TYPE_ORDER.map((t) => `<button class="btn chip" data-filter="${t}" aria-pressed="false">${swatch(t)}${esc(TYPES[t].label)} <span style="color:var(--graphite)">${counts[t]}</span></button>`)).join('');

  const years = [...new Set(corpus.map((c) => c.year))].sort();
  const head = `<div class="ledger-row head"><span></span>${[...Array(10)].map((_, i) => `<span>${i + 1}</span>`).join('')}</div>`;
  const rows = years.map((y) => {
    const films = corpus.filter((c) => c.year === y).sort((a, b) => a.rank - b.rank);
    const cells = films.map((f) => `<button class="cell t-${f.imaginaryType}${f.record ? ' filed' : ''}" data-id="${f.id}" data-type="${f.imaginaryType}" aria-label="${esc(f.year + ', rank ' + f.rank + ': ' + f.title + '. ' + TYPES[f.imaginaryType].label + (f.record ? '. Full record filed.' : ''))}">${esc(f.title)}</button>`).join('');
    return `<div class="ledger-row"><span class="ledger-year">${y}</span>${cells}</div>`;
  }).join('');

  const tableRows = corpus.map((f) => `<tr data-type="${f.imaginaryType}">
    <td class="num">${f.year}</td><td class="num">${f.rank}</td>
    <td>${f.record ? `<a href="${f.record.href}">${esc(f.title)}</a>` : esc(f.title)}</td>
    <td class="num" data-sort="${f.grossM}">${f.grossM.toLocaleString('en-US')}</td>
    <td data-sort="${f.imaginaryType}">${typeChip(f.imaginaryType)}</td>
    <td>${esc(PAYOFF[f.payoffStructure] || '—')}</td>
    <td>${f.record ? 'Record ' + f.record.num : ''}</td></tr>`).join('');

  /* anomic share by period, among films with a collective future at stake */
  const periodRows = PERIODS.map((p) => {
    const inP = corpus.filter((c) => c.year >= p.from && c.year <= Math.min(p.to, 2025));
    const collective = inP.filter((c) => !['personal', 'uncoded'].includes(c.imaginaryType));
    const anomic = collective.filter((c) => c.imaginaryType.startsWith('anomic')).length;
    const integ = collective.filter((c) => c.imaginaryType === 'integrative').length;
    return { p, n: collective.length, anomic, integ };
  });
  const bars = periodRows.map((r) => {
    const a = r.n ? Math.round(100 * r.anomic / r.n) : 0;
    const i = r.n ? Math.round(100 * r.integ / r.n) : 0;
    return `<div class="bar t-anomic-collapse"><span>Period ${r.p.label}, ${r.p.from}–${Math.min(r.p.to, 2025)}: anomic</span><span class="track"><span class="fill" style="width:${a}%;display:block"></span></span><span class="n">${a}%</span></div>
    <div class="bar t-integrative"><span>Period ${r.p.label}: integrative</span><span class="track"><span class="fill" style="width:${i}%;display:block"></span></span><span class="n">${i}%</span></div>`;
  }).join('');

  const atlasData = corpus.map((c) => ({
    id: c.id, year: c.year, rank: c.rank, title: c.title, distributor: c.distributor, grossM: c.grossM,
    imaginaryType: c.imaginaryType, payoffStructure: c.payoffStructure, note: c.note, record: c.record
  }));

  const body = `
<section class="atlas-head">
  <div>
    <h1>What futures does the world's most-watched cinema still offer?</h1>
    <p>Every film in the annual worldwide top ten since 2001, coded by the future its ending makes available. Selected films are read in full beside the institutional record of their time.</p>
  </div>
  <p class="tally"><b>${corpus.length}</b> films in the corpus, ${coded.length} coded<br><b>${RECORDS.length}</b> full records filed</p>
</section>

<div class="controls" role="group" aria-label="Filter by imaginary type">${filters}</div>
<div class="controls">
  <span class="label">View</span>
  <button class="btn" data-view="ledger" aria-pressed="true">Ledger</button>
  <button class="btn" data-view="table" aria-pressed="false">Table</button>
  <span class="spacer"></span>
  <a href="data/corpus.csv" download>Download CSV</a>
  <a href="data.html">Codebook</a>
</div>

<div class="atlas-layout">
  <div>
    <div class="ledger" id="atlas-ledger" role="group" aria-label="Annual worldwide top ten, 2001 to 2025, by rank">${head}${rows}</div>
    <div class="table-wrap" id="atlas-table" hidden>
      <table class="data">
        <thead><tr>
          <th><button data-numeric="true">Year</button></th><th><button data-numeric="true">Rank</button></th>
          <th><button>Title</button></th><th><button data-numeric="true">Gross, USD M</button></th>
          <th><button>Imaginary type</button></th><th><button>Payoff</button></th><th><button>Record</button></th>
        </tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
    </div>
    <p style="font-size:var(--s-1);color:var(--graphite);margin-top:12px">Films with a full record carry a dark corner and bold title. Coding is provisional: it was drafted with the assistance of an AI model and is under the editor's review. Grosses as listed in Wikipedia's annual tables, retrieved ${UPDATED}.</p>
  </div>
  <aside class="panel" id="atlas-panel" aria-live="polite">
    <p class="empty">Select a film in the ledger to see how it is coded and whether it has a full record.</p>
  </aside>
</div>

<section class="shares">
  <h2>Anomic and integrative futures by period</h2>
  <p style="font-size:var(--s-1);color:var(--graphite);margin:0 0 12px;max-width:66ch">Share of films whose ending puts a collective future at stake. Films coded personal or not yet coded are left out of each base.</p>
  <div class="bars">${bars}</div>
</section>

<section style="margin-top:56px">
  <h2 style="font-size:var(--s2);font-weight:600;margin:0 0 16px">Filed records</h2>
  ${recordList(0)}
</section>

<script>window.ATLAS = ${JSON.stringify(atlasData)};
window.ATLAS_TYPES = ${JSON.stringify(TYPES)};
window.ATLAS_PAYOFF = ${JSON.stringify(PAYOFF)};</script>`;

  write('index.html', layout({
    title: PREVIEW ? 'Antefilm review build' : "antefilm — global cinema's political imagination, on record", bare: PREVIEW,
    description: 'An atlas of the futures offered by the annual worldwide top ten films since 2001, with close readings beside the institutional record.',
    active: 'atlas', body, scripts: ['assets/atlas.js']
  }));
}

/* ---------- records ---------- */
function sourcesList(sources) {
  if (!sources || !sources.length) return '';
  return `<h3>Sources</h3><ol>${sources.map((s) => `<li>${s.url ? `<a href="${esc(s.url)}" rel="noopener">${esc(s.text)}</a>` : esc(s.text)}</li>`).join('')}</ol>`;
}

function buildRecord(r, i, sorted) {
  const no = recNo(r.recNum);
  const corpusRow = corpus.find((c) => c.record && c.record.slug === r.slug);
  const stamps = [];
  if (r.draft) stamps.push('<span class="stamp">Draft, under review</span>');
  if (!r.threshold.inCorpus) stamps.push('<span class="stamp">Outside threshold</span>');

  const attentions = ATTENTIONS.map((a) => {
    const d = r[a.key];
    const flag = VERIFY_SCENES.has(r.slug + ':' + a.key);
    return `
<section class="attention" id="${a.key}" aria-labelledby="h-${a.key}">
  <h2 id="h-${a.key}"><span class="ord">${a.ord}</span>${a.name}</h2>
  <p class="question">${a.q}</p>
  <div class="rows">
    <div class="camera"><span class="regtag">Camera record</span>${d.camera}${d.scene ? `<span class="scene${flag ? ' flag' : ''}">${esc(d.scene)}</span>` : ''}</div>
    <div class="ground"><span class="regtag">Ground record</span>${d.ground}</div>
    <div class="margin">${sourcesList(d.sources)}${d.selectionNote ? `<h3>Selection note</h3><p>${esc(d.selectionNote)}</p>` : ''}</div>
  </div>
</section>`;
  }).join('');

  const c = r.circulation;
  const circulation = `
<section class="attention" id="circulation" aria-labelledby="h-circulation">
  <h2 id="h-circulation"><span class="ord">V</span>Circulation</h2>
  <p class="question">The infrastructure that pre-clears the framing</p>
  <div class="rows">
    <div class="camera"><span class="regtag">Camera record</span><div class="circ">
      <div><b>Production support</b>${c.productionSupport}</div>
      <div><b>Script involvement</b>${c.scriptInvolvement}</div>
      <div><b>Distribution channels</b>${c.distributionChannels}</div>
      <div><b>Authority infrastructure</b>${c.authorityInfrastructure}</div>
    </div></div>
    <div class="ground"><span class="regtag">Ground record</span><div class="circ">
      <div><b>On the same channels</b>${c.onTheSameChannels}</div>
      <div><b>Off the same channels</b>${c.offTheSameChannels}</div>
    </div></div>
    <div class="margin">${sourcesList(c.sources)}</div>
  </div>
</section>`;

  const url = `${SITE_URL}/records/${r.slug}/`;
  const apa = `Efe, İ. (2026). ${r.title} [Record ${no}]. In Antefilm: A record of global cinema's political imagination. Filed ${r.filed}, revised ${r.revised}. ${url}`;
  const bib = `@misc{antefilm-${r.slug},
  author       = {Efe, {\\.I}brahim},
  title        = {{${r.title}} [Antefilm record ${no}]},
  year         = {2026},
  howpublished = {\\url{${url}}},
  note         = {Filed ${r.filed}; revised ${r.revised}}
}`;
  const prev = sorted[i - 1], next = sorted[i + 1];

  const body = `
<header class="rec-head">
  <div>
    <p class="rec-num">Record ${no}</p>
    <h1>${esc(r.title)}</h1>
    <p class="rec-facts">
      <span>${r.year}</span><span>dir. ${esc(r.director)}</span><span>${esc(r.runtime)}</span>
      <span>${esc(r.studio)}</span><span>${esc(r.gross)} worldwide</span>
      ${corpusRow ? `<span>rank ${corpusRow.rank} in ${r.year}</span>` : ''}
      <span>filed ${esc(r.filed)}</span>${r.revised && r.revised !== r.filed ? `<span>revised ${esc(r.revised)}</span>` : ''}
    </p>
    ${stamps.length ? `<div class="rec-stamps">${stamps.join('')}</div>` : ''}
    ${r.threshold.note ? `<p class="threshold-note">${esc(r.threshold.note)}</p>` : ''}
  </div>
  <div>
    <p class="imagination-label">Named imagination</p>
    <p class="imagination">${esc(r.imagination)}</p>
  </div>
</header>

<nav class="att-nav" aria-label="Attentions"><ol>
  ${ATTENTIONS.map((a) => `<li><a href="#${a.key}">${a.name}</a></li>`).join('')}
  <li><a href="#circulation">Circulation</a></li><li><a href="#gloss">The imagination, named</a></li><li><a href="#cite">Cite</a></li>
</ol></nav>

<div class="edition-heads" aria-hidden="true">
  <div class="camera-h"><b>Camera record</b>What the film puts forward</div>
  <div class="ground-h"><b>Ground record</b>The same imagination, already in operation</div>
  <div class="margin-h"><b>Apparatus</b>Sources and selection notes</div>
</div>

${attentions}
${circulation}

<section class="gloss" id="gloss">
  <h2>${esc(r.imagination)}</h2>
  <p>${r.gloss}</p>
  <div class="coding">
    <span>Imaginary type: ${typeChip(r.beckert.imaginaryType)}</span>
    <span>Payoff structure: ${esc(PAYOFF[r.beckert.payoffStructure] || '—')}</span>
    <a href="../../method.html">How films are coded</a>
  </div>
</section>

<section class="cite" id="cite">
  <h2>Cite this record</h2>
  <div><pre id="cite-apa">${esc(apa)}</pre><button class="btn" data-copy="cite-apa">Copy reference</button></div>
  <div><pre id="cite-bib">${esc(bib)}</pre><button class="btn" data-copy="cite-bib">Copy BibTeX</button></div>
</section>

<nav class="pager" aria-label="Other records">
  <span>${prev ? `<a href="../${prev.slug}/${IX}">Record ${recNo(prev.recNum)}: ${esc(prev.title)}</a>` : ''}</span>
  <span><a href="../${IX}">All records</a></span>
  <span>${next ? `<a href="../${next.slug}/${IX}">Record ${recNo(next.recNum)}: ${esc(next.title)}</a>` : ''}</span>
</nav>`;

  write(`records/${r.slug}/index.html`, layout({
    depth: 2,
    title: `${r.title} (${r.year}) — antefilm record ${no}`,
    description: `${r.title}: ${r.imagination}. ${strip(r.gloss).slice(0, 150)}`,
    active: 'records', body, scripts: ['assets/record.js']
  }));
}

function buildRecordsIndex() {
  const body = `
<div class="page-head">
  <h1>Records</h1>
  <p>Close readings under the five-attention protocol. Each sets what the film puts forward beside what was enacted, on record, at the same time.</p>
</div>
${recordList(1)}`;
  write('records/index.html', layout({
    depth: 1, title: 'Records — antefilm', description: 'Close readings of global cinema under the antefilm protocol.',
    active: 'records', body
  }));
}

/* ---------- compare ---------- */
function buildCompare() {
  const sorted = RECORDS.slice().sort((a, b) => a.year - b.year);
  const tabs = ATTENTIONS.map((a) => `<button class="btn" data-att="${a.key}" aria-pressed="false">${a.ord}. ${a.name}</button>`).join('') +
    `<button class="btn" data-att="gloss" aria-pressed="false">The imagination, named</button>`;
  const panels = ATTENTIONS.map((a) => `
<div data-att-panel="${a.key}">
  <p class="question" style="color:var(--graphite);font-style:italic">${a.q}</p>
  ${sorted.map((r) => `<div class="compare-row">
    <h3><a href="records/${r.slug}/${IX}#${a.key}">${esc(r.title)}</a> ${r.year}<small>${esc(r.imagination)}</small></h3>
    <div class="camera"><span class="regtag" style="display:block">Camera record</span>${r[a.key].camera}</div>
    <div class="ground"><span class="regtag" style="display:block">Ground record</span>${r[a.key].ground}</div>
  </div>`).join('')}
</div>`).join('') + `
<div data-att-panel="gloss">
  ${sorted.map((r) => `<div class="compare-row">
    <h3><a href="records/${r.slug}/${IX}#gloss">${esc(r.title)}</a> ${r.year}<small>${esc(r.imagination)}</small></h3>
    <div style="grid-column: span 2">${r.gloss}<p style="font-size:var(--s-1);margin:10px 0 0">${typeChip(r.beckert.imaginaryType)}, ${esc(PAYOFF[r.beckert.payoffStructure] || '')}</p></div>
  </div>`).join('')}
</div>`;
  const body = `
<div class="page-head">
  <h1>Compare one attention across records.</h1>
  <p>Read every record's construction, address, exclusion or prescription side by side, oldest film first.</p>
</div>
<div class="controls" role="group" aria-label="Choose an attention">${tabs}</div>
${panels}`;
  write('compare.html', layout({
    title: 'Compare — antefilm', description: 'One attention of the antefilm protocol read across all records.',
    active: 'compare', body, scripts: ['assets/record.js']
  }));
}

/* ---------- data page and downloads ---------- */
function buildData() {
  const cols = ['year', 'rank', 'title', 'distributor', 'grossUSD', 'period', 'imaginaryType', 'payoffStructure', 'codingNote', 'recordNumber', 'recordURL', 'stateCooperation', 'cooperationEvidence', 'scriptInvolvement', 'releaseChina', 'releaseTurkey'];
  const csv = [cols.join(',')].concat(corpus.map((c) => [
    c.year, c.rank, c.title, c.distributor, c.grossUSD, c.period, c.imaginaryType, c.payoffStructure, c.note,
    c.record ? c.record.num : '', c.record ? SITE_URL + '/records/' + c.record.slug + '/' : '',
    'unknown', '', 'unknown', 'unknown', 'unknown'
  ].map(csvCell).join(','))).join('\n') + '\n';
  write('data/corpus.csv', csv);
  write('data/corpus.json', JSON.stringify({
    title: 'Antefilm corpus: annual worldwide top ten, 2001–2025',
    version: '0.1.0', updated: '2026-10-21', licence: 'CC BY 4.0',
    notes: 'Ranks and grosses as listed in Wikipedia "YEAR in film" tables (drawn from Box Office Mojo), retrieved 21 October 2026; to be checked against Box Office Mojo. Imaginary type and payoff are provisional, drafted with AI assistance and under editorial review. Circulation variables are not yet coded.',
    films: corpus.map((c) => ({ year: c.year, rank: c.rank, title: c.title, distributor: c.distributor, grossUSD: c.grossUSD, period: c.period, imaginaryType: c.imaginaryType, payoffStructure: c.payoffStructure, codingNote: c.note, record: c.record ? c.record.num : null }))
  }, null, 2) + '\n');
  write('data/records.json', JSON.stringify({ version: '0.2.0', updated: '2026-10-21', licence: 'CC BY 4.0', records: RECORDS }, null, 2) + '\n');

  const codebook = [
    ['year', '2001–2025', 'Year of worldwide release'],
    ['rank', '1–10', "Position in that year's worldwide gross table"],
    ['title, distributor', 'text', 'As listed in the source table'],
    ['grossUSD', 'integer', 'Worldwide gross in US dollars, as listed'],
    ['period', 'I–IV', 'Period band: I 2001–2008, II 2009–2016, III 2017–2020, IV 2021–'],
    ['imaginaryType', TYPE_ORDER.join(', '), 'The future the film\'s resolution offers; see the method, §8'],
    ['payoffStructure', 'positive-sum, zero-sum, negative-sum, n/a', 'Who gains in that future; n/a where the type is personal'],
    ['codingNote', 'text', 'The coder\'s reason, where the coding is not obvious'],
    ['recordNumber, recordURL', 'text', 'The full record, where one is filed'],
    ['stateCooperation', 'none found, DoD, CIA, NASA, other US agency, foreign state, unknown', 'Any state body that provided access, equipment, advice or script review; not yet coded'],
    ['cooperationEvidence', 'documented, reported, none found', 'Documented: FOIA, official statement or credits; reported: credible secondary source'],
    ['scriptInvolvement', 'documented changes, advisory only, none found, unknown', 'Changes requested or made at script stage by a cooperating body'],
    ['releaseChina, releaseTurkey', 'yes, no, unknown', 'Theatrical release in mainland China and in Turkey']
  ];
  const typeRows = TYPE_ORDER.map((t) => `<tr><td>${typeChip(t)}</td><td>${esc(TYPES[t].def)}</td><td class="num">${corpus.filter((c) => c.imaginaryType === t).length}</td></tr>`).join('');

  const body = `
<div class="page-head">
  <h1>Data</h1>
  <p>Everything on the site is available to download and reuse under CC BY 4.0, with credit to antefilm.</p>
</div>
<div class="prose">
  <h2>Downloads</h2>
  <ul>
    <li><a href="data/corpus.csv" download>corpus.csv</a>: the 250 films, one row each.</li>
    <li><a href="data/corpus.json" download>corpus.json</a>: the same, with notes.</li>
    <li><a href="data/records.json" download>records.json</a>: every full record, all fields.</li>
    <li><a href="schema.json">schema.json</a>: the record data model.</li>
  </ul>

  <h2>What to know before using it</h2>
  <ul>
    <li><strong>Version 0.1, ${UPDATED}.</strong> Ranks and grosses come from Wikipedia's annual tables, which draw on Box Office Mojo. They include later re-releases where the table does, and are still to be checked against Box Office Mojo.</li>
    <li><strong>The coding is provisional.</strong> Imaginary type and payoff were drafted with the assistance of an AI model and are under the editor's review. ${corpus.filter((c) => c.imaginaryType === 'uncoded').length} films are marked not yet coded rather than guessed.</li>
    <li><strong>Circulation is not yet coded.</strong> State cooperation, script involvement and release columns are present but marked unknown; they will be filled only from sources.</li>
    <li><strong>"None found" is not "none".</strong> It records the state of the evidence, not a fact about the film.</li>
  </ul>

  <h2>Imaginary types</h2>
</div>
<div class="table-wrap" style="max-width:900px"><table class="data"><thead><tr><th>Type</th><th>Definition</th><th>Films</th></tr></thead><tbody>${typeRows}</tbody></table></div>
<div class="prose"><h2>Codebook</h2></div>
<div class="table-wrap" style="max-width:900px"><table class="data"><thead><tr><th>Variable</th><th>Values</th><th>Coding rule</th></tr></thead>
<tbody>${codebook.map((r) => `<tr><td><code>${esc(r[0])}</code></td><td>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</tbody></table></div>
<div class="prose">
  <h2>Cite the data</h2>
  <div class="note"><code>Efe, İ. (2026). Antefilm corpus: annual worldwide top ten, 2001–2025 (Version 0.1) [Data set]. https://antefilm.com/data.html</code></div>
</div>`;
  write('data.html', layout({
    title: 'Data — antefilm', description: 'Download the antefilm corpus and records; codebook and notes.',
    active: 'data', body
  }));
}

/* ---------- content pages ---------- */
function buildContent() {
  write('method.html', layout({ title: 'Method — antefilm', description: 'What antefilm records, how, and on what authority.', active: 'method', body: fragment('method.html') }));
  write('about.html', layout({ title: 'About — antefilm', description: 'About the antefilm project, its author, and how to cite it.', active: 'about', body: fragment('about.html') }));
  write('submit.html', layout({ title: 'Submit a record — antefilm', description: 'Propose a record for the antefilm corpus. All submissions are reviewed before publication.', active: 'submit', body: fragment('submit.html'), scripts: ['assets/submit.js'] }));
  write('tools/new-record.html', layout({ depth: 1, title: 'Add a record (local tool) — antefilm', description: 'Local editing tool.', active: '', body: fragment('submit.html').replace(/href="method.html"/g, 'href="../method.html"'), scripts: ['assets/submit.js'], bodyAttr: ' data-local-tool' }));

  /* old links: cases.html#slug -> records/slug/ */
  const map = JSON.stringify(Object.fromEntries(RECORDS.map((r) => [r.slug, 'records/' + r.slug + '/'])));
  write('cases.html', `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Records moved — antefilm</title><meta name="robots" content="noindex">
<script>(function(){var m=${map};var s=(location.hash||'').replace('#','');location.replace(m[s]||'records/');})();</script>
</head><body><p>Records have moved. <a href="records/">Go to the records</a>.</p></body></html>
`);
}

/* ---------- sitemap ---------- */
function buildSitemap() {
  const urls = ['', 'records/', 'compare.html', 'method.html', 'data.html', 'about.html', 'submit.html']
    .concat(RECORDS.map((r) => 'records/' + r.slug + '/'));
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}/${u}</loc></url>`).join('\n')}
</urlset>
`);
  write('robots.txt', `User-agent: *\nDisallow: /tools/\nSitemap: ${SITE_URL}/sitemap.xml\n`);
}

/* ---------- run ---------- */
if (OUT !== ROOT) {
  for (const f of ['assets/site.css', 'assets/atlas.js', 'assets/record.js', 'assets/submit.js', 'schema.json']) write(f, read(f));
}
buildHome();
const sortedRecords = RECORDS.slice().sort((a, b) => a.recNum - b.recNum);
sortedRecords.forEach((r, i) => buildRecord(r, i, sortedRecords));
buildRecordsIndex();
buildCompare();
buildData();
buildContent();
buildSitemap();
console.log(`Built: ${corpus.length} corpus films, ${RECORDS.length} records.`);
