# Zug um Zug – Italia · Kartenpaket v0.9 (Entwurf)

Stand v0.92 (Korrekturbatch 1 eingearbeitet). Erstellt aus dem Spielplan-Scan (Italien.jpg, Rand entfernt, 2163×3886 px) und den
Italien-Regeln (Days of Wonder, Map Collection Japan/Italien). Stand: 31.08.2026.

## Dateien

| Datei | Inhalt |
|---|---|
| `italia_karte.json` | Vollständige Edition: `meta`, `knoten`, `strecken`, `auftraege` – Struktur wie `niederlande` in `EDITIONEN` |
| `italia_karte.jpg` | Spielplan ohne weißen Scanrand, 2400×4312 px (`board_h` = 1797) |
| `auftrag_italia.jpg` | Auftragskarten-Hintergrund 700×1120, ausgeblichener Plan im Rahmen (`tk`: mx0 83, my0 120, mw 534, mh 960) |
| `editor_italia.html` | Feld-Editor (aus editor_niederlande abgeleitet; erwartet `italia_karte.jpg` im selben Ordner). Export liefert `{knoten, felder}` mit `nr/feld/x/y/deg/l/w` |
| `kontrolle_italia.jpg` | Kontrollbild: gefittete Felder (magenta), Städte (cyan), Auslands-Einmündungen (gelb) |

## Kennzahlen

- 34 Städte in 17 Regionen, 12 Auslands-Einmündungen (5 Länder), 128 Strecken, 379 Felder
- 43 Doppelstrecken (`doppel_mit`), 1 Dreifachstrecke Roma–Napoli (`doppel_mit` als Liste, wie Deutschland/`dmList()`)
- 21 Fährstrecken (alle grauen) mit zusammen 55 Wellenfeldern (`faehre` = Anzahl Wellenfelder)
- 56 Zielkarten (Liste von David, 1:1 übernommen)
- Farbverteilung: rot 14, orange 14, gelb 14, grün 12, blau 14, pink 14, weiß 12, schwarz 13, grau 21

## Regeln (in `meta.regeln`)

- 2–5 Spieler, 45 Waggons, 4 Starthandkarten
- Start: 5 Zielkarten, min. 3 behalten · Nachziehen: 4, min. 1 behalten; Rückgaben unter den Stapel
- `doppelstrecken_frei_ab: 3` (Vorgabe David; Original: ab 4) · `dreifachstrecken_frei_ab: 2` (immer alle drei nutzbar – **neuer Schlüssel**, App muss ihn auswerten, sonst gilt für die Dreifachstrecke die Doppelregel)
- Punkte je Länge 1/2/4/7/10/15/18 (Länge 7 kommt vor: Bari–Croazia, Genova–Olbia, Cagliari–Palermo, Napoli–Palermo, Napoli–Messina)
- Kein Bonus für längste Strecke und meiste Aufträge (`laengste_strecke_bonus: 0`, `meiste_auftraege_bonus: 0`)

## Nachbarländer (wie Deutschland)

Je Einmündung ein Randknoten `land_N` mit `rand: true`, `stadt: land`; gleicher `name` je Land.
Strecken enden dort, keine Durchfahrt; Einmündungen desselben Landes zählen für Aufträge als ein Ort,
gelten aber nicht als miteinander verbunden.

| Land | Einmündungen |
|---|---|
| Francia | francia_1 (Torino gelb 2 / pink 2), francia_2 (Torino grün 3) |
| Monaco | monaco_1 (Genova Fähre 3, 1 Welle) |
| Svizzera | svizzera_1 (Torino rot 3), _2 (Milano blau 3), _3 (Bergamo weiß 2), _4 (Bolzano blau 1) |
| Austria | austria_1 (Bolzano schwarz 2), austria_2 (Tarvisio rot 1 / gelb 1) |
| Croazia | croazia_1 (Trieste gelb 2 / pink 2), _2 (Ancona Fähre 4, 2 Wellen), _3 (Bari Fähre 7, 4 Wellen) |

Slovenia ist nur Beschriftung ohne Einmündung und kommt in keinem Auftrag vor → kein Knoten.
`LANDFLAGGE` in der index.html braucht Einträge für Francia, Monaco, Svizzera, Austria, Croazia.

## Neu für die App: Fährenkarten (Variante a, vollständig)

`meta.faehrenkarten = { anzahl: 10, max_hand: 2, deckt_wellen: 2, lok_deckt: 1 }`

