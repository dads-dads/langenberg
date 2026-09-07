# Spezifikation Edition „Weltreise“ (Zug um Zug – Weltreise / Rails & Sails: The World)

Stand: Karte v0.94, 07.09.2026 (Korrekturbatches 1+2, Nr 99 Mumbai–Dar Es Salaam, unterer Rand entfernt). Dateien: `weltreise_karte.json`, `weltreise_karte.jpg` (3000×1688, beschnitten auf den Rahmen inkl. Zählleiste), `editor_weltreise.html`, `auftrag_weltreise.jpg` (1120×700), `kontrolle_weltreise.jpg`.

Alle in Rückfrage-Runde 1 bestätigten Entscheidungen sind hier eingearbeitet (A1–F20). Die Integration in `index.html` erfolgt erst nach Freigabe.

## 1. Kartendaten

- **48 Knoten**: 47 Städte + `kreuz_indik` (Sternsymbol im Indischen Ozean, `kreuz: true`, zählt nicht als Stadt, kann keinen Hafen haben, taucht auf keiner Zielkarte auf).
- **38 Hafenstädte** (`hafen: true`): Cambridge Bay, Vancouver, New York, Los Angeles, Miami, Caracas, Lima, Rio de Janeiro, Valparaiso, Buenos Aires, Reykjavik, Murmansk, Edinburgh, Hamburg, Marseille, Athina, Casablanca, Al-Qahira, Tiksi, Anchorage, Petropavlovsk, Tokyo, Hong Kong, Lagos, Dar Es Salaam, Luanda, Toamasina, Cape Town, Mumbai, Bangkok, Manila, Honolulu, Jakarta, Darwin, Port Moresby, Perth, Sydney, Christchurch.
- **9 Binnenstädte** (Lok-Symbol, kein Hafen möglich): Winnipeg, Mexico, Moskva, Novosibirsk, Tehran, Lahore, Yakutsk, Beijing, Djibouti.
- **130 Strecken**: 71 Zug-, 59 Schiffsstrecken; 34 Doppelstrecken, 5 Geländestrecken (`gelaende`), 7 Rand-Überläufe (`rand: true`). 411 Felder (alle l = 2.1, w = 0.82), keine interpolierten Felder mehr.
- Neue Streckenfelder gegenüber bisherigen Editionen: `typ` (`zug`|`schiff`), `gelaende` (Anzahl Felder mit Doppel-Wagen-Symbol), `rand`.
- `board_h: 554` (Plan 3882 × 2152 nach Entfernen des unteren Rands unter der Zählleiste; Auslieferung 3000 × 1663). Felder l = 2.1 (Prozent der Breite), w = 0.83 (Prozent der Höhe – entspricht optisch dem früheren 0.82 bei board_h 563). Koordinaten wie üblich in Prozent (x der Breite, y der Höhe; `l`/`w` in Prozent der Breite).
- Punktetabelle vom Plan: 1→1, 2→2, 3→4, 4→7, 5→10, 6→15, 7→18, 8→21.
- Farben: nur 6 Kartenfarben (rot, gelb, gruen, pink, weiss, schwarz) + grau als Streckenfarbe. `meta.farben` enthält daher keine orange/blau – **Deckaufbau und `bauOptionen()` müssen `meta.farben` auswerten statt der fest verdrahteten 8-Farben-Liste.**

### Korrekturbatch 1 (06.09.2026)
- 14 Längen-/Zuordnungskorrekturen laut Word-Datei eingespielt, 20 Knoten und 22 Felder aus dem Editor-Export übernommen, danach alle Felder auf l = 2.1 / w = 0.82 normiert.
- Umbenannt: Nr 92 gelb → **Tokyo–Manila gelb 2** (Batch 2; zunächst irrtümlich Hong Kong–Manila), Nr 89 grau 3 → **Hong Kong–Tokyo grau 3**. Hong Kong–Manila bleibt allein pink 1 (Nr 96).
- Batch 2: Rio, Athina, Al-Qahira sowie 4 Felder (Nr 11/12/80) aus dem Editor-Export übernommen.

