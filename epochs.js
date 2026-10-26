// Inhalte der 7 Epochen.
// Jeder Punkt: ["Haupttext", "kleine Notiz"] (die Notiz darf leer sein).
// Hörbeispiel: "url" ist leer, dann öffnet sich eine YouTube-Suche nach "query".
// Für ein festes Video den Link bei "url" einfügen.
window.EPOCHS = [
  {
    id: "medieval",
    name: "Mittelalter",
    years: "ca. 500 – 1400",
    era: "Musik gibt es vor allem in der Kirche.",
    artists: [
      ["Hildegard von Bingen", "eine Nonne, die Lieder geschrieben hat"],
      ["Guido von Arezzo", "ein Mönch und Musiklehrer"]
    ],
    characteristics: [
      ["Alle singen dieselbe Melodie", ""],
      ["Die Lieder sind auf Latein", ""]
    ],
    innovations: [
      ["Die ersten Notenlinien", "so kann man Lieder aufschreiben"],
      ["Später singen mehrere Stimmen gleichzeitig", ""]
    ],
    instruments: [
      ["Stimme", "das wichtigste Instrument"],
      ["Orgel", ""],
      ["Harfe", ""]
    ],
    listening: { title: "Ein Lied von Hildegard von Bingen", query: "Hildegard von Bingen O virtus Sapientiae", url: "" }
  },
  {
    id: "renaissance",
    name: "Renaissance",
    years: "ca. 1400 – 1600",
    era: "„Renaissance“ heißt „Neubeginn“. Kunst und Musik blühen auf.",
    artists: [
      ["Palestrina", "Musik für die Kirche"],
      ["Thomas Tallis", "Musik für Chöre in England"]
    ],
    characteristics: [
      ["Viele Stimmen singen verschiedene Melodien zusammen", ""],
      ["Meistens wird gesungen", "oft ganz ohne Instrumente"]
    ],
    innovations: [
      ["Noten werden gedruckt (1501)", "vorher musste man sie abschreiben"],
      ["Lieder auch für zu Hause, nicht nur für die Kirche", ""]
    ],
    instruments: [
      ["Laute", "sieht aus wie eine Gitarre"],
      ["Blockflöte", ""],
      ["Orgel", ""]
    ],
    listening: { title: "Palestrina: Musik für einen Chor", query: "Palestrina Missa Papae Marcelli Kyrie", url: "" }
  },
  {
    id: "baroque",
    name: "Barock",
    years: "ca. 1600 – 1750",
    era: "Endet 1750, als Johann Sebastian Bach stirbt.",
    artists: [
      ["Johann Sebastian Bach", "Musik für Orgel und Kirche"],
      ["Antonio Vivaldi", "„Die vier Jahreszeiten“"],
      ["Georg Friedrich Händel", "lebte lange in London"]
    ],
    characteristics: [
      ["Prächtig und verziert", ""],
      ["Laut und leise wechseln sich ab", ""]
    ],
    innovations: [
      ["Die erste Oper", "Theater mit Gesang"],
      ["Konzerte", "ein Solist spielt zusammen mit dem Orchester"]
    ],
    instruments: [
      ["Geige", ""],
      ["Cembalo", "ein Vorgänger vom Klavier"],
      ["Orgel", ""]
    ],
    listening: { title: "Vivaldi: Die vier Jahreszeiten, „Frühling“", query: "Vivaldi Vier Jahreszeiten Frühling", url: "" }
  },
  {
    id: "classical",
    name: "Wiener Klassik",
    years: "ca. 1750 – 1820",
    era: "Die berühmtesten Komponisten leben in Wien.",
    artists: [
      ["Joseph Haydn", ""],
      ["Wolfgang Amadeus Mozart", ""],
      ["Ludwig van Beethoven", ""]
    ],
    characteristics: [
      ["Klare, schöne Melodien", ""],
      ["Man kann gut mitsummen", ""]
    ],
    innovations: [
      ["Die Sinfonie", "ein großes Stück für Orchester"],
      ["Konzerte für alle Leute", "nicht nur für Reiche"]
    ],
    instruments: [
      ["Klavier", ""],
      ["Klarinette", ""],
      ["Orchester", ""]
    ],
    listening: { title: "Mozart: Eine kleine Nachtmusik", query: "Mozart Eine kleine Nachtmusik", url: "" }
  },
  {
    id: "romantic",
    name: "Romantik",
    years: "ca. 1820 – 1900",
    era: "Musik über Gefühle, Natur und Träume.",
    artists: [
      ["Franz Schubert", "viele Lieder"],
      ["Frédéric Chopin", "Musik für Klavier"],
      ["Peter Tschaikowsky", "„Schwanensee“"]
    ],
    characteristics: [
      ["Starke Gefühle", "traurig, wild oder verträumt"],
      ["Sehr großes Orchester", ""]
    ],
    innovations: [
      ["Musik erzählt Geschichten", ""],
      ["Musik-Stars", "die extrem schnell spielen"]
    ],
    instruments: [
      ["Großer, lauter Flügel", ""],
      ["Trompete und Horn", "jetzt mit Drückern (Ventilen)"],
      ["Tuba", ""]
    ],
    listening: { title: "Chopin: ein ruhiges Klavierstück", query: "Chopin Nocturne op. 9 Nr. 2", url: "" }
  },
  {
    id: "modern",
    name: "Moderne",
    years: "ca. 1900 – 1945",
    era: "Komponisten probieren ganz neue Klänge aus.",
    artists: [
      ["Claude Debussy", "Musik wie ein Gemälde"],
      ["Igor Strawinsky", "Musik für Ballett"]
    ],
    characteristics: [
      ["Manches klingt schräg", ""],
      ["Musik malt Stimmungen", "wie ein Bild"]
    ],
    innovations: [
      ["Musik muss nicht mehr „schön“ klingen", ""],
      ["1913 in Paris", "das Publikum regt sich so auf, dass es Tumult gibt"]
    ],
    instruments: [
      ["Viel Schlagzeug", ""],
      ["Saxofon", ""],
      ["Ideen aus dem Jazz", ""]
    ],
    listening: { title: "Debussy: „Mondschein“ für Klavier", query: "Debussy Clair de lune", url: "" }
  },
  {
    id: "new",
    name: "Neue Musik",
    years: "1945 – heute",
    era: "Jetzt ist alles erlaubt.",
    artists: [
      ["John Cage", "Musik mit Stille und Zufall"],
      ["Karlheinz Stockhausen", "Musik mit Elektronik"]
    ],
    characteristics: [
      ["Jedes Geräusch kann Musik sein", ""],
      ["Kurze Stücke wiederholen sich immer wieder", ""]
    ],
    innovations: [
      ["Musik aus dem Computer", ""],
      ["Ein Stück ganz ohne Töne", "„4′33″“ von John Cage (1952)"]
    ],
    instruments: [
      ["Computer", ""],
      ["Synthesizer", ""],
      ["Klavier mit Schrauben zwischen den Saiten", ""]
    ],
    listening: { title: "Ligeti: Musik wie eine Klangwolke", query: "Ligeti Atmosphères", url: "" }
  }
];
