// Inhalte der 7 Epochen.
// Deutscher Punkt:   ["Haupttext", "kleine Notiz"]
// Englischer Punkt:  { en: "Easy English", de: "Übersetzung" }  (ca. ein Viertel)
// Hörbeispiel: "url" ist leer, dann öffnet sich eine YouTube-Suche nach "query".
// Für ein festes Video den Link bei "url" einfügen.
window.EPOCHS = [
  {
    id: "medieval",
    name: "Mittelalter",
    en: "Middle Ages",
    years: "ca. 500 – 1400",
    era: { en: "Music is in the church.", de: "Musik gibt es vor allem in Kirche und Kloster." },
    artists: [
      ["Hildegard von Bingen (1098–1179)", "Äbtissin und Komponistin"],
      ["Pérotin (um 1200)", "Notre-Dame in Paris"],
      ["Guillaume de Machaut (ca. 1300–1377)", "Dichter und Komponist"]
    ],
    characteristics: [
      { en: "One melody.", de: "Eine Melodie, alle singen dasselbe." },
      ["Gregorianischer Choral", "Kirchengesang auf Latein"],
      ["Später: erste Mehrstimmigkeit", "mehrere Stimmen gleichzeitig"]
    ],
    innovations: [
      ["Notenlinien (11. Jh.)", "erfunden von Guido von Arezzo"],
      ["Silben ut – re – mi", "zum Lernen von Liedern"],
      ["Organum", "Choral mit 2 oder mehr Stimmen"]
    ],
    instruments: [
      { en: "Voice", de: "Stimme, das wichtigste Instrument" },
      { en: "Organ", de: "Orgel" },
      ["Fiedel, Drehleier, Schalmei", ""]
    ],
    listening: { title: "Hildegard von Bingen – O virtus Sapientiae", query: "Hildegard von Bingen O virtus Sapientiae", url: "" }
  },
  {
    id: "renaissance",
    name: "Renaissance",
    en: "Renaissance",
    years: "ca. 1400 – 1600",
    era: { en: "A new start for art.", de: "Ein Neuanfang für die Kunst („Wiedergeburt“)." },
    artists: [
      ["Josquin des Prez (ca. 1450–1521)", "Messen und Motetten"],
      ["Thomas Tallis (ca. 1505–1585)", "Kirchenmusik in England"],
      ["Giovanni P. da Palestrina (ca. 1525–1594)", "Meister der Kirchenmusik"]
    ],
    characteristics: [
      ["Polyphonie", "viele gleich wichtige Stimmen"],
      { en: "Many voices sing.", de: "Viele Stimmen singen, oft ohne Instrumente." },
      ["Text gut verständlich", "die Musik malt die Wörter nach"]
    ],
    innovations: [
      ["Notendruck (1501)", "Petrucci in Venedig"],
      ["Madrigal", "weltliches Lied, nicht für die Kirche"],
      ["Instrumentenfamilien", "große und kleine Instrumente spielen zusammen"]
    ],
    instruments: [
      ["Laute", "das beliebteste Instrument"],
      { en: "Recorder", de: "Blockflöte" },
      ["Gambe, Cembalo, Orgel", ""]
    ],
    listening: { title: "Palestrina – Missa Papae Marcelli: Kyrie", query: "Palestrina Missa Papae Marcelli Kyrie", url: "" }
  },
  {
    id: "baroque",
    name: "Barock",
    en: "Baroque",
    years: "ca. 1600 – 1750",
    era: { en: "It ends in 1750.", de: "Endet 1750 mit dem Tod von Bach." },
    artists: [
      ["Claudio Monteverdi (1567–1643)", "frühe Opern"],
      ["Antonio Vivaldi (1678–1741)", "Violinkonzerte"],
      ["J. S. Bach (1685–1750), G. F. Händel (1685–1759)", "Höhepunkt des Barock"]
    ],
    characteristics: [
      ["Generalbass", "eine Basslinie mit Akkorden darüber"],
      ["Dur und Moll", "statt Kirchentonarten"],
      { en: "Loud – soft – loud.", de: "Laut und leise wechseln sich ab." }
    ],
    innovations: [
      ["Oper", "Monteverdi: L'Orfeo (1607)"],
      ["Solokonzert", "ein Solist und das Orchester"],
      ["Oratorium und Fuge", ""]
    ],
    instruments: [
      { en: "Violin", de: "Geige" },
      ["Cembalo und Orgel", ""],
      { en: "Trumpet", de: "Trompete, noch ohne Ventile" }
    ],
    listening: { title: "Vivaldi – Die vier Jahreszeiten: Frühling (1. Satz)", query: "Vivaldi Four Seasons Spring 1st movement", url: "" }
  },
  {
    id: "classical",
    name: "Wiener Klassik",
    en: "Classical",
    years: "ca. 1750 – 1820",
    era: { en: "Music in Vienna.", de: "Haydn, Mozart und Beethoven arbeiten alle in Wien." },
    artists: [
      ["Joseph Haydn (1732–1809)", "„Vater“ der Sinfonie"],
      ["Wolfgang A. Mozart (1756–1791)", "Opern, Sinfonien, Konzerte"],
      ["Ludwig van Beethoven (1770–1827)", "Brücke zur Romantik"]
    ],
    characteristics: [
      ["Klar und ausgewogen", "Melodien kann man sich leicht merken"],
      ["Melodie mit Begleitung", "eine Stimme führt, die anderen begleiten"],
      { en: "Easy to sing.", de: "Gut zum Mitsingen." }
    ],
    innovations: [
      ["Sonatenhauptsatzform", "ein fester Bauplan für ein Musikstück"],
      ["Sinfonie und Streichquartett", ""],
      ["Öffentliche Konzerte", "Musik für alle, nicht nur für Adelige"]
    ],
    instruments: [
      { en: "Piano", de: "Klavier (Hammerklavier) statt Cembalo" },
      { en: "Clarinet", de: "Klarinette, neu im Orchester" },
      ["Klassisches Orchester", "Streicher, Bläser, Pauken"]
    ],
    listening: { title: "Mozart – Eine kleine Nachtmusik (1. Satz)", query: "Mozart Eine kleine Nachtmusik 1st movement", url: "" }
  },
  {
    id: "romantic",
    name: "Romantik",
    en: "Romantic",
    years: "ca. 1820 – 1900",
    era: { en: "Music about feelings.", de: "Musik über Gefühle, Natur und Träume." },
    artists: [
      ["Franz Schubert (1797–1828)", "über 600 Lieder"],
      ["Frédéric Chopin (1810–1849)", "Klaviermusik"],
      ["Richard Wagner (1813–1883), Peter Tschaikowsky (1840–1893)", "Opern, Ballett"]
    ],
    characteristics: [
      { en: "Big feelings.", de: "Starke Gefühle." },
      ["Großes Orchester", "viele neue Klangfarben"],
      ["Virtuosen", "Stars, die extrem schwierige Stücke spielen"]
    ],
    innovations: [
      ["Kunstlied", "Gedicht + Gesang + Klavier"],
      ["Sinfonische Dichtung", "das Orchester erzählt eine Geschichte"],
      ["Leitmotiv", "eine Melodie für eine Person (Wagner)"]
    ],
    instruments: [
      { en: "Big piano", de: "moderner Flügel, größer und lauter" },
      ["Ventile für Horn und Trompete", "ab 1814"],
      { en: "Tuba", de: "Tuba, ein sehr tiefes Blechblasinstrument" }
    ],
    listening: { title: "Chopin – Nocturne op. 9 Nr. 2", query: "Chopin Nocturne Op. 9 No. 2", url: "" }
  },
  {
    id: "modern",
    name: "Moderne",
    en: "Modern",
    years: "ca. 1900 – 1945",
    era: { en: "New rules.", de: "Die alten Regeln der Harmonie werden gebrochen." },
    artists: [
      ["Claude Debussy (1862–1918)", "Impressionismus"],
      ["Arnold Schönberg (1874–1951)", "Zwölftonmusik"],
      ["Igor Strawinsky (1882–1971)", "„Le Sacre du printemps“"]
    ],
    characteristics: [
      ["Impressionismus", "Musik malt Stimmungen, wie ein Bild"],
      ["Atonalität", "kein Grundton, kein „Zuhause“"],
      { en: "Strange sounds.", de: "Schräge Klänge (Dissonanzen)." }
    ],
    innovations: [
      ["Zwölftontechnik", "alle 12 Töne in fester Reihe (Schönberg)"],
      ["Polytonalität", "mehrere Tonarten gleichzeitig"],
      ["Skandal in Paris (1913)", "bei „Le Sacre du printemps“"]
    ],
    instruments: [
      { en: "Drums", de: "mehr Schlagzeug" },
      ["Celesta, Harfe, Saxofon", "neue Klangfarben"],
      ["Einfluss vom Jazz", ""]
    ],
    listening: { title: "Debussy – Clair de lune", query: "Debussy Clair de lune", url: "" }
  },
  {
    id: "new",
    name: "Neue Musik",
    en: "New Music",
    years: "1945 – heute",
    era: { en: "Everything is possible.", de: "Nach dem Zweiten Weltkrieg ist alles erlaubt." },
    artists: [
      ["John Cage (1912–1992)", "Zufallsmusik"],
      ["Karlheinz Stockhausen (1928–2007)", "elektronische Musik"],
      ["György Ligeti (1923–2006), Steve Reich (geb. 1936)", "Klangflächen, Minimal Music"]
    ],
    characteristics: [
      { en: "Every sound is music.", de: "Jedes Geräusch kann Musik sein." },
      ["Zufall und strenge Regeln", "Aleatorik und Serialismus"],
      ["Minimal Music", "kurze Muster wiederholen sich"]
    ],
    innovations: [
      ["Musique concrète (1948)", "Musik aus aufgenommenen Geräuschen"],
      ["Elektronisches Studio in Köln (1951)", ""],
      ["4′33″ von Cage (1952)", "ein Stück ohne einen einzigen Ton"]
    ],
    instruments: [
      { en: "Computer", de: "Computer und Synthesizer" },
      ["Tonband und Mikrofon", ""],
      ["Präpariertes Klavier", "Gegenstände zwischen den Saiten"]
    ],
    listening: { title: "Steve Reich – Clapping Music (1972)", query: "Steve Reich Clapping Music", url: "" }
  }
];