1. **Kartentyp:** eigener Stapel mit 10 Fährenkarten (kein Nachschub – ist der Stapel leer, entfällt die Aktion). Handkartenanzeige: eigener Zähler „Fähren: n/2".
2. **Neue Zugaktion „Fährenkarte nehmen":** ganzer Zug; nur wählbar, wenn < 2 Fährenkarten auf der Hand.
3. **Streckenbau auf Fährstrecken** (`farbe: grau`, `faehre: w` Wellenfelder, `laenge: n`):
   - Wellenfelder: Bezahlung mit Lok (1 Lok = 1 Wellenfeld) und/oder Fährenkarte (1 Fährenkarte = bis zu 2 Wellenfelder, Rest verfällt). Benötigt: `loks + 2*faehrenkarten >= w`, aber `faehrenkarten <= ceil(w/2)`.
   - Übrige Felder `n - w`: Wagenkarten einer Farbe (grau = beliebige Farbe) plus beliebig viele Loks.
   - Fährenkarten dürfen nie für normale Strecken oder für wellenlose Felder eingesetzt werden.
   - Vorschlag UI: Bau-Dialog zeigt „Wellen: w · Loks/Fähren wählen" mit automatischer Minimal-Kombination (erst Fährenkarten, dann Loks) und Möglichkeit, mehr Loks statt Fähren einzusetzen.
4. Eingesetzte Fährenkarten kommen zurück in den Vorratsstapel (`g.fk`), stehen also wieder zum Nehmen bereit.

Bis die App das kann, funktioniert die Karte auch mit der Skandinavien/Afrika-Logik
(`faehre` = Anzahl Pflicht-Loks), da die Wellenzahl identisch codiert ist.

## Neu für die App: Regionenbonus (Spielende)

`meta.regionen = { liste[17], punkte{5:1 … 15:56}, max: 15, doppelt{ Sardegna, Sicilia, Puglia → Stadt-Ids } }`
Jeder Stadtknoten hat `region`. Randknoten haben keine Region.

Algorithmus je Spieler:
1. Zusammenhangskomponenten des eigenen Streckennetzes bilden (Randknoten mit gleichem `stadt` **nicht** verschmelzen).
2. Je Komponente: Menge der Regionen der enthaltenen Stadtknoten. Für jede Sonderregion (Sardegna 3, Sicilia 5, Puglia 4 Städte): liegen **alle** Städte der Region in dieser Komponente, zählt sie 2 statt 1.
3. Punkte = `punkte[min(anzahl,15)]`, unter 5 Regionen 0. Summe über alle Komponenten.
4. Anzeige im Showdown: „Regionen: a + b … → x Punkte" (ersetzt die Zeile „längste Strecke").

Beispiel aus der Regel: Netz mit 9 Regionen → 11 Punkte; zwei Netze mit je 5 → 1 + 1 = 2.

## Datenqualität / Prüfliste für den Editor

Alle Strecken stehen auf `geprueft: false`. Feldpositionen wurden per Farbmaske im Korridor
zwischen den Städten gefittet (Fähren und Kurven per Wegpunkten). Besonders zu prüfen
(schwache Maskenabdeckung beim Fit):

- Trieste–Croazia (pink 2), Pisa–Grosseto (orange 3, gebogen), Pisa–Firenze (pink 2)
- Olbia–Roma (beide Fähren 4), Sassari–Cagliari (schwarz 4), Salerno–Cosenza (grün 4)
- Genova–Olbia (Fähren 7), Cagliari–Palermo (Fähren 7), Napoli–Palermo (Fähren 7), Siracusa–Messina (Fähren 3)
- Erste Felder der Fähren direkt an Napoli (Napoli–Messina, Napoli–Palermo)

Unsichere Lesungen am physischen Plan gegenprüfen:

- Napoli–Foggia grün **3** (Distanz spricht für 3–4)
- Perugia–Pescara schwarz **3**, Bergamo–Bolzano rot **4**, Palermo–Catania weiß **4**
- Venezia–Ancona und Trieste–Ancona: je **5** Felder mit **3** Wellen
- Genova–Parma: schwarz 2 / weiß 2 (Doppelstrecke), Torino–Milano: schwarz 3 / weiß 3 (Doppelstrecke)
- Die Randknoten liegen auf den Pfeilspitzen; Anzeigeposition ggf. im Editor verschieben

## Integration in index.html (später, nach Kartenprüfung)

1. Block `italia` in `EDITIONEN` einfügen (kompaktes JSON, `"": `-Stil), `APP_VERSION` erhöhen
2. Bilder `italia_karte.jpg`, `auftrag_italia.jpg` ins Repo
3. `LANDFLAGGE`-Einträge für die 5 Länder
4. `dreifachstrecken_frei_ab` in der Doppelstrecken-Sperre auswerten (`dmList()` liefert 2 Partner)
5. Fährenkarten-Mechanik (oben) und Regionenbonus (oben) implementieren; `laengste_strecke_bonus: 0` / `meiste_auftraege_bonus: 0` beachten
6. Tests in `test.js`: Wellenbezahlung (Lok/Fähre-Kombinationen), Regionenzählung inkl. Sonderregionen und Teilnetzen, Dreifachstrecke bei 2 Spielern
