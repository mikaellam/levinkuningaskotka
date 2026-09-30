/*
 * HUONEISTOT
 * Muokkaa tätä listaa: kaikki sivun huoneistokortit ja ryhmäkokolaskuri lukevat tiedot täältä.
 *
 *   nimi             Huoneiston tunnus, esim. "B6"
 *   talo             Talon kirjain (B, E tai D)
 *   hlo              Vuodepaikkojen määrä (null = ei vielä tiedossa, jolloin huoneisto jää pois laskurista)
 *   m2               Pinta-ala neliöinä (null = ei näytetä)
 *   kuvaus           Lyhyt kuvaus suomeksi (max ~20 sanaa)
 *   kuvaus_en        Sama englanniksi
 *   ominaisuudet     Lyhyitä nostoja suomeksi, näytetään kortissa
 *   ominaisuudet_en  Samat englanniksi, samassa järjestyksessä
 *   kuva             Kuvatiedosto, esim. "assets/img/huoneistot/b6.jpg" (vaakakuva n. 1200x800)
 *   airbnb           Linkki Airbnb-ilmoitukseen. Jos tyhjä, varauspainike avaa sähköpostin.
 *
 * TARKISTA: täydennä puuttuvat henkilömäärät, kuvaukset ja Airbnb-linkit.
 */
window.KOTKA_HUONEISTOT = [
  /* ---------- B-talo ---------- */
  {
    nimi: "B1",
    talo: "B",
    hlo: 8,
    m2: null,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: ["Sauna rinnenäkymällä"],
    ominaisuudet_en: ["Sauna with slope view"],
    kuva: "assets/img/huoneistot/b1.jpg",
    airbnb: ""
  },
  {
    nimi: "B3",
    talo: "B",
    hlo: null,
    m2: null,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: ["Sauna rinnenäkymällä"],
    ominaisuudet_en: ["Sauna with slope view"],
    kuva: "assets/img/huoneistot/b3.jpg",
    airbnb: ""
  },
  {
    nimi: "B5",
    talo: "B",
    hlo: null,
    m2: 75,
    kuvaus: "Tilava huoneisto toisessa kerroksessa, sisäänkäynti rakennuksen takaa.",
    kuvaus_en: "A spacious second-floor apartment with its entrance at the back of the building.",
    ominaisuudet: ["Sauna rinnenäkymällä", "2. kerros"],
    ominaisuudet_en: ["Sauna with slope view", "2nd floor"],
    kuva: "assets/img/huoneistot/b5.jpg",
    airbnb: ""
  },
  {
    nimi: "B6",
    talo: "B",
    hlo: 8,
    m2: 80,
    kuvaus: "Makuuhuoneet yläkerrassa ja saunan ikkunasta näkymä suoraan eturinteeseen.",
    kuvaus_en: "Bedrooms upstairs and a sauna window looking straight onto the front slopes.",
    ominaisuudet: ["Sauna rinnenäkymällä", "Hyvin varusteltu keittiö"],
    ominaisuudet_en: ["Sauna with slope view", "Well-equipped kitchen"],
    kuva: "assets/img/huoneistot/b6.jpg",
    airbnb: ""
  },

  /* ---------- E-talo ---------- */
  {
    nimi: "E1",
    talo: "E",
    hlo: null,
    m2: null,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: [],
    ominaisuudet_en: [],
    kuva: "assets/img/huoneistot/e1.jpg",
    airbnb: ""
  },
  {
    nimi: "E2",
    talo: "E",
    hlo: null,
    m2: null,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: [],
    ominaisuudet_en: [],
    kuva: "assets/img/huoneistot/e2.jpg",
    airbnb: ""
  },
  {
    nimi: "E6",
    talo: "E",
    hlo: null,
    m2: null,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: [],
    ominaisuudet_en: [],
    kuva: "assets/img/huoneistot/e6.jpg",
    airbnb: ""
  },

  /* ---------- D-talo ---------- */
  {
    nimi: "D1",
    talo: "D",
    hlo: null,
    m2: null,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: [],
    ominaisuudet_en: [],
    kuva: "assets/img/huoneistot/d1.jpg",
    airbnb: ""
  },
  {
    nimi: "D2",
    talo: "D",
    hlo: null,
    m2: null,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: [],
    ominaisuudet_en: [],
    kuva: "assets/img/huoneistot/d2.jpg",
    airbnb: ""
  }
];

// Yhteystiedot, joita varauspainike käyttää kun Airbnb-linkkiä ei ole.
window.KOTKA_SAHKOPOSTI = "levinkuningaskotka@gmail.com";
