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
 *   varaus           Varauslinkki (Hosta, Airbnb tms.). Airbnb-linkin napissa lukee "Varaa Airbnb:ssä",
 *                    muissa "Varaa suoraan". Jos tyhjä, painike avaa sähköpostin ("Kysy vapaita päiviä").
 *
 * TARKISTA: täydennä puuttuvat kuvaukset ja varauslinkit.
 */
window.KOTKA_HUONEISTOT = [
  /* ---------- B-talo ---------- */
  {
    nimi: "B1",
    talo: "B",
    hlo: 8,
    m2: 88,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: ["Sauna rinnenäkymällä"],
    ominaisuudet_en: ["Sauna with slope view"],
    kuva: "assets/img/huoneistot/b1.jpg",
    varaus: ""
  },
  {
    nimi: "B3",
    talo: "B",
    hlo: 8,
    m2: 88,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: ["Sauna rinnenäkymällä"],
    ominaisuudet_en: ["Sauna with slope view"],
    kuva: "assets/img/huoneistot/b3.jpg",
    varaus: ""
  },
  {
    nimi: "B5",
    talo: "B",
    hlo: 7,
    m2: 75,
    kuvaus: "Tilava huoneisto toisessa kerroksessa, sisäänkäynti rakennuksen takaa.",
    kuvaus_en: "A spacious second-floor apartment with its entrance at the back of the building.",
    ominaisuudet: ["Sauna rinnenäkymällä", "2. kerros"],
    ominaisuudet_en: ["Sauna with slope view", "2nd floor"],
    kuva: "assets/img/huoneistot/b5.jpg",
    varaus: ""
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
    varaus: ""
  },

  /* ---------- E-talo ---------- */
  {
    nimi: "E1",
    talo: "E",
    hlo: 8,
    m2: 87,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: [],
    ominaisuudet_en: [],
    kuva: "assets/img/huoneistot/e1.jpg",
    varaus: "https://www.airbnb.fi/rooms/1604302440559647241?source_impression_id=p3_1790765599_P309z9zrnuhCJ-Ac"
  },
  {
    nimi: "E2",
    talo: "E",
    hlo: 8,
    m2: 87,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: [],
    ominaisuudet_en: [],
    kuva: "assets/img/huoneistot/e2.jpg",
    varaus: "https://www.airbnb.fi/rooms/1604328782437279562?source_impression_id=p3_1790765597_P33fwBJIY2MSH8Ef"
  },
  {
    nimi: "E6",
    talo: "E",
    hlo: 8,
    m2: 72,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: [],
    ominaisuudet_en: [],
    kuva: "assets/img/huoneistot/e6.jpg",
    varaus: "https://www.airbnb.fi/rooms/1604368285423697215?source_impression_id=p3_1790765602_P3G09tkAWxtkHaDs"
  },

  /* ---------- D-talo ---------- */
  {
    nimi: "D1",
    talo: "D",
    hlo: 8,
    m2: 87,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: [],
    ominaisuudet_en: [],
    kuva: "assets/img/huoneistot/d1.jpg",
    varaus: "https://www.airbnb.fi/rooms/1406394638866185784?source_impression_id=p3_1790765579_P3yZBce8qLUmZZKc"
  },
  {
    nimi: "D2",
    talo: "D",
    hlo: 8,
    m2: 87,
    kuvaus: "",
    kuvaus_en: "",
    ominaisuudet: [],
    ominaisuudet_en: [],
    kuva: "assets/img/huoneistot/d2.jpg",
    varaus: "https://www.airbnb.fi/rooms/1406394639787942314?source_impression_id=p3_1790765594_P3LUk2XzCkv7r30Z"
  }
];

// Yhteystiedot, joita varauspainike käyttää kun varauslinkkiä ei ole.
window.KOTKA_SAHKOPOSTI = "levinkuningaskotka@gmail.com";
