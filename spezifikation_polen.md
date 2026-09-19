# Zug um Zug – Polen · Spezifikation (Kartenpaket v0.92, App v7.59)

## Eckdaten
- Schlüssel `polen`, Name „Polen", statId „Zug um Zug Polen"
- 2–4 Spieler, 35 Waggons pro Spieler, normales 110er-Wagenkartendeck, 4 Starthandkarten
- Brett: `polen_karte.jpg` (2150×2150, quadratisch → board_h 1000)
- Auftragskarte: `auftrag_polen.jpg` (1120×700), tk-Rechteck {mx0 290, my0 140, mw 540, mh 540} (quadratisch, passend zum Brettverhältnis 1:1)
- 28 Städte + 7 Länderknoten (Randmedaillons), 102 Strecken-Einträge, 35 Zielkarten, 20 Länderkarten

## Zielkarten
- Start: 4 ziehen, mindestens 2 behalten
- Nachziehen: 3 ziehen, mindestens 1 behalten
- Zielkarten verbinden ausschließlich Städte, nie Länder
- Punkte auf der Karte; nicht erfüllte Ziele zählen Minuspunkte (Standard)

## Streckenwertung
Länge 1/2/3/4/5 → 1/2/4/7/10 Punkte. Maximale Streckenlänge 5 (Gdańsk–Płock gelb).
Doppelstrecken: wie üblich erst ab 3 Spielern beide Gleise nutzbar (`doppelstrecken_frei_ab: 3`;
Regelheft sagt ab 4 – bewusst auf Haus-Standard 3 gesetzt).

## Keine Boni
Kein Bonus für längste Strecke oder meiste Aufträge.
**Gleichstand:** Es gewinnt, wer mehr Zielkarten erfüllt hat; danach, wer mehr Punkte aus erfüllten Zielkarten hat.

## Spezialgleise zu den Nachbarländern (Strecken 83–102, Feld `spezial`)
Mehrfachgleise in den Flaggenfarben verbinden Grenzstädte mit den 7 Nachbarländern:

| Land | Anschlussstadt | Gleise (Farbe · Länge) |
|---|---|---|
| Niemcy | Gorzów Wielkopolski | schwarz 1 · rot 1 · gelb 1 |
| Rosja | Olsztyn | weiss 2 · blau 2 · rot 2 |
| Litwa | Suwałki | gruen 1 |
| Białoruś | Siedlce | rot 2 · gruen 2 · schwarz 2 |
| Ukraina | Rzeszów | blau 2 · gelb 2 · orange 2 |
| Słowacja | Bielsko-Biała | weiss 1 · blau 1 · rot 1 |
| Czechy | Wrocław | rot 3 · blau 3 · weiss 3 · pink 3 |

Regeln:
- Bei **jeder** Spielerzahl sind alle Gleise offen (keine Doppelstrecken-Sperre; deshalb bewusst **kein** `doppel_mit`, sondern eigenes Feld `spezial: "<land>"`).
- Jeder Spieler darf pro Land **höchstens 1 Gleis** bauen.
- Die Gleisanzahl pro Land entspricht genau der Anzahl seiner Länderkarten.

## Länderkarten (20 Stück, meta.laender)
Offene Stapel pro Land, niedrigster Wert unten, höchster oben – die **oberste (höchste) Karte wird zuerst genommen**.
Im JSON: `karten` aufsteigend sortiert, oberste Karte = **letztes** Element (bei Vergabe von hinten entnehmen).

| Land | Werte (unten → oben) |
|---|---|
| Niemcy | 3, 4, 7 |
| Rosja | 3, 4, 7 |
| Litwa | 3 |
| Białoruś | 2, 4, 6 |
| Ukraina | 2, 4, 6 |
| Słowacja | 2, 4, 6 |
| Czechy | 2, 4, 7, 10 |

**Vergabelogik** (nach jedem Streckenbau prüfen):
Sobald durch den Bau ein Land **neu** Teil eines Streckennetzes des Spielers wird und dieses Netz danach **mindestens 2 Länder** verbindet, nimmt der Spieler sofort die oberste Karte **jedes** Landes, das mit diesem Netz verbunden ist – auch der bereits vorher verbundenen Länder.

