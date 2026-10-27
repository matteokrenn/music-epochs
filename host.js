// Spielleiter-Ansicht des Live-Quiz (letzte Folie der Präsentation).
// Ablauf: lobby -> question -> reveal -> board -> question ... -> final
(function () {
  const Q = window.QUESTIONS;
  const LET = window.LETTERS;

  let root = null;
  let live = null;
  let mode = "connecting";   // connecting | live | down | offline (Plan B ohne Laptops)
  let isHost = false;
  let state = { phase: "lobby", q: 0 };
  let players = {};
  let answers = {};
  let scores = {};
  let ending = false;
  let showLogin = false;
  let loginMsg = "";
  let loginEmail = "";
  let lastKey = "";
  let timers = [];

  function el(tag, cls, text, children) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    (children || []).forEach(c => c && node.appendChild(c));
    return node;
  }

  function button(text, cls, onClick) {
    const b = el("button", cls, text);
    b.addEventListener("click", onClick);
    return b;
  }

  function pts(n) { return (n > 0 ? "+" : n < 0 ? "−" : "±") + Math.abs(n); }

  function quizAddress() {
    if (location.protocol === "file:") return new URL("quiz.html", location.href).href;
    const u = new URL("quiz", location.href);
    return u.host + u.pathname;
  }

  const canControl = () => isHost || mode === "offline";
  const playerIds = () => Object.keys(players).sort((a, b) => (players[a].joinedAt || 0) - (players[b].joinedAt || 0));
  const answersFor = q => (answers && answers[q]) || {};
  const answeredCount = q => Object.keys(answersFor(q)).filter(uid => uid in players).length;

  function toast(text) {
    const t = el("div", "h-toast", text);
    root.appendChild(t);
    setTimeout(() => t.remove(), 4000);
  }

  async function act(fn) {
    try { await fn(); }
    catch (err) {
      console.warn(err);
      toast("Das hat nicht geklappt. Bist du als Spielleiter angemeldet?");
    }
  }

  // ---------- Verbindung ----------
  async function init(container) {
    root = container;
    render();
    live = await window.Live.ready;
    if (!live || !(await window.Live.reachable(live))) { mode = "down"; render(); return; }
    mode = "live";
    const db = live.db;
    live.auth.onAuthStateChanged(user => { isHost = !!user && !user.isAnonymous; render(); });
    db.ref("quiz/state").on("value", s => { state = s.val() || { phase: "lobby", q: 0 }; render(); });
    db.ref("quiz/players").on("value", s => { players = s.val() || {}; render(); autoEnd(); });
    db.ref("quiz/answers").on("value", s => { answers = s.val() || {}; render(); autoEnd(); });
    db.ref("quiz/scores").on("value", s => { scores = s.val() || {}; render(); });
  }

  // ---------- Aktionen ----------
  function setState(phase, q) {
    if (mode === "offline") { state = { phase, q }; render(); return Promise.resolve(); }
    return live.db.ref("quiz/state").set({ phase, q, qKey: String(q) });
  }

  const startQuiz = () => act(() => setState("question", 0));

  // Wenn alle geantwortet haben, ist die Frage automatisch vorbei.
  function autoEnd() {
    if (!isHost || mode !== "live" || state.phase !== "question") return;
    const n = Object.keys(players).length;
    if (n > 0 && answeredCount(state.q) >= n) endQuestion();
  }

  async function endQuestion() {
    if (mode === "offline") return setState("reveal", state.q);
    if (ending) return;
    ending = true;
    await act(async () => {
      const q = state.q;
      const all = (await live.db.ref("quiz/answers").once("value")).val() || {};
      const now = window.computeScores(players, all, q);
      const before = q > 0 ? window.rankTotals(window.computeScores(players, all, q - 1).totals) : {};
      const ranks = window.rankTotals(now.totals);
      const n = Object.keys(players).length;
      const out = {};
      Object.keys(players).forEach(uid => {
        out[uid] = {
          name: players[uid].name,
          total: now.totals[uid],
          delta: now.last[uid].delta,
          result: now.last[uid].result,
          rank: ranks[uid],
          prevRank: before[uid] || 0,
          of: n,
          q
        };
      });
      await live.db.ref("quiz").update({ scores: out, "state/phase": "reveal" });
    });
    ending = false;
  }

  const toBoard = () => act(() => setState("board", state.q));

  const nextQuestion = () => act(() =>
    state.q < Q.length - 1 ? setState("question", state.q + 1) : setState("final", state.q)
  );

  function kick(uid) {
    const p = players[uid];
    if (!p || !confirm("„" + p.name + "“ aus dem Quiz werfen? Der Name ist dann gesperrt.")) return;
    act(() => live.db.ref("quiz").update({
      ["players/" + uid]: null,
      ["scores/" + uid]: null,
      ["names/" + p.key]: "kicked"
    }));
  }

  function resetGame() {
    if (!confirm("Neues Spiel starten? Alle Spieler und Punkte werden gelöscht.")) return;
    if (mode === "offline") { setState("lobby", 0); return; }
    act(() => live.db.ref("quiz").set({ state: { phase: "lobby", q: 0, qKey: "0" } }));
  }

  // Weiter-Taste / Pfeil rechts auf der Quiz-Folie. Gibt true zurück, wenn etwas passiert ist.
  function primary() {
    if (!canControl() || mode === "connecting" || mode === "down") return false;
    const p = state.phase;
    if (p === "lobby") { startQuiz(); return true; }
    if (p === "question") { endQuestion(); return true; }
    if (p === "reveal") { mode === "offline" ? nextQuestion() : toBoard(); return true; }
    if (p === "board") { nextQuestion(); return true; }
    return p === "final";
  }

  // ---------- Anzeige ----------
  function renderKey() {
    const base = [mode, isHost, state.phase, state.q, showLogin, loginMsg];
    if (state.phase === "lobby") base.push(playerIds().map(id => players[id].name).join(","));
    if (state.phase === "question") base.push(answeredCount(state.q), Object.keys(players).length);
    if (state.phase === "reveal" || state.phase === "board") base.push(Object.values(scores).map(s => s.q + ":" + s.total).join(","));
    return base.join("|");
  }

  function render() {
    if (!root) return;
    const key = renderKey();
    if (key === lastKey) return;
    lastKey = key;
    timers.forEach(clearTimeout);
    timers = [];

    if (mode === "connecting") return show(el("p", "h-sub", "Verbinde mit dem Quiz …"));
    if (mode === "down") return renderDown();
    const p = state.phase;
    if (p === "lobby") return renderLobby();
    if (p === "question") return renderQuestion(false);
    if (p === "reveal") return renderQuestion(true);
    if (p === "board") return renderBoard();
    if (p === "final") return renderFinal();
  }

  function show(...nodes) {
    const keep = [...root.querySelectorAll(".h-toast")];
    root.replaceChildren(...nodes, ...keep);
  }

  function renderDown() {
    show(
      el("h2", "h-title", "Quiz"),
      el("p", "h-sub", "Keine Verbindung zur Datenbank. Vielleicht blockiert das WLAN Firebase."),
      el("p", "h-sub", "Plan B: Die Fragen am Beamer zeigen, die Klasse antwortet laut oder mit Handzeichen."),
      el("div", "h-actions", null, [button("Ohne Laptops spielen", "btn-primary", () => { mode = "offline"; state = { phase: "lobby", q: 0 }; render(); })])
    );
  }

  function renderLobby() {
    if (mode === "offline") {
      return show(
        el("h2", "h-title", "Quiz ohne Laptops"),
        el("p", "h-sub", "Ich zeige die Fragen. Ihr antwortet mit Handzeichen: A, B, C oder D."),
        el("div", "h-actions", null, [button("Quiz starten →", "btn-primary", startQuiz)])
      );
    }
    const ids = playerIds();
    const chips = el("div", "chips", null, ids.map(uid => {
      const c = el("button", "chip", players[uid].name);
      c.title = canControl() ? "Klicken zum Rauswerfen" : "";
      c.disabled = !canControl();
      c.addEventListener("click", () => kick(uid));
      return c;
    }));
    show(
      el("h2", "h-title", "Mach mit beim Quiz!"),
      el("p", "h-sub", "Tippe diese Adresse in deinen Laptop:"),
      el("div", "h-url", quizAddress()),
      el("p", "h-count", ids.length === 1 ? "1 Spieler ist dabei" : ids.length + " Spieler sind dabei"),
      chips,
      hostControls([
        button("Quiz starten →", "btn-primary", startQuiz),
        button("Neues Spiel", null, resetGame)
      ])
    );
  }

  // Unten: Knöpfe für den Spielleiter oder das Anmeldeformular.
  function hostControls(buttons) {
    if (canControl()) {
      const row = el("div", "h-actions", null, buttons);
      if (isHost) {
        const out = el("button", "linkish", "Abmelden");
        out.addEventListener("click", () => live.auth.signOut());
        row.appendChild(out);
      }
      return row;
    }
    if (!showLogin) {
      const b = el("button", "linkish", "Spielleiter-Anmeldung");
      b.addEventListener("click", () => { showLogin = true; render(); });
      return el("div", "h-actions", null, [b]);
    }
    const email = el("input"); email.type = "email"; email.placeholder = "E-Mail"; email.autocomplete = "username"; email.value = loginEmail;
    const pass = el("input"); pass.type = "password"; pass.placeholder = "Passwort"; pass.autocomplete = "current-password";
    const go = el("button", "btn-primary", "Anmelden"); go.type = "submit";
    const form = el("form", "h-login", null, [email, pass, go, loginMsg ? el("span", "h-err", loginMsg) : null]);
    form.addEventListener("submit", async ev => {
      ev.preventDefault();
      loginEmail = email.value.trim();
      try {
        await live.auth.signInWithEmailAndPassword(email.value.trim(), pass.value);
        showLogin = false; loginMsg = "";
      } catch (err) {
        console.warn(err);
        loginMsg = "E-Mail oder Passwort stimmt nicht.";
      }
      render();
    });
    setTimeout(() => (loginEmail ? pass : email).focus(), 0);
    return el("div", "h-actions", null, [form]);
  }

  function renderQuestion(reveal) {
    const qi = state.q;
    const item = Q[qi];
    const qa = answersFor(qi);
    const counts = [0, 0, 0, 0];
    Object.keys(qa).forEach(uid => { if (uid in players && qa[uid]) counts[qa[uid].choice]++; });
    const total = counts.reduce((a, b) => a + b, 0);

    const tiles = el("div", "tiles", null, window.answerOrder(qi).map((orig, pos) => {
      const t = el("div", "tile c" + pos, null, [
        el("span", "letter l" + pos, LET[pos]),
        el("span", "tile-text", item.a[orig])
      ]);
      if (reveal) {
        t.classList.add(orig === 0 ? "correct" : "dim");
        if (mode === "live") {
          t.appendChild(el("span", "cnt", String(counts[orig])));
          const bar = el("span", "bar");
          t.appendChild(bar);
          timers.push(setTimeout(() => { bar.style.width = (total ? counts[orig] / total * 100 : 0) + "%"; }, 50));
        }
      }
      return t;
    }));

    const n = Object.keys(players).length;
    const status = mode === "live"
      ? el("span", "answered", null, [el("strong", null, String(answeredCount(qi))), document.createTextNode(" von " + n + " haben geantwortet")])
      : el("span");

    const buttons = reveal
      ? [button(mode === "offline" ? (qi < Q.length - 1 ? "Nächste Frage →" : "Ende →") : "Zwischenstand →", "btn-primary", () => primary())]
      : [button(mode === "offline" ? "Auflösen →" : "Frage beenden", "btn-primary", () => endQuestion())];

    show(
      el("div", "h-top", null, [el("span", null, "Frage " + (qi + 1) + " von " + Q.length), status]),
      el("h2", "h-question", item.q),
      tiles,
      reveal ? el("p", "h-info pop", item.info) : null,
      hostControls(buttons)
    );
  }

  function sortedScores() {
    return Object.keys(scores)
      .filter(uid => uid in players)
      .map(uid => scores[uid])
      .sort((a, b) => a.rank - b.rank || b.total - a.total || a.name.localeCompare(b.name));
  }

  function renderBoard() {
    const rows = sortedScores().slice(0, 10);
    const table = el("table", "h-table", null, [el("tbody", null, null, rows.map((s, i) => {
      const move = s.prevRank ? s.prevRank - s.rank : 0;
      const tr = el("tr", "row-in", null, [
        el("td", "r", s.rank + "."),
        el("td", "n", s.name),
        el("td", "d " + (s.delta > 0 ? "plus" : "minus"), pts(s.delta)),
        el("td", "t", String(s.total).replace("-", "−")),
        el("td", "m " + (move > 0 ? "up" : move < 0 ? "down" : ""), move > 0 ? "▲" + move : move < 0 ? "▼" + -move : "")
      ]);
      tr.style.animationDelay = (i * 0.07) + "s";
      return tr;
    }))]);
    const last = state.q >= Q.length - 1;
    show(
      el("h2", "h-title", last ? "Endstand" : "Zwischenstand"),
      el("p", "h-sub", "nach Frage " + (state.q + 1) + " von " + Q.length),
      rows.length ? table : el("p", "h-sub", "Noch keine Spieler."),
      hostControls([button(last ? "Zur Siegerehrung →" : "Nächste Frage →", "btn-primary", nextQuestion)])
    );
  }

  // ---------- Siegerehrung ----------
  function renderFinal() {
    if (mode === "offline") {
      show(el("h2", "h-title pop", "Danke fürs Mitspielen!"), hostControls([button("Neues Spiel", null, resetGame)]));
      timers.push(setTimeout(confetti, 300));
      return;
    }
    const top = sortedScores().slice(0, 5);
    const runners = el("div", "runners");
    const podium = el("div", "podium");
    const drum = el("p", "drum", "");
    const steps = {};
    [2, 1, 3].forEach(place => {
      const s = top[place - 1];
      const step = el("div", "step p" + place, null, [
        el("div", "who", null, s ? [el("div", "who-name", s.name), el("div", "who-pts", "0")] : []),
        el("div", "block", String(place))
      ]);
      steps[place] = { step, s };
      podium.appendChild(step);
    });

    show(el("h2", "h-title", "Siegerehrung"), runners, drum, podium, hostControls([button("Neues Spiel", null, resetGame)]));

    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    [[5, 600], [4, 1800]].forEach(([place, ms]) => {
      const s = top[place - 1];
      if (!s) return;
      at(ms, () => {
        runners.appendChild(el("div", "runner", null, [
          el("span", "runner-place", place + "."),
          el("span", null, s.name),
          el("span", "runner-pts", s.total + " Punkte")
        ]));
      });
    });
    const reveal = (place, ms) => at(ms, () => {
      const { step, s } = steps[place];
      step.classList.add("show");
      if (s) countUp(step.querySelector(".who-pts"), s.total, 1200);
    });
    reveal(3, 3200);
    reveal(2, 5000);
    at(6800, () => { drum.textContent = "Und Platz 1 geht an …"; drum.classList.add("show"); });
    reveal(1, 8800);
    at(8900, () => { drum.classList.remove("show"); confetti(); });
  }

  function countUp(node, target, ms) {
    const start = performance.now();
    function step(t) {
      const k = Math.min(1, (t - start) / ms);
      node.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + " Punkte";
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function confetti() {
    const canvas = el("canvas", "confetti");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const W = canvas.width = innerWidth;
    const H = canvas.height = innerHeight;
    const colors = ["#d2ad62", "#f1e9da", "#e2c07a", "#b5523b", "#4f8a5b", "#3f6fa8"];
    const parts = Array.from({ length: 220 }, () => ({
      x: Math.random() * W,
      y: -20 - Math.random() * H * 0.6,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 10,
      vx: -1.5 + Math.random() * 3,
      vy: 2 + Math.random() * 3.5,
      r: Math.random() * Math.PI,
      vr: -0.15 + Math.random() * 0.3,
      c: colors[Math.floor(Math.random() * colors.length)]
    }));
    const end = performance.now() + 6000;
    function frame(t) {
      ctx.clearRect(0, 0, W, H);
      parts.forEach(p => {
        p.x += p.vx + Math.sin(p.y / 40);
        p.y += p.vy;
        p.r += p.vr;
        if (t < end && p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r)));
        ctx.restore();
      });
      if (t < end + 4000) requestAnimationFrame(frame);
      else canvas.remove();
    }
    requestAnimationFrame(frame);
  }

  window.Host = { init, primary };
})();
