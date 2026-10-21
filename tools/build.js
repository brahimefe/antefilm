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
  ['method', 'Method', 'method.html'],
  ['about', 'About', 'about.html']
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
  <span class="foot-links"><a href="${up}compare.html">Compare records</a><a href="${up}data.html">Data and licence</a><a href="${up}submit.html">Propose a record</a></span>
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
  return `<ul class="zen-records">${RECORDS.slice().sort((a, b) => b.recNum - a.recNum).map((r) => `
    <li><a href="${up}records/${r.slug}/${IX}"><span class="zr-imag">${esc(r.imagination)}</span><span class="zr-film">${esc(r.title)}, ${r.year}${r.draft ? ' (draft)' : ''}</span></a></li>`).join('')}
  </ul>`;
}

/* ---------- home / atlas ---------- */
function buildHome() {
  const n = (t) => corpus.filter((c) => c.imaginaryType === t).length;
  const collective = corpus.filter((c) => !['personal', 'uncoded'].includes(c.imaginaryType)).length;
  const integ = n('integrative'), restor = n('restoration'), retro = n('retrotopian');
  const anomic = n('anomic-collapse') + n('anomic-escape');

  const years = [...new Set(corpus.map((c) => c.year))].sort();
  const head = `<div class="ledger-row head"><span></span>${[...Array(10)].map((_, i) => `<span>${i + 1}</span>`).join('')}</div>`;
  const rows = years.map((y) => {
    const films = corpus.filter((c) => c.year === y).sort((a, b) => a.rank - b.rank);
    const cells = films.map((f) => `<button class="cell t-${f.imaginaryType}${f.record ? ' filed' : ''}" data-id="${f.id}" data-type="${f.imaginaryType}" aria-label="${esc(f.year + ', rank ' + f.rank + ': ' + f.title + '. ' + TYPES[f.imaginaryType].label + (f.record ? '. Full record filed.' : ''))}">${esc(f.title)}</button>`).join('');
    return `<div class="ledger-row"><span class="ledger-year">${y}</span>${cells}</div>`;
  }).join('');

  const latest = RECORDS.slice().sort((a, b) => b.recNum - a.recNum).slice(0, 3);
  const atlasData = corpus.map((c) => ({
    id: c.id, year: c.year, rank: c.rank, title: c.title, distributor: c.distributor, grossM: c.grossM,
    imaginaryType: c.imaginaryType, payoffStructure: c.payoffStructure, note: c.note, record: c.record
  }));

  const body = `
<section class="zen zen-hero">
  <p class="zen-num">${integ}<span> of ${collective}</span></p>
  <h1>global hits since 2001 that put a shared future at stake imagine one open to everyone.</h1>
  <p class="zen-sub">The rest defend the present, escape it, or return to the past.</p>
</section>

<section class="zen" aria-labelledby="atlas-h">
  <h2 id="atlas-h" class="zen-h">Every worldwide top-ten film, 2001–2025</h2>
  <p class="zen-legend"><span class="chip">${swatch('integrative')}A future open to everyone</span><span class="chip"><span class="swatch zen-grey" aria-hidden="true"></span>Every other ending</span>
    <button class="btn" id="colour-toggle" aria-pressed="false">Show all six types</button></p>
  <div class="ledger zen-mode" id="atlas-ledger" role="group" aria-label="Annual worldwide top ten, 2001 to 2025, by rank">${head}${rows}</div>
  <div class="panel" id="atlas-panel" aria-live="polite" hidden></div>
  <p class="zen-note">Select a film to see how its ending is coded. The coding is provisional and under review. <a href="method.html#coding">How films are coded</a></p>
</section>

<section class="zen" aria-labelledby="instead-h">
  <h2 id="instead-h" class="zen-h">What they offer instead</h2>
  <dl class="instead">
    <div><dt>${restor}</dt><dd>restore the present order</dd></div>
    <div><dt>${anomic}</dt><dd>imagine collapse, or escape for the few</dd></div>
    <div><dt>${retro}</dt><dd>return to an idealised past</dd></div>
  </dl>
</section>

<section class="zen" aria-labelledby="records-h">
  <h2 id="records-h" class="zen-h">The same futures, on record</h2>
  <p class="zen-sub">Each record sets a film's imagined future beside what states were doing at the same time.</p>
  <ul class="zen-records">${latest.map((r) => `
    <li><a href="records/${r.slug}/${IX}"><span class="zr-imag">${esc(r.imagination)}</span><span class="zr-film">${esc(r.title)}, ${r.year}</span></a></li>`).join('')}
  </ul>
  <p><a href="records/${IX}">All ${RECORDS.length} records</a></p>
</section>

<script>window.ATLAS = ${JSON.stringify(atlasData)};
window.ATLAS_TYPES = ${JSON.stringify(TYPES)};
window.ATLAS_PAYOFF = ${JSON.stringify(PAYOFF)};</script>`;

  write('index.html', layout({
    title: PREVIEW ? 'Antefilm review build' : "antefilm — global cinema's political imagination, on record", bare: PREVIEW,
    description: 'Of the global hits since 2001 that put a shared future at stake, few imagine one open to everyone. An atlas of the annual worldwide top ten, with records beside the institutional record.',
    active: 'atlas', body, scripts: ['assets/atlas.js']
  }));
}