### Zu prüfende Lesungen
- Feldlängen variieren auf diesem Plan stark; die Streckenlängen sind Stückzahlen der erkannten Felder und wurden an ~15 Stellen per Zoom gegengeprüft. Bitte am Brett stichprobenartig kontrollieren: Winnipeg–Cambridge Bay (4), Hamburg–Marseille (1/1), Al-Qahira–Tehran (1/1), Rio–Buenos Aires (1/1), Murmansk–Moskva (2), Kreuz Indik–Perth (5/5), Jakarta–Perth (3), Tokyo–Honolulu (5), Honolulu–Port Moresby (4), Cape Town–Dar Es Salaam (4/4).
- `kreuz_indik`-Position ist die Sternmitte; Strecken Cape Town–Kreuz (rot/grün 5) und Kreuz–Perth (weiß/pink 5) enden dort.

## 2. Transportkarten (zwei Stapel)

**Wagenstapel (80)**: je Farbe 7 Wagenkarten ohne Hafensymbol + 4 mit Hafensymbol (66) + 14 Joker. Joker liegen im Wagenstapel (bestätigt B4).
**Schiffsstapel (60)**: je Farbe 4 Einzelschiffskarten (alle mit Hafensymbol) + 6 Doppelschiffskarten (ohne Hafensymbol).

Hand-Schlüssel (`p.hand`), identisch mit den Bilddateinamen (`wr_<key>.jpg`):
- `wagen_<farbe>` Wagen ohne Hafen, `wagen_<farbe>_hafen` Wagen mit Hafen
- `schiff_<farbe>_1` Einzelschiff (immer Hafen), `schiff_<farbe>_2` Doppelschiff
- `joker` (gilt für Wagen- und Schiffsstrecken und als Hafenkarte; bisheriger Schlüssel `lok` bleibt in den anderen Editionen)

Spielzustand `g`: `deck` / `discard` = Wagenstapel (bestehend), neu `deck2` / `discard2` = Schiffsstapel; `open` fasst 6 Karten (bisher 5, `refillOpen()` muss die Zahl aus `meta.karten.offen` nehmen). Nachlegen: nach dem Nehmen einer offenen Karte kurze Abfrage „Nachlegen von Wagen/Schiff“ (Vorschlag = Stapel der genommenen Karte); verdecktes Ziehen über zwei Buttons. 3 offene Joker → alle 6 ablegen, 3 je Stapel neu (`lokReset()` erweitern). Leerer Stapel → eigener Ablagestapel mischen; sind beide Stapel leer, ist „Karten nehmen“ nicht wählbar.

Starthand: 3 Wagenkarten + 7 Schiffskarten (`starthandkarten: 10` nur als Summe; `hostStart()` verteilt typgetrennt).

Kartenbilder (06.09.2026 aus dem Scan erstellt, entzerrt, 640×392): Einzeldateien `karten_weltreise/wr_<schluessel>.jpg` sowie Sprite `farbdeck_weltreise.jpg` (9 Spalten × 3 Zeilen, Zellen 640×392, Zuordnung in `farbdeck_weltreise_index.json`, alphabetisch nach Schlüssel). Schlüssel = Hand-Schlüssel ohne Präfix-Kurzform: `wagen_<farbe>`, `wagen_<farbe>_hafen`, `schiff_<farbe>_1` (Einzelschiff, Hafen), `schiff_<farbe>_2` (Doppelschiff), `joker`, dazu Rückseiten `deck_wagen` und `deck_schiff` für die beiden verdeckten Stapel. Vorschlag: Hand-Schlüssel direkt so benennen (`w_rot` → `wagen_rot`, `wh_rot` → `wagen_rot_hafen`, `s1_rot` → `schiff_rot_1`, `s2_rot` → `schiff_rot_2`), dann ist `bild = 'wr_'+key+'.jpg'`.

## 3. Strecke nutzen

