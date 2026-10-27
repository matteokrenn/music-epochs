// Die 12 Quizfragen. Die erste Antwort ist immer die richtige.
// Auf Beamer und Laptops werden die Antworten gleich gemischt (siehe answerOrder).
window.QUESTIONS = [
  {
    q: "Welche Epoche ist die älteste?",
    a: ["Mittelalter", "Barock", "Romantik", "Neue Musik"],
    info: "Das Mittelalter kommt zuerst. Dann Renaissance, Barock, Wiener Klassik, Romantik, Moderne und Neue Musik."
  },
  {
    q: "Wo gab es im Mittelalter vor allem Musik?",
    a: ["In der Kirche", "Im Radio", "Im Kino", "Im Fußballstadion"],
    info: "Im Mittelalter wurde vor allem in der Kirche gesungen."
  },
  {
    q: "Was wurde im Mittelalter erfunden?",
    a: ["Die Notenlinien", "Die Schallplatte", "Der Computer", "Die E-Gitarre"],
    info: "Mit Notenlinien konnte man Lieder zum ersten Mal richtig aufschreiben."
  },
  {
    q: "Was passiert in der Renaissance mit den Noten?",
    a: ["Sie werden zum ersten Mal gedruckt", "Sie werden verboten", "Sie werden im Computer gespeichert", "Sie werden nur noch gesungen"],
    info: "Ab 1501 wurden Noten gedruckt. Vorher musste man sie mit der Hand abschreiben."
  },
  {
    q: "Welches Instrument sieht aus wie eine Gitarre und war in der Renaissance beliebt?",
    a: ["Die Laute", "Die Tuba", "Der Synthesizer", "Das Schlagzeug"],
    info: "Die Laute war das beliebteste Instrument der Renaissance."
  },
  {
    q: "Wer hat „Die vier Jahreszeiten“ geschrieben?",
    a: ["Antonio Vivaldi", "Ludwig van Beethoven", "Frédéric Chopin", "John Cage"],
    info: "„Die vier Jahreszeiten“ sind von Vivaldi, aus dem Barock."
  },
  {
    q: "Welche Epoche endet 1750, als Bach stirbt?",
    a: ["Barock", "Mittelalter", "Romantik", "Moderne"],
    info: "Mit dem Tod von Johann Sebastian Bach endet der Barock."
  },
  {
    q: "In welcher Stadt lebten Haydn, Mozart und Beethoven?",
    a: ["Wien", "Paris", "Berlin", "Rom"],
    info: "Deshalb heißt die Epoche „Wiener Klassik“."
  },
  {
    q: "Wer hat „Eine kleine Nachtmusik“ geschrieben?",
    a: ["Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Frédéric Chopin", "Claude Debussy"],
    info: "„Eine kleine Nachtmusik“ ist eines der bekanntesten Stücke von Mozart."
  },
  {
    q: "Worum geht es in der Musik der Romantik?",
    a: ["Um Gefühle, Natur und Träume", "Um Computer", "Um Fußball", "Um Mathematik"],
    info: "In der Romantik soll die Musik starke Gefühle zeigen."
  },
  {
    q: "Was passierte 1913 bei einem Konzert in Paris?",
    a: ["Das Publikum regte sich so auf, dass es Tumult gab", "Das erste Klavier wurde gebaut", "Mozart gab ein Konzert", "Es gab einen Stromausfall"],
    info: "Die Musik von Strawinsky war so neu, dass sich viele Leute aufgeregt haben."
  },
  {
    q: "Was hört man bei dem Stück „4′33″“ von John Cage?",
    a: ["Keine Töne, nur Stille und Geräusche im Raum", "Ein lautes Orchester", "Einen Chor", "Eine Orgel"],
    info: "Der Musiker spielt 4 Minuten und 33 Sekunden lang keinen einzigen Ton."
  }
];

window.LETTERS = ["A", "B", "C", "D"];

// Feste, aber gemischte Reihenfolge der Antworten pro Frage.
// Liefert die ursprünglichen Indizes, z. B. [2, 0, 3, 1].
window.answerOrder = function (qIndex) {
  let seed = ((qIndex + 1) * 2654435761) >>> 0;
  function rand() {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  const order = [0, 1, 2, 3];
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
};

// Punkte: schnellster Richtiger 10, dann 9, 8 … mindestens 1.
// Falsch −1, keine Antwort −2. Wer später einsteigt, bekommt für verpasste Fragen −2.
window.POINTS = { maxRight: 10, minRight: 1, wrong: -1, none: -2 };

// players: { uid: {...} }, answers: { "0": { uid: { choice, at } }, ... } (oder Array)
// Rechnet alle Fragen von 0 bis upTo durch.
window.computeScores = function (players, answers, upTo) {
  const P = window.POINTS;
  const totals = {};
  const last = {};
  Object.keys(players || {}).forEach(uid => { totals[uid] = 0; });
  for (let q = 0; q <= upTo; q++) {
    const qa = (answers && answers[q]) || {};
    const fastest = Object.keys(qa)
      .filter(uid => uid in totals && qa[uid] && qa[uid].choice === 0)
      .sort((a, b) => qa[a].at - qa[b].at);
    Object.keys(totals).forEach(uid => {
      const a = qa[uid];
      let delta, result;
      if (!a) { delta = P.none; result = "none"; }
      else if (a.choice === 0) { delta = Math.max(P.maxRight - fastest.indexOf(uid), P.minRight); result = "right"; }
      else { delta = P.wrong; result = "wrong"; }
      totals[uid] += delta;
      if (q === upTo) last[uid] = { delta, result };
    });
  }
  return { totals, last };
};

// Platz pro Spieler. Gleiche Punkte = gleicher Platz (1, 2, 2, 4 …).
window.rankTotals = function (totals) {
  const ids = Object.keys(totals).sort((a, b) => totals[b] - totals[a]);
  const ranks = {};
  ids.forEach((uid, i) => {
    ranks[uid] = i > 0 && totals[uid] === totals[ids[i - 1]] ? ranks[ids[i - 1]] : i + 1;
  });
  return ranks;
};
