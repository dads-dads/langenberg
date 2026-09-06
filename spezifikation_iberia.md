# Spezifikation Zug um Zug – Iberia (v0.93, integriert in index.html v7.37)

Paket: `iberia_karte.json`, `iberia_karte.jpg` (2400×1832, Scan inkl. Zählleiste, board_h 763),
`auftrag_iberia.jpg` (1120×700, ausgeblichen), `editor_iberia.html`, `kontrolle_iberia.jpg`.

## Eckdaten
- 2–5 Spieler, **35 Waggons**, 4 Startwagenkarten, Auslage 5 (3 Loks → neu).
- 33 Knoten, davon 18 Festivalstädte (`festival: true`). Francia ist eine normale Stadt (keine Randregel).
- 102 Strecken (64 Doppelstrecken-Einträge = 32 Paare; Sevilla–Málaga ist Einzelstrecke nr 88, nr 87 entfällt), Längen 1–5, Punkte 1/2/4/7/10.
- Fähren (`faehre` = Loks): Barcelona–Palma blau 3 / grau 3 (je 1), Valencia–Palma grau 4 / grau 4 (je 2), Alicante–Palma grau 5 (2).
- `doppelstrecken_frei_ab: 3` (Hausregel; Regelheft: ab 4).
- 50 Zielkarten (Liste vom Kartensatz), 54 Festivalkarten.
- Kein Bonus für längste Strecke / meiste Zielkarten. Gleichstand → mehr erfüllte Zielkarten, sonst geteilt.

## Draft-Mechanik (Standardumsetzung)
1. **Start-Draft:** jeder Spieler erhält 6 Zielkarten. Runde für Runde wählt jeder 1 Karte und gibt die
   übrigen an den linken Nachbarn weiter, bis alle 6 Karten gewählt haben (6 Draft-Runden).
   Dann behält jeder **genau 4**, die 2 übrigen gehen zurück in den Stapel (mischen).
   Zu zweit werden die Hände ebenfalls getauscht (rechts = links).
2. **Draft-Karte im Wagenkartenstapel:** Position von oben: 2 Sp. ½, 3 Sp. ⅔, 4–5 Sp. ¾ des Stapels
   (Stapel = 110 Wagenkarten + 54 Festivalkarten). Wird sie gezogen (verdeckt oder beim Nachlegen),
   beendet der Spieler seinen Zug normal (Ersatzkarte ziehen), danach pausiert das Spiel:
   **zweiter Draft** wie oben, aber Weitergabe nach rechts; 4 behalten, 2 unter den Stapel.
   Bereits gehaltene Zielkarten bleiben unberührt.
3. **Aktion „Zielkarten ziehen“** ist bis zum Abschluss des zweiten Drafts gesperrt. Danach: 3 ziehen,
   mind. 1 behalten, Rest unter den Stapel.
4. Ist der Wagenkartenstapel leer: Ablagestapel mischen; Festivalkarten und Draft-Karte sind dann nicht
   mehr enthalten.
- Umsetzung online: Draft-Zustand pro Sitz in Firebase (`draft.hands[seat]`, `draft.runde`), Weitergabe per
  Transaktion; `tkGuard()` blockiert alle anderen Aktionen während eines Drafts. Option `draft: false`
  (jeder zieht 6, behält 4) als spätere Variante vorsehen.

## Festivalkarten
- 54 Karten, Verteilung/Wertung in `meta.festival.staedte` (`karten`, `punkte[1..n]`).
- Gezogene Festivalkarte → offen zur Stadt (`festival.offen[stadt]++`), Ersatzkarte nachziehen, bis eine
  Wagenkarte kommt (zählt nicht als Aktion).
- Wer eine Strecke baut, deren Endpunkt eine Festivalstadt ist, nimmt alle dort liegenden Karten
  (`p.fest[stadt] += n`). Beide Endpunkte Festivalstädte mit Karten → Spieler wählt **eine** Stadt (Modal).
- Porto und Coimbra teilen sich einen Stapel (`gemeinsam`): Karten liegen unter `porto`, Bau nach Porto
  **oder** Coimbra nimmt sie.
- Endwertung: pro Stadt `punkte[min(n, len(punkte))-1]` (Valencia 8 Stufen, Tabelle deckt alle Karten ab).
- **Firebase:** `p.fest` (Spieler-Festivalkarten) und `ROOM.festOffen` müssen in die `fix()`-Whitelist.

