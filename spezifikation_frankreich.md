# Zug um Zug Frankreich – Kartenpaket v0.94 · integriert in App v7.64

v0.94: Integrationsfassung – Regeltexte spielerfreundlich formuliert; allemagne_1 auf Davids Editor-Position (v0.93). **In index.html v7.64 integriert** (21. Edition `frankreich`): Erkennung über `meta.gleise`; Spiellogik `g.gleise`/`g.gleisVorrat` (flache Schlüssel `farbe_laenge` gegen Firebase-Array-Umwandlung), Pflicht-Legen nach dem Kartenziehen (`g.frPflicht`, Modal mit Bettliste nach Länge + Direktklick auf grün markierte Betten, Reopen nach Sync), Kreuzungs- und Doppelsperre beim Legen, Farbe der Strecke = Gleisfarbe beim Bau, Gleis-Rückgabe in den Vorrat, Auto-Legen bei Zugzeitüberschreitung, Dock-Kachel 🛤 Gleisvorrat, Gleissteine/Sperr-✕/Legal-Glow auf dem Brett, Starthand aus `regeln.starthandkarten`, `fix()`-Absicherung. Validiert: Node-Syntaxcheck, 20 Bestandseditionen semantisch identisch, 43 jsdom-Logiktests grün (inkl. hostStart-Regression aller 21 Editionen). Testmodus umgeht die Gleispflicht (Betten dort direkt als grau baubar).

v0.92: Korrekturbatch 1 übernommen – alle Städte +10 px nach rechts, Länder-Randknoten auf Davids Editor-Positionen, 45 Feldpositionen aktualisiert, Lorient–Saint-Malo → Länge 2 und Le Mans–Paris → Länge 3 (je 1 Feld entfernt).

v0.91: Winkelkonvention korrigiert (deg = Bildwinkel wie Old West; in v0.90 gespiegelt, daher falsche Steinausrichtung im Editor), Feldmaße einheitlich l=3.1 / w=0.79 für alle Felder inkl. graue Strecken (Vorgabe David).

v0.90: Erstversion zur Abnahme. Integration in index.html erfolgt erst nach Kartenfreigabe (separater Schritt).

## Dateien
| Datei | Inhalt |
|---|---|
| frankreich_karte.json | Komplette Kartendaten (Schema wie Old West, Erweiterungen s. u.) |
| frankreich_karte.jpg | Brettscan, weißer Rand entfernt, 2922×3439 px |
| auftrag_frankreich.jpg | Zielkarten-Hintergrund 700×1120 (ausgeblichenes Brett im Old-West-Stil) |
| editor_frankreich.html | Feld-Editor (Old-West-Vorlage, KW/KH 2922/3439) |
| kontrollbild_frankreich.jpg | Alle 417 Felder magenta + Streckennummern (alles neu ⇒ alles magenta) |
| spezifikation_frankreich.md | Dieses Dokument |

## Umfang
- **61 Knoten**: 42 Städte (Namen wie auf der Karte, inkl. Akzente: Orléans, Besançon, Briançon …) + 19 Gebiets-Zugänge (`rand:true`, gleicher Anzeigename je Gebiet): Belgique 3, Allemagne 3, Suisse 3, Italie 3, Espagne 4, Corse 3.
- **156 Strecken**, 415 Felder:
  - **123 Gleisbetten** (`farbe:null`, `bett:true`) – Längen: 52×2, 37×3, 25×4, 9×5
  - **27 gedruckte farbige 1er** (sofort nutzbar), darunter Dreifach Tours–Orléans (gelb/schwarz/weiß) und Doppel Nantes–Angers, Angers–Tours, Paris–Orléans, Metz–Allemagne, Metz–Nancy, Strasbourg–Allemagne
  - **6 graue Strecken** (sofort nutzbar): Fähren Brest–Cherbourg (6, 1 Lok), Cherbourg–Calais (6, 1 Lok), Perpignan–Corse (5, 1 Lok), Marseille–Corse (3, 1 Lok), Nice–Corse (2, 1 Lok) sowie Toulouse–Avignon (6, ohne Lok)
- **58 Zielkarten** (Liste David, 1:1 übernommen; Schreibweisen an Kartennamen angeglichen)
- **Mehrfachstrecken (Betten)**: Paris–Dijon 3×5, Lyon–Avignon 3×4, Poitiers–Bordeaux 3×4, Dijon–Lyon 3×3, Avignon–Marseille 3×2, Tours–Poitiers 3×2 sowie 18 Doppelbetten

