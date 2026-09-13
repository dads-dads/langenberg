# Zug um Zug – Südkorea · Spezifikation (Kartenpaket v1.01 · App v7.49, 12.09.2026)

Edition `suedkorea` für die Zug-um-Zug-Online-App. Quelle: Brettscan `Südkorea.png` (2250×3375), Regelheft `Spielregeln_Zug_um_Zug_Südkorea.pdf` (ZIP mit Seitentexten), 44 Zielkarten aus Davids Liste, Foto des Provinzen-Plans, drei Scans der Expresszug-Karten, Änderungsliste + Editor-Export `Änderungen_Südkorea.docx`.

## Dateien
| Datei | Inhalt |
|---|---|
| `index.html` | App v7.49 mit der Edition `suedkorea` als 15. Eintrag |
| `suedkorea_karte.json` | meta, 33 knoten, 100 strecken (262 Felder), 44 auftraege |
| `suedkorea_karte.jpg` | Brett, um den weißen Rand beschnitten (2198×2878, `board_h` 1309, Zählleiste bleibt) |
| `auftrag_suedkorea.jpg` | Zielkarten-Hintergrund 700×1120, ausgeblichenes Brett (Stil Skandinavien/Deutschland), Brettfeld `tk` {mx0 38, my0 150, mw 624, mh 817} |
| `provinzen_suedkorea.jpg` | Provinzen-Plan, aus dem Foto perspektivisch entzerrt (900×1230) |
| `sk_express_1.jpg` … `sk_express_3.jpg` | Expresszug-Karten +1/+2/+3 (aus den PDF-Scans beschnitten, 420 px breit) |
| `editor_suedkorea.html` | Feld-Editor (Iberia-Editor, Daten + Bild + Pixelmaße ersetzt) |
| `kontrolle.jpg` | Brett mit allen Feldrahmen und Streckennummern |

## Grundregeln (aus dem Regelheft)
- 2–5 Spieler, **45 Waggons**, 4 Starthandkarten, Auslage 5 (≥3 Loks → neu).
- Wagenkarten: 110 (Grundspiel oder Iberia-Deck ohne Festival- und Draft-Karte).
- **Start-Draft** wie Iberia: 6 Zielkarten, je 1 wählen, Rest nach links, bis alle 6 gewählt; **genau 4 behalten**, 2 zurück in den Stapel. **Kein zweiter Draft**, Zielkarten ziehen ist sofort erlaubt: 3 ziehen, mind. 1 behalten.
- Regelheft: Doppelstrecken erst ab 4 Spielern beide nutzbar. In der App wie in allen anderen Editionen **ab 3 Spielern** frei (`doppelstrecken_frei_ab: 3`, Davids Hausregel).
- Punkte 1/2/4/7/10/15 (Längen 1–6). **Kein** Bonus für längste Strecke oder meiste Aufträge.
- Sieg: meiste Punkte; Gleichstand → mehr erfüllte Zielkarten, sonst geteilter Sieg.
- Keine Fähren, Tunnel, Randstädte oder Auslandsziele.

## Sonderregel 1: Expresszug-Karten (`meta.expresskarten`)
Jeder Spieler hat +1, +2, +3, je einmal pro Partie, danach aus dem Spiel. Pro Zug höchstens eine.
- **Wagenkarten nehmen:** vor der ersten Karte 1/2/3 zusätzliche Karten vom verdeckten Stapel, dann normale Aktion (2 Karten bzw. 1 offene Lok).
- **Zielkarten ziehen:** 1/2/3 zusätzliche Zielkarten (also bis 6), mind. 1 behalten, beliebig viele behalten.
- **Strecke nutzen:** Feldwert auf dem Provinzen-Plan um 1/2/3 erhöhen (nur beim Platzieren eines Waggons dort; Feldmaximum 8).
- In der App: die drei Kartenbilder liegen links unter dem Zoom, verbrauchte sind ausgegraut. Ein Klick öffnet die Auswahl zwischen Wagenkarten nehmen und Zielkarten ziehen; beim Streckenbau wird die Karte im Provinzen-Dialog angeboten. Zustand: `players[i].skx`, Sperre pro Zug über `game.skExpZug`.

