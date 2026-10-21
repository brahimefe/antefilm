/* antefilm — vaka veritabanı (tek doğruluk kaynağı)
 *
 * YENİ VAKA EKLEMEK:
 *   1. CASES dizisine yeni bir obje ekle (aşağıdaki vaka örneklerine bak)
 *   2. cases.js dosyasını Hostinger'a yükle, başka şey yapma
 *   3. Ana sayfa otomatik olarak en yüksek recNum'lu 3 vakayı kart olarak gösterir
 *   4. cases.html'de yeni vaka filtrelerle erişilebilir olur
 *
 * Anahtar sözcükleri vurgulamak için: <em>kelime</em>
 * Pending vakalar için: status: "pending", construction/address vs alanları boş bırakabilir.
 */

const SITE = {
  scope: "post-9/11 global cinema",
  threshold: "annual global top 10",
  range: "2001 — present"
};

const PERIODS = [
  { from: 2001, to: 2008, label: "I", name: "invasion grammar" },
  { from: 2009, to: 2016, label: "II", name: "exit imperialism, drone grammar" },
  { from: 2017, to: 2020, label: "III", name: "withdrawal grammar" },
  { from: 2021, to: 2099, label: "IV", name: "post-withdrawal grammar" }
];

const CASES = [

  /* ===========================================================
     REC.001 — INTERSTELLAR (2014, Nolan)
     =========================================================== */
  {
    slug: "interstellar",
    recNum: 1,
    year: 2014,
    title: "Interstellar",
    director: "Nolan",
    runtime: "169 min",
    gross: "USD 701M",
    grossNum: 701,
    studio: "Paramount / Warner Bros.",
    filed: "16.05.2026",
    imagination: "exit imperialism",
    status: "open",

    construction: {
      camera: "Earth is dying. Crops fail, dust takes the sky, an Iowa cornfield chokes. The cause is unnamed; the collapse arrives as <em>condition</em>, not consequence. The film inherits the dying world as premise and asks the audience to accept it without etiology.",
      scene: null,
      ground: "An unnamed cause requires only <em>exit</em>. A named cause would require remedy by responsibility — extraction, war, climate policy. The same year the film opens, a five-year food-security collapse begins in Yemen under a US-supplied air campaign; the FAO records the cause by name.",
      sources: "FAO 2014 — Food Security Update · Yemen Data Project"
    },
    address: {
      camera: "The NASA compound assembles humanity's delegation: Cooper, Brand, Doyle, Romilly, Mann, Murph. The word <em>humanity</em> is spoken often. The bodies on screen are mostly white, mostly American, all addressed as universal.",
      scene: null,
      ground: "13.9 million people forcibly displaced in 2014 from Syria, Afghanistan, Iraq, Yemen, Somalia. None of these bodies were available to stand in for <em>humanity</em>. The film's universal subject is a regional one; the global record names the rest.",
      sources: "UNHCR Global Trends 2014"
    },
    exclusion: {
      camera: "Tsiolkovsky cited as gospel: \"Earth is the cradle of humanity, but one cannot live in a cradle forever.\" <em>Departure</em> as evolutionary vocation; the ground left behind never returns to the frame.",
      scene: "01:12 — Brand quoting Tsiolkovsky in the launch sequence",
      ground: "The word <em>departure</em> carries another file: Saigon 1975, Mogadishu 1993, Kabul 2021 — departures producing ruin where they leave. The Kabul airlift of August 2021 alone produced 183 deaths at the perimeter. The framing requires these to remain structurally outside the same word.",
      sources: "UNAMA 2021 · Pentagon withdrawal briefings 09.2021"
    },
    prescription: {
      camera: "The remedy is <em>exit</em>. Not repair, not redistribution, not return. The film closes with Cooper preparing for the next launch — departure is permanent vocation, not last resort.",
      scene: null,
      ground: "The same prescription at policy level: withdrawal-as-strategy, evacuation-as-doctrine, departure-as-legitimating-modality of US imperial practice 2001–2021. Film and policy share one grammar of exit.",
      sources: "Harvey 2003 — The New Imperialism · Alford &amp; Secker 2017"
    },
    circulation: {
      productionSupport: "NASA visual cooperation; Caltech facilities and computational access for black-hole rendering.",
      scriptInvolvement: "Kip Thorne as scientific advisor on physics, relativity, and the visual depiction of singularities, from script through post-production.",
      distributionChannels: "Paramount + Warner Bros. co-distribution; release across 60+ markets.",
      authorityInfrastructure: "Science &amp; Entertainment Exchange brokerage; Caltech institutional credibility transferred to the film.",
      onTheSameChannels: "The Pentagon entertainment liaison office reviewed 410+ productions in the decade of the film's release.",
      offTheSameChannels: "No counter-distribution exists for the operational record of US departures over the same period through the same studio infrastructure.",
      sources: "Alford &amp; Secker 2017 · Robb 2004 · Thorne 2014"
    },

    gloss: "The political imagination in which the <em>camera record</em> — departure as evolutionary vocation, technological calling, humanitarian rescue — coincides with the <em>ground record</em>: departure as imperial operation, withdrawal as strategy, evacuation as doctrine. Film and policy travel as two registers of one imagination, not as text and context but as two operations of one configuration."
  },

  /* ===========================================================
     REC.002 — ARGO (2012, Affleck)
     =========================================================== */
  {
    slug: "argo",
    recNum: 2,
    year: 2012,
    title: "Argo",
    director: "Affleck",
    runtime: "120 min",
    gross: "USD 232M",
    grossNum: 232,
    studio: "Warner Bros.",
    filed: "16.05.2026",
    imagination: "rescue exceptionalism",
    status: "open",

    construction: {
      camera: "A revolution in Iran is staged in the opening as <em>onset</em>: storyboards trace the Shah, the embassy seizure, the hostages. The cause is glossed in a minute of voiceover; what remains is the standing problem of Americans trapped abroad. The CIA, in the figure of Tony Mendez, supplies the agency the situation lacks.",
      scene: null,
      ground: "The film's prologue compresses 1953 to 1979 — the CIA-MI6 coup against Mosaddegh, the Shah's installation, SAVAK — into context. The standing problem ceases to be a US action and becomes an Iranian state. The ground record of US covert action in Iran does not return to the frame.",
      sources: "National Security Archive — Iran 1953 declassifications"
    },
    address: {
      camera: "Six American diplomats hidden in the Canadian ambassador's residence. The film addresses an audience for whom <em>their</em> safety is the stake, <em>their</em> faces the ones the camera holds. The fifty-two hostages at the embassy itself remain peripheral; the Iranians who appear are mostly the crowd, mostly hostile, mostly without name.",
      scene: null,
      ground: "An estimated 60+ Iranians named at the embassy seizure had their own files, demands, biographies. The film records none. The exception (\"rescue\") requires an unspecified mass (\"hostility\") to function.",
      sources: "Houchang Chehabi — Iranian revolutionary history"
    },
    exclusion: {
      camera: "The word <em>rescue</em> structures the film. The CIA rescues six. The audience is invited to feel the rescue as the resolution of the crisis. The closing intertitles record the diplomats' safe return as ending.",
      scene: null,
      ground: "The same word carries another file. <em>Rescue</em> in US foreign policy 1953–2012 includes the deposition of elected governments framed as rescue from communism; the 1980 Operation Eagle Claw, which left eight US servicemen dead and is absent from the film; and the rescues that did not happen — embassy workers, civilians under sanctions, populations under US-backed regimes.",
      sources: "Department of State historical records"
    },
    prescription: {
      camera: "The remedy is <em>exception</em>. Where ordinary diplomacy fails, the cinematic ruse — a fake film crew — succeeds. The film proposes covert improvisation as the morally available form of action, with the CIA officer as its hero.",
      scene: null,
      ground: "The same prescription operates at policy level: the doctrine of exceptional action — covert operation, special forces, targeted improvisation — as the legitimate modality of US foreign engagement, recurring from 1953 through 2012's drone-strike escalations.",
      sources: "Mazzetti 2013 · Senate Intelligence Committee reports"
    },
    circulation: {
      productionSupport: "CIA Office of Public Affairs cooperation; declassified Mendez account as primary source; institutional clearance for the narrative.",
      scriptInvolvement: "Chris Terrio's screenplay based on Mendez's own published memoir (2012); CIA-cleared narrative as starting material.",
      distributionChannels: "Warner Bros. global distribution; co-production with Smokehouse Pictures, GK Films.",
      authorityInfrastructure: "Academy Award (Best Picture 2013); Michelle Obama's Oscars presentation transferred state authority to the screen.",
      onTheSameChannels: "The CIA Office of Public Affairs has cooperated with productions including <em>Zero Dark Thirty</em>, <em>The Recruit</em>, <em>The Agency</em>.",
      offTheSameChannels: "No counter-distribution exists for Iranian accounts of the 1953 coup or for the broader civilian record of US covert action in the region.",
      sources: "Jenkins 2012 · Alford &amp; Secker 2017 · National Security Archive"
    },

    gloss: "The political imagination in which the <em>camera record</em> — covert rescue as moral resolution, the exceptional act as legitimate intervention, the CIA officer as ethical agent — coincides with the <em>ground record</em>: a doctrine of exception that organises US foreign action across the period, from coup to covert operation to targeted strike. The rescue addresses some bodies as worth saving; the same imagination, on the ground, structures whom it is permissible to leave outside the rescue."
  },

  /* ===========================================================
     REC.003 — AMERICAN SNIPER (2014, Eastwood)
     =========================================================== */
  {
    slug: "american-sniper",
    recNum: 3,
    year: 2014,
    title: "American Sniper",
    director: "Eastwood",
    runtime: "133 min",
    gross: "USD 547M",
    grossNum: 547,
    studio: "Warner Bros.",
    filed: "16.05.2026",
    imagination: "saviour soldier",
    status: "open",

    construction: {
      camera: "A threat is present in the Iraqi city street. A figure approaches — a woman, a child. The soldier must judge in seconds. The film constructs the problem as <em>moral discrimination under pressure</em>: who is a combatant, who is not, all decided through the rifle scope. Iraq itself is given as a hostile environment, etiology unspecified.",
      scene: null,
      ground: "The 2003 invasion of Iraq, framed by the camera as setting, is the unnamed cause of the threat the soldier discriminates within. The Iraq Body Count records over 110,000 documented civilian deaths from 2003 to 2014 under coalition action and ensuing conflict. The film's <em>given</em> is the ground record's <em>consequence</em>.",
      sources: "Iraq Body Count Database 2003–2014 · Costs of War Project, Brown University"
    },
    address: {
      camera: "Chris Kyle, his family, his unit, his town. The camera holds American faces: the wife on the phone, the brother in country, the child at home. The Iraqi bodies in the frame are framed through the scope — at distance, at the moment of judgement, mostly without name.",
      scene: null,
      ground: "The 2.6 million Iraqis displaced internally and externally by 2014 — UNHCR data — never address the camera as \"we.\" The film's \"we\" is national; the ground record's \"we\" is unavailable to it.",
      sources: "UNHCR Iraq operational data 2014 · IOM Iraq Mission"
    },
    exclusion: {
      camera: "The word <em>protection</em> structures the film. Kyle protects his unit, his family, the children he will not let be killed by their parents. <em>Protection</em> is the moral framework of his vocation, the answer to why he returns.",
      scene: null,
      ground: "The same word carries another file. <em>Protection</em> in the doctrinal vocabulary of US action — Responsibility to Protect, force protection, civilian protection — recurs as the language under which interventions were authorised in the period; ground records of those interventions show protection as a condition the protected often did not consent to or survive.",
      sources: "UN R2P doctrine record · Costs of War 2003–2014"
    },
    prescription: {
      camera: "The remedy is <em>the soldier</em>. Not policy reform, not withdrawal, not the renegotiation of the war. Kyle returns to country four times; the closing dedicates the film to him. The soldier's vocation is positioned as the moral form available to the audience.",
      scene: null,
      ground: "The same prescription operates at policy level: the framing of military service as the locus of national moral life, the soldier as moral subject of foreign action, the absorption of policy questions into questions of individual valor and sacrifice.",
      sources: "Bacevich 2013 · Lutz 2009"
    },
    circulation: {
      productionSupport: "US Department of Defense cooperation; military equipment, base access, technical advisory for the combat sequences.",
      scriptInvolvement: "Based on Chris Kyle's memoir (2012); Pentagon entertainment liaison office reviewed the project per standard DoD cooperation protocol.",
      distributionChannels: "Warner Bros. global release; Village Roadshow co-production; widest January release in US history at time of opening.",
      authorityInfrastructure: "Veteran community endorsement; Academy nominations; box-office performance positioned the film as cultural settlement on the Iraq war.",
      onTheSameChannels: "Pentagon entertainment liaison office reviewed 410+ productions in the same decade; war-on-terror films overwhelmingly produced with DoD cooperation.",
      offTheSameChannels: "Iraqi cinema's record of the same war does not move through the same studio and distribution architecture; the Iraqi camera has no equivalent pre-clearance.",
      sources: "Robb 2004 · Alford &amp; Secker 2017 · DoD FOIA records on entertainment liaison"
    },

    gloss: "The political imagination in which the <em>camera record</em> — the soldier as moral subject, protection as vocation, the rifle scope as instrument of ethical judgement — coincides with the <em>ground record</em>: the policy framework in which military service absorbs the political question of war and individual valor stands in for collective accountability. Film and policy travel as two registers of one imagination; the camera grants the soldier the moral authority that the ground record withholds from the policy."
  }

];

/* ============ HELPER FUNCTIONS ============ */

function periodOf(year) {
  return PERIODS.find(p => year >= p.from && year <= p.to);
}

function latestOpenN(n) {
  return CASES
    .filter(c => c.status === "open")
    .sort((a, b) => b.recNum - a.recNum)
    .slice(0, n);
}

function counts() {
  const open = CASES.filter(c => c.status === "open").length;
  const pending = CASES.filter(c => c.status === "pending").length;
  return { open, pending, total: open + pending };
}

function allYears() {
  return Array.from(new Set(CASES.map(c => c.year))).sort();
}

function allImaginations() {
  return Array.from(new Set(
    CASES.filter(c => c.imagination).map(c => c.imagination)
  )).sort();
}

function filterCases({ year, imagination, status }) {
  return CASES.filter(c => {
    if (year && c.year !== year) return false;
    if (imagination && c.imagination !== imagination) return false;
    if (status === "open" && c.status !== "open") return false;
    return true;
  }).sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return b.grossNum - a.grossNum;
  });
}

function findCase(slug) {
  return CASES.find(c => c.slug === slug);
}
