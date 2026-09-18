# Zug um Zug – Edition United Kingdom (v0.90, ENTWURF)

Kartenpaket fuer die Zug-um-Zug-Plattform: `united_kingdom_karte.json`, `united_kingdom_karte.jpg` (1974x2940, board_h 1489), `auftrag_united_kingdom.jpg` (700x1120, Italia-Stil), `editor_united_kingdom.html`, 16 Technologie-Karten `uk_tech_*.jpg` (Querformat 335x217).

## Eckdaten
- 2–4 Spieler, 35 Waggons pro Spieler
- Kartendeck: 12 pro Farbe + 20 Loks = 116 Karten; Starthand 4 + 1 Lok
- 4 gleichfarbige Karten = 1 Lok (mit Booster: 3); bei 3+ offenen Loks wird NICHT abgeworfen
- Auftraege: Start 5 ziehen / 3 behalten; Nachziehen 3 / 1 behalten
- Doppelstrecken frei ab 3 Spielern; Punkte 1/2/4/7/10/15 (Laenge 7: 18, extrapoliert – siehe Pruefpunkte)
- Keine Boni fuer laengste Strecke o.ae. (nur ueber Technologien)

## Kernmechanik Technologien & Konzessionen
- Zu Spielbeginn duerfen nur Strecken der Laenge 1–2 **in England** gebaut werden, keine Faehren. Ausnahme: Southampton–New York (jederzeit baubar, fix 40 Punkte, normale Bezahlung).
- Zu Beginn des eigenen Zuges darf **genau 1** Technologie gegen Loks gekauft werden.
- Konzessionslogik ueber Knotenfeld `land`: Eine Strecke ist nur baubar, wenn der Spieler fuer jedes Nicht-England-Land ihrer beiden Endpunkte die Konzession besitzt (wales / schottland / irland+frankreich). `atlantik` (New York) braucht keine Konzession.
- Frankreich hat 2 Einmuendungen (`france_1`, `france_2`), gruppiert ueber `stadt: frankreich` – zaehlt fuer Auftraege/Verbindungen als EIN Ort (wie Essen in Langenberg).
- Standard-Technologien: unbegrenzt verfuegbar, je Spieler max. 1 (Ausnahmen im JSON: Wegerecht 1x im Spiel, zurueck in Auslage).
- Fortgeschrittene Technologien (Dampfstrahlpumpen 1x, Wassertender 2x, Riskante Vertraege 1x, Ausgleichshebel 1x, Dieselantrieb 1x) sind als **Lobby-Option** gedacht; Riskante Vertraege/Ausgleichshebel nur bis zum 1. Neumischen kaufbar.
- Faehren: `faehre: N` = Anzahl Loks, die beim Bau enthalten sein muessen (1 Lok pro Lok-Symbol auf dem Brett).

