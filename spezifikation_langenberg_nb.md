# Spezifikation Langenberg – Niederbonsfeld Edition (Karte v0.90)

## Eckdaten
- Schlüssel: `langenberg_nb`, Name „Langenberg – Niederbonsfeld Edition", kurz „Langenberg NB"
- Eigene Rangliste: statId „Zug um Zug Langenberg NB"
- Brett: `langenberg_nb_karte.jpg` (2225×1488, board_h 669), Auftragskarte: `auftrag_langenberg_nb.jpg` (991×621, Stil der Langenberg-Vorlage)
- Basis: Langenberg v5.4 – Regeln, Farben, S9, Außenstädte, Tunnelregel unverändert
- 45 Knoten (44 + Niederbonsfeld), 112 Streckeneinträge, 103 Aufträge

## Änderungen gegenüber Langenberg (alle geprueft: false, Feinjustage im Editor)
- Neuer Knoten `niederbonsfeld` „Niederbonsfeld" (x 91.2 / y 63.45)
- Nr 95: Niederbonsfeld–Essen, gelb, 2 Felder (vorher Busbahnhof–Essen gelb 3)
- Nr 96: Niederbonsfeld–Hattingen, grau, 4 Felder (vorher Busbahnhof–Hattingen grau 5)
- Nr 113/114: Busbahnhof–Niederbonsfeld, Doppelstrecke blau/weiß, je 1 Feld
- Alle übrigen Strecken und Knoten koordinatengleich mit Langenberg übernommen (per Overlay geprüft)
- Hattingen bleibt ein einzelner Rand-Knoten; graue und rote Strecke münden beide dort

## Neue Aufträge (zusätzlich zu allen 98 Langenberg-Aufträgen)
- BWL – Niederbonsfeld: 22 Punkte
- LSV – Niederbonsfeld: 5 Punkte
- Sambeck – Niederbonsfeld: 19 Punkte
- Feldstr. – Niederbonsfeld: 20 Punkte
- Suchtklinik – Niederbonsfeld: 19 Punkte

## Dateien
- `langenberg_nb_karte.json` – Editionsdaten
- `langenberg_nb_karte.jpg` – Brett (identisch mit niederbonsfeld_mischform.jpg)
- `auftrag_langenberg_nb.jpg` – Auftragskarten-Hintergrund
- `editor_langenberg_nb.html` – Feld-Editor im Pennsylvania-Format (erwartet langenberg_nb_karte.jpg im selben Ordner)
- `kontrolle_langenberg_nb.jpg` – Kontrollbild (magenta = neu/geändert, cyan = unverändert)

## Nächster Schritt
Korrekturbatch über den Editor (Export-JSON), danach Integration in die index.html als 16. Edition.
