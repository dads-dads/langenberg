# Übergabepaket: Edition „Schweiz" (v0.92) – Integrations-Spezifikation

Datenstand: final, alle 88 Strecken im Editor geprüft und positioniert.
Dateien: `schweiz_karte.json` (Kartendaten), `schweiz_karte.jpg` (2400×1608, board_h 670),
`editor_schweiz.html` (für spätere Feinjustagen).

## Eckdaten
- 2–3 Spieler, **40 Waggons** pro Spieler (statt 45)
- 51 Knoten: 34 Städte + 17 Grenzknoten (`rand: true`) in vier Ländergruppen
  über das `stadt`-Attribut: frankreich (4), deutschland (5), oesterreich (3), italien (5)
- 88 Strecken (205 Felder), davon 37 Tunnel, 12 Doppelrouten-Paare
- Wertung: 1/2/4/7/10/15 für Längen 1–6; längste durchgehende Strecke +10
  (auf dem Brett „Transalpine Express")
- Doppelstrecken: `doppelstrecken_frei_ab: 3` (Hausregel wie alle Editionen;
  offiziell wäre Schweiz „ab 3 beide Gleise", deckungsgleich)
- AUSSEN_ORTE wie etabliert aus den `rand: true`-Knoten ableiten, NICHT hardcoden

## Sonderregeln (müssen in der App umgesetzt werden)

### 1. Tunnel (wie Europa-Edition, bereits vorhandene Mechanik)
`tunnel: true`-Strecken: Karten auslegen, 3 Karten vom Nachziehstapel aufdecken,
pro Farbtreffer (inkl. Lok) eine Zusatzkarte derselben Farbe oder Lok nachlegen,
sonst Karten zurücknehmen und Zug beenden. Bei rein mit Loks bezahltem Tunnel
zählen nur aufgedeckte Loks als Treffer.

### 2. Lok-Sonderregel (NEU für diese Edition)
- Loks können wie normale Wagenkarten gezogen werden, auch **2 offene pro Zug**.
- Liegen **3 Loks offen** aus, wird die komplette 5er-Auslage ersetzt.
- Loks dürfen **ausschließlich für Tunnelstrecken** eingesetzt werden,
  nie für normale Strecken.

### 3. Zielkarten-Handling (NEU)
- Start: **5 ziehen, mind. 2 behalten**; Nachziehen: 3 / mind. 1.
- Abgelehnte Zielkarten werden **aus dem Spiel entfernt** (nicht unter den
  Stapel) → der Zielkartenstapel kann sich erschöpfen (`auftraege_entfernen: true`).

### 4. Länderaufträge (NEU, erweitertes Auftragsformat)
12 der 46 Aufträge haben `typ: "land"` und statt `nach`/`punkte` eine Liste:
`{von, typ: "land", ziele: [{nach: "Frankreich", punkte: 5}, ...]}`
- 4 Stadt→Land-Karten (Chur, Bern, Zürich, Lugano) und 8 Land→Land-Karten
  (die 4 Typen Frankreich/Deutschland/Italien/Österreich je **zweimal** im Stapel).
- Erfüllung: Verbindung von `von` zu einem beliebigen Knoten der jeweiligen
  Ländergruppe (jede Flagge zählt für ihr Land).
- Wertung am Spielende: die **höchste** erreichte Zielverbindung zählt.
  Wurde **keines** der Ziele erreicht: Abzug des **niedrigsten** Werts der Karte.
- Land→Land: Start ist ein beliebiger Knoten des Ausgangslandes.

## Ticketkarten-Rendering
- `tk_vb` 959×621 (quer), `tkx`/`tky` je Knoten per Affin-Fit aus einem
  Kartenscan (Residuum 3,8 px auf 32 Städten). Grenzknoten-Positionen sind
  projizierte Länderzonen-Punkte (keine gedruckten Vorlagen).
- `tk_titel`/`tk_punkte` sind sinnvolle Startwerte, ggf. an das finale
  `auftrag_schweiz.jpg` anpassen (Hintergrundbild noch zu erstellen; die
  Original-Kartentypen: Stadt-Stadt mit Ringen+Linie, Stadt-Land mit
  Pfeilrosette, Land-Land mit Doppelpfeil und Uhren-Punktwerten).
- Länderaufträge brauchen eine eigene Darstellungsvariante
  (mehrere Ziele + Punktwerte statt einer Linie).

## Statistik
`statId: "Zug um Zug Schweiz"`; Totale wie etabliert immer aus gespeicherten
Ergebnissen rechnen (kein Akkumulator).

## Offene Kleinigkeiten
- Tunnelstatus Basel–Baden rot 3: als Normalstrecke übernommen, bei
  Gelegenheit am Brett prüfen.
- Zugzeit/Kennwort-Hausregeln 1:1 wie bei Afrika/Skandinavien übernommen.