## Strecken (115, alle geprueft: false)
| Nr | Von | Nach | Farbe | L | Loks | Hinweis |
|---|---|---|---|---|---|---|
| 1 | stornoway | wick | grau | 5 | 2 | Lok-Anzahl (2?) pruefen |
| 2 | stornoway | ullapool | grau | 1 | 1 |  |
| 3 | stornoway | fort_william | grau | 6 | 1 | Laenge 6 und Lok-Anzahl pruefen |
| 4 | ullapool | wick | gelb | 3 |  |  |
| 5 | wick | inverness | rot | 2 |  |  |
| 6 | ullapool | inverness | orange | 2 |  |  |
| 7 | ullapool | fort_william | pink | 3 |  |  |
| 8 | inverness | fort_william | schwarz | 3 |  |  |
| 9 | inverness | dundee | blau | 3 |  |  |
| 10 | inverness | aberdeen | pink | 3 |  | Laenge 3 oder 4? |
| 11 | wick | aberdeen | grau | 4 |  | Laenge pruefen |
| 12 | aberdeen | dundee | weiss | 1 |  |  |
| 13 | aberdeen | edinburgh | grau | 4 | 1 | Fähre: Lok-Anzahl pruefen |
| 14 | aberdeen | newcastle | grau | 7 | 1 | Laenge 7 und Loks pruefen |
| 15 | dundee | edinburgh | gelb | 1 |  |  |
| 16 | dundee | edinburgh | rot | 1 |  |  |
| 17 | fort_william | dundee | gruen | 3 |  |  |
| 18 | fort_william | glasgow | orange | 2 |  |  |
| 19 | glasgow | edinburgh | blau | 1 |  |  |
| 20 | glasgow | edinburgh | schwarz | 1 |  |  |
| 21 | glasgow | stranraer | rot | 2 |  |  |
| 22 | stranraer | edinburgh | weiss | 4 |  | Laenge 3 oder 4? |
| 23 | edinburgh | carlisle | orange | 3 |  |  |
| 24 | edinburgh | newcastle | gruen | 4 |  |  |
| 25 | edinburgh | newcastle | pink | 4 |  |  |
| 26 | londonderry | fort_william | grau | 6 | 1 | Lok-Anzahl pruefen |
| 27 | londonderry | glasgow | grau | 5 | 1 | Lok-Anzahl pruefen |
| 28 | belfast | stranraer | grau | 1 | 1 | Laenge 1 oder 2? |
| 29 | belfast | barrow | grau | 4 | 1 |  |
| 30 | stranraer | carlisle | grau | 3 | 1 | Feldpositionen/Laenge pruefen |
| 31 | dundalk | holyhead | grau | 3 | 1 |  |
| 32 | dublin | holyhead | grau | 2 | 1 | Laenge 2 oder 3? |
| 33 | holyhead | liverpool | grau | 1 | 1 |  |
| 34 | barrow | liverpool | grau | 1 | 1 |  |
| 35 | rosslare | aberystwyth | grau | 4 | 1 |  |
| 36 | rosslare | carmarthen | grau | 4 | 1 | Laenge 4 oder 5? |
| 37 | cork | penzance | grau | 7 | 2 | Laenge 7 und Lok-Anzahl (2?) pruefen |
| 38 | cardiff | plymouth | grau | 4 | 1 | Laenge 3 oder 4, Lok-Anzahl pruefen |
| 39 | londonderry | sligo | gruen | 2 |  |  |
| 40 | sligo | galway | orange | 2 |  |  |
| 41 | sligo | tullamore | blau | 4 |  |  |
| 42 | sligo | dundalk | schwarz | 4 |  |  |
| 43 | londonderry | dundalk | pink | 4 |  |  |
| 44 | londonderry | belfast | orange | 2 |  |  |
| 45 | belfast | dundalk | weiss | 1 |  |  |
| 46 | belfast | dundalk | rot | 1 |  |  |
| 47 | dundalk | dublin | gelb | 2 |  |  |
| 48 | dundalk | dublin | blau | 2 |  |  |
| 49 | tullamore | dublin | gruen | 1 |  |  |
| 50 | tullamore | dublin | orange | 1 |  |  |
| 51 | galway | limerick | gelb | 2 |  |  |
| 52 | galway | tullamore | grau | 2 |  | Laenge pruefen |
| 53 | limerick | tullamore | grau | 2 |  |  |
| 54 | limerick | cork | pink | 2 |  |  |
| 55 | cork | tullamore | gelb | 4 |  |  |
| 56 | tullamore | rosslare | rot | 3 |  |  |
| 57 | cork | rosslare | blau | 2 |  |  |
| 58 | dublin | rosslare | weiss | 2 |  |  |
| 59 | dublin | rosslare | schwarz | 2 |  |  |
| 60 | carlisle | barrow | rot | 1 |  |  |
| 61 | carlisle | newcastle | gelb | 1 |  |  |
| 62 | barrow | leeds | gruen | 2 |  | Endpunkte pruefen (Barrow-Leeds?) |
| 63 | newcastle | leeds | weiss | 2 |  |  |
| 64 | newcastle | leeds | orange | 2 |  |  |
| 65 | newcastle | hull | grau | 5 |  | Laenge 4 oder 5? |
| 66 | liverpool | leeds | schwarz | 2 |  |  |
| 67 | liverpool | manchester | orange | 1 |  |  |
| 68 | liverpool | manchester | pink | 1 |  |  |
| 69 | manchester | leeds | rot | 1 |  |  |
| 70 | manchester | leeds | blau | 1 |  |  |
| 71 | leeds | hull | gelb | 1 |  |  |
| 72 | leeds | nottingham | pink | 3 |  |  |
| 73 | hull | nottingham | schwarz | 3 |  | Laenge pruefen |
| 74 | holyhead | llandrindod_wells | blau | 3 |  |  |
| 75 | manchester | llandrindod_wells | gruen | 3 |  |  |
| 76 | manchester | birmingham | schwarz | 2 |  | Laenge 2 oder 3? |
| 77 | manchester | birmingham | gelb | 2 |  | Laenge 2 oder 3? |
| 78 | nottingham | northampton | orange | 1 |  | Laenge 1 oder 2? |
| 79 | holyhead | aberystwyth | grau | 3 |  |  |
| 80 | aberystwyth | carmarthen | gelb | 1 |  |  |
| 81 | aberystwyth | llandrindod_wells | weiss | 1 |  |  |
| 82 | carmarthen | cardiff | rot | 1 |  | Endpunkte pruefen (Carmarthen-Cardiff?); Carmarthen-Llandrindod evtl. nicht vorhanden |
| 83 | llandrindod_wells | cardiff | pink | 1 |  | Laenge 1 oder 2? |
| 84 | llandrindod_wells | birmingham | rot | 2 |  |  |
| 85 | cardiff | birmingham | blau | 3 |  |  |
| 86 | cardiff | birmingham | orange | 3 |  |  |
| 87 | birmingham | northampton | gruen | 1 |  |  |
| 88 | birmingham | reading | weiss | 3 |  | Laenge pruefen |
| 89 | nottingham | norwich | weiss | 5 |  | Laenge/Verlauf pruefen |
| 90 | northampton | cambridge | grau | 2 |  |  |
| 91 | cambridge | norwich | rot | 2 |  |  |
| 92 | cambridge | ipswich | schwarz | 1 |  | Laenge 1 oder 2? |
| 93 | norwich | ipswich | gruen | 1 |  |  |
| 94 | northampton | reading | rot | 1 |  | Laenge 1 oder 2? |
| 95 | northampton | london | pink | 1 |  |  |
| 96 | northampton | london | blau | 1 |  |  |
| 97 | cambridge | london | orange | 1 |  |  |
| 98 | cambridge | london | gelb | 1 |  |  |
| 99 | penzance | plymouth | schwarz | 2 |  |  |
| 100 | plymouth | bristol | gelb | 3 |  | Laenge 3 oder 4? |
| 101 | bristol | reading | weiss | 2 |  |  |
| 102 | bristol | southampton | gruen | 2 |  | Laenge 2 oder 3? |
| 103 | reading | london | gruen | 1 |  |  |
| 104 | reading | southampton | orange | 1 |  |  |
| 105 | southampton | london | rot | 2 |  |  |
| 106 | southampton | london | schwarz | 2 |  |  |
| 107 | southampton | brighton | blau | 1 |  | Laenge 1 oder 2? |
| 108 | london | brighton | grau | 2 |  | Laenge 1 oder 2? |
| 109 | brighton | dover | pink | 2 |  |  |
| 110 | london | dover | grau | 2 |  |  |
| 111 | dover | france_2 | grau | 2 | 1 | Loks/Farben Dover-Frankreich pruefen |
| 112 | dover | france_2 | grau | 2 | 1 |  |
| 113 | southampton | france_1 | grau | 2 | 1 |  |
| 114 | southampton | france_1 | grau | 2 | 1 |  |
| 115 | southampton | new_york | grau | 11 | 4 | Laenge (11?) und Lok-Anzahl (4?) am Brett nachzaehlen; feste 40 Punkte |

