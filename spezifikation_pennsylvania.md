# Spezifikation „Zug um Zug Pennsylvania" – Kartenpaket v0.93 (Entwurf, 11.09.2026)

## Dateien
| Datei | Zweck |
|---|---|
| `pennsylvania_karte.json` | Kartendaten (Meta, 36 Knoten, 93 Streckeneinträge, 50 Zielkarten, Anteilsschein-Definitionen) |
| `pennsylvania_karte.jpg` | Spielplan 2214×1476 (unbeschnitten, Zählleiste bleibt wie bei Große Seen), `board_h` 667 |
| `auftrag_pennsylvania.jpg` | Zielkarten-Hintergrund im Iberia-Stil 1120×700 (ausgeblichenes Brett), `tk` = 206/170/707×471 |
| `penn_anteil_<key>.jpg` (9×) + `penn_anteil_hinten.jpg` | Anteilsscheine 900×581, aufrecht gedreht |
| `editor_pennsylvania.html` | Feld-Editor (Iberia-Vorlage, JSON eingebettet, Bild `pennsylvania_karte.jpg` daneben legen) |
| `kontrollbild_pennsylvania.png` | Render der Erstlesung (Feldrahmen + Streckennummern) |

## Bestätigte Regeln / Entscheidungen
- Schlüssel `pennsylvania`, Schreibweise wie auf dem Brett: **„Pittsburg"** (ohne h). Deine Zielkartenliste schreibt „Pittsburgh" – 6 Zielkarten wurden auf „Pittsburg" gemappt; „Scranton/Wilkes Barre" → „Scranton / Wilkes Barre".
- 2–5 Spieler, 45 Waggons, 110 Wagenkarten (Standard), 4 Starthandkarten.
- Zielkarten: 50; Start 5 ziehen / mind. 3 behalten; Nachziehen 4 / mind. 1; zurückgegebene unter den Stapel.
- Doppelstrecken frei ab 3 Spielern.
- Punkte 1/2/4/7/10/15; **Länge 7 → 18, Länge 8 → 21** (Megagame-Konvention, betrifft Binghamton–Albany 7, Albany–New York 8, Cumberland–Baltimore 8) – bitte bestätigen oder Werte nennen.
- Bonus: nur Globetrotter 15 (meiste erfüllte Zielkarten, Gleichstand: alle). Kein Längste-Strecke-Bonus.
- Ontario: zwei getrennte Knoten `ontario_west` (Fähre von Erie) und `ontario_ost` (Fähre von Buffalo), `stadt: "ontario"`, nicht miteinander verbunden; für Zielkarten zählt jeder der beiden.
- Fähren: Erie–Ontario doppelt grau 3 mit je 2 Lok-Symbolen (Felder 1+2), Buffalo–Ontario grau 2 mit 2 Lok-Symbolen. Pro Lok-Symbol eine Lok, Rest beliebige Farbe.
- 2-Spieler-Sonderregel (neutraler Spieler): weggelassen.

## Anteilsscheine (Kernmechanik)
60 Scheine, 9 Gesellschaften, je aufsteigend sortiert (Schein 1 oben):

| Key | Gesellschaft | Scheine | Punkte Platz 1… |
|---|---|---|---|
| prr | Pennsylvania Railroad | 15 | 30/21/14/9/6 |
| bo | Baltimore & Ohio Railroad | 10 | 20/14/9/5/2 |
| erie | Erie Lackawanna Railway | 8 | 16/10/5/1 |
| reading | Reading Railroad | 7 | 14/9/5 |
| lv | Lehigh Valley Railroad | 6 | 12/7/3 |
| nyc | New York Central System | 5 | 10/6/3 |
| wm | Western Maryland Railway | 4 | 9/5 |
| jcl | Jersey Central Line | 3 | 8/5 |
| brp | Buffalo, Rochester & Pittsburgh Railway | 2 | 7/4 |

Ablauf (für die spätere Integration in `index.html`):
1. Spielstart: `g.anteile = {key: [1..karten]}` (Sequenz oben = Schein 1). Stapel mit Restanzahl für alle sichtbar.
2. Nach jedem Streckenbau: hat die Strecke `anteile` (Logos), erscheint ein Auswahl-Dialog „Schein nehmen von … / verzichten". Leere Gesellschaft ist nicht wählbar. Strecken ohne Logos: kein Dialog.
3. Genommener Schein wandert nach `p.anteile` (Liste `{ges, nr, seq}`, `seq` = globale laufende Nummer für den Tie-Break). `p.anteile` in die `fix()`-Whitelist aufnehmen; nur der Besitzer sieht seine Scheine (Rückseite `penn_anteil_hinten.jpg` für andere).
4. Endwertung je Gesellschaft: Spieler nach Anzahl absteigend, Gleichstand → kleinere minimale `seq` (früher investiert) gewinnt. Plätze laut `punkte`; 0 Scheine → 0 Punkte; mehr Spieler als Plätze → leer.

