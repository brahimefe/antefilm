/* antefilm — close-reading records (single source of truth for record pages)
 *
 * Edit this file to add or change a record, then run:  node tools/build.js
 * The build writes record pages, the atlas data and the downloads.
 *
 * Each attention: camera, scene (or null), ground, sources [{text, url}], selectionNote.
 * Highlight a keyword with <em>word</em>.
 */

const RECORDS = [

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
    gross: "USD 678M",
    grossNum: 678,
    studio: "Paramount / Warner Bros.",
    filed: "16.05.2026",
    revised: "21.10.2026",
    imagination: "exit imperialism",
    status: "open",
    threshold: { inCorpus: true, rank: 10, note: "" },
    beckert: { imaginaryType: "anomic-escape", payoffStructure: "positive-sum" },

    construction: {
      camera: "Earth is dying. Crops fail, dust takes the sky, an Iowa cornfield chokes. The cause is unnamed; the collapse arrives as <em>condition</em>, not consequence. The film inherits the dying world as premise and asks the audience to accept it without etiology.",
      scene: null,
      ground: "An unnamed cause requires only <em>exit</em>. A named cause would require remedy by responsibility — extraction, war, climate policy. Months after the film opens, a Saudi-led air campaign begins in Yemen (March 2015), refuelled and supported with intelligence by the United States. By January 2016 the FAO counts 14.4 million Yemenis food insecure, and names the cause: conflict and import restrictions.",
      sources: [
        { text: "FAO (2016). FAO warns of rapidly deteriorating food security in Yemen. Press release, 28 January 2016.", url: "https://www.fao.org/newsroom/detail/FAO-warns-of-rapidly-deteriorating-food-security-in-Yemen/en" },
        { text: "Military Times (2015). U.S. launches aerial refueling mission in Yemen. 8 April 2015.", url: "https://www.militarytimes.com/2015/04/08/u-s-launches-aerial-refueling-mission-in-yemen/" }
      ],
      selectionNote: "Considered: drought-linked displacement in Syria, 2006–2010. Not filed: no US agent, and outside the film's period band."
    },
    address: {
      camera: "The NASA compound assembles humanity's delegation: Cooper, Brand, Doyle, Romilly, Mann, Murph. The word <em>humanity</em> is spoken often. The bodies on screen are mostly white, mostly American, all addressed as universal.",
      scene: null,
      ground: "At the end of 2014, 59.5 million people were forcibly displaced worldwide, 13.9 million of them newly displaced that year; Syria, Afghanistan and Somalia were the largest sources of refugees. None of these bodies were available to stand in for <em>humanity</em>. The film's universal subject is a regional one; the global record names the rest.",
      sources: [
        { text: "UNHCR (2015). Global Trends 2014: World at War. Geneva: UNHCR. Release of 18 June 2015.", url: "https://www.unhcr.org/node/17994" }
      ],
      selectionNote: "Considered: US domestic poverty data, 2014. Not filed: it would keep the address national; the film's claim is to the species."
    },
    exclusion: {
      camera: "Tsiolkovsky cited as gospel: \"Earth is the cradle of humanity, but one cannot live in a cradle forever.\" <em>Departure</em> as evolutionary vocation; the ground left behind never returns to the frame.",
      scene: "01:12 — Brand quoting Tsiolkovsky in the launch sequence",
      ground: "The word <em>departure</em> carries another file: Saigon 1975, Mogadishu 1993, Kabul 2021 — departures producing ruin where they leave. At Kabul airport's Abbey Gate on 26 August 2021, during the evacuation, a suicide bombing killed at least 170 Afghans and 13 US service members. The framing requires these to remain structurally outside the same word.",
      sources: [
        { text: "US Central Command investigation into the Abbey Gate attack, released 4 February 2022, as reported by Euronews (5 February 2022).", url: "https://euronews.com/2022/02/05/kabul-airport-blast-killing-hundreds-not-preventable-military-investigation-finds" }
      ],
      selectionNote: "Exclusion may range historically. Considered: the 1979 Tehran embassy evacuation. Not filed: Kabul 2021 is better documented and closes the film's period of US withdrawals."
    },
    prescription: {
      camera: "The remedy is <em>exit</em>. Not repair, not redistribution, not return. The film closes with Cooper preparing for the next launch — departure is permanent vocation, not last resort.",
      scene: null,
      ground: "The same prescription at policy level: withdrawal-as-strategy, evacuation-as-doctrine, departure-as-legitimating-modality of US imperial practice 2001–2021. Film and policy share one grammar of exit.",
      sources: [
        { text: "Harvey, D. (2003). The New Imperialism. Oxford: Oxford University Press.", url: "" }
      ],
      selectionNote: "Interpretive pairing; a documentary source for withdrawal doctrine (e.g. a strategy document of the period) would strengthen it."
    },
    circulation: {
      productionSupport: "NASA cleared archival footage and rights; it did not advise on the science.",
      scriptInvolvement: "Kip Thorne as scientific adviser and executive producer on physics, relativity and the depiction of black holes, from script through post-production.",
      distributionChannels: "Paramount + Warner Bros. co-distribution; worldwide release.",
      authorityInfrastructure: "Thorne's Caltech standing transferred to the film; its black-hole rendering was published as a peer-reviewed physics paper (James et al. 2015) and accompanied by Thorne's companion book.",
      onTheSameChannels: "US security agencies worked on over 800 films and 1,000 television titles, according to entertainment-liaison records obtained under freedom-of-information requests.",
      offTheSameChannels: "No counter-distribution exists for the operational record of US departures over the same period through the same studio infrastructure.",
      sources: [
        { text: "CinemaBlend (2014). Wait, NASA had almost nothing to do with Interstellar? 4 November 2014 (statement by NASA's Bert Ulrich).", url: "https://www.cinemablend.com/new/Wait-NASA-Had-Almost-Nothing-Do-With-Interstellar-68031.html" },
        { text: "Thorne, K. (2014). The Science of Interstellar. New York: W. W. Norton.", url: "" },
        { text: "James, O., von Tunzelmann, E., Franklin, P. & Thorne, K. S. (2015). Gravitational lensing by spinning black holes in astrophysics, and in the movie Interstellar. Classical and Quantum Gravity, 32(6), 065001.", url: "https://arxiv.org/abs/1502.03808" },
        { text: "University of Bath (2017). US government influence on films and television. 28 June 2017 (on Alford & Secker's documents).", url: "https://bath.ac.uk/announcements/us-government-influence-on-films-and-television" },
        { text: "Alford, M. & Secker, T. (2017). National Security Cinema: The Shocking New Evidence of Government Control in Hollywood. Drum Roll Books.", url: "" }
      ]
    },

    gloss: "The political imagination in which the <em>camera record</em> — departure as evolutionary vocation, technological calling, humanitarian rescue — coincides with the <em>ground record</em>: departure as imperial operation, withdrawal as strategy, evacuation as doctrine. Film and policy travel as two registers of one imagination, not as text and context but as two operations of one configuration."
  },

  /* ===========================================================
     REC.004 — TOP GUN: MAVERICK (2022, Kosinski)
     =========================================================== */
  {
    slug: "top-gun-maverick",
    recNum: 4,
    year: 2022,
    title: "Top Gun: Maverick",
    director: "Kosinski",
    runtime: "130 min",
    gross: "USD 1.50B",
    grossNum: 1496,
    studio: "Paramount",
    filed: "21.10.2026",
    revised: "21.10.2026",
    imagination: "preemptive nostalgia",
    status: "open",
    threshold: { inCorpus: true, rank: 2, note: "" },
    beckert: { imaginaryType: "retrotopian", payoffStructure: "zero-sum" },

    construction: {
      camera: "An unnamed state is about to bring a uranium enrichment plant online, buried in a mountain bowl and ringed by surface-to-air missiles. The enemy has no name, no flag, no face. The problem is built as a <em>deadline</em>; the strike that answers it is given, never argued.",
      scene: null,
      ground: "On 25 March 2025 the US Director of National Intelligence told the Senate that the intelligence community \"continues to assess that Iran is not building a nuclear weapon.\" Three months later the President said Iran was \"very close\" and that the intelligence community was wrong. The deadline was built at the level of policy, against the government's own assessment.",
      sources: [
        { text: "FactCheck.org (2025). Trump, Gabbard comments on Iran nuclear capability. 18 June 2025, updated 23 June 2025.", url: "https://www.factcheck.org/2025/06/trump-gabbard-comments-on-iran-nuclear-capability/" }
      ],
      selectionNote: "Considered: the US withdrawal from the nuclear agreement with Iran (May 2018). Not filed: it falls in period III, not the film's period band."
    },
    address: {
      camera: "The Dagger squad — Rooster, Hangman, Phoenix, Bob, Payback, Fanboy, Coyote — is young, mixed in gender and background, and trained by a man of the previous generation. The \"we\" is the cockpit, the squadron, the carrier. The enemy pilots never lift their visors.",
      scene: null,
      ground: "The audience the film hails was hailed directly. At screenings in May 2022, viewers reported Navy recruiting booths near the concession stands and the Air Force ran a recruiting advertisement before the film, while the Navy sought 40,000 enlisted sailors and 3,800 officers for fiscal year 2022.",
      sources: [
        { text: "Slayton, N. (2022). The Navy is trying to recruit at Top Gun: Maverick. Task & Purpose, 29 May 2022.", url: "https://taskandpurpose.com/news/navy-is-trying-to-recruit-at-top-gun-maverick/" }
      ],
      selectionNote: "Considered: US military demographic data for 2022. Not filed: the recruitment drive records whom the film's \"we\" was meant to enlist, which is the address question."
    },
    exclusion: {
      camera: "Admiral Cain tells Maverick that drones will replace him: \"The future is coming, and you're not in it.\" The film answers through the pilot. The keyword is <em>judgement</em> — a human in the cockpit who sees, decides and is accountable.",
      scene: null,
      ground: "The same word carries another file. On 29 August 2021 a US drone strike in Kabul, aimed at a suspected bomber, killed 10 civilians, seven of them children. The head of US Central Command called it a mistake. Remote judgement, unaccountable at the point of decision, is the war the film leaves out.",
      sources: [
        { text: "Military.com (2021). Kabul drone strike was a 'tragic mistake' that killed civilians, children, Pentagon says. 17 September 2021.", url: "https://365.military.com/daily-news/2021/09/17/kabul-drone-strike-was-tragic-mistake-killed-civilians-children-pentagon-says.html" }
      ],
      selectionNote: "Exclusion may range historically. Considered: Pakistan drone strikes, 2004–2018. Not filed: Kabul 2021 falls in the film's own period and the US admitted the error."
    },
    prescription: {
      camera: "The remedy is the crewed aircraft and the veteran. The strike succeeds by hand-flown skill, and Maverick escapes in a museum-era F-14 taken from the enemy's own hangar. The future is won by returning to the past's machines.",
      scene: null,
      ground: "On 21 June 2025, seven US B-2 bombers dropped fourteen GBU-57 penetrators on the Fordow and Natanz enrichment sites, the first operational use of the weapon, while a submarine fired Tomahawks at Isfahan. The film's strike on a mountain enrichment plant was carried out, by crewed aircraft, three years after release.",
      sources: [
        { text: "Rodgers, J. (2025). What Operation Midnight Hammer means for the future of Iran's nuclear ambitions. CSIS, 23 June 2025.", url: "https://www.csis.org/analysis/what-operation-midnight-hammer-means-future-irans-nuclear-ambitions" }
      ],
      selectionNote: "Considered: Israel's strikes on Iran from 13 June 2025. Not filed: the agent condition requires the state that cooperated with the film."
    },
    circulation: {
      productionSupport: "US Navy access to facilities, personnel, a Nimitz-class carrier and aircraft, with cameras mounted on jets and helicopters; Paramount reimbursed costs not aligned with current operations.",
      scriptInvolvement: "Under the production assistance agreement, senior military staff reviewed the script's themes and added talking points for the aviation community, and the DoD received a rough cut and a screening before premiere. The Navy said the script was reviewed to be consistent with its ideals.",
      distributionChannels: "Paramount worldwide release; Skydance co-production; USD 1.50B worldwide.",
      authorityInfrastructure: "Navy endorsement and on-set naval staff; recruitment activity at screenings.",
      onTheSameChannels: "US security agencies worked on over 800 films and 1,000 television titles, according to entertainment-liaison records obtained under freedom-of-information requests.",
      offTheSameChannels: "The civilian record of remote strikes, including Kabul 2021, reached the public through investigative journalism and military inquiries, not through the studio and liaison channels that carried the film.",
      sources: [
        { text: "Montgomery, N. (2019). 'Top Gun: Maverick' is Navy-approved, down to the plot details. Stars and Stripes, 1 August 2019.", url: "https://www.stripes.com/theaters/us/2019-08-01/%E2%80%98top-gun:-maverick%E2%80%99-is-navy-approved,-down-to-the-plot-details-1483393.html" },
        { text: "University of Bath (2017). US government influence on films and television. 28 June 2017.", url: "https://bath.ac.uk/announcements/us-government-influence-on-films-and-television" }
      ]
    },

    gloss: "The political imagination in which the <em>camera record</em> — an unnamed nuclear deadline, a strike that needs no argument, the human pilot over the drone, the old machine over the new — coincides with the <em>ground record</em>: a deadline built against the state's own intelligence, a crewed strike on mountain enrichment sites, and a drone war whose errors stay off the screen. The future is secured by preempting it with the past."
  },

  /* ===========================================================
     REC.005 — IRON MAN (2008, Favreau)
     =========================================================== */
  {
    slug: "iron-man",
    recNum: 5,
    year: 2008,
    title: "Iron Man",
    director: "Favreau",
    runtime: "126 min",
    gross: "USD 586M",
    grossNum: 586,
    studio: "Paramount",
    filed: "21.10.2026",
    revised: "21.10.2026",
    imagination: "privatised salvation",
    status: "open",
    threshold: { inCorpus: true, rank: 8, note: "" },
    beckert: { imaginaryType: "anomic-escape", payoffStructure: "zero-sum" },

    construction: {
      camera: "Tony Stark, an arms manufacturer, is ambushed in Afghanistan by insurgents carrying his own company's weapons. The problem is built as <em>leakage</em>: weapons in the wrong hands. Arms production itself is left as given; the fault lies in where the weapons end up.",
      scene: null,
      ground: "A year before the film, the US Government Accountability Office found a discrepancy of at least 190,000 weapons between what the Pentagon reported issuing to Iraqi security forces and its own property records. Leakage was on record as a feature of US arming policy, not an accident of rogue dealers.",
      sources: [
        { text: "US Government Accountability Office (2007). Stabilizing Iraq: DOD Cannot Ensure That U.S.-Funded Equipment Has Reached Iraqi Security Forces. GAO-07-711, 31 July 2007.", url: "https://www.gao.gov/products/GAO-07-711" }
      ],
      selectionNote: "Considered: US weapons transfers to Afghan forces. Not filed: no audit of equal standing for the period was found."
    },
    address: {
      camera: "Stark, Rhodes and Pepper Potts are the film's \"we\". Afghans appear as captors, as villagers of Gulmira to be rescued, and as Yinsen, the doctor who dies so that Stark can escape. The rescue of Afghans is performed by an American in a suit he built.",
      scene: null,
      ground: "In 2008, the year of release, the UN mission in Afghanistan counted 2,118 civilian deaths, the highest since 2001. It attributed 828 of them, 39 per cent, to pro-government and international forces. The Afghans the record names were killed on both sides of the line the film draws.",
      sources: [
        { text: "UN News (2009). Number of Afghan civilian deaths in 2008 highest since Taliban ouster, says UN (on UNAMA's annual report).", url: "https://news.un.org/en/node/291342" }
      ],
      selectionNote: "Considered: Afghan refugee figures for 2008. Not filed: civilian deaths by attributed party bear directly on the film's division of Afghans into victims and captors."
    },
    exclusion: {
      camera: "Stark flies to Gulmira alone and ends the insurgents' hold on the village. He ends the film by declaring \"I am Iron Man.\" The keyword is the <em>private</em> hero: force abroad, used by an individual, answerable to no one.",
      scene: null,
      ground: "The same word carries another file. On 16 September 2007, Blackwater guards escorting a US embassy convoy in Baghdad's Nisour Square killed 17 Iraqi civilians. Four were convicted in 2014 and pardoned by the President in December 2020. Private force abroad, on record, was neither heroic nor answerable for long.",
      sources: [
        { text: "Wikipedia (2026). Nisour Square massacre, accessed 21 October 2026 (trial and pardon dates).", url: "https://en.wikipedia.org/wiki/Nisour_Square_massacre" }
      ],
      selectionNote: "Exclusion may range historically. A court record or Department of Justice release should replace the encyclopedia source before the record is finalised."
    },
    prescription: {
      camera: "The remedy is the inventor. Stark shuts down weapons production and builds a suit that only he controls. A privately held technology, owned by one man, replaces the army and the state.",
      scene: null,
      ground: "The same prescription was policy. In 2008 the Congressional Budget Office estimated at least 190,000 contractor personnel on US-funded contracts in the Iraq theatre, about one per US service member, a ratio at least 2.5 times higher than in any other major US conflict.",
      sources: [
        { text: "Congressional Budget Office (2008). Contractors' Support of U.S. Operations in Iraq. Summarised in Contractors in Iraq, 12 August 2008.", url: "https://www.cbo.gov/publication/24822" }
      ],
      selectionNote: "Considered: Pentagon procurement totals for 2008. Not filed: contractor numbers bear more directly on the substitution of private for public force."
    },
    circulation: {
      productionSupport: "US Air Force: three days of filming at Edwards Air Force Base, with an F-22 Raptor and a Global Hawk; about 150 airmen and a dozen Marines as paid extras.",
      scriptInvolvement: "Capt. Christian Hodge served as the Defense Department project officer overseeing the Air Force's involvement.",
      distributionChannels: "Paramount worldwide release; Marvel Studios' first self-produced film.",
      authorityInfrastructure: "Official Air Force news stories promoted the production and its airmen.",
      onTheSameChannels: "US security agencies worked on over 800 films and 1,000 television titles, according to entertainment-liaison records obtained under freedom-of-information requests.",
      offTheSameChannels: "No counter-distribution exists for the Afghan civilian casualty record through the same studio and liaison channels.",
      sources: [
        { text: "Miles, D. (2007). Edwards team stars in 'Iron Man' superhero movie. American Forces Press Service, 2 May 2007.", url: "https://www.af.mil/News/Article-Display/Article/127002/edwards-team-stars-in-iron-man-superhero-movie/" },
        { text: "University of Bath (2017). US government influence on films and television. 28 June 2017.", url: "https://bath.ac.uk/announcements/us-government-influence-on-films-and-television" }
      ]
    },

    gloss: "The political imagination in which the <em>camera record</em> — leakage as the problem, the inventor as the remedy, a private suit as the instrument of rescue abroad — coincides with the <em>ground record</em>: weapons unaccounted for by the state that supplied them, contractors in numbers equal to soldiers, and private force abroad that escaped account. The future is saved by one owner of one technology."
  },

  /* ===========================================================
     REC.006 — WOLF WARRIOR 2 (2017, Wu)
     =========================================================== */
  {
    slug: "wolf-warrior-2",
    recNum: 6,
    year: 2017,
    title: "Wolf Warrior 2",
    director: "Wu",
    runtime: "123 min",
    gross: "USD 870M",
    grossNum: 870,
    studio: "United Entertainment",
    filed: "21.10.2026",
    revised: "21.10.2026",
    imagination: "protective reach",
    status: "open",
    threshold: { inCorpus: true, rank: 7, note: "" },
    beckert: { imaginaryType: "restoration", payoffStructure: "zero-sum" },

    construction: {
      camera: "Civil war breaks out in an unnamed African country. Rebels and Western mercenaries threaten Chinese factory workers and African civilians alike. The chaos arrives as a local condition; the Chinese factory is simply there, a bystander to be protected.",
      scene: null,
      ground: "The presence the film leaves as given is on record as a site of conflict. In 2011 Human Rights Watch documented poor safety, excessive hours, below-market pay and obstruction of unions at Chinese state-owned copper mines in Zambia.",
      sources: [
        { text: "Human Rights Watch (2011). \"You'll Be Fired if You Refuse\": Labor Abuses in Zambia's Chinese State-owned Copper Mines. November 2011.", url: "https://www.hrw.org/report/2011/11/04/youll-be-fired-if-you-refuse/labor-abuses-zambias-chinese-state-owned-copper" }
      ],
      selectionNote: "Same-period condition: the report predates period III; filed provisionally, as no comparable institutional report of 2017–2020 has yet been found. Replace when one is."
    },
    address: {
      camera: "Leng Feng, a discharged special-forces soldier, stands for the nation abroad. The \"we\" is the Chinese citizen: factory workers, a medical team, a shop owner. Africans appear as children to be saved and villagers who follow.",
      scene: null,
      ground: "The citizen the film addresses had already been rescued at scale. In February 2011 China brought 35,860 of its citizens out of Libya by charter flights, ships and military transport, and a navy frigate, the Xuzhou, escorted evacuation ships — the navy's first evacuation abroad.",
      sources: [
        { text: "GlobalSecurity.org (n.d.). China: Non-combatant evacuation operations (on the Libya evacuation, 2011).", url: "https://www.globalsecurity.org/military/world/china/neo.htm" }
      ],
      selectionNote: "Considered: the 2015 Yemen evacuation. Not filed: the available figures do not reconcile."
    },
    exclusion: {
      camera: "Leng Feng fights beside African workers and calls them brothers. The keyword is <em>protection</em>: the Chinese presence shields the people around it.",
      scene: null,
      ground: "The same word carries another file. On 15 October 2010, at the Collum coal mine in Sinazongwe, Zambia, two Chinese managers shot 11 workers protesting conditions. No one was prosecuted; the charges were dropped and compensation negotiated.",
      sources: [
        { text: "Human Rights Watch (2011). \"You'll Be Fired if You Refuse\". November 2011 (account of the Collum shooting).", url: "https://www.hrw.org/report/2011/11/04/youll-be-fired-if-you-refuse/labor-abuses-zambias-chinese-state-owned-copper" }
      ],
      selectionNote: "Exclusion may range historically. Collum is privately owned, not state-owned; the agent condition is met at the level of Chinese enterprise abroad, not the state."
    },
    prescription: {
      camera: "The remedy is the state's reach. A navy ship fires once authorisation arrives, and the film closes on a Chinese passport and a message to citizens: when you meet danger abroad, do not give up.",
      scene: null,
      ground: "On 1 August 2017, days after the film's release, China formally opened its first overseas military base, in Djibouti, officially a logistics facility for ships on peacekeeping and humanitarian missions off Yemen and Somalia.",
      sources: [
        { text: "Al Jazeera (2017). China opens first overseas base in Djibouti. 1 August 2017.", url: "https://www.aljazeera.com/news/2017/8/1/china-opens-first-overseas-base-in-djibouti" }
      ],
      selectionNote: "Considered: the 2015 defence white paper on protecting overseas interests. Not filed yet: not opened for this record."
    },
    circulation: {
      productionSupport: "Privately funded; the film uses close replicas of PLA weapons. No formal PLA production assistance was confirmed in the sources checked.",
      scriptInvolvement: "No documented state script review found in the sources checked.",
      distributionChannels: "Released in late July 2017, the same day as the state-sponsored The Founding of an Army; China's highest-grossing film at the time; about USD 1M in the United States.",
      authorityInfrastructure: "Praise in state-aligned media such as the Global Times, which also argued the film was commercial rather than state-initiated.",
      onTheSameChannels: "Not yet recorded.",
      offTheSameChannels: "Not yet recorded.",
      sources: [
        { text: "China Digital Times (2017). Military nationalism hits big screen, tops box office. August 2017.", url: "https://chinadigitaltimes.net/2017/08/military-nationalism-hits-big-screen-tops-box-office/" }
      ]
    },

    gloss: "The political imagination in which the <em>camera record</em> — a Chinese presence that only protects, a citizen the state will reach anywhere, a passport as the last word — coincides with the <em>ground record</em>: mass evacuations of citizens, an overseas base opened in the week of release, and a labour record the protection does not cover. Rescue as national reach, filed from outside Hollywood."
  },
  /* ===========================================================
     REC.007 — THE MARTIAN (2015, Scott)
     =========================================================== */
  {
    slug: "the-martian",
    recNum: 7,
    year: 2015,
    title: "The Martian",
    director: "Scott",
    runtime: "144 min",
    gross: "USD 630M",
    grossNum: 630,
    studio: "20th Century Fox",
    filed: "21.10.2026",
    revised: "21.10.2026",
    imagination: "competent internationalism",
    status: "open",
    threshold: { inCorpus: true, rank: 10, note: "" },
    beckert: { imaginaryType: "integrative", payoffStructure: "positive-sum" },

    construction: {
      camera: "A storm strands the botanist Mark Watney alone on Mars. The problem is built as <em>technical</em>: food, water, distance, time. The Mars programme itself, its rockets, its budget and its schedule, is given.",
      scene: null,
      ground: "Six days after the film opened, NASA published its Journey to Mars plan, aiming to land humans on Mars in the 2030s. The plan named no missions, no timeline for landings and no cost. The programme the film takes as given was on record as a concept without a budget.",
      sources: [
        { text: "NASA (2015). NASA's Journey to Mars: Pioneering Next Steps in Space Exploration. 8 October 2015.", url: "" },
        { text: "Davis, J. (2015). NASA's Journey to Mars report: a plan to form a strategy for a concept. The Planetary Society, 12 October 2015.", url: "https://www.planetary.org/articles/20151009-nasas-j2m-strategy" }
      ],
      selectionNote: "This is a divergence record: the ground shows the imagination absent rather than enacted. Considered: NASA's 2015 budget request. Not filed: the plan speaks to the same construction directly."
    },
    address: {
      camera: "Humanity is the crowd in Times Square, Trafalgar Square and Beijing, watching one American's rescue on giant screens. The crew is international in spirit and American in command.",
      scene: null,
      ground: "In the year of release, no American vehicle could carry astronauts to orbit. Since the shuttle's retirement in 2011 NASA had bought seats on Russian Soyuz rockets; in August 2015 it agreed to pay USD 490 million for six more, nearly USD 82 million a seat, after Congress underfunded the American replacement.",
      sources: [
        { text: "CBS News (2015). NASA seats on Russian rockets will cost U.S. $490 million. 6 August 2015.", url: "https://www.cbsnews.com/news/nasa-seats-on-russian-rockets-will-cost-u-s-490-million" }
      ],
      selectionNote: "Considered: NASA astronaut corps demographics. Not filed: dependence on Russia bears more directly on who could stand in for humanity in space in 2015."
    },
    exclusion: {
      camera: "The rescue turns on <em>cooperation</em>. China's space agency offers its secret booster, and the American and Chinese programmes work as one. The film presents this as the obvious thing scientists would do.",
      scene: null,
      ground: "The same word carries another file. Since April 2011 the Wolf Amendment, renewed in every appropriations act, has barred NASA from using its funds for any bilateral cooperation with China or Chinese-owned companies, or to host official Chinese visitors at its facilities.",
      sources: [
        { text: "Department of Defense and Full-Year Continuing Appropriations Act, 2011, Public Law 112–10, section 1340 (the Wolf Amendment).", url: "" },
        { text: "Wikipedia (2026). Wolf Amendment, accessed 21 October 2026.", url: "https://en.wikipedia.org/wiki/Wolf_Amendment" }
      ],
      selectionNote: "Exclusion may range historically; the amendment was in force throughout the film's production and release. The statute itself should replace the encyclopedia source."
    },
    prescription: {
      camera: "The remedy is <em>competence</em>: public institutions, science and shared effort. Every crew member comes home, and the film closes on Watney teaching new astronauts as the next mission launches.",
      scene: null,
      ground: "Policy prescribed a different remedy. In September 2014 NASA awarded up to USD 6.8 billion to two private companies, Boeing and SpaceX, to fly its astronauts. The public competence the film celebrates was being handed to the market.",
      sources: [
        { text: "The Planetary Society (2014). NASA kicks off a private space race between Boeing and SpaceX. 17 September 2014.", url: "https://www.planetary.org/articles/20140917-nasa-kicks-off-private-race" }
      ],
      selectionNote: "Divergence record. Considered: the 2015 NASA Authorization debates. Not filed: the contracts are the enacted remedy."
    },
    circulation: {
      productionSupport: "NASA worked closely with the production, according to the director; about 40 NASA staff attended a Washington screening.",
      scriptInvolvement: "Adapted by Drew Goddard from Andy Weir's novel; NASA reviewed technical accuracy and called the film mostly accurate.",
      distributionChannels: "20th Century Fox worldwide release, including mainland China.",
      authorityInfrastructure: "NASA announced evidence of liquid water on Mars on 28 September 2015, days before release; NASA denied timing it to the film.",
      onTheSameChannels: "US security and science agencies worked on over 800 films and 1,000 television titles, according to records obtained under freedom-of-information requests.",
      offTheSameChannels: "The legal bar on US–China space cooperation has no comparable channel to the public.",
      sources: [
        { text: "The New Daily (2015). NASA denies conspiring with Hollywood. 30 September 2015.", url: "https://www.thenewdaily.com.au/life/entertainment/movies/2015/09/30/conspiracies-hollywood-the-red-planet" },
        { text: "University of Bath (2017). US government influence on films and television. 28 June 2017.", url: "https://bath.ac.uk/announcements/us-government-influence-on-films-and-television" }
      ]
    },

    gloss: "The political imagination in which the <em>camera record</em> — a public space programme taken for granted, cooperation with China as common sense, competence as the remedy — meets a <em>ground record</em> that runs the other way: a Mars plan without a budget, a country without its own way to orbit, cooperation with China barred by law, and astronaut transport handed to private firms. One of the corpus's rare integrative futures, and on record it was not being built."
  },

  /* ===========================================================
     REC.008 — CAPTAIN MARVEL (2019, Boden / Fleck)
     =========================================================== */
  {
    slug: "captain-marvel",
    recNum: 8,
    year: 2019,
    title: "Captain Marvel",
    director: "Boden / Fleck",
    runtime: "124 min",
    gross: "USD 1.13B",
    grossNum: 1131,
    studio: "Disney",
    filed: "21.10.2026",
    revised: "21.10.2026",
    imagination: "armed refuge",
    status: "open",
    threshold: { inCorpus: true, rank: 5, note: "" },
    beckert: { imaginaryType: "integrative", payoffStructure: "positive-sum" },

    construction: {
      camera: "The Skrulls are built as shape-shifting <em>infiltrators</em>, enemies who can look like anyone. Halfway through, the film reveals them as refugees fleeing an empire's war of extermination.",
      scene: null,
      ground: "On 27 January 2017 the President signed an order titled \"Protecting the Nation from Foreign Terrorist Entry into the United States\". It suspended refugee admissions for 120 days, stopped Syrian refugees indefinitely and cut the year's ceiling from 110,000 to 50,000. Refugees were constructed as possible infiltrators.",
      sources: [
        { text: "Executive Order 13769, 27 January 2017. Summary in Wikipedia (2026), accessed 21 October 2026.", url: "https://en.wikipedia.org/wiki/Executive_Order_13769" }
      ],
      selectionNote: "Considered: the March 2017 revised order (13780). Not filed: the January order states the construction most directly. The Federal Register text should replace the encyclopedia source."
    },
    address: {
      camera: "The film ends with its heroine adopting the refugees as her cause. The \"we\" widens from a US Air Force pilot to a displaced people with children.",
      scene: null,
      ground: "The year the film was released, the United States admitted at most 30,000 refugees, and in September 2019 set the next year's ceiling at 18,000, the lowest since Congress created the resettlement programme in 1980.",
      sources: [
        { text: "Pew Research Center (2019). Key facts about refugees to the U.S. 7 October 2019.", url: "https://www.pewresearch.org/short-reads/2019/10/07/key-facts-about-refugees-to-the-u-s/" }
      ],
      selectionNote: "Divergence record: the film widens the \"we\", the record narrows it. Considered: UNHCR's 2019 global resettlement figures. Not filed: the agent condition favours US policy."
    },
    exclusion: {
      camera: "The emotional resolution is a <em>family</em> reunited: the Skrull commander finds his wife and daughter, hidden and alive.",
      scene: null,
      ground: "The same word carries another file. In January 2019 the Inspector General of the Department of Health and Human Services reported that the government may have separated thousands more migrant children from their parents than the 2,737 already identified, and that poor records left the true number unknown.",
      sources: [
        { text: "Al Jazeera (2019). US may have separated 'thousands more' migrant children: audit. 17 January 2019 (on HHS OIG report OEI-BL-18-00511).", url: "https://www.aljazeera.com/news/2019/1/17/us-may-have-separated-thousands-more-migrant-children-audit" }
      ],
      selectionNote: "Exclusion may range historically; this record falls within the film's own period. The OIG report itself should be linked when finalised."
    },
    prescription: {
      camera: "The remedy is an <em>empowered guardian</em> in space. Carol Danvers leaves Earth to protect the refugees across the galaxy, and Nick Fury drafts a plan for a new defence initiative.",
      scene: null,
      ground: "On 20 December 2019 the National Defense Authorization Act created the US Space Force, a sixth armed service within the Department of the Air Force — the service that had supported the film.",
      sources: [
        { text: "Via Satellite (2019). Trump formally establishes Space Force. 23 December 2019.", url: "https://www.satellitetoday.com/government-military/2019/12/23/trump-formally-establishes-space-force/" }
      ],
      selectionNote: "Considered: the 2018 National Defense Strategy. Not filed: the Space Force is the enacted remedy closest to the film's guardian in orbit."
    },
    circulation: {
      productionSupport: "US Air Force access to airmen, installations and aircraft; the star flew in an F-16 and toured an F-15 at Nellis Air Force Base, hosted by Brig. Gen. Jeannie Leavitt, the service's first female fighter pilot.",
      scriptInvolvement: "The Air Force has advised Marvel productions on the depiction of its pilots since Iron Man (2008).",
      distributionChannels: "Disney worldwide release; USD 1.13B.",
      authorityInfrastructure: "The Air Force said the film was not part of a recruiting strategy; the Air Force Academy later said it saw no unusual rise in women applicants after the film.",
      onTheSameChannels: "US security agencies worked on over 800 films and 1,000 television titles, according to records obtained under freedom-of-information requests.",
      offTheSameChannels: "The record of refugee admissions and family separation reached the public through inspectors general and courts, not through the studio channels that carried the film.",
      sources: [
        { text: "Keller, J. (2018). 'Captain Marvel' is the recruiting tool of the Air Force's dreams. Task & Purpose, 18 September 2018.", url: "https://taskandpurpose.com/news/captain-marvel-air-force-recruiting/" },
        { text: "Military.com (2020). Captain Marvel effect? Air Force Academy sees most female applicants in 5 years. January 2020.", url: "https://military.com/daily-news/2020/01/05/captain-marvel-effect-air-force-academy-sees-most-female-applicants-5-years.html" }
      ]
    },

    gloss: "The political imagination in which the <em>camera record</em> — infiltrators revealed as refugees, a widened \"we\", a family reunited, a guardian sent into space — meets a <em>ground record</em> that kept only the last of these: refugees framed as terrorist entry, the lowest admissions ceiling on record, families separated at the border, and a new armed service for space. The film's integrative future travelled; the state enacted its armed half."
  },

  /* ===========================================================
     REC.009 — TRANSFORMERS (2007, Bay)
     =========================================================== */
  {
    slug: "transformers",
    recNum: 9,
    year: 2007,
    title: "Transformers",
    director: "Bay",
    runtime: "144 min",
    gross: "USD 710M",
    grossNum: 710,
    studio: "Paramount / DreamWorks",
    filed: "21.10.2026",
    revised: "21.10.2026",
    imagination: "machine alliance",
    status: "open",
    threshold: { inCorpus: true, rank: 5, note: "" },
    beckert: { imaginaryType: "restoration", payoffStructure: "zero-sum" },

    construction: {
      camera: "The film opens on a US special-operations base in Qatar destroyed by an alien machine. The attackers are not human, so the war needs no cause. The American presence in the Gulf is <em>given</em>: the base is simply there.",
      scene: null,
      ground: "The presence was on record. Since 2003 Qatar's Al Udeid Air Base has hosted the forward headquarters of US Central Command, with flights to Afghanistan and Iraq; by 2017 about 10,000 US troops were stationed there.",
      sources: [
        { text: "Al Jazeera (2017). US military: no plans to change our posture in Qatar. 6 June 2017.", url: "https://www.aljazeera.com/news/2017/6/6/us-military-no-plans-to-change-our-posture-in-qatar" }
      ],
      selectionNote: "The troop figure dates from 2017; a figure for 2007 would satisfy the same-period condition better."
    },
    address: {
      camera: "Two \"we\"s carry the film: a teenage boy in an American suburb, and a squad of US soldiers who survive the desert attack and fight the machines at home.",
      scene: null,
      ground: "The soldiers stood for a force at its largest. As of 1 November 2007, during the surge, 164,424 US troops were in Iraq, nearly 20,000 of them from the National Guard and Reserves.",
      sources: [
        { text: "O'Bryant, J. & Waterhouse, M. (2007). U.S. Forces in Iraq. Congressional Research Service, RS22449, updated 30 November 2007.", url: "https://www.everycrsreport.com/files/20071130_RS22449_5c12c39618162461030fe6d4d59198ee2c52d834.html" }
      ],
      selectionNote: "Considered: Iraqi civilian deaths in 2007. Not filed here: the attention asks who stands in for \"us\", and the film's \"us\" is the deployed soldier."
    },
    exclusion: {
      camera: "A secret agency, <em>Sector Seven</em>, has hidden alien technology for decades, answers to no one, and turns out to be on the right side. Secrecy is played for laughs and then for victory.",
      scene: null,
      ground: "The same word carries another file. On 17 December 2005 the President acknowledged that he had authorised the National Security Agency to intercept communications after 2001 without court approval, and said he had reauthorised the programme more than 30 times.",
      sources: [
        { text: "CNN (2005). Bush says he signed NSA wiretap order. 17 December 2005.", url: "https://edition.cnn.com/2005/POLITICS/12/17/bush.nsa/index.html" }
      ],
      selectionNote: "Exclusion may range historically. Considered: CIA secret detention, acknowledged in September 2006. Not filed: domestic surveillance is closer to Sector Seven's watching of Americans."
    },
    prescription: {
      camera: "The remedy is an alliance of soldiers and <em>machines</em>. Good robots fight beside US troops, F-22s and an Osprey; at the end the Autobots' leader invites more machines to come to Earth.",
      scene: null,
      ground: "The same prescription was the Army's plan. In March 2007 the Government Accountability Office reviewed the Future Combat System, a network of manned and unmanned ground and air vehicles costed by the Army at about USD 160 billion and independently at up to USD 234 billion, and found most of its technologies immature.",
      sources: [
        { text: "US Government Accountability Office (2007). Defense Acquisitions: Key Decisions to Be Made on Future Combat System. GAO-07-376, 15 March 2007.", url: "https://www.govinfo.gov/content/pkg/GAOREPORTS-GAO-07-376/html/GAOREPORTS-GAO-07-376.htm" }
      ],
      selectionNote: "Considered: F-22 procurement. Not filed: the Future Combat System matches the film's teaming of soldiers and machines."
    },
    circulation: {
      productionSupport: "About 300 airmen and soldiers on screen; filming at Edwards and Holloman Air Force Bases and White Sands Missile Range; F-117, CV-22 Osprey and F-22 Raptor; producers reimbursed flight costs.",
      scriptInvolvement: "Reviewed under the Pentagon's entertainment liaison office (Phil Strub); Capt. Christian Hodge served as the Defense Department project officer.",
      distributionChannels: "Paramount and DreamWorks worldwide release; USD 710M.",
      authorityInfrastructure: "Official Air Force news stories promoted the production and its airmen.",
      onTheSameChannels: "US security agencies worked on over 800 films and 1,000 television titles, according to records obtained under freedom-of-information requests.",
      offTheSameChannels: "The surveillance programme reached the public through a newspaper leak, which the President called illegal, not through the channels that carried the film.",
      sources: [
        { text: "Miles, D. (n.d.). Movie makers team with military to create realism. American Forces Press Service.", url: "https://www.af.mil/News/Features/Display/Article/143457/movie-makers-team-with-military-to-create-realism/" },
        { text: "University of Bath (2017). US government influence on films and television. 28 June 2017.", url: "https://bath.ac.uk/announcements/us-government-influence-on-films-and-television" }
      ]
    },

    gloss: "The political imagination in which the <em>camera record</em> — a Gulf base that needs no explanation, the deployed soldier as \"us\", a secret agency that is secretly good, machines as allies — coincides with the <em>ground record</em>: CENTCOM's forward base in Qatar, the surge's peak, warrantless surveillance, and a USD 160 billion bet on robotic war. The present order is restored, with better machines."
  },

  /* ===========================================================
     REC.010 — THE BATTLE AT LAKE CHANGJIN (2021, Chen / Tsui / Lam)
     =========================================================== */
  {
    slug: "the-battle-at-lake-changjin",
    recNum: 10,
    year: 2021,
    title: "The Battle at Lake Changjin",
    director: "Chen / Tsui / Lam",
    runtime: "178 min",
    gross: "USD 910M",
    grossNum: 910,
    studio: "Bona",
    filed: "21.10.2026",
    revised: "21.10.2026",
    imagination: "martyr sovereignty",
    status: "open",
    threshold: { inCorpus: true, rank: 2, note: "" },
    beckert: { imaginaryType: "restoration", payoffStructure: "zero-sum" },

    construction: {
      camera: "In 1950 American forces advance toward the Chinese border and bomb across it. The problem is built as <em>encirclement</em>: a superpower at the gate. China's entry into the war is given as defence.",
      scene: null,
      ground: "Three months before the film opened, at the Communist Party's centenary on 1 July 2021, the General Secretary warned that any foreign force trying to bully China would meet a Great Wall of steel forged by 1.4 billion people. The same construction, a nation encircled, was stated as policy.",
      sources: [
        { text: "Reuters (2021). Xi warns against foreign bullying as China marks party centenary. 1 July 2021, as published by Cyprus Mail.", url: "https://cyprus-mail.com/2021/07/01/xi-warns-against-foreign-bullying-as-china-marks-party-centenary" }
      ],
      selectionNote: "Considered: China's 2019 defence white paper. Not filed: the centenary speech falls in the film's period and is the occasion the film was commissioned for."
    },
    address: {
      camera: "The \"we\" is the Seventh Company and two brothers, Wu Qianli and Wu Wanli, who stand for a nation of soldiers. The dead are named and honoured; the Americans are seen from a distance.",
      scene: null,
      ground: "On 2 September 2021, a month before release, an air force plane escorted by two fighters brought the remains of 109 Chinese People's Volunteers home from South Korea to Shenyang, the eighth such return since 2014, received in a state ceremony.",
      sources: [
        { text: "The State Council of the PRC (2021). Remains of 109 Chinese soldiers killed in Korean War return. 3 September 2021.", url: "https://english.www.gov.cn/news/photos/202109/03/content_WS61318171c6d0df57f98df980.html" }
      ],
      selectionNote: "Considered: PLA recruitment drives in 2021. Not filed: the repatriation records who stands for the nation in the film's own terms."
    },
    exclusion: {
      camera: "The keyword is <em>martyr</em>. The soldiers freeze and die without retreating, and the film asks the audience to honour them without question.",
      scene: null,
      ground: "The same word carries another file. In October 2021 police detained the former journalist Luo Changping after he mocked the soldiers in a post about the film; in May 2022 a court in Sanya sentenced him to seven months for impugning the reputation of heroes and martyrs.",
      sources: [
        { text: "Radio Free Asia (2022). Chinese journalist sentenced in Hainan for smearing reputation of CCP heroes. 6 May 2022.", url: "https://rfa.org/english/news/china/sentenced-05062022102548.html" }
      ],
      selectionNote: "Exclusion may range historically; this record concerns the film itself. Considered: the 2018 Heroes and Martyrs Protection Law. Not filed alone: the Luo case shows the law applied to this film."
    },
    prescription: {
      camera: "The remedy is <em>sacrifice now for security later</em>: the soldiers fight so that the next generation will not have to. The film closes on the enemy's withdrawal.",
      scene: null,
      ground: "On 5 March 2021 China announced a defence budget of 1.355 trillion yuan, about USD 209 billion, up 6.8 per cent on the previous year.",
      sources: [
        { text: "Janes (2021). China announces 6.8% increase in 2021 defence budget. 5 March 2021.", url: "https://www.janes.com/defence-news/news-detail/china-announces-68-increase-in-2021-defence-budget-0503" }
      ],
      selectionNote: "Considered: the 2021 conscription regulations. Not filed: the budget is the enacted scale of the remedy."
    },
    circulation: {
      productionSupport: "Commissioned by the Central Propaganda Department for the Party's centenary, with the National Radio and Television Administration and the Central Military Commission; budget about USD 200 million, the most expensive Chinese film made.",
      scriptInvolvement: "Directed by Chen Kaige, Tsui Hark and Dante Lam under the commission.",
      distributionChannels: "Opened in China on 30 September 2021, before National Day; the highest-grossing Chinese film until 2025.",
      authorityInfrastructure: "Premiered as the opening film of the Beijing International Film Festival.",
      onTheSameChannels: "A sequel, The Battle at Lake Changjin II, followed in 2022 and also entered the worldwide top ten.",
      offTheSameChannels: "Accounts that the war began with North Korea's invasion of the South do not move through the same channels; questioning the film's soldiers was prosecuted.",
      sources: [
        { text: "Wikipedia (2026). The Battle at Lake Changjin, accessed 21 October 2026.", url: "https://en.wikipedia.org/wiki/The_Battle_at_Lake_Changjin" },
        { text: "Radio Free Asia (2022). 6 May 2022.", url: "https://rfa.org/english/news/china/sentenced-05062022102548.html" }
      ]
    },

    gloss: "The political imagination in which the <em>camera record</em> — a nation encircled, soldiers as the nation, martyrs beyond question, sacrifice as security — coincides with the <em>ground record</em>: a centenary speech of steel walls, the dead flown home under fighter escort, a critic jailed for mocking the film's soldiers, and a rising defence budget. The future is secured by the dead, and doubting them is a crime."
  }

];

if (typeof module !== "undefined") module.exports = { RECORDS };