- Zugstrecke: Karten des Typs Wagen (`w_`/`wh_`) in Streckenfarbe (grau = beliebig, aber einfarbig) + Joker. Hafenkarten sind normale Wagenkarten.
- Schiffsstrecke: Schiffskarten in Streckenfarbe; Einzelschiff = 1 Feld, Doppelschiff = 2 Felder, Joker = 1 Feld. Überzahlung nur, wenn ohne nicht bezahlbar (z. B. 3 Doppel für 5 Felder), Rest verfällt. `bauOptionen()` liefert Kombinationen `{col, s1, s2, lok}`; Vorzugsreihenfolge: ohne Überzahlung, dann minimaler Kartenverbrauch.
- Gelände (`gelaende: n`): n Felder kosten je 2 gleichfarbige Wagenkarten (Farbe frei, je Feld unterschiedlich möglich), die übrigen `laenge−n` Felder wie üblich. Alle 5 Geländestrecken sind grau. Bezahl-UI: für jedes Gelände-Feld ein Paar wählen (Farbwahl), Rest wie gewohnt. Joker ersetzen beliebige Karten.
- Figurenverbrauch: Zugstrecke → `p.wagons -= laenge`, Schiffsstrecke → `p.schiffe -= laenge`. Ohne ausreichende Figuren des passenden Typs keine Nutzung (Hinweis auf Tauschaktion).
- Punkte nach Tabelle, Doppelstrecken frei ab 3 Spielern (Plattform-Standard), Rand-Überläufe sind normale Strecken.

## 4. Figuren

- `p.wagons` (Waggons) und neu `p.schiffe`. Startphase nach der Zielkartenwahl: geheime Wahl von 60 Figuren (Regler; max. 25 Waggons / 50 Schiffe; Voreinstellung 20/40), Persistierung pro Sitz unter `game/figuren/<seat>`, Aufdecken erst wenn alle gewählt haben (Analog zu `startPickCommit()`/`pickFertigPruefen()`).
- `p.box_w = 25 − wagons`, `p.box_s = 50 − schiffe` (Schachtel), summiert immer 15.
- **Aktion Figuren tauschen** (ganzer Zug): k Waggons gegen k Schiffe oder umgekehrt, begrenzt durch Schachtelbestand; `p.score −= k`. Zugtext „tauscht k Waggons gegen Schiffe (−k)“.
- `WAGONS()`/`wagons_pro_spieler` bleibt 60 als Gesamtzahl für Anzeigen; Chips zeigen 🚂 n · ⛴ m · ⚓ h.

## 5. Häfen

- `p.haefen` = Liste von Knoten-IDs (max. 3). Aktion „Hafen bauen“ (ganzer Zug): Stadt mit `hafen: true`, kein fremder/eigener Hafen dort (`g.haefen[knoten] = seat`), eigene Strecke endet in der Stadt.
- Kosten: 2 Wagenkarten + 2 Schiffskarten **derselben Farbe, alle mit Hafensymbol** (`wh_<f>` ×2 + `s1_<f>` ×2), Joker ersetzen beliebig. Bezahl-UI analog `payModal`.
- Endwertung je Hafen: Anzahl erfüllter Zielkarten (Standard und Routen), auf denen die Stadt vorkommt → 1: 20, 2: 30, ≥3: 40. Eine Zielkarte zählt für jeden eigenen Hafen, dessen Stadt sie nennt. Je nicht gebautem Hafen −4.
- Anzeige: Hafenmarker in Spielerfarbe am Knoten (Anker-Icon), Chip ⚓ 3/2/1.

## 6. Zielkarten

- 57 Standardkarten `{von, nach, punkte}` und 8 Routenkarten `{typ: 'route', stationen: [...], punkte, punkte_ungeordnet, minus}` in einem Stapel (65). Start 5 ziehen, mind. 3 behalten; nachziehen 4, mind. 1; Rückgaben unter den Stapel.
- Routenkarten-Wertung (bestätigt F17): `punkte`, wenn ein Weg im eigenen Netz die Stationen in Reihenfolge durchläuft, ohne eine Stadt zweimal zu befahren (DFS über eigene Strecken, Stationen als Pflicht-Zwischenziele, besuchte Knoten gesperrt); `punkte_ungeordnet`, wenn alle Stationen in einer Komponente liegen; sonst `−minus`. Für Hafenwertung gilt eine Routenkarte als erfüllt, wenn mindestens `punkte_ungeordnet` erreicht wurde.
- Auftragskarte: `auftrag_weltreise.jpg` (Plan 960×540 bei 80/140 eingeklebt, `tkx/tky` im JSON). Routenkarten: Stationen als nummerierte Marker (1…5) mit Verbindungslinie, drei Werte rechts oben (grün / gelb / rot).
- Tippfehler der Vorlage korrigiert: Al-Zahira → Al-Qahira, Cambrifge Bay → Cambridge Bay.

## 7. Spielende und Wertung

