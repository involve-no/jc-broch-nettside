# Broch Gruppen – nettside

Nettside for Broch Gruppen (J.C. Broch). Designet ligger i Figma, og denne mappen er grunnlaget for å bygge sidene i kode. Les hele filen før du gjør endringer.

## Filer

- `design/tokens.css` – farger, grid, spacing, typografiroller. All CSS skal bruke disse variablene.
- `design/tekster.md` – kundens tekster til Om oss, Portefølje og Historien.
- `assets/logo/` – logo (Logo 3, liggende), symbol og bladform (fylt og outline), mønsteret fra bunnfeltet. Alle bruker `currentColor`.
- `assets/bilder/` – foto fra bildemanéret.
- `assets/fonts/LES-MEG.md` – fontene kommer fra Adobe Fonts-prosjektet `qos6gzx`. Se fremgangsmåten og vektene der.
- `reference/figma-forside-og-underside.pdf` – Figma-eksport: side 1 er forsiden, side 2 er header for undersider. **Dette er grunnlaget for videre design.**
- `reference/forside-grid-1920.png` – forsiden med gridet tegnet over, og de små justeringene som trengs.
- `reference/typografi.html` og `reference/spacing.html` – de definerte typografi- og spacingsidene. Åpne i nettleser.
- `prototyper/` – tidligere HTML-prototyper (Om oss med tre toppvarianter, Portefølje). Bruk som referanse for oppførsel og detaljer, ikke som fasit for layout.

## Absolutte regler

1. **Tekstene endres aldri.** Bruk tekstene i `design/tekster.md` ordrett: ingen endring i ord, tegnsetting eller rekkefølge. Ikke legg til egne overskrifter eller ingresser. Navigasjon, etiketter med sidenavn og lenketekster («Les mer», «Til topp», «Bla ned») er lov. Mangler det tekst, sett inn en tydelig merket plassholder og si fra.
2. **Tre tekstfarger, slik de er brukt i Figma-skissen.** Ingen andre tekstfarger og ingen dempede toner (opasitet). Avgjort av AD 12.11.2026.
   - **Plomme #3C2128:** standard for all tekst på lys bunn (papir, flate, sten, forløpning).
   - **Sten #E8E2DB:** tekst på mørke bilder og på plomme (kontrast 11,3 : 1 mot plomme).
   - **Teglstein #D0582C:** aksenttekst, for eksempel etiketter, både på lys bunn og på plomme.
   - **Kontrast (UU nivå AA):** Teglstein har bare 3,2–3,8 : 1 (papir 3,82, flate 3,51, sten 3,19, plomme 3,55). Det holder for stor tekst (≥ 24 px), men ikke for liten tekst, som krever 4,5 : 1. Bruker vi teglstein på etiketter, lenker eller annen tekst under 24 px, skal det sies fra til AD hver gang.
   - **Etiketter i teglstein er godkjent av AD 12.11.2026**, selv om de ikke når 4,5 : 1. Dette gjelder bare etikettene. Annen liten tekst i teglstein skal fortsatt meldes.
   - Historien-båndet på forsiden er mørkt plomme med rund bunn som i Figma (AD 12.11.2026): tekst i sten, etikett og lenke i teglstein.
3. **Bare to skriftfamilier: IvyPresto og Halyard.** Alle snitt er tilgjengelige via Adobe Fonts (IvyPresto Display, Headline, Text; Halyard Display, Text, Micro – alle vekter). Standard er rollene under; andre snitt kan brukes på enkeltsider når det trengs, men aldri fet i løpende tekst. Cormorant Garamond og Jost skal ikke brukes.
4. **Halyard brukes KUN til lenker, meny, etiketter og andre små tekster.** All løpende tekst, ingress, titler og overskrifter settes i IvyPresto.
5. **Lette vekter.** (Adobe-prosjektet skal inneholde alle vekter, se `assets/fonts/LES-MEG.md`.) IvyPresto Display og Text Light (300) til store størrelser, Text Regular (400) til løpende tekst. Halyard Medium (500) bare i små størrelser. Aldri fet.
6. **Ikke sett tekstblokker side om side.** Tekst står i én spalte. Bilde ved siden av tekst er greit.
7. **Alt følger gridet** (se under). Ingen frie posisjoner.
8. **Undersider har ikke foto-hero som forsiden.** De bruker underside-headeren fra Figma side 2.