## Offene Pruefpunkte (am Brett verifizieren)
1. Alle Strecken mit `pruefhinweis` (Laengen 1-vs-2, Faehren-Lok-Zahlen, Laenge-7-Strecken Aberdeen–Newcastle und Cork–Penzance).
2. Southampton–New York: 11 Felder / 4 Loks nachzaehlen (fix 40 Punkte unabhaengig von der Laenge).
3. **Cardiff–Bristol**: auf dem Scan nicht identifiziert – existiert die Strecke? Falls ja, nachtragen.
4. **Carmarthen–Llandrindod Wells**: vermutlich nicht vorhanden (159 gehoert zu Carmarthen–Cardiff) – bitte bestaetigen.
5. Dover–Frankreich: Farben der beiden Parallelstrecken (grau/grau oder grau/gruen?) und Lok-Positionen.
6. Punktetabelle Laenge 7 (aktuell 18) gegen das Original pruefen.
7. Feldpositionen: farbige Felder aus Farberkennung (gut), graue Felder/Faehren approximiert – Feinjustage im Editor.
8. Techkarten-Anzahlen/Regeln gegen das Regelheft querlesen (uebernommen aus deutscher Anleitung, Stand dieser Sitzung).

## Auftraege (57)
Galway–Barrow (12), Belfast–Manchester (9), Northampton–Dover (3), Belfast–Dublin (4), Wick–Edinburgh (5), Birmingham–Cambridge (2), Birmingham–London (4), Bristol–Southampton (2), Cambridge–London (3), Leeds–Manchester (1), Liverpool–Hull (3), Manchester–London (6), Stornoway–Glasgow (7), Londonderry–Birmingham (15), Manchester–Plymouth (8), Edinburgh–Birmingham (12), Limerick–Cardiff (12), Penzance–London (10), Cardiff–London (8), Newcastle–Hull (3), Wick–Dundee (4), Fort William–Edinburgh (3), Stornoway–Aberdeen (5), London–Frankreich (7), Edinburgh–London (15), Inverness–Leeds (13), Ullapool–Dundee (4), Cardiff–Reading (4), Holyhead–Cardiff (4), Stranraer–Tullamore (6), Glasgow–Manchester (11), Dublin–London (15), Galway–Dublin (5), Dundalk–Carlisle (7), Norwich–Ipswich (1), Dublin–Cork (6), Manchester–Norwich (6), Aberdeen–Glasgow (5), Glasgow–Frankreich (19), Inverness–Belfast (10), Cork–Leeds (13), Londonderry–Dublin (6), Leeds–London (6), Leeds–Frankreich (10), Glasgow–Dublin (9), Rosslare–Carmarthen (6), Nottingham–Ipswich (3), Rosslare–Aberystwyth (4), Liverpool–Southampton (6), Plymouth–Reading (5), Londonderry–Stranraer (4), Liverpool–Llandrindod Wells (6), Aberystwyth–Cardiff (2), Newcastle–Southampton (7), London–Brighton (3), Sligo–Holyhead (9), Southampton–London (4)