- Auslöser: am Zugende `p.wagons + p.schiffe ≤ 6` → `G.lastRounds = 2 × Spielerzahl` (jeder noch zweimal). Anzeige „LETZTE 2 RUNDEN“ solange `lastRounds > Spielerzahl`, danach „LETZTE RUNDE“.
- Endwertung: Streckenpunkte (laufend) + Zielkarten ± + Routenkarten ± + Hafenpunkte − 4 je ungebautem Hafen − Tauschkosten (laufend abgezogen). Keine Boni.
- Statistik: `statId: "Zug um Zug Weltreise"`.

## 8. Technische Punkte

- `fix()`-Whitelist erweitern: `p.schiffe`, `p.haefen`, `p.figWahl` (Startphase); `g.deck2`, `g.discard2`, `g.haefen`, `g.figuren`; `open` bis 6. Die neuen Hand-Schlüssel sind Strings, `p.hand` bleibt ein Objekt {key: anzahl}.
- `newDeck()` editionsabhängig (`meta.karten`), `drawCard(g, stapel)`, `refillOpen(g)` mit Stapelwahl, `lokReset(g)` mit 3+3.
- `EDITIONEN`-Ersetzung wie gehabt per Blockgrenzen (`,"weltreise": {` … `};\nlet EDITION`); anschließend semantische Identitätsprüfung aller übrigen Editionen.
- Version: JSON 0.9 → App-Version beim Einbau erhöhen; `doppelstrecken_frei_ab: 3` wird beim Start in `ROOM.dopAb` eingefroren.

## 9. Streckenliste (Stand v0.92)

