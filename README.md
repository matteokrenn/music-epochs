# Die Epochen der Musik

Schulprojekt Musik: die 7 Epochen der europäischen Musikgeschichte in der richtigen Reihenfolge, dazu ein Live-Quiz für die Klasse.

- `index.html`: Präsentation, eine Folie pro Epoche, Zeitleiste oben. Die letzte Folie ist das Live-Quiz (Spielleiter-Ansicht für den Beamer).
- `quiz.html`: Seite für die Mitschüler auf ihren Laptops
- `epochs.js`: alle Inhalte der 7 Epochen
- `questions.js`: die 12 Quizfragen und die Punkteregeln
- `host.js`: Steuerung des Live-Quiz am Beamer
- `db.js`: Verbindung zu Firebase
- `config.js`: Firebase-Einstellungen
- `database.rules.json`: Sicherheitsregeln für die Datenbank
- `style.css`: gemeinsames Aussehen

Kein Build-Schritt, kein Framework. Läuft direkt auf GitHub Pages.

## Bedienung

- Präsentation: Pfeiltasten ← →, Leertaste, oder die Buttons unten. Klick auf die Zeitleiste springt zur Epoche.
- PDF für Teams: `index.html` in Chrome/Edge öffnen, `Strg + P`, Ziel „Als PDF speichern“, unter „Weitere Einstellungen“ **Hintergrundgrafiken** anhaken. Jede Folie wird eine Seite, die Quiz-Folie wird weggelassen.
- Hörbeispiele: Die Buttons öffnen eine YouTube-Suche zum Stück. Wenn du ein bestimmtes Video willst, kopier den Link in `epochs.js` bei `url: ""`.

## Live-Quiz

1. Auf der letzten Folie „Spielleiter-Anmeldung“ klicken und mit deiner Firebase-E-Mail und deinem Passwort anmelden. Das musst du nur einmal pro Laptop machen.
2. Die Mitschüler tippen die Adresse vom Beamer ein und geben ihren Namen ein. Ein Klick auf einen Namen wirft den Spieler raus, der Name bleibt dann gesperrt.
3. „Quiz starten“. Wenn alle geantwortet haben, wird automatisch aufgelöst, sonst „Frage beenden“ klicken. Danach „Zwischenstand“ und „Nächste Frage“. Die Pfeiltaste → macht immer den nächsten Schritt.
4. Nach Frage 12 kommt die Siegerehrung.
5. „Neues Spiel“ löscht alle Spieler und Punkte, zum Beispiel nach dem Testen.

Punkte: Der schnellste Richtige bekommt 10, der zweite 9 und so weiter, mindestens 1. Falsch gibt −1, keine Antwort −2.

Plan B: Wenn das WLAN Firebase blockiert, zeigt die Quiz-Folie „Ohne Laptops spielen“. Dann laufen die Fragen nur am Beamer, und die Klasse antwortet mit Handzeichen.

## Firebase einrichten

1. Firebase-Konsole → **Authentication** → „Jetzt starten“ → Tab **Anmeldemethode**: **Anonym** aktivieren und **E-Mail/Passwort** aktivieren.
2. Tab **Nutzer** → „Nutzer hinzufügen“: deine E-Mail und ein Passwort. Danach die **Nutzer-UID** in der Liste kopieren.
3. **Realtime Database** → Tab **Regeln**: den Inhalt von `database.rules.json` einfügen, `HIER_DEINE_UID` durch deine UID ersetzen, „Veröffentlichen“.

Die Firebase-Einstellungen in `config.js` dürfen öffentlich sein, sie sind kein Passwort. Den Schutz übernehmen die Regeln: Nur du kannst das Quiz steuern, Spieler können nur ihren eigenen Namen und ihre eigene Antwort eintragen, und das nur einmal pro Frage.