/* ---------- records ---------- */
function apparatus(sources, note) {
  const list = sources && sources.length ? `<ol>${sources.map((s) => `<li>${s.url ? `<a href="${esc(s.url)}" rel="noopener">${esc(s.text)}</a>` : esc(s.text)}</li>`).join('')}</ol>` : '';
  if (!list && !note) return '';
  return `<details class="apparatus"><summary>Sources${note ? ' and selection note' : ''}</summary>${list}${note ? `<p><strong>Selection note.</strong> ${esc(note)}</p>` : ''}</details>`;
}

function buildRecord(r, i, sorted) {
  const no = recNo(r.recNum);
  const corpusRow = corpus.find((c) => c.record && c.record.slug === r.slug);
  const status = [];
  if (r.draft) status.push('Draft, under review');
  if (!r.threshold.inCorpus) status.push('Outside the top-ten threshold');

  const attentions = ATTENTIONS.map((a) => {
    const d = r[a.key];
    const flag = VERIFY_SCENES.has(r.slug + ':' + a.key);
    return `
<section class="attention" id="${a.key}" aria-labelledby="h-${a.key}">
  <h2 id="h-${a.key}">${a.name}</h2>
  <p class="question">${a.q}</p>
  <div class="rows">
    <div class="camera"><span class="regtag">The film</span>${d.camera}${d.scene ? `<span class="scene${flag ? ' flag' : ''}">${esc(d.scene)}</span>` : ''}</div>
    <div class="ground"><span class="regtag">The record</span>${d.ground}</div>
  </div>
  ${apparatus(d.sources, d.selectionNote)}
</section>`;
  }).join('');

  const c = r.circulation;
  const circulation = `
<section class="attention" id="circulation" aria-labelledby="h-circulation">
  <h2 id="h-circulation">Circulation</h2>
  <p class="question">The infrastructure that carried the film</p>
  <div class="rows">
    <div class="camera"><span class="regtag">The film</span><div class="circ">
      <div><b>Production support</b>${c.productionSupport}</div>
      <div><b>Script involvement</b>${c.scriptInvolvement}</div>
      <div><b>Distribution</b>${c.distributionChannels}</div>
      <div><b>Authority</b>${c.authorityInfrastructure}</div>
    </div></div>
    <div class="ground"><span class="regtag">The record</span><div class="circ">
      <div><b>On the same channels</b>${c.onTheSameChannels}</div>
      <div><b>Off the same channels</b>${c.offTheSameChannels}</div>
    </div></div>
  </div>
  ${apparatus(c.sources, '')}
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
<header class="zen rec-zen">
  <p class="rec-film">${esc(r.title)}<span>${r.year}, dir. ${esc(r.director)}${corpusRow ? `, number ${corpusRow.rank} worldwide that year` : ''}</span></p>
  <h1 class="imagination">${esc(r.imagination)}</h1>
  <p class="rec-summary">${r.gloss}</p>
  <p class="rec-meta">Record ${no}. Filed ${esc(r.filed)}${r.revised && r.revised !== r.filed ? `, revised ${esc(r.revised)}` : ''}. Ending coded ${esc(TYPES[r.beckert.imaginaryType].label.toLowerCase())}, ${esc((PAYOFF[r.beckert.payoffStructure] || '').toLowerCase())}.${status.length ? ` <span class="rec-status">${status.join('. ')}.</span>` : ''}</p>
  ${r.threshold.note ? `<p class="rec-meta">${esc(r.threshold.note)}</p>` : ''}
</header>

<p class="reading-key"><span class="key-camera">The film</span> shows what the film puts forward. <span class="key-ground">The record</span> shows what was enacted, on record, at the same time.</p>

${attentions}
${circulation}

<details class="cite" id="cite">
  <summary>Cite this record</summary>
  <div class="cite-body">
    <div><pre id="cite-apa">${esc(apa)}</pre><button class="btn" data-copy="cite-apa">Copy reference</button></div>
    <div><pre id="cite-bib">${esc(bib)}</pre><button class="btn" data-copy="cite-bib">Copy BibTeX</button></div>
  </div>
</details>

<nav class="pager" aria-label="Other records">
  <span>${prev ? `<a href="../${prev.slug}/${IX}">${esc(prev.title)}</a>` : ''}</span>
  <span><a href="../${IX}">All records</a></span>
  <span>${next ? `<a href="../${next.slug}/${IX}">${esc(next.title)}</a>` : ''}</span>
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
  <p>Each record sets a film's imagined future beside what was enacted, on record, at the same time.</p>
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
function periodBars() {
  return '<div class="bars" style="max-width:760px">' + PERIODS.map((p) => {
    const inP = corpus.filter((c) => c.year >= p.from && c.year <= Math.min(p.to, 2025));
    const col = inP.filter((c) => !['personal', 'uncoded'].includes(c.imaginaryType));
    const a = col.length ? Math.round(100 * col.filter((c) => c.imaginaryType.startsWith('anomic')).length / col.length) : 0;
    const i = col.length ? Math.round(100 * col.filter((c) => c.imaginaryType === 'integrative').length / col.length) : 0;
    return `<div class="bar t-anomic-collapse"><span>${p.from}–${Math.min(p.to, 2025)}: anomic</span><span class="track"><span class="fill" style="width:${a}%;display:block"></span></span><span class="n">${a}%</span></div>
    <div class="bar t-integrative"><span>${p.from}–${Math.min(p.to, 2025)}: integrative</span><span class="track"><span class="fill" style="width:${i}%;display:block"></span></span><span class="n">${i}%</span></div>`;
  }).join('') + '</div>';
}
function corpusTable() {
  return `<div class="table-wrap" style="max-width:900px"><table class="data"><thead><tr><th>Year</th><th>Rank</th><th>Title</th><th>Gross, USD M</th><th>Ending</th><th>Payoff</th></tr></thead><tbody>${corpus.map((f) => `<tr>
    <td class="num">${f.year}</td><td class="num">${f.rank}</td>
    <td>${f.record ? `<a href="${f.record.href}">${esc(f.title)}</a>` : esc(f.title)}</td>
    <td class="num">${f.grossM.toLocaleString('en-US')}</td><td>${typeChip(f.imaginaryType)}</td><td>${esc(PAYOFF[f.payoffStructure] || '—')}</td></tr>`).join('')}</tbody></table></div>`;
}
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
<div class="prose"><h2>Anomic and integrative endings by period</h2><p>Share of films whose ending puts a collective future at stake; films coded personal or not yet coded are left out of each base.</p></div>
${periodBars()}
<div class="prose"><h2>All films</h2></div>
${corpusTable()}
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