| Nr | Strecke | Typ | Farbe | Länge | Hinweise |
|---|---|---|---|---|---|
| 1 | Cambridge Bay – Anchorage | Schiff | schwarz | 6 | Randüberlauf |
| 2 | Cambridge Bay – Winnipeg | Zug | schwarz | 4 |  |
| 3 | Cambridge Bay – Reykjavik | Schiff | weiss | 6 |  |
| 4 | Vancouver – Anchorage | Zug | grau | 2 | Gelände 2, Randüberlauf |
| 5 | Vancouver – Winnipeg | Zug | gelb | 2 |  |
| 6 | Vancouver – Los Angeles | Zug | gruen | 1 | Doppel mit 7 |
| 7 | Vancouver – Los Angeles | Zug | rot | 1 | Doppel mit 6 |
| 8 | Vancouver – Tokyo | Schiff | weiss | 6 | Randüberlauf |
| 9 | Winnipeg – Los Angeles | Zug | grau | 3 |  |
| 10 | Winnipeg – New York | Zug | gruen | 2 |  |
| 11 | Los Angeles – New York | Zug | pink | 4 | Doppel mit 12 |
| 12 | Los Angeles – New York | Zug | schwarz | 4 | Doppel mit 11 |
| 13 | Los Angeles – Mexico | Zug | gelb | 2 | Doppel mit 14 |
| 14 | Los Angeles – Mexico | Zug | weiss | 2 | Doppel mit 13 |
| 15 | Los Angeles – Tokyo | Schiff | schwarz | 7 | Doppel mit 16, Randüberlauf |
| 16 | Los Angeles – Tokyo | Schiff | gruen | 7 | Doppel mit 15, Randüberlauf |
| 17 | Los Angeles – Honolulu | Schiff | gelb | 3 | Randüberlauf |
| 18 | New York – Miami | Zug | weiss | 2 |  |
| 19 | New York – Reykjavik | Schiff | gelb | 6 |  |
| 20 | New York – Edinburgh | Schiff | rot | 7 | Doppel mit 21 |
| 21 | New York – Edinburgh | Schiff | pink | 7 | Doppel mit 20 |
| 22 | Miami – Caracas | Schiff | weiss | 2 |  |
| 23 | Miami – Casablanca | Schiff | gruen | 7 |  |
| 24 | Mexico – Caracas | Zug | pink | 3 | Doppel mit 25 |
| 25 | Mexico – Caracas | Zug | rot | 3 | Doppel mit 24 |
| 26 | Caracas – Lima | Zug | gelb | 2 | Doppel mit 27 |
| 27 | Caracas – Lima | Zug | weiss | 2 | Doppel mit 26 |
| 28 | Caracas – Rio de Janeiro | Zug | gruen | 4 | Doppel mit 29 |
| 29 | Caracas – Rio de Janeiro | Zug | schwarz | 4 | Doppel mit 28 |
| 30 | Caracas – Lagos | Schiff | rot | 7 |  |
| 31 | Lima – Valparaiso | Zug | grau | 2 | Doppel mit 32 |
| 32 | Lima – Valparaiso | Zug | grau | 2 | Doppel mit 31 |
| 33 | Lima – Honolulu | Schiff | grau | 6 | Randüberlauf |
| 34 | Lima – Sydney | Schiff | pink | 8 | Doppel mit 35, Randüberlauf |
| 35 | Lima – Sydney | Schiff | schwarz | 8 | Doppel mit 34, Randüberlauf |
| 36 | Rio de Janeiro – Buenos Aires | Zug | weiss | 1 | Doppel mit 37 |
| 37 | Rio de Janeiro – Buenos Aires | Zug | rot | 1 | Doppel mit 36 |
| 38 | Rio de Janeiro – Luanda | Schiff | grau | 6 |  |
| 39 | Rio de Janeiro – Cape Town | Schiff | schwarz | 6 | Doppel mit 40 |
| 40 | Rio de Janeiro – Cape Town | Schiff | weiss | 6 | Doppel mit 39 |
| 41 | Valparaiso – Buenos Aires | Schiff | gruen | 3 |  |
| 42 | Valparaiso – Christchurch | Schiff | gelb | 7 | Randüberlauf |
| 43 | Buenos Aires – Cape Town | Schiff | pink | 7 | Doppel mit 44 |
| 44 | Buenos Aires – Cape Town | Schiff | gelb | 7 | Doppel mit 43 |
| 45 | Reykjavik – Murmansk | Schiff | gruen | 4 |  |
| 46 | Reykjavik – Edinburgh | Schiff | grau | 2 |  |
| 47 | Murmansk – Tiksi | Schiff | rot | 7 |  |
| 48 | Murmansk – Moskva | Zug | pink | 2 |  |
| 49 | Edinburgh – Hamburg | Schiff | gelb | 1 | Doppel mit 50 |
| 50 | Edinburgh – Hamburg | Schiff | schwarz | 1 | Doppel mit 49 |
| 51 | Edinburgh – Marseille | Schiff | weiss | 1 | Doppel mit 52 |
| 52 | Edinburgh – Marseille | Schiff | gruen | 1 | Doppel mit 51 |
| 53 | Hamburg – Moskva | Zug | weiss | 2 | Doppel mit 54 |
| 54 | Hamburg – Moskva | Zug | schwarz | 2 | Doppel mit 53 |
| 55 | Hamburg – Marseille | Zug | pink | 1 | Doppel mit 56 |
| 56 | Hamburg – Marseille | Zug | rot | 1 | Doppel mit 55 |
| 57 | Hamburg – Athina | Zug | gruen | 2 |  |
| 58 | Moskva – Novosibirsk | Zug | gruen | 4 | Doppel mit 59 |
| 59 | Moskva – Novosibirsk | Zug | gelb | 4 | Doppel mit 58 |
| 60 | Moskva – Tehran | Zug | rot | 3 |  |
| 61 | Marseille – Athina | Schiff | rot | 2 |  |
| 62 | Marseille – Casablanca | Zug | grau | 1 | Gelände 1 |
| 63 | Athina – Tehran | Zug | grau | 2 |  |
| 64 | Athina – Al-Qahira | Schiff | gruen | 1 |  |
| 65 | Casablanca – Al-Qahira | Zug | grau | 3 |  |
| 66 | Casablanca – Lagos | Zug | grau | 4 |  |
| 67 | Al-Qahira – Tehran | Zug | gelb | 1 | Doppel mit 68 |
| 68 | Al-Qahira – Tehran | Zug | schwarz | 1 | Doppel mit 67 |
| 69 | Al-Qahira – Djibouti | Zug | rot | 2 | Doppel mit 70 |
| 70 | Al-Qahira – Djibouti | Zug | weiss | 2 | Doppel mit 69 |
| 71 | Tehran – Lahore | Zug | grau | 2 | Gelände 2 |
| 72 | Tehran – Mumbai | Zug | pink | 3 | Doppel mit 73 |
| 73 | Tehran – Mumbai | Zug | weiss | 3 | Doppel mit 72 |
| 74 | Lahore – Novosibirsk | Zug | weiss | 2 |  |
| 75 | Lahore – Beijing | Zug | grau | 3 | Gelände 3 |
| 76 | Lahore – Mumbai | Zug | gruen | 1 | Doppel mit 77 |
| 77 | Lahore – Mumbai | Zug | schwarz | 1 | Doppel mit 76 |
| 78 | Tiksi – Novosibirsk | Zug | grau | 3 |  |
| 79 | Tiksi – Yakutsk | Zug | gruen | 1 |  |
| 80 | Tiksi – Anchorage | Schiff | gelb | 8 |  |
| 81 | Tiksi – Petropavlovsk | Schiff | schwarz | 7 |  |
| 82 | Novosibirsk – Yakutsk | Zug | pink | 3 |  |
| 83 | Novosibirsk – Beijing | Zug | schwarz | 3 | Doppel mit 84 |
| 84 | Novosibirsk – Beijing | Zug | rot | 3 | Doppel mit 83 |
| 85 | Yakutsk – Petropavlovsk | Zug | weiss | 3 |  |
| 86 | Yakutsk – Beijing | Zug | gelb | 3 |  |
| 87 | Petropavlovsk – Anchorage | Schiff | pink | 3 |  |
| 88 | Petropavlovsk – Tokyo | Schiff | grau | 2 |  |
| 89 | Hong Kong – Tokyo | Schiff | grau | 3 |  |
| 90 | Beijing – Hong Kong | Zug | weiss | 2 | Doppel mit 91 |
| 91 | Beijing – Hong Kong | Zug | gruen | 2 | Doppel mit 90 |
| 92 | Tokyo – Manila | Schiff | gelb | 2 |  |
| 93 | Tokyo – Honolulu | Schiff | rot | 5 |  |
| 94 | Hong Kong – Bangkok | Zug | pink | 1 | Doppel mit 95 |
| 95 | Hong Kong – Bangkok | Zug | schwarz | 1 | Doppel mit 94 |
| 96 | Hong Kong – Manila | Schiff | pink | 1 |  |
| 97 | Mumbai – Bangkok | Zug | rot | 3 | Doppel mit 98 |
| 98 | Mumbai – Bangkok | Zug | gelb | 3 | Doppel mit 97 |
| 99 | Mumbai – Dar Es Salaam | Schiff | weiss | 4 |  |
| 100 | Bangkok – Jakarta | Schiff | weiss | 2 |  |
| 101 | Bangkok – Manila | Schiff | rot | 2 |  |
| 102 | Manila – Jakarta | Schiff | grau | 2 |  |
| 103 | Manila – Honolulu | Schiff | weiss | 5 |  |
| 104 | Honolulu – Port Moresby | Schiff | gruen | 3 |  |
| 105 | Jakarta – Darwin | Schiff | schwarz | 2 |  |
| 106 | Jakarta – Perth | Schiff | grau | 3 |  |
| 107 | Darwin – Port Moresby | Schiff | rot | 1 |  |
| 108 | Darwin – Perth | Zug | rot | 2 |  |
| 109 | Darwin – Sydney | Zug | gruen | 2 |  |
| 110 | Port Moresby – Sydney | Schiff | gelb | 3 |  |
| 111 | Perth – Sydney | Zug | weiss | 2 | Doppel mit 112 |
| 112 | Perth – Sydney | Zug | gelb | 2 | Doppel mit 111 |
| 113 | Sydney – Christchurch | Schiff | weiss | 1 | Doppel mit 114 |
| 114 | Sydney – Christchurch | Schiff | rot | 1 | Doppel mit 113 |
| 115 | Lagos – Luanda | Zug | pink | 1 | Doppel mit 116 |
| 116 | Lagos – Luanda | Zug | gelb | 1 | Doppel mit 115 |
| 117 | Luanda – Dar Es Salaam | Zug | grau | 2 | Gelände 2 |
| 118 | Luanda – Cape Town | Zug | grau | 2 |  |
| 119 | Cape Town – Dar Es Salaam | Zug | gruen | 3 | Doppel mit 120 |
| 120 | Cape Town – Dar Es Salaam | Zug | pink | 3 | Doppel mit 119 |
| 121 | Djibouti – Dar Es Salaam | Zug | schwarz | 1 | Doppel mit 122 |
| 122 | Djibouti – Dar Es Salaam | Zug | rot | 1 | Doppel mit 121 |
| 123 | Dar Es Salaam – Toamasina | Schiff | gelb | 1 |  |
| 124 | Dar Es Salaam – Jakarta | Schiff | pink | 7 | Doppel mit 125 |
| 125 | Dar Es Salaam – Jakarta | Schiff | gruen | 7 | Doppel mit 124 |
| 126 | Cape Town – Toamasina | Schiff | grau | 3 |  |
| 127 | Cape Town – Kreuz Indik | Schiff | rot | 5 | Doppel mit 128 |
| 128 | Cape Town – Kreuz Indik | Schiff | gruen | 5 | Doppel mit 127 |
| 129 | Kreuz Indik – Perth | Schiff | weiss | 5 | Doppel mit 130 |
| 130 | Kreuz Indik – Perth | Schiff | pink | 5 | Doppel mit 129 |

