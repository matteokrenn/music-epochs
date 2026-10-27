// Verbindung zu Firebase (Datenbank + Anmeldung).
// Lädt das Firebase-SDK vom CDN, nur wenn config.js ausgefüllt ist.
// Wenn etwas nicht klappt (keine Config, Schul-WLAN blockiert, offline),
// liefert "ready" null und die Seiten zeigen einen Hinweis statt eines Fehlers.
(function () {
  const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  const TIMEOUT_MS = 10000;
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

  // Name bereinigen: keine Steuerzeichen oder spitzen Klammern, max. 20 Zeichen.
  function cleanName(raw) {
    return String(raw || "")
      .normalize("NFC")
      .replace(/[\u0000-\u001f\u007f<>]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, MAX_NAME);
  }

  // Schlüssel für die Namenssperre: "Max", "max" und " MAX " sind derselbe Name.
  // Firebase-Schlüssel dürfen . # $ [ ] / nicht enthalten.
  function nameKey(name) {
    return cleanName(name).toLowerCase().replace(/[.#$\[\]\/]/g, "_");
  }

  // Nur zum Testen auf dem eigenen Rechner: ?emulator verbindet mit dem Firebase-Emulator.
  const useEmulator = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) && /[?&]emulator\b/.test(location.search);

  const ready = (async () => {
    const cfg = window.FIREBASE_CONFIG;
    if (!isConfigured(cfg)) return null;
    try {
      await withTimeout(loadScript(SDK + "firebase-app-compat.js"), TIMEOUT_MS);
      await withTimeout(Promise.all([
        loadScript(SDK + "firebase-database-compat.js"),
        loadScript(SDK + "firebase-auth-compat.js")
      ]), TIMEOUT_MS);
      const fb = window.firebase;
      const app = fb.initializeApp(cfg);
      const db = app.database();
      const auth = app.auth();
      if (useEmulator) {
        db.useEmulator("127.0.0.1", 9000);
        auth.useEmulator("http://127.0.0.1:9099", { disableWarnings: true });
      }
      return { db, auth, TIMESTAMP: fb.database.ServerValue.TIMESTAMP };
    } catch (err) {
      console.warn("Firebase not available:", err);
      return null;
    }
  })();

  // Wartet, bis die Datenbank wirklich antwortet (z. B. wenn das WLAN Firebase blockiert).
  async function reachable(live) {
    try {
      await withTimeout(live.db.ref("quiz/state").once("value"), TIMEOUT_MS);
      return true;
    } catch (err) {
      console.warn("Database not reachable:", err);
      return false;
    }
  }

  window.Live = { ready, reachable, cleanName, nameKey, MAX_NAME };
})();