## Streckenliste (Erstlesung, alle `geprueft: false`)
| Nr | Strecke | Farbe | Länge | Fähre | Doppel mit | Anteile (Logos) |
|---|---|---|---|---|---|---|
| 1 | Ontario – Erie | grau | 3 | Lok x2 | 2 | prr, erie, nyc |
| 2 | Ontario – Erie | grau | 3 | Lok x2 | 1 | prr, erie, nyc |
| 3 | Buffalo – Ontario | grau | 2 | Lok x2 |  | prr, erie, nyc |
| 4 | Erie – Buffalo | orange | 5 |  | 5 | erie, nyc |
| 5 | Erie – Buffalo | weiss | 5 |  | 4 | erie, nyc |
| 6 | Erie – Warren | blau | 3 |  |  | prr, erie, nyc |
| 7 | Erie – Oil City | schwarz | 3 |  |  | prr, erie, nyc |
| 8 | Erie – Youngstown | gelb | 4 |  | 9 | erie, nyc |
| 9 | Erie – Youngstown | gruen | 4 |  | 8 | erie, nyc |
| 10 | Buffalo – Warren | gruen | 4 |  |  | prr, erie, bo, brp |
| 11 | Buffalo – Rochester | gelb | 5 |  | 12 | bo, erie, lv, nyc, brp |
| 12 | Buffalo – Rochester | schwarz | 5 |  | 11 | bo, erie, lv, nyc, brp |
| 13 | Buffalo – Coudersport | grau | 4 |  |  | prr, erie |
| 14 | Warren – Coudersport | grau | 4 |  |  | prr, erie, bo, nyc, brp |
| 15 | Warren – Oil City | orange | 2 |  |  | prr, erie, bo |
| 16 | Warren – Dubois | schwarz | 3 |  |  | erie, brp |
| 17 | Oil City – Youngstown | weiss | 3 |  |  | erie |
| 18 | Oil City – Pittsburg | rot | 4 |  |  | prr, bo |
| 19 | Oil City – Dubois | pink | 3 |  |  | – |
| 20 | Youngstown – Wheeling | pink | 5 |  |  | prr, bo, nyc |
| 21 | Youngstown – Pittsburg | orange | 4 |  | 22 | prr, bo, nyc |
| 22 | Youngstown – Pittsburg | blau | 4 |  | 21 | prr, bo, nyc |
| 23 | Wheeling – Pittsburg | gruen | 2 |  | 24 | prr |
| 24 | Wheeling – Pittsburg | weiss | 2 |  | 23 | prr |
| 25 | Wheeling – Morgantown | blau | 3 |  |  | bo |
| 26 | Pittsburg – Morgantown | gelb | 3 |  |  | – |
| 27 | Pittsburg – Johnstown | pink | 4 |  | 28 | prr, bo |
| 28 | Pittsburg – Johnstown | schwarz | 4 |  | 27 | prr, bo |
| 29 | Morgantown – Cumberland | rot | 5 |  |  | wm, bo |
| 30 | Johnstown – Cumberland | grau | 3 |  |  | wm, prr, bo |
| 31 | Johnstown – Altoona | gelb | 1 |  | 32 | prr |
| 32 | Johnstown – Altoona | blau | 1 |  | 31 | prr |
| 33 | Rochester – Syracuse | pink | 4 |  | 34 | lv, nyc |
| 34 | Rochester – Syracuse | blau | 4 |  | 33 | lv, nyc |
| 35 | Rochester – Elmira | gruen | 3 |  |  | prr, erie, bo, lv, nyc, brp |
| 36 | Coudersport – Elmira | orange | 4 |  |  | prr, erie, bo, nyc, brp |
| 37 | Coudersport – Williamsport | gruen | 4 |  |  | prr |
| 38 | Syracuse – Albany | weiss | 6 |  | 39 | nyc |
| 39 | Syracuse – Albany | rot | 6 |  | 38 | nyc |
| 40 | Syracuse – Binghamton | gelb | 2 |  | 41 | erie |
| 41 | Syracuse – Binghamton | orange | 2 |  | 40 | erie |
| 42 | Elmira – Syracuse | schwarz | 4 |  |  | erie, lv |
| 43 | Elmira – Binghamton | weiss | 3 |  |  | erie |
| 44 | Elmira – Towanda | gelb | 2 |  |  | prr, erie, lv |
| 45 | Towanda – Binghamton | rot | 2 |  |  | erie |
| 46 | Binghamton – Albany | pink | 6 |  |  | – |
| 47 | Binghamton – Scranton / Wilkes Barre | schwarz | 3 |  | 48 | erie |
| 48 | Binghamton – Scranton / Wilkes Barre | gruen | 3 |  | 47 | erie |
| 49 | Towanda – Scranton / Wilkes Barre | grau | 3 |  |  | prr, erie, lv |
| 50 | Towanda – Williamsport | schwarz | 2 |  |  | erie, reading |
| 51 | Albany – New York | blau | 6 |  | 52 | prr, bo, nyc |
| 52 | Albany – New York | gruen | 6 |  | 51 | prr, bo, nyc |
| 53 | Dubois – Williamsport | weiss | 6 |  |  | – |
| 55 | Williamsport – Lewiston | gelb | 3 |  |  | prr, reading |
| 56 | Williamsport – Scranton / Wilkes Barre | orange | 5 |  |  | – |
| 57 | Lewiston – Altoona | gruen | 2 |  |  | – |
| 58 | Lewiston – Harrisburg | grau | 2 |  |  | prr |
| 59 | Altoona – Harrisburg | rot | 5 |  | 60 | prr |
| 60 | Altoona – Harrisburg | orange | 5 |  | 59 | prr |
| 61 | Scranton / Wilkes Barre – New York | rot | 5 |  | 62 | erie, lv, jcl |
| 62 | Scranton / Wilkes Barre – New York | pink | 5 |  | 61 | erie, lv, jcl |
| 63 | Scranton / Wilkes Barre – Stroudsburg | gelb | 2 |  |  | reading, lv, jcl |
| 64 | Scranton / Wilkes Barre – Allentown | weiss | 3 |  | 65 | prr, reading, lv, jcl |
| 65 | Scranton / Wilkes Barre – Allentown | blau | 3 |  | 64 | prr, reading, lv, jcl |
| 66 | Stroudsburg – Allentown | orange | 2 |  |  | reading, lv, jcl |
| 67 | New York – Philadelphia | grau | 6 |  | 68 | prr, bo, reading, jcl |
| 68 | New York – Philadelphia | grau | 6 |  | 67 | prr, bo, reading, jcl |
| 69 | New York – Atlantic City | schwarz | 6 |  | 70 | jcl |
| 70 | New York – Atlantic City | weiss | 6 |  | 69 | jcl |
| 71 | Philadelphia – Atlantic City | grau | 2 |  | 72 | prr, reading, jcl |
| 72 | Philadelphia – Atlantic City | grau | 2 |  | 71 | prr, reading, jcl |
| 73 | Allentown – Philadelphia | rot | 3 |  | 74 | prr, reading |
| 74 | Allentown – Philadelphia | schwarz | 3 |  | 73 | prr, reading |
| 75 | Reading – Allentown | gruen | 2 |  |  | reading |
| 76 | Reading – Lancaster | gelb | 1 |  |  | reading |
| 77 | Harrisburg – Reading | pink | 2 |  |  | reading |
| 78 | Harrisburg – Lancaster | grau | 2 |  | 79 | prr |
| 79 | Harrisburg – Lancaster | grau | 2 |  | 78 | prr |
| 80 | Lancaster – Philadelphia | gruen | 4 |  | 81 | prr |
| 81 | Lancaster – Philadelphia | orange | 4 |  | 80 | prr |
| 82 | Harrisburg – York | schwarz | 1 |  |  | prr, wm |
| 83 | York – Lancaster | pink | 1 |  |  | prr |
| 84 | York – Baltimore | weiss | 2 |  |  | wm, prr |
| 85 | York – Gettysburg | grau | 1 |  |  | wm |
| 86 | Gettysburg – Baltimore | rot | 3 |  |  | wm, prr |
| 87 | Harrisburg – Gettysburg | gelb | 2 |  |  | prr, reading |
| 88 | Chambersburg – Harrisburg | blau | 2 |  |  | wm, prr, reading |
| 89 | Chambersburg – Gettysburg | schwarz | 1 |  |  | – |
| 90 | Cumberland – Chambersburg | gruen | 2 |  |  | wm, prr |
| 91 | Cumberland – Baltimore | blau | 7 |  |  | wm, bo |
| 92 | Baltimore – Philadelphia | gelb | 4 |  | 93 | prr, bo |
| 93 | Baltimore – Philadelphia | pink | 4 |  | 92 | prr, bo |
| 94 | Harrisburg – Scranton / Wilkes Barre | grau | 6 |  |  | prr |
| 95 | Dubois – Altoona | grau | 2 |  |  | prr |
