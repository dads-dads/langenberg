# Spezifikation: Zug um Zug Indien (Edition „Indien")

**Datenstand:** `indien_karte.json` v0.94 · integriert in index.html v7.14
**Quelle Regeln:** Offizielles Regelheft „Zug um Zug – Indien" (Days of Wonder, dt. Sektion), Projektdatei `Spielregeln_Zug_um_Zug_Indien.pdf`

## Grunddaten

| Eigenschaft | Wert |
|---|---|
| Spieler | 2–4 |
| Waggons pro Spieler | 45 |
| Starthandkarten | 4 |
| Startaufträge | 4 ziehen, mind. 2 behalten |
| Aufträge nachziehen | 3 ziehen, mind. 1 behalten |
| Zielkarten gesamt | 58 (JSON: 58 ✓) |
| Städte | 39 |
| Strecken | 108 |
| Farben | rot, orange, gelb, grün, blau, pink, weiß, schwarz, grau |

## Punktetabelle

| Länge | 1 | 2 | 3 | 4 | 6 | 8 |
|---|---|---|---|---|---|---|
| Punkte | 1 | 2 | 4 | 7 | 15 | 21 |

Länge 6 = 15 Punkte ist eine Abweichung vom Klassiker (dort keine 6er/15 auf dieser Karte gedruckt lesbar); von David bestätigt. Vorkommende Längen nach Korrekturrunde 2: 1×31, 2×47, 3×17, 4×9, 6×3, 8×1.

## Sonderregeln

### Doppelstrecken
Regelheft: **Nur in Partien zu viert dürfen beide Gleise einer Doppelstrecke genutzt werden.** Bei 2–3 Spielern kann ein beliebiges der beiden Gleise genutzt werden; sobald eines belegt ist, ist das andere für die Partie gesperrt.

> **Entschieden (David):** `doppelstrecken_frei_ab: 3` – Plattform-Standard („Doppelstrecken immer ab 3"), bewusste Abweichung vom Regelheft, das erst ab 4 Spielern beide Gleise freigibt.

### Fähren
Graue Strecken mit Lokomotiv-Symbolen. Pro Symbol muss eine **Lokomotivkarte** gezahlt werden; die restlichen Felder mit Wagenkarten einer Farbe (Loks als Joker weiterhin erlaubt).

Fährstrecken (v0.91):

| Strecke | Länge | Loks | Doppel |
|---|---|---|---|
| Karachi – Bombay | 6 | 2 | ja (2×) |
| Bombay – Calicut | 6 | 2 | nein |
| Calcutta – Madras | 8 | 2 | **nein** (Einzelstrecke) |
| Calcutta – Chittagong | 2 | 1 | ja (2×) |
| Calicut – Quilon | 2 | 1 | ja (2×) |

### Mandala-Bonus („Große Indientour")
Jede Zielkarte, deren beide Städte durch **mindestens zwei verschiedene durchgehende eigene Strecken** verbunden sind, qualifiziert sich. Die Wege dürfen sich kreuzen, aber **keine gemeinsamen Waggons** benutzen. Auswertung am Spielende, zusätzlich zu den Zielkartenpunkten:

| Qualifizierte Zielkarten | 1 | 2 | 3 | 4 | 5+ |
|---|---|---|---|---|---|
| Bonus kumulativ | 5 | 10 | 20 | 30 | 40 (Maximum) |

Ab der 6. qualifizierten Karte keine weiteren Punkte.

### Indian Express (längste Strecke)
10 Bonuspunkte für die längste durchgehende Strecke; bei Gleichstand erhalten alle Beteiligten 10 Punkte. (`laengste_strecke_bonus: 10`, `meiste_auftraege_bonus: 0` – es gibt keinen Globetrotter-Bonus.)

## Plattform-Spezifika (Zug um Zug Online)

- `statId`: „Zug um Zug Indien" – Ranglisten rechnen aus `ergebnisse` neu
- Zugzeit pro Spiel frei einstellbar; nach Ablauf automatisch 2 Karten vom verdeckten Stapel
- Wiedereinstieg mit Name + PIN
- Kartenbild: `indien_karte.jpg` (2400×3588 px, `board_h: 1495`), Ticketbild: `auftrag_indien.jpg`
- Ticket-Minikarte: `tk_vb` 592×914, hochkant, Einzelziel-Layout; tkx/tky aus Scan gefittet (Residuum ~10 px)
- Feldgröße global: `l = 4.08` (% Breite), `w = 0.88` (% Höhe) – Stand nach 3× Kürzer / 4× Schmaler

## Änderungshistorie

- **v0.90** – Erstentwurf aus gestitchten Scans, alle Strecken `geprueft: false`
- **v0.91** – Korrekturrunde 1: 23 Längenkorrekturen, 3 Doppelstrecken-Längen, Calcutta–Madras Doppel→Einzel (2 Loks), Wadi–Bezwada gelöscht, Bhopal–Khandwa orange 3 → blau 2, neu: Raipur–Calcutta blau 4 und Khandwa–Raipur orange 4, Bareilly–Lucknow 2 → 1. Alle Unsicherheiten aus v0.90 aufgelöst. Feldgröße global reduziert. 31 Strecken `geprueft: true`.
- **v0.92** – Editor-Positionsrunde 1 gemerged (26 Knoten, 237 Felder). Korrekturrunde 2: 10 Kürzungen (je letztes/verschobenes Feld entfernt), Khandwa–Manmad schwarz 2 → rot 1, Bombay–Manmad blau gelöscht + schwarz → 1er Einzelstrecke, Bhopal–Raipur orange gelöscht, neu: Manmad–Poona grau 1 und Mormugau–Wadi grau 2. 45 Strecken `geprueft: true`.
- **v0.93** – Mormugau–Wadi-Positionen gemerged; `doppelstrecken_frei_ab: 3` von David bestätigt.
- **v0.94** – Integration in `index.html` (App v7.14): tkx/tky von Pixeln auf Prozent umgerechnet; Mandala-Bonus in Endabrechnung, Showdown und Abrechnungstabelle implementiert (streckendisjunkter Doppelweg-Check per Einheitsfluss); Indian Express über `laengste_strecke_bonus: 10`; Fähren nutzen die vorhandene Lok-Pflicht-Logik.

## Offene Punkte

1. Manmad–Poona grau 1 ist noch interpoliert (Mittelpunkt) – ggf. im Editor nachziehen
2. `indien_karte.jpg` und `auftrag_indien.jpg` müssen im GitHub-Pages-Repo liegen
3. Testspiel: Mandala-Auswertung live gegenprüfen
