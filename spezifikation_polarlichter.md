# Zug um Zug – Polarlichter (Edition `polarlichter`) · Paket v0.92

Kartenpaket zur Abnahme. Integration in die index.html erfolgt nach deiner Prüfung/Korrektur (wie besprochen: erst Paket, dann Einbau).

**v0.91:** Feldmaß einheitlich l 4.75 / w 1.01.

**v0.92 (Korrekturbatch 1, Word):** 39 Knoten und alle Feldpositionen auf Davids Editorwerte übernommen. Strukturell: Lahti–Helsinki jetzt Doppelstrecke 1er pink/orange (statt 2er orange) · Turku–Kuressaare existiert nicht – die beiden Ketten sind **Stockholm–Helsinki** (Doppel grau 4, je 1 Lok, Nr. 122/123) · Umeå–Vaasa jetzt Doppel 1er grau, je 1 Lok (statt 2er mit 2 Loks) · **Neu:** Lieksa–Kuopio Doppel 1er orange/pink (157/158), Oslo–Ålborg grau 3 mit 1 Lok (159), Karlskrona–Gdańsk grau 2 mit 1 Lok (160), Visby–Kuressaare grau 2 mit 1 Lok (161). 28 Felder entfernt mit Längenanpassung: Honningsvåg–Schweden Nord 3, Kirkenes–Kemijärvi 3, Schweden Nord–Kirkenes 3, Honningsvåg–Kirkenes 2 (Loks 3→2, prüfen), Kirkenes–Apatity 3, Apatity–Kemijärvi 2, Apatity–Kostomuksha 3, Rovaniemi–Oulu 2, Boden–Rovaniemi 1, Kostomuksha–Kajaani 1, Kostomuksha–Lieksa 1, Karlstad–Göteborg 2, Karlstad–Norrköping 1, Norrköping–Visby Doppel 1/1 (Loks 2→1, prüfen), Tampere–Helsinki 1, Stockholm–Turku Doppel 2/2 (F2 bleibt), Kiruna–Schweden Mitte 3, Boden–Schweden Mitte 3, Kajaani–Kuopio 1, Lieksa–Imatra 3, Vaasa–Kuopio 4, Kuopio–Lahti Doppel 3/3, Sundsvall–Karlstad 4, Göteborg–Norrköping Doppel 3/3, Karlskrona–Klaipėda 3, Sundsvall–Stockholm Doppel 3/3 (Felder an Lieksa–Kuopio), Göteborg–Ålborg Doppel 1/1 (Loks 2→1, prüfen; Felder an Oslo–Ålborg), Norrköping–Karlskrona Doppel 3/3 (Felder an Karlskrona–Gdańsk), Oslo–Göteborg Doppel 2/2 (Felder an Visby–Kuressaare). Stand: 161 Strecken-Einträge, 350 Felder.

## Dateien

| Datei | Inhalt |
|---|---|
| `polarlichter_karte.json` | Edition komplett: meta, 50 Knoten, 154 Strecken-Einträge (106 Verbindungen), 55 Aufträge |
| `polarlichter_karte.jpg` | Spielplan, beschnitten auf den Goldrahmen (1962×2935), Koordinatenbasis |
| `kontrollbild_polarlichter.jpg` | Spielplan mit eingezeichneten Feldern, Nummern (F=Fähren-Loks, +X=Bonus) und Knoten (rot = Polarkreis) |
| `auftrag_polarlichter.jpg` | Auftragskarten-Hintergrund 700×1120 (ausgeblichener Plan, Niederlande-Stil), tk-Fenster 60/118/580/868 |
| `polar_bonus_a.jpg … polar_bonus_k.jpg` | Die 11 Bonuskarten, hochkant normalisiert |
| `editor_polarlichter.html` | Feld-Editor auf UK-Vorlage (KW/KH 1962/2935), MAP eingebettet |
| `spezifikation_polarlichter.md` | Dieses Dokument |

## Eckdaten

