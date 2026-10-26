# Musical Eras · Musikepochen

School project (music): the 7 eras of European music history in chronological order, plus a live quiz for the class.

- `index.html`: presentation, one slide per era, timeline on top, live leaderboard at the end
- `quiz.html`: quiz for classmates (12 questions)
- `epochs.js`: all content of the 7 eras
- `config.js`: Firebase config (**still placeholders**)
- `db.js`: database connection, with fallback if Firebase is not reachable
- `style.css`: shared design

No build step, no framework. Runs directly on GitHub Pages.

## Bedienung

- Präsentation: Pfeiltasten ← →, Leertaste, oder die Buttons unten. Klick auf die Zeitleiste springt zur Epoche.
- PDF für Teams: `index.html` in Chrome/Edge öffnen, `Strg + P`, Ziel „Als PDF speichern“, unter „Weitere Einstellungen“ **Hintergrundgrafiken** anhaken. Jede Folie wird eine Seite.
- Hörbeispiele: Die Buttons öffnen eine YouTube-Suche zum Stück. Wenn du ein bestimmtes Video willst, kopier den Link in `epochs.js` bei `url: ""`.

## Firebase einrichten (machst du selbst)

1. https://console.firebase.google.com, neues Projekt anlegen.
2. „Realtime Database“, Datenbank erstellen, Standort **europe-west1 (Belgien)**.
3. Projekteinstellungen (Zahnrad), unten „Web-App hinzufügen“ (`</>`), den `firebaseConfig`-Block kopieren.
4. Die Werte in `config.js` statt der `PASTE_...`-Platzhalter einsetzen. `databaseURL` muss dabei sein.
5. Regeln (Realtime Database, Tab „Regeln“). Empfohlen, weil nur gültige Punkte (0–12) und kurze Namen angenommen werden:

```json
{
  "rules": {
    "scores": {
      ".read": true,
      "$player": {
        ".write": true,
        ".validate": "newData.hasChildren(['name', 'score', 'timestamp']) && newData.child('name').isString() && newData.child('name').val().length <= 20 && newData.child('score').isNumber() && newData.child('score').val() >= 0 && newData.child('score').val() <= 12"
      }
    }
  }
}
```

Die Firebase-Config darf öffentlich im Repo stehen, sie ist kein Passwort. Den Schutz übernehmen die Regeln.

## Testen

1. Lokal: `index.html` und `quiz.html` per Doppelklick öffnen.
2. Live-Test: Präsentation in einem Tab auf der letzten Folie, Quiz in einem zweiten Tab spielen. Die Rangliste muss sich sofort aktualisieren.
3. Früh im Schul-WLAN auf einem Lenovo-Laptop testen. Wenn Firebase dort blockiert ist, läuft das Quiz trotzdem, nur die Rangliste zeigt einen Hinweis.