## 10. Integrationsstand (App v7.33, 06.09.2026)

Edition `weltreise` (Karte v0.92) ist in `index.html` integriert; alle übrigen Editionen wurden per semantischer Identitätsprüfung unverändert bestätigt.

- Erkennung: `WR()` = `meta.haefen` + `meta.karten` vorhanden. Alle Sonderwege sind mit `if(WR())` gekapselt; andere Editionen laufen unverändert.
- Stapel: `g.deck`/`g.discard` = Wagen, `g.deck2`/`g.discard2` = Schiff; 6 offene Karten; Nachlegen per Abfrage (Wagen/Schiff, „üblich“ = Stapel der genommenen Karte), leere Stapel werden automatisch übersprungen; Joker-Reset bei 3 offenen Jokern (3 + 3). Verdeckt ziehen über zwei Stapelrückseiten.
- Hand-Schlüssel = Bilddateinamen (`wr_<key>.jpg`); Kartenbilder in Auslage, Hand (gedreht) und Flug-Animation.
- Bezahlen: `bauOptionenWR()` (Zug: erst Wagen ohne, dann mit Hafensymbol; Schiff: Einzel/Doppel/Joker, Überzahlung nur ohne exakte Lösung; Gelände: je Feld 2 gleichfarbige Wagenkarten, Farben je Feld frei). Optionen als `{pay:{key:n}}`, `doClaim()` bucht über `wrHandAbziehen()` auf den richtigen Ablagestapel.
- Figuren: `p.wagons`/`p.schiffe`, Schachtel `p.boxW`/`p.boxS`; Wahl per Schieberegler nach den Startaufträgen (geheim: Chips zeigen bei anderen „?“ bis Spielbeginn); Aktion „Figuren tauschen“ (ganzer Zug, −1/Figur).
- Häfen: Button „Hafen bauen (n)“, Stadtwahl aus eigenen Hafenstädten ohne Hafen, Kosten 2 + 2 mit Hafensymbol gleicher Farbe (Joker ersetzen), Marker in Spielerfarbe mit ⚓ auf dem Brett, Wertung 20/30/40 nach erfüllten Zielkarten mit der Stadt (Routenkarten zählen mit), −4 je ungebautem Hafen; Zeilen in der Abrechnung.
- Routen-Zielkarten: `wrRouteStatus()` (in Reihenfolge = einfacher Weg ohne doppelte Stadt; im Netz = alle Stationen verbunden), eigene Kartendarstellung mit nummerierten Stationen und drei Werten.
- Spielende: ≤6 Figuren am Zugende → jeder noch 2-mal (`lastRounds = 2 × Spieler`), Anzeige „LETZTE 2 RUNDEN“ / „LETZTE RUNDE“.
- `fix()`-Whitelist: `schiffe`, `haefen`, `boxW`, `boxS`, `deck2`, `discard2`, `haefen` (Game).
- Tests: Node-Sandbox (`test_weltreise.js`, 35 Prüfungen: Deck, Joker-Reset, Bezahloptionen Zug/Schiff/Gelände/grau, Hafenoptionen und -städte, Routenstatus, Hafenwertung, Kartenrendering) und Headless-Smoke-Test (jsdom: Spielstart, Karten nehmen mit Nachlege-Abfrage, verdeckt ziehen, Strecke bauen, Hafen bauen, Tausch, Schlussrunden, Abrechnung, Regeln).
- Offen für den Praxistest: Layout der 6 + 2 Karten in der rechten Auslage auf kleinen Displays; Schiffe werden auf dem Brett vorerst mit dem gewohnten Waggonstein dargestellt.
