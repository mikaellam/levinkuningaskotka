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
| Sivun tekstit suomeksi ja englanniksi | `assets/js/i18n.js` |
| Rakenne, yhteystiedot | `index.html` |
| Värit ja tyylit | `assets/css/style.css` (tokenit tiedoston alussa) |

Jos huoneistolla ei ole Airbnb-linkkiä, varauspainike avaa sähköpostin.

Kielen voi vaihtaa ylhäältä (FI / EN). Oletuskieli tulee selaimen kielestä ja valinta muistetaan. Uusi teksti lisätään `i18n.js`:ään molemmille kielille ja siihen viitataan HTML:ssä `data-i18n="avain"`-attribuutilla.

## Kuvat

Kuvat puuttuvat vielä. Siihen asti kuvapaikoissa näkyy tyylitelty tausta. Lisää nämä tiedostot:

- `assets/img/hero.jpg`: pystykuva n. 1200x1500 (talo tai näkymä rinteeseen)
- `assets/img/sauna.jpg`: vaakakuva n. 1600x1000
- `assets/img/huoneistot/<tunnus>.jpg`: `b1.jpg`, `b3.jpg`, `b5.jpg`, `b6.jpg`, `e1.jpg`, `e2.jpg`, `e6.jpg`, `d1.jpg`, `d2.jpg` (vaakakuva n. 1200x800)

## Tarkistettavat tiedot

- Puuttuvat henkilömäärät (B3, B5, E1, E2, E6, D1, D2) ja kuvaukset `huoneistot.js`:ssä. Ryhmälaskuri käyttää vain huoneistoja, joiden henkilömäärä on tiedossa.
- Kartan merkin koordinaatit `index.html`:ssä (haku "TARKISTA")
- Etäisyydet sijaintiosiossa

## Julkaisu

Toimii sellaisenaan GitHub Pagesissa, Netlifyssä tai missä tahansa staattisessa hostingissa.
