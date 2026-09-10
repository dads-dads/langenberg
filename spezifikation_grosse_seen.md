# Spezifikation „Die Großen Seen" (Karte v0.93)

Stand 07.09.2026. Grundlage: Brettscan `Große_Seen.jpg`, Regelheft „Die Großen Seen", Zielkartenliste und Korrekturrunden 1 bis 3 von David.

## Änderungen v0.92 → v0.93
5 korrigierte Knotenpositionen (Traverse City, Bay City, Muskegon, Erie, New York). Längenänderungen: Nr 46/47 Kreuz Huron–Detroit (schwarz/grün, Schiff) 5 → 4, Nr 86 Traverse City–Muskegon (rot, Schiff) 4 → 3, Nr 87 Traverse City–Muskegon (weiß, Zug) 4 → 3.

## Änderungen v0.91 → v0.92
13 korrigierte Knotenpositionen und Feldpositionen (Nr 11, 30, 84, 108) übernommen. Längenänderungen: Nr 11 Kreuz Oberer See–Marquette (grau, Schiff) 3 → 2, Nr 84 Bay City–Detroit (grün, Zug) 3 → 2.

## Änderungen v0.90 → v0.91
Alle 12 korrigierten Knotenpositionen und alle 110 Feldpositionen aus dem Editor-Export übernommen. Längenänderungen:

| Strecke | alt | neu |
|---|---|---|
| Nr 2 Duluth–Thunder Bay (gelb, Schiff) | 5 | 4 |
| Nr 9 Kreuz Oberer See–Thunder Bay (grau, Schiff) | 1×2 | **1er-Doppelstrecke** Nr 9 + Nr 112 |
| Nr 14 Marathon–Sault Ste. Marie (grau, Schiff) | 5 | 4 |
| Nr 18 Marquette–Green Bay (weiß, Zug) | 4 | **gelöscht** |
| Nr 19/20 Sault Ste. Marie–Green Bay (grau, Schiff) | 5 | 6 (Feld 3 ergänzt) |
| Nr 21 Sault Ste. Marie–Traverse City (grau, Schiff) | 4 | 3 |
| Nr 22/23 Sault Ste. Marie–Kreuz Huron (gelb/weiß, Schiff) | 5 | 4 |
| Nr 30 Rouyn-Noranda–Montreal (grau, Zug) | 7 | 8 (Feld 4 ergänzt) |
| Nr 34 Sudbury–Perry Sound (grau, Zug) | 3 | 2 |
| Nr 37 Ottawa–Kingston (gelb, Zug) | 3 | 2 |
| Nr 38/39 Montreal–Kingston (gelb/grün, Schiff) | 4 | 3 |
| Nr 42/43 Kreuz Huron–South Baymouth (grau, Schiff) | 2×2 | **einzelne 1er-Strecke Nr 43**, Nr 42 gelöscht |
| Nr 44 Kreuz Huron–Port Elgin (grau, Schiff) | 2 | 1 |
| Nr 45 Kreuz Huron–Bay City (grau, Schiff) | 3 | 2 |
| Nr 49 South Baymouth–Port Elgin (grau, Schiff) | 3 | 2 |
| Nr 50 Perry Sound–Port Elgin (gelb, Schiff) | 3 | 2 |
| Nr 58 Kingston–Buffalo (grau, Schiff) | 5 | 4 |
| Nr 63 Buffalo–Scranton (grau, Zug) | 5 | 4 |
| Nr 81 Detroit–Cleveland (gelb, Schiff) | 3 | 2 |
| Nr 89 Green Bay–Milwaukee (schwarz, Zug) | 5 | 4 |
| Nr 90/91 Green Bay–Milwaukee (schwarz/gelb, Schiff) | 4 | **3** (siehe offene Punkte) |
| Nr 108 Muskegon–South Bend (gelb, Zug) | 5 | 3 |

Streckennummern bleiben stabil (Lücken bei 18 und 42), damit weitere Korrekturrunden dieselben Nummern verwenden können. Neue Nummer: 112.

