# Zug um Zug Asien („Sagenhaftes Asien") – Spezifikation v0.92

Stand: 19.09.2026 · Schlüssel `asien` · statId „Zug um Zug Asien" · Basis: Brettscan Asien_Silkroad.jpg (3000×2004 nach Zuschnitt, board_h 668) + Regelheft „Sagenhaftes Asien" (DE 2019)

## Eckdaten
- 2–5 Spieler, 45 Waggons pro Spieler, 110er-Wagenkartendeck
- Punkte pro Streckenlänge: 1/2/4/7/10/15 (Länge 1–6)
- Starthand: 4 Wagenkarten
- Spielende wie Basisspiel (≤ 2 Waggons → jeder noch 1 Zug)
- 39 Städte, 100 Strecken-Einträge (60 Doppelstrecken-Einträge = 30 Paare), 31 Gebirgsstrecken mit insgesamt 39 ✕, 15 Fährstrecken

## Zielkarten (36)
- 30 normale + 6 lange (lila Hintergrund, `lang: true`)
- **Start:** 1 lange + 3 normale ziehen, mindestens 2 der 4 behalten (lange darf abgelegt werden).
  Übrige lange Karten und abgelegte Startkarten kommen **aus dem Spiel** (nicht unter den Stapel).
  Umsetzung im Europa-Schema: `lange_ziehen 1, lange_max 1, normale_ziehen 3, min_normale_mit_lang 1, min_normale_ohne_lang 2`
- **Nachziehen:** 3 ziehen, mindestens 1 behalten; Rückgaben unter den Stapel.

### Lange Zielkarten
- Ankara – Colombo: 18
- Astrakhan – Hanoi: 18
- Khabarovsk – Karachi: 17
- Krasnoyarsk – Singapore: 17
- Moscow – Calcutta: 16
- Onsk – Kobe: 16

### Normale Zielkarten
- Astrakhan – Karachi: 10
- Chita – Shanghai: 8
- Dihua – Mandalay: 10
- Dihua – Seoul: 9
- Irkutsk – Dihua: 6
- Irkutsk – Khabarovsk: 7
- Kathmandu – Calcutta: 5
- Kobe – Macau: 7
- Krasnoyarsk – Peking: 9
- Krasnoyarsk – Samarkand: 8
- Lhasa – Bangkok: 7
- Macau – Singapore: 6
- Moscow – Ankara: 7
- Moscow – Mecca: 10
- Onsk – Astrakhan: 6
- Onsk – Baghdad: 10
- Peking – Saigon: 9
- Perm – Irkutsk: 9
- Perm – Tehran: 6
- Rangoon – Colombo: 7
- Rawalpindi – Bombay: 5
- Samarkand – Agra: 6
- Samarkand – Mecca: 8
- Seoul – Hanoi: 9
- Tbilisi – Shiraz: 7
- Tehran – Kathmandu: 11
- Ulan Bator – Vladivostok: 9
- Vladivostok – Lhasa: 12
- Xi'An – Bombay: 9
- Xi'An – Taipei: 5

**Hinweis Schreibweise:** Das Brett schreibt **ONSK** (per Hochzoom verifiziert, N-S-K). Davids Liste nannte „Omsk" – alle drei Omsk-Aufträge (Kobe 16, Astrakhan 6, Baghdad 10) wurden auf **Onsk** gemappt. Alle übrigen Namen brettgetreu englisch (Moscow, Peking, Xi'An, Mecca …).

## Fähren
Strecken mit Lok-Symbolen (`faehre: N`): pro Lok-Symbol eine Lokomotivkarte, Rest Wagenkarten der Streckenfarbe (grau: beliebig). Betroffen: Astrakhan–Samarkand (1), Astrakhan–Tehran (1), Mecca–Shiraz (1), Bombay–Colombo (je 1), Calcutta–Colombo (1), Peking–Seoul (1), Vladivostok–Seoul (2), Seoul–Kobe (2), Kobe–Shanghai (1), Kobe–Taipei (je 1), Shanghai–Taipei (1), Macau–Taipei (1), Saigon–Singapore (1).

