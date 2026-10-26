// Inhalte der 7 Epochen.
// Jeder Punkt: ["Haupttext", "kleine Notiz"] (die Notiz darf leer sein).
// Hörbeispiel: "url" ist leer, dann öffnet sich eine YouTube-Suche nach "query".
// Für ein festes Video den Link bei "url" einfügen.
window.EPOCHS = [
  {
    id: "medieval",
    name: "Mittelalter",
    years: "ca. 500 – 1400",
    era: "Musik gibt es vor allem in Kirche und Kloster.",
    artists: [
      ["Hildegard von Bingen (1098–1179)", "Äbtissin und Komponistin"],
      ["Pérotin (um 1200)", "Notre-Dame in Paris"],
      ["Guillaume de Machaut (ca. 1300–1377)", "Dichter und Komponist"]
    ],
    characteristics: [
      ["Einstimmig", "alle singen dieselbe Melodie"],
      ["Gregorianischer Choral", "Kirchengesang auf Latein"],
      ["Später: erste Mehrstimmigkeit", "mehrere Stimmen gleichzeitig"]
    ],
    innovations: [
      ["Notenlinien (11. Jh.)", "erfunden von Guido von Arezzo"],
      ["Silben ut – re – mi", "zum Lernen von Liedern"],
      ["Organum", "Choral mit 2 oder mehr Stimmen"]
    ],
    instruments: [
      ["Stimme", "das wichtigste Instrument"],
      ["Orgel", ""],
      ["Fiedel, Drehleier, Schalmei", ""]
    ],
    listening: { title: "Hildegard von Bingen – O virtus Sapientiae", query: "Hildegard von Bingen O virtus Sapientiae", url: "" }
  },
  {
    id: "renaissance",
    name: "Renaissance",
    years: "ca. 1400 – 1600",
    era: "Ein Neuanfang für die Kunst. „Renaissance“ heißt „Wiedergeburt“.",
    artists: [
      ["Josquin des Prez (ca. 1450–1521)", "Messen und Motetten"],
      ["Thomas Tallis (ca. 1505–1585)", "Kirchenmusik in England"],
      ["Giovanni P. da Palestrina (ca. 1525–1594)", "Meister der Kirchenmusik"]
    ],
    characteristics: [
      ["Polyphonie", "viele gleich wichtige Stimmen"],
      ["Vor allem Gesang", "oft ganz ohne Instrumente"],
      ["Text gut verständlich", "die Musik malt die Wörter nach"]
    ],
    innovations: [
      ["Notendruck (1501)", "Petrucci in Venedig"],
      ["Madrigal", "weltliches Lied, nicht für die Kirche"],
      ["Instrumentenfamilien", "große und kleine Instrumente spielen zusammen"]
    ],
    instruments: [
      ["Laute", "das beliebteste Instrument"],
      ["Blockflöte", ""],
      ["Gambe, Cembalo, Orgel", ""]
    ],
    listening: { title: "Palestrina – Missa Papae Marcelli: Kyrie", query: "Palestrina Missa Papae Marcelli Kyrie", url: "" }
  },
  {
    id: "baroque",
    name: "Barock",
    years: "ca. 1600 – 1750",
    era: "Endet 1750 mit dem Tod von Johann Sebastian Bach.",
    artists: [
      ["Claudio Monteverdi (1567–1643)", "frühe Opern"],
      ["Antonio Vivaldi (1678–1741)", "Violinkonzerte"],
      ["J. S. Bach (1685–1750), G. F. Händel (1685–1759)", "Höhepunkt des Barock"]
    ],
    characteristics: [
      ["Generalbass", "eine Basslinie mit Akkorden darüber"],
      ["Dur und Moll", "statt Kirchentonarten"],
      ["Laut und leise im Wechsel", "Terrassendynamik"]
    ],
    innovations: [
      ["Oper", "Monteverdi: L'Orfeo (1607)"],
      ["Solokonzert", "ein Solist und das Orchester"],
      ["Oratorium und Fuge", ""]
    ],
    instruments: [
      ["Geige und andere Streicher", ""],
      ["Cembalo und Orgel", ""],
      ["Trompete", "noch ohne Ventile"]
    ],
    listening: { title: "Vivaldi – Die vier Jahreszeiten: Frühling (1. Satz)", query: "Vivaldi Vier Jahreszeiten Frühling", url: "" }
  },
  {
    id: "classical",
    name: "Wiener Klassik",
    years: "ca. 1750 – 1820",
    era: "Haydn, Mozart und Beethoven arbeiten alle in Wien.",
    artists: [
      ["Joseph Haydn (1732–1809)", "„Vater“ der Sinfonie"],
      ["Wolfgang A. Mozart (1756–1791)", "Opern, Sinfonien, Konzerte"],
      ["Ludwig van Beethoven (1770–1827)", "Brücke zur Romantik"]
    ],
    characteristics: [
      ["Klar und ausgewogen", "Melodien kann man sich leicht merken"],
      ["Melodie mit Begleitung", "eine Stimme führt, die anderen begleiten"],
      ["Gut zum Mitsingen", "einfache, schöne Melodien"]
    ],
    innovations: [
      ["Sonatenhauptsatzform", "ein fester Bauplan für ein Musikstück"],
      ["Sinfonie und Streichquartett", ""],
      ["Öffentliche Konzerte", "Musik für alle, nicht nur für Adelige"]
    ],
    instruments: [
      ["Hammerklavier", "ersetzt das Cembalo"],
      ["Klarinette", "neu im Orchester"],
      ["Klassisches Orchester", "Streicher, Bläser, Pauken"]
    ],
    listening: { title: "Mozart – Eine kleine Nachtmusik (1. Satz)", query: "Mozart Eine kleine Nachtmusik", url: "" }
  },
  {
    id: "romantic",
    name: "Romantik",
    years: "ca. 1820 – 1900",
    era: "Musik über Gefühle, Natur und Träume.",
    artists: [
      ["Franz Schubert (1797–1828)", "über 600 Lieder"],
      ["Frédéric Chopin (1810–1849)", "Klaviermusik"],
      ["Richard Wagner (1813–1883), Peter Tschaikowsky (1840–1893)", "Opern, Ballett"]
    ],
    characteristics: [
      ["Starke Gefühle", ""],
      ["Großes Orchester", "viele neue Klangfarben"],
      ["Virtuosen", "Musiker, die extrem schwierige Stücke spielen"]
    ],
    innovations: [
      ["Kunstlied", "Gedicht + Gesang + Klavier"],
      ["Sinfonische Dichtung", "das Orchester erzählt eine Geschichte"],
      ["Leitmotiv", "eine Melodie für eine Person (Wagner)"]
    ],
    instruments: [
      ["Moderner Flügel", "größer und lauter"],
      ["Ventile für Horn und Trompete", "ab 1814"],
      ["Tuba", "ein sehr tiefes Blechblasinstrument"]
    ],
    listening: { title: "Chopin – Nocturne op. 9 Nr. 2", query: "Chopin Nocturne op. 9 Nr. 2", url: "" }
  },
  {
    id: "modern",
    name: "Moderne",
    years: "ca. 1900 – 1945",
    era: "Die alten Regeln der Harmonie werden gebrochen.",
    artists: [
      ["Claude Debussy (1862–1918)", "Impressionismus"],
      ["Arnold Schönberg (1874–1951)", "Zwölftonmusik"],
      ["Igor Strawinsky (1882–1971)", "„Le Sacre du printemps“"]
    ],
    characteristics: [
      ["Impressionismus", "Musik malt Stimmungen, wie ein Bild"],
      ["Atonalität", "kein Grundton, kein „Zuhause“"],
      ["Schräge Klänge", "Dissonanzen"]
    ],
    innovations: [
      ["Zwölftontechnik", "alle 12 Töne in fester Reihe (Schönberg)"],
      ["Polytonalität", "mehrere Tonarten gleichzeitig"],
      ["Skandal in Paris (1913)", "bei „Le Sacre du printemps“"]
    ],
    instruments: [
      ["Mehr Schlagzeug", ""],
      ["Celesta, Harfe, Saxofon", "neue Klangfarben"],
      ["Einfluss vom Jazz", ""]
    ],
    listening: { title: "Debussy – Clair de lune", query: "Debussy Clair de lune", url: "" }
  },
  {
    id: "new",
    name: "Neue Musik",
    years: "1945 – heute",
    era: "Nach dem Zweiten Weltkrieg ist alles erlaubt.",
    artists: [
      ["John Cage (1912–1992)", "Zufallsmusik"],
      ["Karlheinz Stockhausen (1928–2007)", "elektronische Musik"],
      ["György Ligeti (1923–2006)", "Klangflächen"]
    ],
    characteristics: [
      ["Jedes Geräusch kann Musik sein", ""],
      ["Zufall und strenge Regeln", "Aleatorik und Serialismus"],
      ["Minimalismus", "kurze Muster wiederholen sich"]
    ],
    innovations: [
      ["Konkrete Musik (1948)", "Musik aus aufgenommenen Geräuschen"],
      ["Elektronisches Studio in Köln (1951)", ""],
      ["4′33″ von Cage (1952)", "ein Stück ohne einen einzigen Ton"]
    ],
    instruments: [
      ["Computer und Synthesizer", ""],
      ["Tonband und Mikrofon", ""],
      ["Präpariertes Klavier", "Gegenstände zwischen den Saiten"]
    ],
    listening: { title: "Ligeti – Atmosphères (1961)", query: "Ligeti Atmosphères", url: "" }
  }
];