## Schema-Erweiterungen gegenüber Old West
- Gleisbett: `"farbe": null, "bett": true` – Farbe entsteht erst durch das gelegte Gleis.
- `"kreuzt": [nr, …]` an beiden Partnern einer Bettkreuzung (geometrisch ermittelt).
- `"lok_feld"` bei Fähren: Index (1-basiert) des Felds mit Lok-Symbol.
- `meta.gleise`: Vorrat `{farben: 8 Farben, pro_farbe: {2:3, 3:3, 4:1, 5:1}}` = 64 Gleise.
- Regeltexte in `meta`: gleisbettregel, einzelfeldregel, kreuzungsregel, faehrenregel, gebieteregel, doppelregel.

## Regeln (meta.regeln)
Starthand 8 Wagenkarten · Startaufträge 5/3 · Nachziehen 4/1 · Punkte 1/2/4/7/10/15 (Länge 1–6) · Längste Strecke +10 · Globetrotter +15 (Gleichstand: alle) · 40 Waggons · 2–5 Spieler · `doppelstrecken_frei_ab: 3` (Vorgabe David; Regelheft sperrt bei 2–3 Spielern bereits das Legen – umgesetzt wird die Sperre nur bei 2 Spielern).

### Kernmechanik für die spätere Integration
1. Aktion „Wagenkarten nehmen“ ⇒ danach MUSS genau 1 Gleis aus dem Vorrat auf ein leeres Bett passender Länge gelegt werden (legt die Streckenfarbe fest). Gibt es kein legales Bett mehr, entfällt das Legen ersatzlos (Entscheidung David).
2. „Strecke nutzen“: gebautes Gleis geht zurück in den Vorrat. Gedruckte 1er und graue Strecken sind ohne Gleis nutzbar (Fähren: 1 Lokkarte je Lok-Symbol).
3. Kreuzung: Sobald ein Bett aus einer `kreuzt`-Gruppe bebaut/genutzt ist, sind die Partner dauerhaft gesperrt.
4. Gebiete: Strecken in dasselbe Gebiet gelten NICHT als verbunden (Standard-Randknoten-Logik).
5. Rendering-Vorschlag (bestätigt): gelegte Gleise als farbige Felder auf dem Bett, genutzte Strecken in Spielerfarbe; Dock-Kachel „Gleisvorrat“ (8 Farben × Längen mit Restanzahl).

## Kreuzungen (10 Paare)
Saint-Malo–Rouen × Cherbourg–Le Mans · Saint-Malo–Rouen × Le Havre–Le Mans · Brest–Rennes × Lorient–Saint-Malo · Lorient–Le Mans × Rennes–Nantes · Lorient–Le Mans × Rennes–Angers · Nancy–Besançon × Dijon–Mulhouse · Bourges–Brive × Limoges–Clermont-Ferrand · Marseille–Grenoble × Avignon–Briançon · Marseille–Grenoble × Avignon–Nice · Briançon–Marseille × Avignon–Nice
(Die drei letzten entsprechen exakt dem Beispiel im Regelheft: Marseille–Grenoble mit 5er-Gleis, kreuzt Avignon–Briançon und Avignon–Nice.)

## Herkunft & Prüfstand
Städte/Flaggen per Template-Matching (alle 42 Rosetten exakt), Bettfelder per HSV-Farbmaske (347 Detektionen), Rest interpoliert. **Alle Strecken `geprueft:false`**, alles neu ⇒ Kontrollbild komplett magenta.

Bitte besonders prüfen (Feldpositionen teils interpoliert, Kandidaten für Korrekturbatch 1):
- Felder AN Kreuzungen (interpoliert, liegen bewusst übereinander)
- Rodez–Lyon (5): auffällig großer Abstand vom letzten Feld nach Lyon
- Marseille–Nice Doppel (2+2): große Lücke am Marseille-Ende (Küstenführung)
- Tours–Poitiers Dreifach: mittlere/östliche Spur teilinterpoliert
- Bordeaux–Toulouse Doppel (4+4): 2 Felder interpoliert
- Toulouse–Espagne Doppel: westliche Spur ggf. leicht versetzt
- Fähre Cherbourg–Calais: Feldpositionen entlang des Bogens genähert
- Toulouse–Avignon grau 6: als OHNE Lok erfasst – bitte bestätigen
- Flaggenpositionen corse_2/corse_3 aus Sichtprüfung

## Korrekturprotokoll
Wie gehabt: Rückmeldungen gesammelt als Batch (Editor-Export oder Liste), ich merge kumulativ und liefere v0.91 etc. Nach Kartenabnahme folgt die Integration in index.html inkl. neuer Spiellogik (g.gleise, g.gleisVorrat, Pflicht-Legen, Kreuzungssperre, Gleis-Rückgabe, Dock-Kachel).