## Dateien
- `grosse_seen_karte.json` – Edition (meta, knoten, strecken, auftraege), Schlüssel `grosse_seen`
- `grosse_seen_karte.jpg` – Spielplan 3000×1672, `board_h` 557
- `auftrag_grosse_seen.jpg` – Zielkartenhintergrund 1120×700 (Kartenfeld 80/140/960×532)
- `editor_grosse_seen.html` – Feld-Editor mit den v0.91-Daten
- `kontrolle_grosse_seen.jpg` – Kontrollbild (magenta = Felder, Nummern = Strecken-Nr, gelb = Hafenstadt, grün = Stadt ohne Hafen/Kreuzungspunkt)
- Kartenbilder: die 27 `wr_*.jpg` der Weltreise werden unverändert weiterverwendet.

## Mechanik
Weltreise-Mechanik, alle Abweichungen in `meta`:

| Regel | Weltreise | Große Seen |
|---|---|---|
| Transportkarten | 80 Wagen (14 Joker) + 60 Schiff | identisch |
| Starthand | 3 Wagen + 7 Schiff | **2 Wagen + 2 Schiff** |
| Figuren | 60 aus max. 25 W / 50 S, Empf. 20/40 | **50 aus max. 33 W / 32 S, Empf. 27/23**, 15 in die Schachtel |
| Häfen | 3 je Spieler, 20/30/40, −4 | 3 je Spieler, **10/20/30**, −4 |
| Zielkarten | 5/3, 4/1, 57 + 8 Routen | 5/3, 4/1, **55 Standardkarten, keine Routenkarten** |
| Punkte je Länge | 1/2/4/7/10/15/18/21 | 1/2/4/7/10/15/18/21/**27 (Länge 9)** |
| Gelände / Randüberläufe | ja | **keine** |
| Spielende | ≤6 Figuren, 2 Schlussrunden | identisch |
| Doppelstrecken | ab 3 Spielern | ab 3 Spielern |
| Boni | keine | keine |

Zug- und Schiffsstrecken zwischen denselben Städten (Duluth–Thunder Bay, Traverse City–Muskegon, Green Bay–Milwaukee) sind keine Doppelstrecken.

## Knoten (37)
- Hafenstädte (25): Duluth, Thunder Bay, Marathon, Marquette, Sault Ste. Marie, Montreal, Green Bay, Traverse City, South Baymouth, Perry Sound, Port Elgin, Kingston, Toronto, Bay City, Muskegon, Milwaukee, Syracuse, Albany, Buffalo, Detroit, Chicago, Erie, Toledo, Cleveland, New York
- Ohne Hafen (10): Timmins, Rouyn-Noranda, Sudbury, Ottawa, Wausau, Eau Claire, Madison, Cedar Rapids, Scranton, South Bend
- Kreuzungspunkte (`kreuz: true`): Kreuz Oberer See, Kreuz Huron

## Strecken (110, 355 Felder, 28 Doppelstrecken, 55 Schiffsstrecken)

| Nr | von | nach | Farbe | Typ | Länge | Doppel mit |
|---|---|---|---|---|---|---|
| 1 | Duluth | Thunder Bay | schwarz | Zug | 5 |  |
| 2 | Duluth | Thunder Bay | gelb | Schiff | 4 |  |
| 3 | Duluth | Kreuz Oberer See | pink | Schiff | 5 | 4 |
| 4 | Duluth | Kreuz Oberer See | schwarz | Schiff | 5 | 3 |
| 5 | Duluth | Marquette | rot | Schiff | 6 |  |
| 6 | Duluth | Eau Claire | gelb | Zug | 3 |  |
| 7 | Duluth | Wausau | gruen | Zug | 4 |  |
| 8 | Thunder Bay | Marathon | pink | Schiff | 3 |  |
| 9 | Kreuz Oberer See | Thunder Bay | grau | Schiff | 1 | 112 |
| 10 | Kreuz Oberer See | Marathon | weiss | Schiff | 2 |  |
| 11 | Kreuz Oberer See | Marquette | grau | Schiff | 2 |  |
| 12 | Kreuz Oberer See | Sault Ste. Marie | rot | Schiff | 5 | 13 |
| 13 | Kreuz Oberer See | Sault Ste. Marie | gruen | Schiff | 5 | 12 |
| 14 | Marathon | Sault Ste. Marie | grau | Schiff | 4 |  |
| 15 | Marathon | Timmins | gelb | Zug | 5 |  |
| 16 | Marquette | Sault Ste. Marie | grau | Schiff | 3 |  |
| 17 | Marquette | Wausau | weiss | Zug | 4 |  |
| 19 | Sault Ste. Marie | Green Bay | grau | Schiff | 6 | 20 |
| 20 | Sault Ste. Marie | Green Bay | grau | Schiff | 6 | 19 |
| 21 | Sault Ste. Marie | Traverse City | grau | Schiff | 3 |  |
| 22 | Sault Ste. Marie | Kreuz Huron | gelb | Schiff | 4 | 23 |
| 23 | Sault Ste. Marie | Kreuz Huron | weiss | Schiff | 4 | 22 |
| 24 | Sault Ste. Marie | South Baymouth | grau | Schiff | 3 |  |
| 25 | Timmins | Rouyn-Noranda | gruen | Zug | 4 |  |
| 26 | Timmins | Sudbury | rot | Zug | 4 | 27 |
| 27 | Timmins | Sudbury | weiss | Zug | 4 | 26 |
| 28 | Rouyn-Noranda | Sudbury | pink | Zug | 4 |  |
| 29 | Rouyn-Noranda | Ottawa | rot | Zug | 7 |  |
| 30 | Rouyn-Noranda | Montreal | grau | Zug | 8 |  |
| 31 | Sudbury | Ottawa | schwarz | Zug | 7 | 32 |
| 32 | Sudbury | Ottawa | gruen | Zug | 7 | 31 |
| 33 | Sudbury | South Baymouth | grau | Zug | 2 |  |
| 34 | Sudbury | Perry Sound | grau | Zug | 2 |  |
| 35 | Ottawa | Montreal | grau | Zug | 1 | 36 |
| 36 | Ottawa | Montreal | grau | Zug | 1 | 35 |
| 37 | Ottawa | Kingston | gelb | Zug | 2 |  |
| 38 | Montreal | Kingston | gelb | Schiff | 3 | 39 |
| 39 | Montreal | Kingston | gruen | Schiff | 3 | 38 |
| 40 | Montreal | Albany | weiss | Zug | 5 | 41 |
| 41 | Montreal | Albany | gruen | Zug | 5 | 40 |
| 43 | Kreuz Huron | South Baymouth | grau | Schiff | 1 |  |
| 44 | Kreuz Huron | Port Elgin | grau | Schiff | 1 |  |
| 45 | Kreuz Huron | Bay City | grau | Schiff | 2 |  |
| 46 | Kreuz Huron | Detroit | schwarz | Schiff | 4 | 47 |
| 47 | Kreuz Huron | Detroit | gruen | Schiff | 4 | 46 |
| 48 | South Baymouth | Perry Sound | weiss | Schiff | 2 |  |
| 49 | South Baymouth | Port Elgin | grau | Schiff | 2 |  |
| 50 | Perry Sound | Port Elgin | gelb | Schiff | 2 |  |
| 51 | Perry Sound | Toronto | schwarz | Zug | 2 |  |
| 52 | Port Elgin | Toronto | weiss | Zug | 2 |  |
| 53 | Toronto | Kingston | weiss | Schiff | 4 | 54 |
| 54 | Toronto | Kingston | schwarz | Schiff | 4 | 53 |
| 55 | Toronto | Buffalo | grau | Schiff | 1 | 56 |
| 56 | Toronto | Buffalo | grau | Schiff | 1 | 55 |
| 57 | Toronto | Detroit | rot | Zug | 5 |  |
| 58 | Kingston | Buffalo | grau | Schiff | 4 |  |
| 59 | Kingston | Syracuse | pink | Zug | 2 |  |
| 60 | Buffalo | Syracuse | rot | Zug | 3 | 61 |
| 61 | Buffalo | Syracuse | gelb | Zug | 3 | 60 |
| 62 | Buffalo | Erie | grau | Zug | 2 |  |
| 63 | Buffalo | Scranton | grau | Zug | 4 |  |
| 64 | Buffalo | Detroit | pink | Schiff | 6 | 65 |
| 65 | Buffalo | Detroit | weiss | Schiff | 6 | 64 |
| 66 | Syracuse | Albany | gruen | Schiff | 2 | 67 |
| 67 | Syracuse | Albany | pink | Schiff | 2 | 66 |
| 68 | Syracuse | Scranton | weiss | Zug | 2 | 69 |
| 69 | Syracuse | Scranton | schwarz | Zug | 2 | 68 |
| 70 | Albany | New York | rot | Schiff | 3 | 71 |
| 71 | Albany | New York | schwarz | Schiff | 3 | 70 |
| 72 | Scranton | New York | rot | Zug | 1 | 73 |
| 73 | Scranton | New York | gruen | Zug | 1 | 72 |
| 74 | Cleveland | New York | grau | Zug | 9 |  |
| 75 | Erie | Scranton | gelb | Zug | 6 | 76 |
| 76 | Erie | Scranton | pink | Zug | 6 | 75 |
| 77 | Erie | Cleveland | schwarz | Schiff | 1 | 78 |
| 78 | Erie | Cleveland | gruen | Schiff | 1 | 77 |
| 79 | Toledo | Cleveland | rot | Schiff | 2 | 80 |
| 80 | Toledo | Cleveland | weiss | Schiff | 2 | 79 |
| 81 | Detroit | Cleveland | gelb | Schiff | 2 |  |
| 82 | Detroit | Toledo | grau | Schiff | 1 | 83 |
| 83 | Detroit | Toledo | grau | Schiff | 1 | 82 |
| 84 | Bay City | Detroit | gruen | Zug | 2 |  |
| 85 | Traverse City | Bay City | rot | Zug | 3 |  |
| 86 | Traverse City | Muskegon | rot | Schiff | 3 |  |
| 87 | Traverse City | Muskegon | weiss | Zug | 3 |  |
| 88 | Green Bay | Traverse City | gruen | Schiff | 3 |  |
| 89 | Green Bay | Milwaukee | schwarz | Zug | 4 |  |
| 90 | Green Bay | Milwaukee | schwarz | Schiff | 3 | 91 |
| 91 | Green Bay | Milwaukee | gelb | Schiff | 3 | 90 |
| 92 | Green Bay | Wausau | rot | Zug | 1 |  |
| 93 | Eau Claire | Wausau | grau | Zug | 2 |  |
| 94 | Eau Claire | Cedar Rapids | pink | Zug | 5 |  |
| 95 | Eau Claire | Madison | weiss | Zug | 4 |  |
| 96 | Wausau | Madison | pink | Zug | 4 |  |
| 97 | Cedar Rapids | Madison | gruen | Zug | 3 |  |
| 98 | Cedar Rapids | Chicago | gelb | Zug | 5 | 99 |
| 99 | Cedar Rapids | Chicago | rot | Zug | 5 | 98 |
| 100 | Madison | Milwaukee | grau | Zug | 1 |  |
| 101 | Madison | Chicago | grau | Zug | 3 |  |
| 102 | Milwaukee | Muskegon | grau | Schiff | 2 |  |
| 103 | Milwaukee | Chicago | weiss | Schiff | 1 | 104 |
| 104 | Milwaukee | Chicago | gruen | Schiff | 1 | 103 |
| 105 | Chicago | Muskegon | pink | Schiff | 3 |  |
| 106 | Chicago | South Bend | grau | Zug | 1 | 107 |
| 107 | Chicago | South Bend | grau | Zug | 1 | 106 |
| 108 | Muskegon | South Bend | gelb | Zug | 3 |  |
| 109 | South Bend | Toledo | grau | Zug | 3 | 110 |
| 110 | South Bend | Toledo | pink | Zug | 3 | 109 |
| 111 | South Bend | Detroit | schwarz | Zug | 4 |  |
| 112 | Kreuz Oberer See | Thunder Bay | grau | Schiff | 1 | 9 |

## Zielkarten (55)
Unverändert, alle Städte auf Knoten abgebildet. Höchste Karte Duluth–New York 24.

## Offene Punkte
1. **Nr 90/91 Green Bay–Milwaukee (Schiff):** Die Vorgabe lautete „4er statt 5er, Feld 5 entfernen", die Strecken hatten aber bereits 4 Felder, und im Editor-Export liegt Feld 4 beider Strecken weit abseits der Linie (im See bzw. östlich davon). Auf dem Brett liegen dort 3 schwarze und 3 gelbe Ovale, deshalb auf 3 gesetzt. Falls doch 4 richtig ist, sag Bescheid.
2. Nr 42/43 Kreuz Huron–South Baymouth ist jetzt eine einzelne 1er-Strecke (Nr 43), keine Doppelstrecke – so gelesen aus „nur Feld 1 von Strecke 43 behalten".
3. Restliche Feinjustage der nicht angefassten Felder (weiterhin `geprueft: false`).
4. Integration in `index.html` als Edition `grosse_seen` (App-Version 7.43).
