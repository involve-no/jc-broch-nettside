# Fonter – Adobe Fonts

**Embed-lenke (prosjekt qos6gzx):**

```html
<link rel="stylesheet" href="https://use.typekit.net/qos6gzx.css">
```

Lenken legges inn én gang i `<head>` på hver side.

## Innhold i prosjektet

Prosjektet skal inneholde **alle snitt** av begge familiene, så de andre sidene kan bruke det de trenger:

| Familie | CSS-navn | Snitt |
|---|---|---|
| IvyPresto Display | `ivypresto-display` | alle vekter, med kursiv |
| IvyPresto Headline | `ivypresto-headline` | alle vekter, med kursiv |
| IvyPresto Text | `ivypresto-text` | alle vekter, med kursiv |
| Halyard Display | `halyard-display` | alle vekter, med kursiv |
| Halyard Text | `halyard-text` | alle vekter, med kursiv |
| Halyard Micro | `halyard-micro` | alle vekter, med kursiv |

Status 12.11.2026 (sjekket mot lenken): IvyPresto Display, Headline og Text har 100, 300, 400, 600 og 700 med kursiv. Halyard Text har 100–900 med kursiv. Halyard Display og Micro har bare 400 og 700. Alle standardvektene i designet er dermed på plass.

Standardvektene i designet er IvyPresto Light (300) og Regular (400), og Halyard Book (400) og Medium (500). Bold brukes ikke i løpende tekst.

## Slik lager du nettprosjektet

1. Gå til fonts.adobe.com og logg inn med Adobe-kontoen som har fontene.
2. Åpne fontfamilien **IvyPresto Display** og klikk **</>** (Legg til i nettprosjekt). Lag et nytt prosjekt, for eksempel «Broch nettside».
3. Huk av **alle snitt** for familien.
4. Gjør det samme for IvyPresto Headline, IvyPresto Text, Halyard Display, Halyard Text og Halyard Micro, og velg det samme prosjektet.
5. Kopier embed-lenken Adobe viser, den ser slik ut:
   `<link rel="stylesheet" href="https://use.typekit.net/xxxxxxx.css">`
6. Gi lenken til Claude Code og be den legge den inn i `<head>` på alle sider.

## Navn i CSS

Adobe bruker egne navn i CSS. Disse står allerede først i `design/tokens.css`:

- `ivypresto-display`
- `ivypresto-text`
- `halyard-text`

Viser Adobe andre navn under «CSS-familier» i prosjektet, oppdater dem i `design/tokens.css`.

## Merk

Fonter som er aktivert i Creative Cloud på Mac-en, virker i Figma og andre programmer, men ikke i nettleseren. Nettsiden trenger nettprosjektet over.