## Grid

12 kolonner på stor skjerm, med fast marg og gutter. Målt mot Figma ved 1920 px:

| Brytepunkt | Kolonner | Gutter | Marg |
|---|---|---|---|
| < 768 | 4 | 16 | 20 |
| md ≥ 768 | 8 | 20 | 40 |
| lg ≥ 1024 | 12 | 24 | 64 |
| 2xl ≥ 1536 | 12 | 24 | 7,29vw (140 ved 1920) |

Ved 1920 er kolonnebredden 114,67 px. I Figma: Layout grid, Columns, Count 12, Type Stretch, Margin 140, Gutter 24.

Plassering ved 12 kolonner (`grid-column`):

| Element | Kolonner |
|---|---|
| Logo, etiketter, adresse | starter i kol 1 |
| Meny-knapp | slutter i kol 12 |
| Ingress på forsiden | 3 / 11 |
| Bilde ved tekst (Om oss, Historien) | 1 / 5 |
| Tekst ved bilde + lenke | 6 / 11 |
| Porteføljeliste | 1 / 6 |
| Bildeklynge i portefølje | 7 / 13 |
| Bunnmeny | 11 / 13 |
| Påstand i underside-header | 3 / 11, sentrert |

Justeringer fra Figma for å treffe gridet (maks 31 px): etiketter 154 → 140, ingress 390 → 417, tekst ved bilde 820 → 833, bilder 676 → 671 i bredde, porteføljeliste slutter 806 → 809, bunnmeny 1496 → 1527.

På mobil stables alt i én kolonne (`grid-column: 1 / -1`).

## Typografi

Definert i «J.C. Broch typografi» (`reference/typografi.html`). Rollene finnes som klasser i `design/tokens.css` (`.t-h1`, `.t-h2`, `.t-ingress`, `.t-h3`, `.t-stor`, `.t-brod`, `.t-lenke`, `.t-etikett`). Bruk bare disse rollene, ingen egne størrelser.

Størrelse / linjeavstand i px:

| Rolle | Font og vekt | Mobil | lg · 1024 | 2xl · 1536 |
|---|---|---|---|---|
| H1 | IvyPresto Display 300, versaler, +0,005 em (0,5 %) | 48 / 52 | 72 / 76 | 100 / 104 |
| H2 | IvyPresto Display 300, versaler, +0,02 em | 36 / 40 | 48 / 52 | 72 / 76 |
| Ingress | IvyPresto Text 300, −0,005 em | 24 / 32 | 32 / 40 | 48 / 56 |
| H3 | IvyPresto Display 300, +0,03 em | 24 / 28 | 28 / 32 | 32 / 40 |
| Stor tekst | IvyPresto Text 400 | 20 / 28 | 24 / 32 | 24 / 32 |
| Brødtekst | IvyPresto Text 400 | 16 / 24 | 18 / 28 | 18 / 28 |
| Lenke, knapp, meny | Halyard Text 500, versaler, +0,08 em | 14 / 20 | 18 / 24 | 18 / 24 (AD 13.11.2026) |
| Etikett | Halyard Text 500, versaler, +0,1 em | 12 / 16 | 14 / 20 | 18 / 24 (AD 12.11.2026) |

- Skalaen er 100 / 72 / 48 / 32 / 24 / 18 / 14. Linjeavstandene går opp i 4 px.
- Linjelengde: ingress maks 32 tegn, brødtekst maks 65 tegn.
- Uthev med IvyPresto kursiv, aldri fet.
- Versaler bare i H1, H2, lenker/knapper og etiketter.
- Typografisiden viste opprinnelig brødtekst i Halyard og etiketter i teglstein. Det er erstattet av reglene over: brødtekst i IvyPresto Text, all tekst i plomme.
- Knapp: høyde 48 px (24 px linje + 12 px luft over og under).

## Luft (spacing)

Definert i «J.C. Broch spacing» (`reference/spacing.html`). 1 enhet = 4 px = 0,25 rem, og trinnene heter det samme som i Tailwind. Bruk bare disse trinnene; trenger noe mer luft, gå et helt trinn opp.

