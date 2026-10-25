/* antefilm film list — one source of truth for the home page and the Method page.
   Each film: y year, t title, why (selection criterion), src (key into SOURCES or null), ok (criterion confirmed in a source),
   slug (file page, if written), a (answers: Promise, Whose future, Belief, Cost, Past as y / p / n), line (one-line reading). */
const SOURCES = {
  oscar: { label: 'Israeli Oscar submissions list', url: 'https://en.wikipedia.org/wiki/List_of_Israeli_submissions_for_the_Academy_Award_for_Best_International_Feature_Film' },
  ophir: { label: 'Ophir Award winners list', url: 'https://en.wikipedia.org/wiki/Ophir_Award' },
  cannes: { label: 'Ynet, Israeli films at Cannes', url: 'https://www.ynetnews.com/culture/article/jlovu9ao0' },
  exodus: { label: 'Exodus (1960 film), Wikipedia', url: 'https://en.wikipedia.org/wiki/Exodus_(1960_film)' },
  venice24: { label: 'Of Dogs and Men, Wikipedia', url: 'https://en.wikipedia.org/wiki/Of_Dogs_and_Men' },
  ips: { label: 'Institute for Palestine Studies survey of post-October 7 Israeli documentaries', url: 'https://www.palestine-studies.org/en/node/1658069' }
};

const PERIODS = [
  { name: 'Heroic-nationalist', years: '1950s–1970s', films: [
    { y: 1955, t: 'Hill 24 Doesn’t Answer', why: 'Cannes competition, 1955', src: 'cannes', ok: true },
    { y: 1960, t: 'Exodus', why: 'Oscar for best score; about $20m worldwide', src: 'exodus', ok: true, slug: 'exodus', a: 'ypypy', line: 'A homeland promised over a grave.' },
    { y: 1966, t: 'Cast a Giant Shadow', why: 'Major Hollywood studio release', src: null, ok: false },
    { y: 1976, t: 'Victory at Entebbe', why: 'US network broadcast', src: null, ok: false },
    { y: 1977, t: 'Raid on Entebbe', why: 'US network broadcast', src: null, ok: false },
    { y: 1977, t: 'Operation Thunderbolt', why: 'Oscar nomination', src: 'oscar', ok: true } ] },
  { name: 'Bourekas', years: '1960s–1970s', films: [
    { y: 1964, t: 'Sallah', why: 'Oscar nomination', src: 'oscar', ok: true },
    { y: 1971, t: 'The Policeman', why: 'Oscar nomination', src: 'oscar', ok: true },
    { y: 1973, t: 'The House on Chelouche Street', why: 'Oscar nomination', src: 'oscar', ok: true } ] },
  { name: 'Personal cinema', years: '1960s–1970s', films: [
    { y: 1968, t: 'Every Bastard a King', why: 'Israel’s Oscar submission', src: 'oscar', ok: true },
    { y: 1969, t: 'Siege', why: 'Cannes competition; Israel’s Oscar submission', src: 'cannes', ok: true },
    { y: 1975, t: 'My Michael', why: 'Israel’s Oscar submission', src: 'oscar', ok: true } ] },
  { name: 'The Palestinian wave', years: '1980s', films: [
    { y: 1982, t: 'Hamsin', why: 'Israel’s Oscar submission', src: 'oscar', ok: true },
    { y: 1984, t: 'Beyond the Walls', why: 'Oscar nomination; Ophir best film', src: 'oscar', ok: true },
    { y: 1986, t: 'Avanti Popolo', why: 'Ophir best film', src: 'ophir', ok: true } ] },
  { name: 'Oslo and the promise tested', years: '1990–2000', films: [
    { y: 1998, t: 'Circus Palestine', why: 'Ophir best film', src: 'ophir', ok: true },
    { y: 2000, t: 'Time of Favor', why: 'Ophir best film', src: 'ophir', ok: true },
    { y: 2000, t: 'Kippur', why: 'Cannes competition', src: null, ok: false } ] },
  { name: 'Shooting and crying', years: '2001–2010', films: [
    { y: 2004, t: 'Campfire', why: 'Ophir best film', src: 'ophir', ok: true },
    { y: 2005, t: 'Munich', why: 'Five Oscar nominations, including best picture', src: null, ok: false },
    { y: 2007, t: 'Beaufort', why: 'Oscar nomination', src: 'oscar', ok: true },
    { y: 2008, t: 'Waltz with Bashir', why: 'Oscar nomination; Ophir best film', src: 'oscar', ok: true },
    { y: 2009, t: 'Lebanon', why: 'Golden Lion, Venice', src: null, ok: false } ] },
  { name: 'Security export and the platforms', years: '2011–2023', films: [
    { y: 2011, t: 'Homeland', why: 'Emmy for outstanding drama series', src: null, ok: false },
    { y: 2013, t: 'Bethlehem', why: 'Ophir best film', src: 'ophir', ok: true },
    { y: 2015, t: 'Fauda', why: 'Global distribution on Netflix', src: null, ok: false },
    { y: 2017, t: 'Foxtrot', why: 'Ophir best film; Oscar shortlist', src: 'oscar', ok: true },
    { y: 2018, t: 'Operation Finale', why: 'Major Hollywood studio release', src: null, ok: false },
    { y: 2018, t: '7 Days in Entebbe', why: 'Major studio release; Berlin festival screening', src: null, ok: false },
    { y: 2019, t: 'Incitement', why: 'Ophir best film', src: 'ophir', ok: true },
    { y: 2019, t: 'The Red Sea Diving Resort', why: 'Netflix original', src: null, ok: false },
    { y: 2019, t: 'The Spy', why: 'Netflix original series', src: null, ok: false },
    { y: 2020, t: 'Tehran', why: 'Apple TV+ distribution; International Emmy', src: null, ok: false },
    { y: 2023, t: 'Golda', why: 'International theatrical release', src: null, ok: false } ] },
  { name: 'After 7 October', years: '2023–', films: [
    { y: 2024, t: 'Supernova: The Music Festival Massacre', why: 'Public broadcaster production; Apple TV and Prime Video', src: 'ips', ok: true },
    { y: 2024, t: 'We Will Dance Again', why: 'Paramount and BBC co-production; Paramount+', src: 'ips', ok: true },
    { y: 2024, t: 'Of Dogs and Men', why: 'Venice festival, Orizzonti section', src: 'venice24', ok: true },
    { y: 2025, t: 'Holding Liat', why: 'Berlin festival premiere', src: 'ips', ok: true } ] }
];

const EXCLUDED = [
  { t: 'They Were Ten (1960)', why: 'Influence not yet documented.' },
  { t: 'Three Days and a Child (1967)', why: 'Cannes prize, but the national project is not at its centre.' },
  { t: 'I Love You Rosa (1972)', why: 'Oscar nomination, but outside the scope.' },
  { t: 'The Band’s Visit (2007)', why: 'Ophir best film, but outside the scope.' },
  { t: 'Ajami (2009)', why: 'Co-directed by a Palestinian filmmaker; the Palestinian perspective is set aside for now.' },
  { t: 'Let It Be Morning (2021)', why: 'Told from Palestinian citizens’ point of view; set aside for now.' },
  { t: 'True Lies (1994), Executive Decision (1996)', why: 'Arab villains, but Israel and Zionism are not their subject.' },
  { t: 'World War Z (2013)', why: 'Israel appears in one sequence only.' }
];
