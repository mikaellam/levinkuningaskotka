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
  /* ---------- E-talo ---------- */
  {
    nimi: "E1",
    talo: "E",
    hlo: 8,
    m2: 87,
    kuvaus: "Kaksikerroksinen huoneisto, sisäänkäynti katutasosta. Yhdistettävissä väliovella E2:n kanssa, joten 16 hengen porukka mahtuu saman katon alle.",
    kuvaus_en: "A two-storey apartment with a street-level entrance. Connects to E2 through an adjoining door, so a group of 16 can stay under one roof.",
    ominaisuudet: ["2 kerrosta", "3 huonetta + alkovi", "2 WC:tä", "Yhdistettävissä E2:n kanssa"],
    ominaisuudet_en: ["Two storeys", "3 rooms + alcove", "2 toilets", "Connects to E2"],
    kuva: "assets/img/huoneistot/e1.jpg",
    varaus: "https://book.hosta.fi/listings/478349?city=Levi&numberOfGuests=1"
  },
  {
    nimi: "E2",
    talo: "E",
    hlo: 8,
    m2: 87,
    kuvaus: "Kaksikerroksinen huoneisto, sisäänkäynti katutasosta. Yhdistettävissä väliovella E1:n kanssa, joten 16 hengen porukka mahtuu saman katon alle.",
    kuvaus_en: "A two-storey apartment with a street-level entrance. Connects to E1 through an adjoining door, so a group of 16 can stay under one roof.",
    ominaisuudet: ["2 kerrosta", "3 huonetta + alkovi", "2 WC:tä", "Yhdistettävissä E1:n kanssa"],
    ominaisuudet_en: ["Two storeys", "3 rooms + alcove", "2 toilets", "Connects to E1"],
    kuva: "assets/img/huoneistot/e2.jpg",
    varaus: "https://book.hosta.fi/listings/478364?city=Levi&numberOfGuests=1"
  },
  {
    nimi: "E6",
    talo: "E",
    hlo: 8,
    m2: 72,
    kuvaus: "Neljä erillistä makuuhuonetta, sisäänkäynti toisesta kerroksesta.",
    kuvaus_en: "Four separate bedrooms, with the entrance on the second floor.",
    ominaisuudet: ["4 makuuhuonetta", "Sisäänkäynti 2. kerroksesta"],
    ominaisuudet_en: ["4 bedrooms", "Entrance on 2nd floor"],
    kuva: "assets/img/huoneistot/e6.jpg",
    varaus: "https://book.hosta.fi/listings/478807?city=Levi&numberOfGuests=1"
  },

  /* ---------- D-talo ---------- */
  {
    nimi: "D1",
    talo: "D",
    hlo: 8,
    m2: 87,
    kuvaus: "Kaksikerroksinen huoneisto, sisäänkäynti katutasosta. Yhdistettävissä väliovella D2:n kanssa, joten 16 hengen porukka mahtuu saman katon alle.",
    kuvaus_en: "A two-storey apartment with a street-level entrance. Connects to D2 through an adjoining door, so a group of 16 can stay under one roof.",
    ominaisuudet: ["2 kerrosta", "3 huonetta + alkovi", "2 WC:tä", "Yhdistettävissä D2:n kanssa"],
    ominaisuudet_en: ["Two storeys", "3 rooms + alcove", "2 toilets", "Connects to D2"],
    kuva: "assets/img/huoneistot/d1.jpg",
    varaus: "https://book.hosta.fi/listings/383888?city=Levi&numberOfGuests=1"
  },
  {
    nimi: "D2",
    talo: "D",
    hlo: 8,
    m2: 87,
    kuvaus: "Kaksikerroksinen huoneisto, sisäänkäynti katutasosta. Yhdistettävissä väliovella D1:n kanssa, joten 16 hengen porukka mahtuu saman katon alle.",
    kuvaus_en: "A two-storey apartment with a street-level entrance. Connects to D1 through an adjoining door, so a group of 16 can stay under one roof.",
    ominaisuudet: ["2 kerrosta", "3 huonetta + alkovi", "2 WC:tä", "Yhdistettävissä D1:n kanssa"],
    ominaisuudet_en: ["Two storeys", "3 rooms + alcove", "2 toilets", "Connects to D1"],
    kuva: "assets/img/huoneistot/d2.jpg",
    varaus: "https://book.hosta.fi/listings/383918?city=Levi&numberOfGuests=1"
  },

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
  }
];

// Ryhmäkokolaskurin ehdotusjärjestys: ensin E-talo, sitten D-talo, viimeisenä B-talo.
window.KOTKA_TALOJARJESTYS = ["E", "D", "B"];

// Yhteystiedot, joita varauspainike käyttää kun varauslinkkiä ei ole.
window.KOTKA_SAHKOPOSTI = "levinkuningaskotka@gmail.com";