## Gebirgsstrecken (NEU – `gebirge: N` je Strecke)
- Erkennbar an ✕-Symbolen; `gebirge` = Anzahl ✕ der Strecke; die ✕-Felder selbst tragen `gebirge: true` (ab v0.92, für Anzeige und Prüfung).
- Bau wie üblich (Wagenkarten nach Farbe/Länge, Waggons aufs Brett = normale Punkte).
- **Zusätzlich:** pro ✕ einen Waggon aus dem Vorrat **endgültig** abgeben (auf den Gebirgspass, zählt nicht als gebaute Strecke) und **sofort +2 Punkte je abgegebenem Waggon** (`gebirge_punkte_pro_waggon: 2`).
- Wer nicht genug Waggons für Felder + ✕ hat, darf die Strecke nicht bauen (auch Spielende-Trigger beachten: Waggonstand sinkt um Länge + ✕).
- Graue Parallelrouten farbiger Gebirgsstrecken führen nicht übers Gebirge (kein Abwurf): Moscow–Perm, Perm–Onsk, Onsk–Krasnoyarsk, Krasnoyarsk–Irkutsk, Irkutsk–Chita, Khabarovsk–Vladivostok (Nr 61).
- Vorschlag Integration: Erkennung der Edition über `meta.gebirge`; genutzte Gebirgsstrecken je Spieler zählen (für Tiebreak), abgegebene Waggons im Spielstand führen.

## Doppelstrecken
- Regelheft: beide Routen erst ab 4 Spielern (verschiedene Spieler). **Auf Davids Standard `doppelstrecken_frei_ab: 3` gesetzt** – Abweichung vom Heft, wie in allen Editionen.
- Graue Route neben farbiger: beliebige Kartenfarbe erlaubt, auch die der Parallelroute.

## Boni & Sieg
- **Asien-Entdecker (10 P.):** meiste Städte in EINEM zusammenhängenden Netz; jede Stadt zählt einmal; bei Gleichstand erhalten alle den Bonus. Anzeige-Vorschlag: 🗺 beim führenden Spieler.
- Kein Längste-Strecke-Bonus, kein Meiste-Aufträge-Bonus.
- **Sieg-Tiebreak:** Punkte → meiste erfüllte Zielkarten → meiste genutzte Gebirgsstrecken (`sieg_tiebreak`).

## Auftragskarte (auftrag_asien.jpg)
Iberia-Stil 1120×700, ausgeblichenes Brett im Fenster `tk = (206,145,708,473)` (Seitenverhältnis 3:2), Punktzahl unten rechts (`tk_punkte 1073/670` – wie Iberia v0.94, damit der Erledigt-Haken sie nicht verdeckt).