- 2–5 Spieler, **40 Waggons**, Starthand 4, Punkte 1/2/4/7/10 (max. Länge 5)
- Ziele: Start 4 ziehen / mind. 2 behalten; Nachziehen 3 / mind. 1
- Kartendeck laut Regelheft: 12×8 Farben **inkl. Lila** (im Spiel als `pink`) + 18 Loks = 114
- Fähren: je Lok-Symbol **1 Lok ODER 2 gleichfarbige Wagenkarten** (`faehre:N` = Anzahl Lok-Symbole je Spur)
- Bonusfelder `bonus:N`: beim Bau N Karten verdeckt nachziehen
- Spielende: ≤2 Waggons → jeder (inkl. Auslöser) noch 1 Zug
- Keine Punkte für längste Strecke; stattdessen **11 Bonuskarten**, 4 zufällig je Partie (Gleichstand: alle bekommen die Punkte)

## Neue Datenfelder (App kennt sie noch nicht – für die Integration)

- `bonus:N` an Strecken → beim Bau N Karten verdeckt ziehen
- `polar:true` an Knoten → nördlich des Polarkreises (Bonuskarten H „Polarexpress", I „Schneepflug")
- `land:"…"` an jedem Knoten (9 Länder: norwegen, schweden, finnland, russland, daenemark, estland, lettland, litauen, polen) → Bonuskarte G „Internationale Ausbreitung"
- `unbenannt:true` an 3 Knoten (s. u.)
- Bonuskarten-Auswahl (4 aus 11 je Partie) + Endwertung

## Bewusste Auslegungen / Abweichungen (bitte absegnen)