## Sonderregel 2: Provinzen-Plan (`meta.provinzen`)
- 8 Linien in Spaltenreihenfolge des Plans: schwarz, grün, orange, lila, blau, rot, gelb, weiß; je Felder 1–8 (`spalten_x`/`zeilen_y` in % von `bild_vb` 900×1230).
- Nach dem Nutzen einer Strecke **darf** ein Waggon aus dem Vorrat auf die Linie der Streckenfarbe (grau: frei wählbar) gelegt werden, Feld = Anzahl gespielter Wagenkarten (Loks zählen mit; es dürfen mehr passende Karten als nötig gespielt werden). Express +1/+2/+3 optional.
- Feld belegt → nächstes freies Feld mit niedrigerem Wert; keines frei → kein Waggon.
- Waggons bleiben bis Spielende dort und fehlen für Strecken (Spielende-Regel ≤2 Waggons gilt weiterhin für den Vorrat).
- **Endwertung** je Linie: Summe der Feldwerte pro Spieler, Rangliste, Punkte nach Spielerzahl: 2 → 10; 3 → 10/6; 4 → 10/6/4; 5 → 10/6/4/2. Nur mit mindestens einem Waggon auf der Linie. Gleichstand → höheres Einzelfeld gewinnt.
- Hinweis: `wagons_pro_spieler` 45 bleibt; Waggons auf dem Plan werden vom Vorrat abgezogen.

## Knoten (33)
Alle Städte wie auf dem Brett geschrieben, `rand: false`. Koordinaten in % des Brettbilds, `tkx/tky` auf die Zielkarte umgerechnet.

