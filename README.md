# Levin Kuningaskotka

Landing page Levin Kuningaskotkan lomahuoneistoille. Pelkkää HTML:ää, CSS:ää ja JavaScriptiä, ei build-vaihetta.

## Esikatselu

```bash
python3 -m http.server 8000
# avaa http://localhost:8000
```

## Muokkaaminen

| Mitä | Missä |
|---|---|
| Huoneistot, henkilömäärät, kuvaukset, **Airbnb-linkit** | `assets/js/huoneistot.js` |
| Tekstit, yhteystiedot, palvelut | `index.html` |
| Värit ja tyylit | `assets/css/style.css` (tokenit tiedoston alussa) |

Jos huoneistolla ei ole Airbnb-linkkiä, varauspainike avaa sähköpostin.

## Kuvat

Kuvat puuttuvat vielä. Siihen asti kuvapaikoissa näkyy tyylitelty tausta. Lisää nämä tiedostot:

- `assets/img/hero.jpg`: pystykuva n. 1200x1500 (talo tai näkymä rinteeseen)
- `assets/img/sauna.jpg`: vaakakuva n. 1600x1000
- `assets/img/huoneistot/<tunnus>.jpg`: esim. `b6.jpg`, vaakakuva n. 1200x800

## Tarkistettavat tiedot

- Puuttuvat henkilömäärät (B5, D1, D2, E1, E2) ja kuvaukset `huoneistot.js`:ssä
- Kartan merkin koordinaatit `index.html`:ssä (haku "TARKISTA")
- Etäisyydet sijaintiosiossa

## Julkaisu

Toimii sellaisenaan GitHub Pagesissa, Netlifyssä tai missä tahansa staattisessa hostingissa.