## Streckenliste
| Nr | Von | Nach | Farbe | Länge | Besonderes |
|---|---|---|---|---|---|
| 1 | Moscow | Perm | grau | 3 | Doppel mit Nr. 2 |
| 2 | Moscow | Perm | rot | 3 | 1x Gebirge (Feld 3), Doppel mit Nr. 1 |
| 3 | Moscow | Astrakhan | orange | 3 | Doppel mit Nr. 4 |
| 4 | Moscow | Astrakhan | gruen | 3 | Doppel mit Nr. 3 |
| 5 | Perm | Onsk | grau | 3 | Doppel mit Nr. 6 |
| 6 | Perm | Onsk | weiss | 3 | 1x Gebirge (Feld 3), Doppel mit Nr. 5 |
| 7 | Perm | Astrakhan | blau | 3 |  |
| 8 | Onsk | Krasnoyarsk | grau | 3 | Doppel mit Nr. 9 |
| 9 | Onsk | Krasnoyarsk | pink | 3 | 1x Gebirge (Feld 3), Doppel mit Nr. 8 |
| 10 | Onsk | Samarkand | gruen | 4 | 1x Gebirge (Feld 1) |
| 11 | Onsk | Dihua | orange | 5 |  |
| 12 | Tbilisi | Astrakhan | schwarz | 1 | Doppel mit Nr. 13 |
| 13 | Tbilisi | Astrakhan | weiss | 1 | Doppel mit Nr. 12 |
| 14 | Ankara | Tbilisi | gelb | 2 | 1x Gebirge (Feld 2) |
| 15 | Tbilisi | Tehran | orange | 2 | 1x Gebirge (Feld 2), Doppel mit Nr. 16 |
| 16 | Tbilisi | Tehran | rot | 2 | 1x Gebirge (Feld 2), Doppel mit Nr. 15 |
| 17 | Astrakhan | Samarkand | pink | 5 | 1 Lok |
| 18 | Astrakhan | Tehran | grau | 3 | 1 Lok |
| 19 | Ankara | Baghdad | weiss | 3 | Doppel mit Nr. 20 |
| 20 | Ankara | Baghdad | pink | 3 | Doppel mit Nr. 19 |
| 21 | Baghdad | Tehran | blau | 1 | Doppel mit Nr. 22 |
| 22 | Baghdad | Tehran | gelb | 1 | Doppel mit Nr. 21 |
| 23 | Baghdad | Mecca | rot | 3 | Doppel mit Nr. 24 |
| 24 | Baghdad | Mecca | gruen | 3 | Doppel mit Nr. 23 |
| 25 | Mecca | Shiraz | gelb | 4 | 1 Lok |
| 26 | Tehran | Shiraz | weiss | 2 | 2x Gebirge (Feld 1, 2), Doppel mit Nr. 27 |
| 27 | Tehran | Shiraz | gruen | 2 | 2x Gebirge (Feld 1, 2), Doppel mit Nr. 26 |
| 28 | Tehran | Samarkand | schwarz | 3 | 1x Gebirge (Feld 1) |
| 29 | Samarkand | Rawalpindi | blau | 2 | 1x Gebirge (Feld 2) |
| 30 | Samarkand | Karachi | weiss | 4 | 1x Gebirge (Feld 4) |
| 31 | Shiraz | Karachi | pink | 2 | 2x Gebirge (Feld 1, 2), Doppel mit Nr. 32 |
| 32 | Shiraz | Karachi | blau | 2 | 2x Gebirge (Feld 1, 2), Doppel mit Nr. 31 |
| 33 | Rawalpindi | Karachi | schwarz | 2 | 1x Gebirge (Feld 1) |
| 34 | Rawalpindi | Agra | gruen | 2 | 1x Gebirge (Feld 1) |
| 35 | Rawalpindi | Kathmandu | gelb | 3 | 1x Gebirge (Feld 3) |
| 36 | Karachi | Agra | rot | 2 |  |
| 37 | Karachi | Bombay | grau | 2 | Doppel mit Nr. 38 |
| 38 | Karachi | Bombay | grau | 2 | Doppel mit Nr. 37 |
| 39 | Agra | Bombay | orange | 2 |  |
| 40 | Agra | Kathmandu | pink | 2 | 1x Gebirge (Feld 2) |
| 41 | Agra | Calcutta | grau | 2 |  |
| 42 | Bombay | Calcutta | gelb | 3 | Doppel mit Nr. 43 |
| 43 | Bombay | Calcutta | pink | 3 | Doppel mit Nr. 42 |
| 44 | Bombay | Colombo | rot | 4 | 1 Lok, Doppel mit Nr. 45 |
| 45 | Bombay | Colombo | schwarz | 4 | 1 Lok, Doppel mit Nr. 44 |
| 46 | Calcutta | Colombo | gruen | 5 | 1 Lok |
| 47 | Kathmandu | Mandalay | orange | 2 | 2x Gebirge (Feld 1, 2) |
| 48 | Calcutta | Mandalay | grau | 1 | Doppel mit Nr. 49 |
| 49 | Calcutta | Mandalay | grau | 1 | Doppel mit Nr. 48 |
| 50 | Calcutta | Rangoon | blau | 2 | Doppel mit Nr. 51 |
| 51 | Calcutta | Rangoon | schwarz | 2 | Doppel mit Nr. 50 |
| 52 | Krasnoyarsk | Irkutsk | grau | 3 | Doppel mit Nr. 53 |
| 53 | Krasnoyarsk | Irkutsk | blau | 3 | 1x Gebirge (Feld 3), Doppel mit Nr. 52 |
| 54 | Krasnoyarsk | Dihua | schwarz | 3 |  |
| 55 | Irkutsk | Chita | weiss | 2 | 1x Gebirge (Feld 1), Doppel mit Nr. 100 |
| 56 | Irkutsk | Ulan Bator | gelb | 2 | 2x Gebirge (Feld 1, 2) |
| 57 | Ulan Bator | Chita | pink | 2 |  |
| 58 | Chita | Khabarovsk | rot | 5 |  |
| 59 | Khabarovsk | Peking | schwarz | 5 |  |
| 60 | Khabarovsk | Vladivostok | grau | 2 | 1x Gebirge (Feld 1), Doppel mit Nr. 61 |
| 61 | Khabarovsk | Vladivostok | grau | 2 | Doppel mit Nr. 60 |
| 62 | Ulan Bator | Peking | orange | 3 | 1x Gebirge (Feld 1), Doppel mit Nr. 63 |
| 63 | Ulan Bator | Peking | rot | 3 | 1x Gebirge (Feld 1), Doppel mit Nr. 62 |
| 64 | Samarkand | Dihua | grau | 5 | Doppel mit Nr. 65 |
| 65 | Samarkand | Dihua | grau | 5 | Doppel mit Nr. 64 |
| 66 | Dihua | Peking | grau | 6 |  |
| 67 | Dihua | Xi'An | gelb | 5 |  |
| 68 | Lhasa | Xi'An | blau | 4 | 1x Gebirge (Feld 1) |
| 69 | Lhasa | Mandalay | schwarz | 2 | 2x Gebirge (Feld 1, 2) |
| 70 | Xi'An | Peking | grau | 2 | Doppel mit Nr. 71 |
| 71 | Xi'An | Peking | grau | 2 | Doppel mit Nr. 70 |
| 72 | Xi'An | Mandalay | pink | 4 | 1x Gebirge (Feld 4) |
| 73 | Xi'An | Macau | gruen | 3 | Doppel mit Nr. 74 |
| 74 | Xi'An | Macau | weiss | 3 | Doppel mit Nr. 73 |
| 75 | Peking | Shanghai | gelb | 2 | Doppel mit Nr. 76 |
| 76 | Peking | Shanghai | gruen | 2 | Doppel mit Nr. 75 |
| 77 | Peking | Seoul | grau | 3 | 1 Lok |
| 78 | Vladivostok | Seoul | grau | 2 | 2 Lok |
| 79 | Seoul | Kobe | grau | 2 | 2 Lok |
| 80 | Kobe | Shanghai | orange | 4 | 1 Lok |
| 81 | Kobe | Taipei | weiss | 5 | 1 Lok, Doppel mit Nr. 82 |
| 82 | Kobe | Taipei | blau | 5 | 1 Lok, Doppel mit Nr. 81 |
| 83 | Shanghai | Taipei | grau | 2 | 1 Lok |
| 84 | Shanghai | Macau | grau | 3 |  |
| 85 | Macau | Taipei | grau | 2 | 1 Lok |
| 86 | Hanoi | Macau | grau | 1 | Doppel mit Nr. 87 |
| 87 | Hanoi | Macau | grau | 1 | Doppel mit Nr. 86 |
| 88 | Mandalay | Hanoi | rot | 2 | 2x Gebirge (Feld 1, 2) |
| 89 | Mandalay | Rangoon | grau | 1 | 1x Gebirge (Feld 1) |
| 90 | Rangoon | Bangkok | gruen | 1 | Doppel mit Nr. 91 |
| 91 | Rangoon | Bangkok | orange | 1 | Doppel mit Nr. 90 |
| 92 | Hanoi | Bangkok | weiss | 2 | 1x Gebirge (Feld 1) |
| 93 | Hanoi | Saigon | gelb | 3 | Doppel mit Nr. 94 |
| 94 | Hanoi | Saigon | orange | 3 | Doppel mit Nr. 93 |
| 95 | Bangkok | Saigon | pink | 1 | Doppel mit Nr. 96 |
| 96 | Bangkok | Saigon | rot | 1 | Doppel mit Nr. 95 |
| 97 | Bangkok | Singapore | blau | 3 | Doppel mit Nr. 98 |
| 98 | Bangkok | Singapore | schwarz | 3 | Doppel mit Nr. 97 |
| 99 | Saigon | Singapore | grau | 2 | 1 Lok |
| 100 | Irkutsk | Chita | grau | 2 | Doppel mit Nr. 55 |