## Strecken (100 Einträge, 60 Doppelstrecken-Einträge)
| nr | von | nach | Farbe | Länge | doppel_mit |
|---|---|---|---|---|---|
| 1 | Paju | Chuncheon | blau | 4 |  |
| 2 | Paju | Seoul | gelb | 2 | 3 |
| 3 | Paju | Seoul | gelb | 2 | 2 |
| 4 | Paju | Incheon | gelb | 3 |  |
| 5 | Seoul | Chuncheon | gelb | 4 |  |
| 6 | Chuncheon | Wonju | blau | 3 |  |
| 7 | Chuncheon | Gangneung | blau | 5 |  |
| 8 | Gangneung | Donghae | blau | 2 |  |
| 9 | Wonju | Gangneung | blau | 5 |  |
| 10 | Wonju | Donghae | blau | 5 |  |
| 11 | Donghae | Taebaek | blau | 2 |  |
| 12 | Taebaek | Yeongju | blau | 2 |  |
| 13 | Wonju | Jecheon | blau | 2 | 94 |
| 14 | Seoul | Incheon | gelb | 1 | 15 |
| 15 | Seoul | Incheon | gelb | 1 | 14 |
| 16 | Incheon | Suwon | gelb | 1 | 17 |
| 17 | Incheon | Suwon | gelb | 1 | 16 |
| 18 | Seoul | Suwon | gelb | 1 | 19 |
| 19 | Seoul | Suwon | gelb | 1 | 18 |
| 20 | Seoul | Wonju | gelb | 4 | 21 |
| 21 | Seoul | Wonju | blau | 4 | 20 |
| 22 | Suwon | Wonju | gelb | 4 |  |
| 23 | Suwon | Cheonan | orange | 2 | 24 |
| 24 | Suwon | Cheonan | gelb | 2 | 23 |
| 25 | Incheon | Cheonan | orange | 5 | 26 |
| 26 | Incheon | Cheonan | gelb | 5 | 25 |
| 27 | Wonju | Cheongju | pink | 4 |  |
| 28 | Jecheon | Cheongju | pink | 4 |  |
| 29 | Jecheon | Taebaek | pink | 4 |  |
| 30 | Jecheon | Yeongju | pink | 2 |  |
| 31 | Jecheon | Sangju | pink | 3 |  |
| 32 | Cheongju | Sangju | pink | 3 |  |
| 33 | Cheongju | Daejeon | pink | 2 | 34 |
| 34 | Cheongju | Daejeon | pink | 2 | 33 |
| 35 | Cheonan | Cheongju | orange | 1 | 95 |
| 36 | Cheonan | Sejong | orange | 1 | 37 |
| 37 | Cheonan | Sejong | orange | 1 | 36 |
| 38 | Cheongju | Sejong | orange | 1 | 96 |
| 39 | Sejong | Daejeon | orange | 1 | 40 |
| 40 | Sejong | Daejeon | orange | 1 | 39 |
| 41 | Sejong | Boryeong | orange | 2 |  |
| 42 | Boryeong | Daejeon | orange | 3 |  |
| 43 | Boryeong | Iksan | orange | 2 |  |
| 44 | Daejeon | Iksan | orange | 2 | 45 |
| 45 | Daejeon | Iksan | weiss | 2 | 44 |
| 46 | Daejeon | Daegu | orange | 6 | 47 |
| 47 | Daejeon | Daegu | gruen | 6 | 46 |
| 48 | Sangju | Andong | gruen | 2 |  |
| 49 | Sangju | Gumi | gruen | 2 |  |
| 50 | Andong | Gumi | gruen | 3 |  |
| 51 | Andong | Pohang | gruen | 4 |  |
| 52 | Yeongju | Andong | gruen | 1 |  |
| 53 | Gumi | Daegu | gruen | 1 | 54 |
| 54 | Gumi | Daegu | gruen | 1 | 53 |
| 55 | Daegu | Pohang | gruen | 3 | 56 |
| 56 | Daegu | Pohang | gruen | 3 | 55 |
| 57 | Pohang | Ulsan | schwarz | 3 | 58 |
| 58 | Pohang | Ulsan | gruen | 3 | 57 |
| 59 | Daegu | Ulsan | schwarz | 3 |  |
| 60 | Daegu | Busan | gruen | 4 | 61 |
| 61 | Daegu | Busan | schwarz | 4 | 60 |
| 62 | Daegu | Changwon | schwarz | 3 |  |
| 63 | Daegu | Jinju | schwarz | 4 |  |
| 64 | Ulsan | Busan | schwarz | 2 | 65 |
| 65 | Ulsan | Busan | schwarz | 2 | 64 |
| 66 | Jinju | Changwon | schwarz | 2 | 67 |
| 67 | Jinju | Changwon | schwarz | 2 | 66 |
| 68 | Changwon | Busan | schwarz | 2 | 69 |
| 69 | Changwon | Busan | schwarz | 2 | 68 |
| 70 | Suncheon | Jinju | rot | 3 | 71 |
| 71 | Suncheon | Jinju | schwarz | 3 | 70 |
| 72 | Yeosu | Jinju | rot | 3 | 73 |
| 73 | Yeosu | Jinju | schwarz | 3 | 72 |
| 74 | Gwangju | Suncheon | rot | 2 | 75 |
| 75 | Gwangju | Suncheon | rot | 2 | 74 |
| 76 | Suncheon | Yeosu | rot | 1 | 99 |
| 77 | Gwangju | Mokpo | rot | 2 | 78 |
| 78 | Gwangju | Mokpo | rot | 2 | 77 |
| 79 | Mokpo | Yeosu | rot | 6 |  |
| 80 | Mokpo | Gunsan | rot | 6 |  |
| 81 | Gwangju | Jeonju | rot | 3 | 97 |
| 82 | Boryeong | Gunsan | weiss | 2 |  |
| 83 | Gunsan | Iksan | weiss | 1 | 84 |
| 84 | Gunsan | Iksan | weiss | 1 | 83 |
| 85 | Iksan | Jeonju | weiss | 1 | 86 |
| 86 | Iksan | Jeonju | weiss | 1 | 85 |
| 87 | Gwangju | Namwon | weiss | 2 |  |
| 88 | Gunsan | Gwangju | weiss | 4 |  |
| 89 | Jeonju | Namwon | weiss | 2 |  |
| 90 | Jeonju | Jinju | weiss | 5 |  |
| 91 | Namwon | Jinju | weiss | 3 |  |
| 92 | Taebaek | Pohang | grau | 6 |  |
| 93 | Changwon | Yeosu | grau | 5 |  |
| 94 | Wonju | Jecheon | pink | 2 | 13 |
| 95 | Cheonan | Cheongju | pink | 1 | 35 |
| 96 | Cheongju | Sejong | pink | 1 | 38 |
| 97 | Gwangju | Jeonju | weiss | 3 | 81 |
| 98 | Gunsan | Jeonju | weiss | 1 |  |
| 99 | Suncheon | Yeosu | rot | 1 | 76 |
| 100 | Namwon | Suncheon | rot | 2 |  |

Alle Längen und Farben nach Davids Änderungsliste vom 08.09.2026 korrigiert. Nachgetragene Strecken: 94 Wonju–Jecheon pink 2 (Doppel zu 13), 95 Cheonan–Cheongju pink 1 (Doppel zu 35), 96 Cheongju–Sejong pink 1 (Doppel zu 38), 97 Gwangju–Jeonju weiß 3 (Doppel zu 81), 98 Gunsan–Jeonju weiß 1, 99 Suncheon–Yeosu rot 1 (Doppel zu 76), 100 Namwon–Suncheon rot 2.