| Trinn | rem | px |
|---|---|---|
| 2 | 0,5 | 8 |
| 3 | 0,75 | 12 |
| 4 | 1 | 16 |
| 6 | 1,5 | 24 |
| 8 | 2 | 32 |
| 12 | 3 | 48 |
| 16 | 4 | 64 |
| 24 | 6 | 96 |
| 36 | 9 | 144 |
| 48 | 12 | 192 |
| 72 | 18 | 288 |

Avstand per rolle (variabler i `design/tokens.css`):

| Rolle | Variabel | Mobil | lg · 1024 | 2xl · 1536 |
|---|---|---|---|---|
| Seksjon, topp | `--seksjon-topp` | 64 | 96 | 144 |
| Etikett til innhold | `--etikett-innhold` | 64 | 96 | 192 |
| Seksjon, bunn | `--seksjon-bunn` | 96 | 144 | 288 |
| Mellom bilde og tekst | `--kolonne-luft` | 48 (stablet) | 64 | 144 |
| H1 til snarveier | `--h1-til-snarveier` | 32 | 48 | 64 |
| Tekst til lenke | `--tekst-til-lenke` | 32 | 48 | 48 |
| Tittel til tekst | `--tittel-til-tekst` | 16 | 24 | 24 |
| Ikon til tekst | `--ikon-til-tekst` | 8 | 8 | 8 |

- Små trinn (2–12) for det som hører sammen. Store trinn (24–72) for det som skiller deler av siden.
- Sidemargen følger gridet (140 px ved 1920), ikke spacingskalaen.

## Farger og flater

- Plomme #3C2128 (tekst på lys bunn, plommetone i hero), Sten #E8E2DB (flate, tekst på mørkt), Industriblå #B8C5D2, Teglstein #D0582C (aksent og aksenttekst, se regel 2), Papir #FAF6F3 (side).
- Forløpningen `--forlopning` (sten nede til venstre → industriblå oppe til høyre) brukes i bunnfeltet og i header på undersider.
- Bilder og bildebokser har 20 px avrunding. Historien-båndet før bunnfeltet (plomme) har rund bunn (`--radius-seksjon`).

## Dekorelementer

- Mønsteret med kvartsirkler fra bunnfeltet (`monster-kvartsirkler.svg`): hvit strek, 1,2 px, svak skygge.
- Propellsymbolet og bladformen fra logoen kan brukes fylt eller som outline (`symbol-*.svg`, `form-*.svg`). Outline: tynn strek (1–1,2 px), plomme med ca. 30 % dekkevne på lys bunn eller hvit på forløpning. Fylt: flate eller bildemaske (som bladene i porteføljen på forsiden).
- Ett dekorelement per seksjon. Dekor skal også ligge på gridet.

## Sideoppsett

**Forside** (Figma side 1): foto-hero med plommetone, H1 sentrert, snarveier, «Bla ned» → ingress → Om oss (bilde + tekst) → Vår portefølje (liste + bildeklynge i bladform) → Historien (plommebånd med rund bunn) → bunnfelt med forløpning, adresse, mønster, meny og stor logo.

**Underside-header** (Figma side 2): full skjermhøyde med forløpning, logo til venstre, sidenavn sentrert i navigasjonen, meny til høyre, påstand i versaler sentrert, «Bla ned» under, stort outline av propellsymbolet beskåret over flaten.

Undersider: Om oss, Portefølje, Historien, Stiftelsen, Kontakt.

## Arbeidsmåte

- Sjekk alltid at tekstene står ordrett mot `design/tekster.md` etter endringer.
- Bygg mobil først, og test ved 390, 1024, 1440 og 1920 px.
- Fontene lastes fra Adobe Fonts. Legg nøyaktig denne linjen én gang i `<head>` på hver side, før `design/tokens.css`: `<link rel="stylesheet" href="https://use.typekit.net/qos6gzx.css">` CSS-navnene er `ivypresto-display`, `ivypresto-text` og `halyard-text`. Mangler lenken, faller siden tilbake til Georgia/Helvetica, som er tyngre. Ikke juster vekter for å kompensere for fallback; be om embed-lenken.