| Stadt | Karten | Punkte 1…n |
|---|---|---|
| A Coruña | 1 | 7 |
| León | 2 | 6, 12 |
| Valladolid | 2 | 5, 10 |
| Pamplona | 5 | 4, 5, 7, 10, 10 |
| Barcelona | 5 | 5, 6, 8, 11, 11 |
| Porto/Coimbra | 3 | 4, 8, 12 |
| Madrid | 4 | 3, 4, 6, 9 |
| Lisboa | 6 | 4, 5, 7, 10, 15, 15 |
| Valencia | 8 | 2, 4, 7, 11, 16, 22, 22, 22 |
| Palma | 3 | 5, 10, 15 |
| Portimão | 1 | 6 |
| Sevilla | 6 | 3, 4, 6, 9, 15, 15 |
| Córdoba | 1 | 6 |
| Granada | 1 | 5 |
| Cádiz | 4 | 2, 5, 9, 9 |
| Málaga | 1 | 4 |
| Almería | 1 | 4 |

## Feldpositionen
- Feldmaß l 3.4 / w 1.27 (v0.91, vorher 3.65 / 1.82).
- 61 Strecken per Farbmaske erkannt, 42 auf Geraden interpoliert (fast alle weißen/grauen Strecken, Küsten-
  und Kurvenrouten wie Burgos–Zaragoza, Cuenca–Zaragoza, Lisboa–Portimão, Portimão–Cádiz, Alicante–Palma).
  Feinjustage im `editor_iberia.html`, Export als Korrekturbatch.
- Knotenkoordinaten automatisch (Bahnhof-Scheiben und Medaillons per Template), `tkx/tky` für die Auftragskarte
  aus `tk` (mx0 206, my0 140, mw 707, mh 540) berechnet.

## Offene Punkte
- Streckenfarben/Längen bitte gegen den Plan prüfen (`geprueft: false`), insbesondere Madrid–Badajoz 5,
  Zaragoza–Valencia 5, Lleida–Valencia 5, Cuenca–Zaragoza weiß 4, Bilbao–Pamplona rot 1 / weiß 1.
- Draft-Option „ohne Draft“ (6 ziehen, 4 behalten) noch nicht spezifiziert – als Raumoption vorgesehen.

## Änderungsprotokoll
- v0.92: Korrekturbatch aus dem Editor (20 Knoten, 146 Felder) eingespielt, `tkx/tky` neu berechnet.
  Längenkorrekturen: León–Salamanca 2, Porto–Salamanca 4/4, Valladolid–Madrid 2, Valladolid–Salamanca 1,
  Ciudad Real–Córdoba 2/2, Cuenca–Zaragoza 3, Ciudad Real–Granada 3, Portimão–Cádiz 3, Cádiz–Málaga 2/2,
  Murcia–Almería 2/2, León–Valladolid 1, Bilbao–Burgos 2, Santander–Burgos 2, Pamplona–Francia 5/5,
  Pamplona–Zaragoza 2/2, Lleida–Valencia 4, Zaragoza–Valencia 4, Lisboa–Portimão 3/3.
  Neue Felder (Porto–Salamanca, Pamplona–Francia) als 3. Feld mit dem Abstand von Feld 1→2 eingesetzt.
  Streckennummern bleiben stabil (Lücke bei 87).

- v0.93: Batch (6 Knoten, 4 Felder); Murcia–Alicante pink 1 als Doppelstrecke (nr 104, parallel oberhalb von nr 101).
  **Integration in index.html v7.37**: `IB()` erkennt die Edition über `meta.festival`. Festivalkarten liegen als
  `'fest:<stapel>'` im Wagenkartenstapel (`drawCard` legt sie nach `g.festOffen[stapel]` und zieht nach), die Draft-Karte
  als `'draft'` (setzt `g.draftPend`, Draft startet am Zugende). Draft-Zustand `g.draft {nr,dir,runde,phase,hands,gew,done}`
  per Firebase-Transaktion (`draftPick`), Abschluss über `g.picked` wie beim Startpick; Status währenddessen `picking`.
  Pickup in `doClaim` (bei zwei Festivalstädten Auswahl-Modal), Bonus in `finalScore` (`p.res.fest/fbonus`),
  `p.fest`/`g.festOffen` in `fix()`. Stadtklick (Layer `festL`) zeigt offene Karten, Gesamtzahl, Tabelle, eigenen Stand.
  Lobby-Option `ROOM.ibStart` ('draft' | 'einfach' = 5 ziehen/3 behalten, ohne Draft-Karte, Zielkarten ziehen sofort erlaubt);
  beide zählen für die Rangliste, `variante` wird in `ergebnisse` mitgeschrieben.