## Feldpositionen
140 Feldpositionen stammen aus Davids Editor-Exporten (v0.92 und v0.93); die übrigen aus der Farbmaskenerkennung bzw. Interpolation. Die Felder der neuen Strecken 94–96 und 100 sitzen auf erkannten Feldern des Brettscans, 97, 98 und 99 wurden im zweiten Korrekturbatch nachjustiert. Feldmaß einheitlich l 4.64 / w 1.04 (%). Alle Strecken `geprueft: false`; Feinjustage im Editor, Export dann als Korrekturbatch.

## Zielkarten (44)
| von | nach | Punkte |
|---|---|---|
| Incheon | Mokpo | 15 |
| Incheon | Changwon | 13 |
| Jeonju | Ulsan | 14 |
| Seoul | Gangneung | 13 |
| Cheongju | Gwangju | 8 |
| Seoul | Iksan | 7 |
| Namwon | Changwon | 5 |
| Seoul | Sejong | 4 |
| Donghae | Suncheon | 22 |
| Gwangju | Taebaek | 21 |
| Donghae | Busan | 18 |
| Mokpo | Busan | 15 |
| Gwangju | Gumi | 13 |
| Jinju | Pohang | 9 |
| Gwangju | Yeosu | 3 |
| Sangju | Changwon | 8 |
| Daejeon | Gumi | 9 |
| Incheon | Yeongju | 13 |
| Daejeon | Suncheon | 8 |
| Cheongju | Ulsan | 10 |
| Daegu | Yeosu | 9 |
| Sejong | Jeonju | 4 |
| Suwon | Jinju | 12 |
| Daegu | Ulsan | 4 |
| Boryeong | Chuncheon | 12 |
| Seoul | Gwangju | 11 |
| Seoul | Daegu | 10 |
| Gunsan | Daejeon | 3 |
| Suwon | Chuncheon | 5 |
| Boryeong | Daegu | 12 |
| Paju | Seoul | 2 |
| Suwon | Gunsan | 7 |
| Incheon | Iksan | 7 |
| Suwon | Pohang | 17 |
| Daejeon | Taebaek | 13 |
| Andong | Busan | 10 |
| Cheonan | Changwon | 10 |
| Daejeon | Busan | 10 |
| Seoul | Busan | 14 |
| Jecheon | Daegu | 8 |
| Paju | Daejeon | 7 |
| Cheonan | Wonju | 5 |
| Gangneung | Ulsan | 20 |
| Wonju | Changwon | 15 |

## Integration in die App (v7.49, umgesetzt)
- Edition `suedkorea` als 15. Eintrag in `EDITIONEN`; alle Strecken `geprueft: true`.
- **Namenskonflikt gelöst:** `meta.express` ist in der Japan-Edition belegt (Express-Strecken / Entwicklungsleiste). Die Südkorea-Karten liegen deshalb unter `meta.expresskarten`.
- **Start-Draft** vom Iberia-Code entkoppelt: neue Weiche `DR()` (greift, sobald `meta.draft` vorhanden ist). Südkorea nutzt nur den Start-Draft (6 wählen, genau 4 behalten, 2 gemischt zurück); Zielkarten ziehen ist ab dem ersten Zug erlaubt.
- **Expresszug-Karten:** `skExpModal()` mit den beiden sofort wirksamen Einsätzen; der dritte (Feldwert erhöhen) steckt im Provinzen-Dialog. Höchstens eine Karte pro Zug.
- **Provinzen-Plan:** `game.prov[farbe][feld] = Sitzplatz`. Nach jedem Streckenbau fragt `skNachBau()`, ob ein Waggon gelegt wird – Linie (bei Grau frei wählbar), Zusatzkarten in der gezahlten Farbe bzw. Joker, optional Expresszug. Belegtes Feld → nächstes freies darunter; kein freies Feld → kein Waggon. Der Waggon wird vom Vorrat abgezogen und löst damit auch die normale Spielende-Regel mit aus.
- **Endwertung** `skProvWertung()`: je Linie Summe der Feldwerte, Rangliste, Punkte 10/6/4/2 nach Spielerzahl; Gleichstand über das höhere Einzelfeld. Ergebnis erscheint im Showdown und in der Punktetabelle.
- **Anzeige:** Plan-Knopf (🗺) im Dock mit der eigenen Waggon-Zahl, Spieler-Chips zeigen übrige Expresszug-Karten und Waggons auf dem Plan.
- `doppelstrecken_frei_ab: 3` (App-Hausregel statt 4 laut Heft) wird beim Spielstart in `ROOM.dopAb` eingefroren.

## Benötigte Dateien neben der `index.html`
`suedkorea_karte.jpg`, `auftrag_suedkorea.jpg`, `provinzen_suedkorea.jpg`, `sk_express_1.jpg`, `sk_express_2.jpg`, `sk_express_3.jpg`
