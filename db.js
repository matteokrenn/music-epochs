// Small wrapper around the Firebase Realtime Database.
// Loads the Firebase SDK from the CDN only if config.js is filled in.
// If anything fails (no config, school Wi-Fi blocks Firebase, offline),
// the pages keep working and show a friendly message instead.
(function () {
  const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  const TIMEOUT_MS = 8000;
  const MAX_NAME = 20;

  function isConfigured(cfg) {
    return !!(cfg && cfg.databaseURL && !String(cfg.databaseURL).includes("PASTE"));
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Could not load " + src));
      document.head.appendChild(s);
    });
  }

  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))
    ]);
  }

  // Clean a player name: no control characters or angle brackets, max 20 chars.
  function cleanName(raw) {
    return String(raw || "")
      .normalize("NFC")
      .replace(/[\u0000-\u001f\u007f<>]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, MAX_NAME);
  }

  // Firebase keys must not contain . # $ [ ] /
  function nameKey(name) {
    return name.toLowerCase().replace(/[.#$\[\]\/]/g, "_");
  }

  const ready = (async () => {
    const cfg = window.FIREBASE_CONFIG;
    if (!isConfigured(cfg)) return null;
    try {
      await withTimeout(loadScript(SDK + "firebase-app-compat.js"), TIMEOUT_MS);
      await withTimeout(loadScript(SDK + "firebase-database-compat.js"), TIMEOUT_MS);
      const app = window.firebase.initializeApp(cfg);
      return app.database();
    } catch (err) {
      console.warn("Firebase not available:", err);
      return null;
    }
  })();

  // Saves the score. Keeps the old entry if it is higher or equal.
  // Resolves to "saved", "kept" or "offline".
  async function saveScore(rawName, score) {
    const name = cleanName(rawName);
    const db = await ready;
    if (!db || !name) return "offline";
    try {
      const ref = db.ref("scores/" + nameKey(name));
      const result = await withTimeout(
        ref.transaction(current => {
          if (current && typeof current.score === "number" && current.score >= score) return; // keep
          return { name, score, timestamp: window.firebase.database.ServerValue.TIMESTAMP };
        }),
        TIMEOUT_MS
      );
      return result.committed ? "saved" : "kept";
    } catch (err) {
      console.warn("Could not save score:", err);
      return "offline";
    }
  }

  // Calls onChange(list) on every change, sorted best first.
  // Calls onChange(null) if the database cannot be reached.
  async function watchScores(onChange) {
    const db = await ready;
    if (!db) return onChange(null);
    let gotData = false;
    const timer = setTimeout(() => { if (!gotData) onChange(null); }, TIMEOUT_MS);
    db.ref("scores").on(
      "value",
      snap => {
        gotData = true;
        clearTimeout(timer);
        const list = [];
        snap.forEach(child => {
          const v = child.val() || {};
          if (typeof v.score === "number") {
            list.push({ name: cleanName(v.name) || "?", score: v.score, timestamp: v.timestamp || 0 });
          }
        });
        list.sort((a, b) => b.score - a.score || a.timestamp - b.timestamp);
        onChange(list);
      },
      err => {
        console.warn("Leaderboard error:", err);
        clearTimeout(timer);
        onChange(null);
      }
    );
  }

  window.DB = { ready, saveScore, watchScores, cleanName, MAX_NAME };
})();
