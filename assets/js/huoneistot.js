/*
 * HUONEISTOT
 * Muokkaa tätä listaa: kaikki sivun huoneistokortit ja ryhmäkokolaskuri lukevat tiedot täältä.
 *
 *   nimi       Huoneiston tunnus, esim. "B6"
 *   hlo        Vuodepaikkojen määrä (null = ei vielä tiedossa, jolloin huoneisto jää pois laskurista)
 *   m2         Pinta-ala neliöinä (null = ei näytetä)
 *   kuvaus     Lyhyt kuvaus (max ~20 sanaa)
 *   ominaisuudet  Lyhyitä nostoja, näytetään kortissa
 *   kuva       Kuvatiedosto, esim. "assets/img/huoneistot/b6.jpg" (vaakakuva n. 1200x900)
 *   airbnb     Linkki Airbnb-ilmoitukseen. Jos tyhjä, varauspainike avaa sähköpostin.
 *
 * TARKISTA: tiedot on koottu julkisista lähteistä (levi.fi, levinkuningaskotka.com).
 * Täydennä puuttuvat henkilömäärät, kuvaukset ja Airbnb-linkit.
 */
window.KOTKA_HUONEISTOT = [
  {
    nimi: "A5",
    hlo: 7,
    m2: null,
    kuvaus: "",
    ominaisuudet: [],
    kuva: "assets/img/huoneistot/a5.jpg",
    airbnb: ""
  },
  {
    nimi: "B1",
    hlo: 8,
    m2: null,
    kuvaus: "",
    ominaisuudet: [],
    kuva: "assets/img/huoneistot/b1.jpg",
    airbnb: ""
  },
  {
    nimi: "B4",
    hlo: 7,
    m2: null,
    kuvaus: "",
    ominaisuudet: [],
    kuva: "assets/img/huoneistot/b4.jpg",
    airbnb: ""
  },
  {
    nimi: "B5",
    hlo: null,
    m2: 75,
    kuvaus: "Tilava huoneisto toisessa kerroksessa, sisäänkäynti rakennuksen takaa.",
    ominaisuudet: ["2. kerros"],
    kuva: "assets/img/huoneistot/b5.jpg",
    airbnb: ""
  },
  {
    nimi: "B6",
    hlo: 8,
    m2: 80,
    kuvaus: "Makuuhuoneet yläkerrassa ja saunan ikkunasta näkymä suoraan eturinteeseen.",
    ominaisuudet: ["Sauna rinnenäkymällä", "Hyvin varusteltu keittiö"],
    kuva: "assets/img/huoneistot/b6.jpg",
    airbnb: ""
  },
  {
    nimi: "C4",
    hlo: 6,
    m2: null,
    kuvaus: "",
    ominaisuudet: [],
    kuva: "assets/img/huoneistot/c4.jpg",
    airbnb: ""
  },
  {
    nimi: "D1",
    hlo: null,
    m2: null,
    kuvaus: "",
    ominaisuudet: [],
    kuva: "assets/img/huoneistot/d1.jpg",
    airbnb: ""
  },
  {
    nimi: "D2",
    hlo: null,
    m2: null,
    kuvaus: "",
    ominaisuudet: [],
    kuva: "assets/img/huoneistot/d2.jpg",
    airbnb: ""
  },
  {
    nimi: "E1",
    hlo: null,
    m2: null,
    kuvaus: "",
    ominaisuudet: [],
    kuva: "assets/img/huoneistot/e1.jpg",
    airbnb: ""
  },
  {
    nimi: "E2",
    hlo: null,
    m2: null,
    kuvaus: "",
    ominaisuudet: [],
    kuva: "assets/img/huoneistot/e2.jpg",
    airbnb: ""
  }
];

// Yhteystiedot, joita varauspainike käyttää kun Airbnb-linkkiä ei ole.
window.KOTKA_SAHKOPOSTI = "levinkuningaskotka@gmail.com";