## Erstellung & Status v0.90
- Städte per Rosetten-Detektion (HSV + HoughCircles), alle 39 verifiziert.
- Farbige Strecken per Farbmasken-Komponenten (Länge + Feldpositionen), Grau/Weiß/Schwarz-Ketten per Zoom-Ablesung; ✕-verdeckte Felder interpoliert. Einheitliches Feldmaß l 2.83 / w 1.04 (v0.91).
- Alle Strecken `geprueft: false` → Feinjustage per editor_asien.html, Korrekturen als Batch-Export.
- Offene Punkte für die Abnahme: Feldpositionen einzelner Grau-Ketten (Samarkand–Dihua, Astrakhan–Tehran, Khabarovsk–Vladivostok), ✕-Zuordnung Lhasa–Mandalay (als schwarz 2 mit 2 ✕ erfasst), Längen der kurzen Küstenrouten (Calcutta–Mandalay 1+1, Hanoi–Macau 1+1) bitte im Editor gegenprüfen.
- Integration in index.html erst nach Kartenabnahme (separater Schritt inkl. Gebirgs-/Entdecker-/Tiebreak-Logik).

## Änderungsprotokoll
- v0.91: Feldmaß einheitlich l 2.83 / w 1.04.
- v0.92: Korrekturbatch 1 von David (220 Feldpositionen). 16 Strecken um ein Feld gekürzt: Perm–Astrakhan 3, Astrakhan–Tehran 3, Mecca–Shiraz 4, Baghdad–Mecca rot/grün 3, Agra–Bombay 2, Hanoi–Bangkok 2, Macau–Taipei 2, Shanghai–Macau 3, Vladivostok–Seoul 2, Khabarovsk–Vladivostok 2+2, Khabarovsk–Peking 5, Ulan Bator–Peking orange/rot 3, Irkutsk–Ulan Bator 2, Krasnoyarsk–Dihua 3. Neu: Irkutsk–Chita grau 2 (Nr 100, Doppel zu weiß Nr 55). ✕-Felder einzeln markiert; Editor mit Prüfmodus „⛰ Gebirge prüfen“.

## Integrationshinweis App v7.65
- Neues Regelflag `start_raus: true` in `meta.regeln`: Abgelegte **Start**-Zielkarten (und uebrige lange) kommen aus dem Spiel; nachgezogene abgelehnte Karten gehen wie ueblich unter den Stapel (Regelheft).
- App-Erkennung der Edition ueber `meta.gebirge`; Spielerfeld `p.geb` zaehlt gebaute Gebirgsstrecken (Sieg-Tiebreak).
