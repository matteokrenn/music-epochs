// Content for the 7 eras. Every point: [English, Deutsch].
// Listening: "url" is empty, so the page opens a YouTube search for "query".
// To use a fixed video instead, paste its link into "url".
window.EPOCHS = [
  {
    id: "medieval",
    name: "Middle Ages",
    de: "Mittelalter",
    years: "c. 500 – 1400",
    era: ["From the end of Rome to the 1400s, music lives in the church", "Musik entsteht vor allem in Kirche und Kloster"],
    artists: [
      ["Hildegard von Bingen (1098–1179)", "Äbtissin und Komponistin"],
      ["Pérotin (c. 1200)", "Notre-Dame-Schule, Paris"],
      ["Guillaume de Machaut (c. 1300–1377)", "Dichter und Komponist"]
    ],
    characteristics: [
      ["Gregorian chant: one melody, Latin text", "Gregorianischer Choral, einstimmig"],
      ["Church modes instead of major/minor", "Kirchentonarten"],
      ["Later: first music for several voices", "erste Mehrstimmigkeit"]
    ],
    innovations: [
      ["Guido of Arezzo puts notes on a staff (11th c.)", "Notenlinien"],
      ["Syllables ut – re – mi to learn songs", "Solmisation"],
      ["Organum: chant for 2 or more voices", "Organum"]
    ],
    instruments: [
      ["Voice: the most important instrument", "Gesang"],
      ["Vielle, hurdy-gurdy", "Fiedel, Drehleier"],
      ["Shawm, psaltery, organ", "Schalmei, Psalterium, Orgel"]
    ],
    listening: { title: "Hildegard von Bingen – O virtus Sapientiae", query: "Hildegard von Bingen O virtus Sapientiae", url: "" }
  },
  {
    id: "renaissance",
    name: "Renaissance",
    de: "Renaissance",
    years: "c. 1400 – 1600",
    era: ["\"Rebirth\": new interest in people and art", "Wiedergeburt der Antike, der Mensch im Mittelpunkt"],
    artists: [
      ["Josquin des Prez (c. 1450–1521)", "Messen und Motetten"],
      ["Thomas Tallis (c. 1505–1585)", "Kirchenmusik in England"],
      ["Giovanni P. da Palestrina (c. 1525–1594)", "Meister der Kirchenmusik"]
    ],
    characteristics: [
      ["Polyphony: many equal voices", "Polyphonie, gleichwertige Stimmen"],
      ["Mostly sung, often a cappella", "meist Vokalmusik, ohne Instrumente"],
      ["Clear text, word painting", "Text gut verständlich, Wortmalerei"]
    ],
    innovations: [
      ["Music printing: Petrucci, Venice, 1501", "Notendruck"],
      ["Madrigal: secular song", "weltliches Lied"],
      ["Instrument families play together", "Instrumentenfamilien (Consort)"]
    ],
    instruments: [
      ["Lute", "Laute"],
      ["Viola da gamba, recorder", "Gambe, Blockflöte"],
      ["Harpsichord, organ", "Cembalo, Orgel"]
    ],
    listening: { title: "Palestrina – Missa Papae Marcelli: Kyrie", query: "Palestrina Missa Papae Marcelli Kyrie", url: "" }
  },
  {
    id: "baroque",
    name: "Baroque",
    de: "Barock",
    years: "c. 1600 – 1750",
    era: ["Ends with the death of J. S. Bach in 1750", "endet mit Bachs Tod 1750"],
    artists: [
      ["Claudio Monteverdi (1567–1643)", "frühe Opern"],
      ["Antonio Vivaldi (1678–1741)", "Violinkonzerte"],
      ["J. S. Bach (1685–1750), G. F. Händel (1685–1759)", "Höhepunkt des Barock"]
    ],
    characteristics: [
      ["Basso continuo: bass line + chords", "Generalbass"],
      ["Major and minor keys", "Dur und Moll"],
      ["Loud/soft contrast, many ornaments", "Terrassendynamik, Verzierungen"]
    ],
    innovations: [
      ["Opera (Monteverdi: L'Orfeo, 1607)", "Oper"],
      ["Concerto: soloist vs. orchestra", "Solokonzert"],
      ["Oratorio and fugue", "Oratorium, Fuge"]
    ],
    instruments: [
      ["Harpsichord, organ", "Cembalo, Orgel"],
      ["Violin family", "Streicher: Geige, Bratsche, Cello"],
      ["Natural trumpet, oboe, recorder", "Naturtrompete, Oboe, Blockflöte"]
    ],
    listening: { title: "Vivaldi – The Four Seasons: Spring (1st mvt.)", query: "Vivaldi Four Seasons Spring 1st movement", url: "" }
  },
  {
    id: "classical",
    name: "Classical",
    de: "Wiener Klassik",
    years: "c. 1750 – 1820",
    era: ["Haydn, Mozart and Beethoven all work in Vienna", "alle drei wirken in Wien"],
    artists: [
      ["Joseph Haydn (1732–1809)", "\"Vater\" von Sinfonie und Streichquartett"],
      ["Wolfgang A. Mozart (1756–1791)", "Opern, Sinfonien, Konzerte"],
      ["Ludwig van Beethoven (1770–1827)", "Brücke zur Romantik"]
    ],
    characteristics: [
      ["Clear, balanced phrases", "klare, ausgewogene Phrasen"],
      ["Melody with accompaniment", "Melodie mit Begleitung"],
      ["Strong contrasts inside one piece", "Kontraste innerhalb eines Stücks"]
    ],
    innovations: [
      ["Sonata form", "Sonatenhauptsatzform"],
      ["Symphony and string quartet", "Sinfonie, Streichquartett"],
      ["Public concerts", "öffentliche Konzerte"]
    ],
    instruments: [
      ["Fortepiano replaces the harpsichord", "Hammerklavier statt Cembalo"],
      ["Clarinet joins the orchestra", "Klarinette"],
      ["Classical orchestra: strings, winds, timpani", "klassisches Orchester"]
    ],
    listening: { title: "Mozart – Eine kleine Nachtmusik (1st mvt.)", query: "Mozart Eine kleine Nachtmusik 1st movement", url: "" }
  },
  {
    id: "romantic",
    name: "Romantic",
    de: "Romantik",
    years: "c. 1820 – 1900",
    era: ["Feelings, nature and dreams become the main topic", "Gefühl, Natur und Traum im Mittelpunkt"],
    artists: [
      ["Franz Schubert (1797–1828)", "über 600 Lieder"],
      ["Frédéric Chopin (1810–1849)", "Klaviermusik"],
      ["Richard Wagner (1813–1883), P. Tchaikovsky (1840–1893)", "Oper, Ballett"]
    ],
    characteristics: [
      ["Strong emotions, stories from books and nature", "starke Gefühle, Literatur, Natur"],
      ["Big orchestra, rich chromatic harmony", "großes Orchester, Chromatik"],
      ["Virtuosos and national styles", "Virtuosen, Nationalstile"]
    ],
    innovations: [
      ["Art song (Lied)", "Kunstlied"],
      ["Symphonic poem: orchestra tells a story", "Sinfonische Dichtung"],
      ["Leitmotif: a melody for a character (Wagner)", "Leitmotiv"]
    ],
    instruments: [
      ["Modern piano: bigger and louder", "moderner Flügel"],
      ["Valves for horn and trumpet (from 1814)", "Ventile für Blechbläser"],
      ["Tuba, larger orchestra", "Tuba, großes Orchester"]
    ],
    listening: { title: "Chopin – Nocturne Op. 9 No. 2", query: "Chopin Nocturne Op. 9 No. 2", url: "" }
  },
  {
    id: "modern",
    name: "Modern",
    de: "Moderne",
    years: "c. 1900 – 1945",
    era: ["Composers break the old rules of harmony", "alte Regeln der Harmonie werden gebrochen"],
    artists: [
      ["Claude Debussy (1862–1918)", "Impressionismus"],
      ["Arnold Schönberg (1874–1951)", "Atonalität, Zwölftonmusik"],
      ["Igor Stravinsky (1882–1971)", "Le Sacre du printemps"]
    ],
    characteristics: [
      ["Impressionism: sound colours, whole-tone scale", "Klangfarben, Ganztonleiter"],
      ["Atonality: no home key", "Atonalität, kein Grundton"],
      ["Dissonance and complex rhythms", "Dissonanzen, komplexe Rhythmen"]
    ],
    innovations: [
      ["Twelve-tone technique (Schönberg)", "Zwölftontechnik"],
      ["Polytonality: several keys at once", "Polytonalität"],
      ["The Rite of Spring causes a riot (Paris, 1913)", "Skandal bei der Uraufführung"]
    ],
    instruments: [
      ["Bigger percussion section", "mehr Schlagwerk"],
      ["Celesta, harp, saxophone for new colours", "Celesta, Harfe, Saxofon"],
      ["Influence of jazz", "Einfluss des Jazz"]
    ],
    listening: { title: "Debussy – Clair de lune", query: "Debussy Clair de lune", url: "" }
  },
  {
    id: "new",
    name: "New Music",
    de: "Neue Musik",
    years: "1945 – today",
    era: ["After World War II: everything is possible", "nach dem Zweiten Weltkrieg: alles ist möglich"],
    artists: [
      ["John Cage (1912–1992)", "Zufallsmusik"],
      ["Karlheinz Stockhausen (1928–2007)", "elektronische Musik"],
      ["György Ligeti (1923–2006), Steve Reich (b. 1936)", "Klangflächen, Minimal Music"]
    ],
    characteristics: [
      ["Any sound can be music", "jedes Geräusch kann Musik sein"],
      ["Chance and strict rules (serialism)", "Zufall und Serialismus"],
      ["Minimal music: short patterns repeat", "Minimal Music, Wiederholung"]
    ],
    innovations: [
      ["Musique concrète: recorded noises (Schaeffer, 1948)", "Musik aus Geräuschen"],
      ["Electronic studio in Cologne (1951)", "elektronisches Studio Köln"],
      ["4′33″ by Cage (1952): no notes are played", "ein Stück aus Stille"]
    ],
    instruments: [
      ["Synthesizer and computer", "Synthesizer, Computer"],
      ["Tape recorder and microphone", "Tonband, Mikrofon"],
      ["Prepared piano: objects between the strings", "präpariertes Klavier"]
    ],
    listening: { title: "Steve Reich – Clapping Music (1972)", query: "Steve Reich Clapping Music", url: "" }
  }
];