1. **Doppelstrecken frei ab 3 Spielern** (wie in deinen anderen Editionen). Das Regelheft hat eigentlich eine Dreifach-Regel: 2 Spieler → nur 1 Spur der Dreifachstrecken, 3 Spieler → 2 Spuren, ab 4 → alle. Auf deine Ansage („wie gewohnt") vereinfacht.
2. **Pair-Rahmen = Doppelstrecken.** Die breiten Zwei-Slot-Goldrahmen (Westküste Norwegen, Nordmeer, Baltikum, Dänemark) sind als Doppelstrecken gelesen: 2 parallele Spuren im gemeinsamen Rahmen, jeder Slot ein Feld. Beleg: Regelbeispiel 3 (Narvik–Mo i Rana: eine Spur = 4 Felder, 2 Lok-Symbole → 1 Lok + 4 Karten) und die Waggon-Physik (1 Waggon je Slot). Schmale Einzelketten (z. B. Vaasa–Sundsvall, Regelbeispiel 2) bleiben einspurig.
3. **Bonus je Teilstrecke:** Bei Doppelstrecken mit +X trägt jede Spur den Bonus (Annahme – das Heft sagt dazu nichts).
4. **Unbenannte Rosetten:** Drei Rosetten tragen nur einen Landesring, keinen Namen → als Knoten `sverige_nord` („Schweden Nord"), `sverige_mitte` („Schweden Mitte"), `russland_mitte` („Russland Mitte") angelegt. Normale Knoten für Bau/Netz/Länder-Bonus, kommen in keiner Zielkarte vor.
5. **Polarkreis-Zuordnung** anhand der gezeichneten Linie: polar = Honningsvåg, Kirkenes, Murmansk, Apatity, Tromsø, Narvik, Kiruna, Kemijärvi, Rovaniemi, Schweden Nord. Russland Mitte, Boden, Tornio, Mo I Rana, Kostomuksha, Schweden Mitte liegen südlich.
6. **Ruf der Wildnis (Bonus A):** „meiste Loks" zählt echte eingesetzte Loks plus je Fähre ⌊(gleichfarbige Ersatzpaare)⌋ – 2 gleichfarbige Karten für ein Lok-Symbol zählen als 1 Lok.
7. Schreibweisen wie auf dem Brett: **Karlstad** (Karte sagt „Karstad" nirgends – Zielkartenliste korrigiert), **Kostomuksha** (statt „Kostumuksha").

## Prüfliste (geprueft:false überall; diese Punkte zuerst)

**Fähren/Baltikum:**
- **Turku–Kuressaare (Doppel, grau 4):** Lok-Symbole auf dem Scan nicht sicher erkennbar – als 1 Lok je Spur angenommen. **Bitte am Brett prüfen!** Auch Länge (3 oder 4 Rahmen) unsicher, da die Kette von Stockholm–Tallinn gekreuzt wird.
- Stockholm–Tallinn grau 4 (1 Lok): Verlauf kreuzt Turku–Kuressaare – Feldpositionen im Editor nachziehen.
- Karlskrona–Klaipėda grau 4 (1 Lok): Länge 3 oder 4?
- Visby–Karlskrona grau 2 (1 Lok): lange Felder, evtl. 3.
- Göteborg–Ålborg grau 2 (2 Loks): Lok-Zahl prüfen (beide Rahmen zeigen Loks → je Spur 2).
- Honningsvåg–Tromsø / Honningsvåg–Murmansk: je Doppel grau 4 (2 Loks) +2 – Länge 4 vs. 5 prüfen.
- Honningsvåg–Kirkenes grau 3 mit **3 Lok-Symbolen** – prüfen.

**Farbstrecken (Länge unsicher):**
- Apatity–Kemijärvi pink 3 · Apatity–Kostomuksha grün 4 · Russland Mitte–Kostomuksha gelb 3 · Russland Mitte–Lieksa pink 4
- Boden–Rovaniemi orange 2 (2. Feld unter Polarlicht-Glow)
- Oulu–Vaasa pink 3 · Vaasa–Kuopio gelb 5
- Kuopio–Imatra schwarz 2 · Lieksa–Imatra weiß 4
- Karlstad–Norrköping schwarz 2 · Göteborg–Norrköping Doppel orange/weiß 4 (evtl. 3)

**Positionen:** Alle Felder sind auf Geraden zwischen den Knoten interpoliert (Rosettenabstand 52 px, Doppel-Versatz ±16, Dreifach ±30). Gebogene Strecken (Küstenbögen, Fähren-Fächer) im Editor nachziehen – Korrekturbatches wie gewohnt.

## Bonuskarten (Dateiname → Wertung)

| Karte | Punkte | Wertung („meiste …", Gleichstand: alle) |
|---|---|---|
| a – Ruf der Wildnis | 5 | eingesetzte Lokomotiven (inkl. 2-Karten-Ersatz = 1) |
| b – Investition | 7 | Strecken an Stockholm/København/Oslo/Helsinki |
| c – Kosteneinsparung | 7 | übrige Waggons am Spielende |
| d – Kleine Schritte | 10 | gebaute 1er-Strecken |
| e – Nordischer Express | 10 | längste durchgehende Strecke |
| f – Regionales Netzwerk | 10 | erfüllte Ziele mit ≤5 Punkten |
| g – Internationale Ausbreitung | 12 | Länder im eigenen Netz (von 9) |
| h – Polarexpress | 12 | erfüllte Ziele mit Polarkreis-Stadt |
| i – Schneepflug | 12 | Strecken an Polarkreis-Städten |
| j – Fähren-Imperium | 12 | gebaute Fährstrecken |
| k – Der Wilde Westen | 7 | Strecken an norwegischen Städten |

## Strecken-Statistik

161 Strecken-Einträge = 59 Einzel + 48 Doppel (96) + 2 Dreifach (6: Oslo–Karlstad und Karlstad–Stockholm, je 3×1 Feld). 350 Felder gesamt. Fähren tragen `faehre:N` je Spur; Bonusstrecken: Honningsvåg–Murmansk +2, Honningsvåg–Tromsø +2, Tromsø–Narvik +1, Narvik–Mo I Rana +2, Mo I Rana–Trondheim +3, Trondheim–Åndalsnes +1, Åndalsnes–Bergen +2, Bergen–Stavanger +1, Stavanger–Kristiansand +1 (je Spur).
