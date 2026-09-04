# Zug um Zug – Japan · Kartenpaket v0.9 (Entwurf)

Erstellt aus dem Spielplan-Scan (Japan.jpg, 3867×2148 px, Querformat) und den Japan-Regeln
(Days of Wonder, Map Collection Japan/Italien). Stand: 01.09.2026.

## Dateien

| Datei | Inhalt |
|---|---|
| `japan_karte.json` | Vollständige Edition: `meta`, `knoten`, `strecken`, `auftraege` – Struktur wie `italia`/`niederlande` |
| `japan_karte.jpg` | Spielplan 2400×1333 px (`board_h` = 556, Querformat) |
| `auftrag_japan.jpg` | Auftragskarten-Hintergrund 1120×700 (Querformat): Titelfeld links, Punktefeld rechts oben, ausgeblichener Plan (`tk`: mx0 80, my0 140, mw 960, mh 533) |
| `editor_japan.html` | Feld-Editor (aus editor_niederlande abgeleitet; erwartet `japan_karte.jpg` im selben Ordner; KW/KH 2400×1333, DX/DY angepasst) |
| `kontrolle_japan.jpg` | Kontrollbild: normale Felder magenta, Express-Felder grün, Städte cyan |

## Kennzahlen

- 50 Knoten: 32 Hauptkarte, 7 Kyushu-Inset, 11 Tokyo-Inset. **Tokyo** (`tokyo`/`tokyo_u`) und **Kokura** (`kokura`/`kokura_k`) existieren je doppelt (Tor-Symbol, `tor: true`), gleicher Name.
- 115 Strecken / 280 Felder, 24 Doppelstrecken (`doppel_mit`), **25 Express-Strecken** (`farbe: grau`, `express: true`, 62 Felder). Aomori–Hakodate = weiß 4 + Express 3 als zwei getrennte Einzelstrecken (kein `doppel_mit`).
- 54 Zielkarten (Liste von David; Namen auf Plan-Schreibweise gemappt: Kōchi, Ōita, Shinjō, Kagoshima-Chūō, Suitengūmae, Monzen-Nakachō; „Odaware" → Odawara).
- Farbverteilung: grau 25, rot 13, orange 12, weiß 12, grün 12, blau 12, gelb 11, pink 11, schwarz 11.

## Regeln (in `meta.regeln` / `meta.express`)

- 2–5 Spieler, **20 Waggons**, 4 Starthandkarten
- Start: 4 Zielkarten, min. 2 behalten · Nachziehen: 3, min. 1 behalten
- `doppelstrecken_frei_ab: 3` (Vorgabe David; Original ab 4)
- Punkte je Länge 1/2/4/7/10/15 (max. Länge 5 auf dieser Karte)
- Kein Bonus für längste Strecke / meiste Aufträge
- Keine Fähren, keine Tunnel, keine Auslandsziele

## Tor-Städte (Tokyo, Kokura)

`meta.verbunden = [["tokyo","tokyo_u"],["kokura","kokura_k"]]`.
Beide Knoten eines Paars sind **dieselbe Stadt**: In der Netz-Zusammenhangsprüfung (`tkErfuellt`, Regionen-/Netzlogik) müssen die beiden Ids als fest verbunden gelten (Union vor der Suche). Für Aufträge reicht der gleiche Name (`nameToIds`). **Achtung:** Das ist das Gegenteil der Randknoten-Regel (Deutschland/Italia: gleichnamige `rand`-Knoten verschmelzen *nicht*) – Japan-Knoten sind nicht `rand`, die Verschmelzung muss explizit über `meta.verbunden` erfolgen.

## Neu für die App: Express-Strecken und Entwicklungsleiste

`meta.express = { zuege: 16, leiste_max: 30, bonus{…}, ohne_beteiligung: -20 }`

**Spielzustand:** `g.expRest` (Expresszüge im Vorrat, Start 16), `p.exp` (Position auf der Entwicklungsleiste, Start 0). Beide Felder in die `fix()`-Whitelist bzw. Game-Defaults aufnehmen (Lehre aus `p.fk`!).

**Bau einer Express-Strecke** (`s.express && g.expRest > 0`):
1. Bezahlen wie graue Strecke (beliebige Farbe + Joker), Optionen über `bauOptionen` unverändert.
2. **Keine** Streckenpunkte, **keine** Waggons abziehen.
3. `g.expRest -= 1`; `p.exp = min(leiste_max, p.exp + s.laenge)` (Karten abgegeben = Länge).
4. `claims[nr] = 'X'` (gemeinsam) statt Sitznummer. Darstellung: weißer Expresszug (z. B. auf dem mittleren Feld oder allen Feldern in Weiß mit dunklem Rand), Zugtext „… baut Express-Strecke A–B (+n auf der Leiste)".
5. Ist `g.expRest === 0`, wird die Strecke wie eine normale graue Strecke gebaut (Waggons, Punkte, kein Leistenfortschritt).

**Netz-Logik:** Strecken mit `claims[nr] === 'X'` zählen für **jeden** Spieler als eigene Verbindung (in `tkErfuellt` und allen Zusammenhangsprüfungen). Doppelstrecken-Sperre: eine Express-Strecke mit Zug ist für alle belegt; ein etwaiger Partner (`doppel_mit`) folgt der normalen Doppelregel.

**Spielende:** Letzte Runde, wenn am Zugende `p.wagons <= 2` **und** `g.expRest <= 2` (statt nur `<= 2` Waggons). Bei Editionen ohne `meta.express` bleibt die bisherige Bedingung.

**Endwertung (finalScore):**
- Rangliste nach `p.exp` absteigend; Bonus laut `meta.express.bonus[String(spielerzahl)]` (Index = Rang−1).
- Gleichstand: gleiche Punkte für alle Gleichplatzierten, der Nächste bekommt den Wert seines *tatsächlichen* Platzes (Standard-Wettkampfranking: 1, 1, 3 …).
- Spieler mit `p.exp === 0` erhalten `ohne_beteiligung` (−20) unabhängig vom Rang.
- Ausgabe in `p.res.exp` / `p.res.ebonus`, Showdown-Ereignis „Express-Bonus (Platz r, Leiste n)" und Zeile in der Endtabelle. Negative Werte möglich.

**UI:** Anzeige `g.expRest` (Vorrat) neben der Auslage und `p.exp` je Spieler im Spielerpanel („Leiste n/30").

Beispiel (3 Spieler): A 14, B 14, C 0 → A +15, B +15, C −20 (C nie beteiligt); A 14, B 9, C 3 → +15 / +5 / −10.

## Datenqualität / Prüfliste für den Editor

Alle Strecken stehen auf `geprueft: false`. Feldpositionen per Farbmaske im Korridor gefittet; Express-Felder (helle Graufelder mit Chevron- bzw. Silhouettengravur) haben die schwächste Maskenabdeckung – dort ist die Feinjustage am ehesten nötig:

- Express: Hiroshima–Okayama (4), Okayama–Osaka (2), Kokura–Hiroshima (3), Kokura–Matsuyama (4), Aomori–Morioka (3), Akita–Morioka (2), Morioka–Sendai (3), Utsunomiya–Fukushima (3), Nagano–Takasaki (2), Tokyo–Ginza (1), Nagoya–Ise (2)
- Farbig, schwach gefittet: Shinjuku–Shibuya schwarz 2, Okayama–Takamatsu rot/gelb 1, Tottori–Okayama weiß 2, Kyoto–Ise orange 3, Nagoya–Matsumoto blau 3, Sendai–Iwaki blau 3, Niigata–Fukushima rot 3
- Aomori–Hakodate: weißer Bogen (4) und Express-Bogen (3) liegen dicht beieinander

Unsichere Lesungen am physischen Plan gegenprüfen:

- Ikebukuro–Yotsuya rot **2**, Ikebukuro–Shinjuku orange/grün **3**, Tokyo–Suitengūmae weiß/schwarz **2** (nachträglich im Kontrollbild erkannt)
- Takasaki–Tokyo Express **3**, Niigata–Takasaki Express **4**, Kanazawa–Nagano Express **4**
- Tottori–Tsuruga blau **4**, Tottori–Osaka rot **3**, Tottori–Kyoto grün **4**, Tsuruga–Kyoto schwarz **1**, Tsuruga–Ise weiß **3**, Kyoto–Ise orange **3**
- Miyazaki–Ōita weiß **4**, Aomori–Miyako gelb **5**, Sendai–Miyako pink **5**, Shinjō–Sendai weiß **3**
- Tokyo–Narita orange 1 / pink 1 (rot war nicht maskierbar → orange angenommen), Masuda–Hiroshima weiß 1 / rot 1
- Position der Knoten Takamatsu, Okayama, Nagoya, Kanazawa, Tokyo-Tor (Inset): manuell gesetzt (keine automatische Markererkennung)

## Integration in index.html (später, nach Kartenprüfung)

1. Block `japan` in `EDITIONEN`, `APP_VERSION` erhöhen, Bilder `japan_karte.jpg`, `auftrag_japan.jpg` ins Repo
2. `meta.verbunden` in der Netzlogik auswerten (Union der Tor-Knoten)
3. Express-Mechanik (oben): Bau, gemeinsame Claims `'X'`, Vorrat, Leiste, geänderte Endbedingung, Bonuswertung mit Gleichstandsregel, `fix()`-Whitelist (`p.exp`, `g.expRest`)
4. Tests in `test_japan.js`: Bonusverteilung (alle Spielerzahlen, Gleichstände, −20), Netzverbindung über Express-Strecken für Fremdspieler, Tor-Verschmelzung Tokyo/Kokura für Auftrag Kagoshima-Chūō–Kokura und Hakata–Tokyo, Endbedingung