Beispiele:
1. Spieler verbindet erstmals Niemcy mit seinem Netz, das noch kein anderes Land enthält → nichts (nur 1 Land im Netz).
2. Dasselbe Netz erreicht später Czechy → Netz verbindet jetzt 2 Länder: oberste Karte von Niemcy **und** Czechy nehmen.
3. Das Netz erreicht danach Słowacja → oberste Karte von Niemcy, Czechy **und** Słowacja nehmen (alle verbundenen Länder erneut).
4. Spieler verbindet zwei eigene Netze (z. B. Netz A mit Niemcy+Czechy, Netz B mit Ukraina) durch eine Strecke: Ukraina ist für das Gesamtnetz neu → oberste Karte von Niemcy, Czechy und Ukraina.
5. Zusammenschluss zweier Netze **ohne** neues Land (beide enthielten nur dieselben/keine Länder) → keine Karten.
- Ist ein Stapel leer, geht der jeweilige Anspruch leer aus.
- Jede Länderkarte zählt am Spielende ihre Punkte (Anzeige wie Pennsylvania-Anteilsstapel).

Karten-Assets: `pl_land_<land>_<wert>.jpg` (20 Stück, generiert: Flagge + Punktwert + Name wie auf dem Brett).

## Dateien im Paket
- `polen_karte.json` – Kartendaten v0.90 (alle Strecken `geprueft: false`)
- `polen_karte.jpg` – Spielbrett (Scan)
- `auftrag_polen.jpg` – Zielkarten-Hintergrund (ausgeblichenes Brett im tk-Rechteck)
- `pl_land_*.jpg` – 20 Länderkarten
- `editor_polen.html` – Feld-Editor (Korrekturbatch-Export wie gewohnt)
- `kontrolle_polen.jpg` – Kontrollbild (alle 232 Felder magenta, Knoten cyan, Streckennummern)

## Datenherkunft / Hinweise v0.90
- Feldpositionen per Farbmasken-Detektion (220 Felder), 12 Felder manuell interpoliert, wo Brettfalz
  (x=1075 / y=1075), dunkler Untergrund oder heller Rand die Erkennung verschluckt hat
  (u. a. Gdańsk–Płock Mittelfeld, Kalisz–Opole oberstes Feld, Warszawa–Białystok Felder 3–4,
  Piła–Bydgoszcz schwarz, Koszalin–Szczecin schwarz Feld 3, Białoruś schwarz, Czechy weiss 2 Felder).
- Einheitliches Feldmaß l 4.11 / w 1.03 (v0.91; Mittel der Detektion war 97×33 px = 4.5/1.55).
- v0.92 (Korrekturbatch 1): 34 Knoten- und 14 Feldpositionen übernommen; Kalisz–Opole blau ist eine 2er-Strecke,
  Ełk–Suwałki orange eine 1er-Strecke (jeweils das im Editor beiseitegezogene Feld 1 entfernt); Farbname **lila → pink**,
  weil der Kartensatz der App nur `pink` kennt; Zielkarten-Layout ergänzt (tk_vb 1120×700, tk 290/140/540×540,
  Punktzahl unten rechts). Alle 102 Strecken stehen jetzt auf `geprueft: true`, 230 Felder.
- Knoten der Länder sitzen am Medaillon-Rand; Feinjustage im Editor möglich (Knoten sind ziehbar).

## Integration in die App (v7.59)
- Erkennung `PL()` über `meta.laender`; Edition als 18. Eintrag vor `langenberg_nb`
- Kartenstapel: `game.lk` = Restanzahl je Land (oberste Karte = letztes Element von `meta.laender[x].karten`)
- Eigene Karten: `players[i].lk` = {land: [werte]}, in der `fix()`-Whitelist (sonst nach Firebase-Sync verloren)
- `plNachBau()` läuft nach jedem Bau in der Kette `skNachBau → plNachBau → endTurn`
- `plBauSperre()`: höchstens 1 Spezialgleis je Spieler und Land; Doppelstrecken-Sperre greift hier nicht
- 🏳-Kachel im Dock öffnet die Stapel-/Spielerübersicht, 🏳-Zähler im Spieler-Chip
- Endwertung: eigene Länderkarten-Zeile, Showdown-Ereignis, Gleichstand über `rangCmp()`
- Assets neben der index.html: `polen_karte.jpg`, `auftrag_polen.jpg`, 20× `pl_land_*.jpg`
