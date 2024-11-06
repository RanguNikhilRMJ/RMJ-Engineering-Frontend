"use client";
import React from 'react';
import QrCodeComponent from '@/components/qrCode/qr'; // Default import

const jsonData =
[
    {
    "name": "Franecki and Sons",
    "code": "#a17a3c"
  }, {
    "name": "Harvey LLC",
    "code": "#51b703"
  }, {
    "name": "Marks-Welch",
    "code": "#fd614c"
  }, {
    "name": "Koss, Wiza and Ortiz",
    "code": "#d3cd85"
  }, {
    "name": "Johnston and Sons",
    "code": "#850c0a"
  }, {
    "name": "Aufderhar, Hackett and Hirthe",
    "code": "#18e8bb"
  }, {
    "name": "Jenkins, Kihn and Kulas",
    "code": "#278240"
  }, {
    "name": "Kshlerin-Oberbrunner",
    "code": "#de32f7"
  }, {
    "name": "Satterfield-VonRueden",
    "code": "#f2279a"
  }, {
    "name": "Waelchi, Mann and Kreiger",
    "code": "#3c621b"
  }, {
    "name": "Bechtelar, Steuber and Reichel",
    "code": "#9dc89c"
  }, {
    "name": "Funk, Effertz and White",
    "code": "#dcde43"
  }, {
    "name": "Feil-Jakubowski",
    "code": "#a5a5b9"
  }, {
    "name": "Lang Group",
    "code": "#11e492"
  }, {
    "name": "Torp LLC",
    "code": "#277b40"
  }, {
    "name": "Davis, Brown and Williamson",
    "code": "#64db5b"
  }, {
    "name": "Krajcik-Crooks",
    "code": "#adc65b"
  }, {
    "name": "Parker-Bailey",
    "code": "#221d4e"
  }, {
    "name": "Frami-Kihn",
    "code": "#90baee"
  }, {
    "name": "Pfeffer-Lynch",
    "code": "#fc95fa"
  }, {
    "name": "Green, Waters and Zemlak",
    "code": "#78060a"
  }, {
    "name": "O'Connell-Powlowski",
    "code": "#b2a44b"
  }, {
    "name": "Senger, Moore and Shields",
    "code": "#8de300"
  }, {
    "name": "Beahan-Streich",
    "code": "#d554ca"
  }, {
    "name": "Rau Group",
    "code": "#931ca3"
  }, {
    "name": "Bartoletti-Sporer",
    "code": "#f3d9a0"
  }, {
    "name": "Pfeffer Inc",
    "code": "#96a91f"
  }, {
    "name": "Veum, Goldner and Williamson",
    "code": "#532bd5"
  }, {
    "name": "Auer and Sons",
    "code": "#c20d29"
  }, {
    "name": "Walsh, Lang and Veum",
    "code": "#e45d21"
  }, {
    "name": "Douglas-Wisozk",
    "code": "#46080e"
  }, {
    "name": "Roberts Group",
    "code": "#a56d7a"
  }, {
    "name": "Kertzmann-Lubowitz",
    "code": "#410e8b"
  }, {
    "name": "Schmeler and Sons",
    "code": "#14f669"
  }, {
    "name": "Christiansen-O'Connell",
    "code": "#4c90fe"
  }, {
    "name": "Cummerata, Kessler and Abshire",
    "code": "#c3de13"
  }, {
    "name": "Jones, Beer and Reichel",
    "code": "#22ad5f"
  }, {
    "name": "Altenwerth-Beier",
    "code": "#0f1aed"
  }, {
    "name": "Ankunding Group",
    "code": "#79e0d0"
  }, {
    "name": "Witting, O'Hara and Sanford",
    "code": "#a870c2"
  }, {
    "name": "Ankunding-Hammes",
    "code": "#06f434"
  }, {
    "name": "Upton, Kovacek and Towne",
    "code": "#c83c1b"
  }, {
    "name": "Emard Inc",
    "code": "#91ed75"
  }, {
    "name": "Quitzon-Barton",
    "code": "#ec67ee"
  }, {
    "name": "Shields, Purdy and Tillman",
    "code": "#65d2f8"
  }, {
    "name": "Tromp-Heaney",
    "code": "#629b1e"
  }, {
    "name": "Carroll-Friesen",
    "code": "#75a283"
  }, {
    "name": "O'Hara-Jacobs",
    "code": "#4450bf"
  }, {
    "name": "Grady-Russel",
    "code": "#034525"
  }, {
    "name": "Wuckert Inc",
    "code": "#00bc05"
  }, {
    "name": "Hartmann-Johns",
    "code": "#601fad"
  }, {
    "name": "Schmeler-Koepp",
    "code": "#76c49f"
  }, {
    "name": "Cummings-Wilkinson",
    "code": "#46cb83"
  }, {
    "name": "Gerhold-Mills",
    "code": "#7ee17c"
  }, {
    "name": "Kuhic, Bashirian and Metz",
    "code": "#df2a20"
  }, {
    "name": "Barrows-McLaughlin",
    "code": "#d03d35"
  }, {
    "name": "Emmerich and Sons",
    "code": "#e62015"
  }, {
    "name": "Bernhard, Torp and Kulas",
    "code": "#8a2d0a"
  }, {
    "name": "Bechtelar-Hayes",
    "code": "#182d33"
  }, {
    "name": "Gislason LLC",
    "code": "#3d1954"
  }, {
    "name": "Johnson, Adams and O'Kon",
    "code": "#263840"
  }, {
    "name": "Leannon-Herman",
    "code": "#7d2c51"
  }, {
    "name": "Walker-Jenkins",
    "code": "#f27023"
  }, {
    "name": "Lubowitz and Sons",
    "code": "#e14e18"
  }, {
    "name": "Gleichner, Bernier and Hahn",
    "code": "#b90ef2"
  }, {
    "name": "Bernhard LLC",
    "code": "#f24a72"
  }, {
    "name": "Jerde, Boyer and Spinka",
    "code": "#b79fd1"
  }, {
    "name": "Witting Inc",
    "code": "#62a180"
  }, {
    "name": "Stracke, Hettinger and Langworth",
    "code": "#eac739"
  }, {
    "name": "Goldner, Dooley and Dibbert",
    "code": "#11379d"
  }, {
    "name": "Beahan, Trantow and Casper",
    "code": "#27f3f7"
  }, {
    "name": "Turcotte and Sons",
    "code": "#38ed8a"
  }, {
    "name": "Kuhic, Senger and Hackett",
    "code": "#964f69"
  }, {
    "name": "Grant, Kemmer and Grimes",
    "code": "#db4ff8"
  }, {
    "name": "Dietrich and Sons",
    "code": "#2c9250"
  }, {
    "name": "Quitzon, Schamberger and Will",
    "code": "#53c870"
  }, {
    "name": "Boyer, Hyatt and Goldner",
    "code": "#12f63d"
  }, {
    "name": "Yundt, Bergnaum and Treutel",
    "code": "#0e92d5"
  }, {
    "name": "Schulist-O'Kon",
    "code": "#a65b9a"
  }, {
    "name": "Homenick, Zulauf and Hagenes",
    "code": "#e7330c"
  }, {
    "name": "Denesik, Auer and Ortiz",
    "code": "#9be332"
  }, {
    "name": "Emard, Mitchell and Walter",
    "code": "#5944c4"
  }, {
    "name": "Lesch LLC",
    "code": "#ce14ac"
  }, {
    "name": "Stehr Inc",
    "code": "#68e7ef"
  }, {
    "name": "Jakubowski, Deckow and Jones",
    "code": "#4ee352"
  }, {
    "name": "Funk, Gerhold and Wiegand",
    "code": "#8d4f87"
  }, {
    "name": "Collier and Sons",
    "code": "#d6ebbf"
  }, {
    "name": "Greenfelder-Barrows",
    "code": "#6fe6ea"
  }, {
    "name": "Schmidt, Franecki and Parisian",
    "code": "#eb571f"
  }, {
    "name": "Lubowitz-Kutch",
    "code": "#129783"
  }, {
    "name": "Gerlach-Huel",
    "code": "#9e8dbf"
  }, {
    "name": "Kozey Inc",
    "code": "#5d2286"
  }, {
    "name": "Schowalter-Bradtke",
    "code": "#816d01"
  }, {
    "name": "Bogan LLC",
    "code": "#50fab6"
  }, {
    "name": "Pouros LLC",
    "code": "#8af586"
  }, {
    "name": "Frami-Wehner",
    "code": "#f4ed07"
  }, {
    "name": "Stoltenberg LLC",
    "code": "#5b4a59"
  }, {
    "name": "Kessler-Stroman",
    "code": "#be7cee"
  }, {
    "name": "Maggio Group",
    "code": "#fad0ee"
  }, {
    "name": "Hodkiewicz Group",
    "code": "#b05003"
  },
  {
    "name": "Stamm LLC",
    "code": "#16ab75"
  }, {
    "name": "Lebsack-Sipes",
    "code": "#496d41"
  }, {
    "name": "Goodwin Inc",
    "code": "#82e5ef"
  }, {
    "name": "Prohaska LLC",
    "code": "#f369b7"
  }, {
    "name": "Hodkiewicz, Buckridge and Gleason",
    "code": "#72be52"
  }, {
    "name": "Barton-Schumm",
    "code": "#c05648"
  }, {
    "name": "McDermott-Reichert",
    "code": "#e7e190"
  }, {
    "name": "Dach-Leannon",
    "code": "#09fe9d"
  }, {
    "name": "Miller-Lowe",
    "code": "#29f933"
  }, {
    "name": "Schulist, Morissette and Dietrich",
    "code": "#ddaa60"
  }, {
    "name": "Crona-Murray",
    "code": "#728ad6"
  }, {
    "name": "Ullrich, Daniel and Pollich",
    "code": "#846e5d"
  }, {
    "name": "Parker and Sons",
    "code": "#6591c2"
  }, {
    "name": "Raynor-Abernathy",
    "code": "#935e13"
  }, {
    "name": "Moen-Toy",
    "code": "#7c94a7"
  }, {
    "name": "Botsford, Schimmel and Reichert",
    "code": "#bbe99c"
  }, {
    "name": "Macejkovic-Hickle",
    "code": "#997119"
  }, {
    "name": "Stracke, Kautzer and Gutkowski",
    "code": "#5eec3d"
  }, {
    "name": "Beier Group",
    "code": "#551f89"
  }, {
    "name": "Gibson, Aufderhar and Boyer",
    "code": "#c75804"
  }, {
    "name": "Roob-Lubowitz",
    "code": "#6b5407"
  }, {
    "name": "Williamson-Balistreri",
    "code": "#d74795"
  }, {
    "name": "Gleason Inc",
    "code": "#b0def3"
  }, {
    "name": "Treutel and Sons",
    "code": "#3d5cd7"
  }, {
    "name": "Jast Group",
    "code": "#378660"
  }, {
    "name": "Miller-Friesen",
    "code": "#b08dc7"
  }, {
    "name": "Breitenberg, Collins and Wilkinson",
    "code": "#ba4a93"
  }, {
    "name": "Yost LLC",
    "code": "#d220c5"
  }, {
    "name": "Hammes Group",
    "code": "#fc96f3"
  }, {
    "name": "Reinger Group",
    "code": "#0321df"
  }, {
    "name": "Schoen, Russel and Willms",
    "code": "#691c43"
  }, {
    "name": "Legros Group",
    "code": "#a05079"
  }, {
    "name": "Abbott LLC",
    "code": "#a36ace"
  }, {
    "name": "West, Frami and Schmitt",
    "code": "#538570"
  }, {
    "name": "Bogisich Inc",
    "code": "#af58c6"
  }, {
    "name": "Windler-Kunde",
    "code": "#91d6eb"
  }, {
    "name": "Rowe, Homenick and Thompson",
    "code": "#888f69"
  }, {
    "name": "Shanahan-White",
    "code": "#f8080f"
  }, {
    "name": "Welch-Littel",
    "code": "#d9e9f7"
  }, {
    "name": "Wehner LLC",
    "code": "#5d00a3"
  }, {
    "name": "Weimann-McGlynn",
    "code": "#49357e"
  }, {
    "name": "Block-Pacocha",
    "code": "#699c66"
  }, {
    "name": "Hauck, Gorczany and Fadel",
    "code": "#6df749"
  }, {
    "name": "Abernathy Inc",
    "code": "#d0a9e3"
  }, {
    "name": "Buckridge-Crooks",
    "code": "#e9a813"
  }, {
    "name": "Balistreri-Keebler",
    "code": "#06e7f1"
  }, {
    "name": "Green, Koch and Hackett",
    "code": "#75b9f3"
  }, {
    "name": "Koelpin Inc",
    "code": "#2ee3ef"
  }, {
    "name": "Wintheiser LLC",
    "code": "#e88e03"
  }, {
    "name": "Kautzer Group",
    "code": "#f100a7"
  }, {
    "name": "Rau, Crona and Skiles",
    "code": "#f3c83d"
  }, {
    "name": "Klocko-Keebler",
    "code": "#002499"
  }, {
    "name": "Hammes-Ebert",
    "code": "#d7d875"
  }, {
    "name": "Medhurst, Kuphal and Leannon",
    "code": "#ab7fb3"
  }, {
    "name": "Hane LLC",
    "code": "#370bc3"
  }, {
    "name": "Kassulke, Effertz and Heller",
    "code": "#118b18"
  }, {
    "name": "Funk, Cronin and Kshlerin",
    "code": "#037228"
  }, {
    "name": "Denesik-Waters",
    "code": "#c4c1d7"
  }, {
    "name": "Howell LLC",
    "code": "#025a1c"
  }, {
    "name": "Ryan, Mante and Harris",
    "code": "#d55664"
  }, {
    "name": "Stamm, Pouros and Abbott",
    "code": "#e0cac7"
  }, {
    "name": "Greenfelder Group",
    "code": "#b06ef9"
  }, {
    "name": "Krajcik and Sons",
    "code": "#1eae29"
  }, {
    "name": "Kris, Marks and Schuppe",
    "code": "#ad02f5"
  }, {
    "name": "Kirlin-Nikolaus",
    "code": "#9e913a"
  }, {
    "name": "Botsford-Dickinson",
    "code": "#e82a61"
  }, {
    "name": "Hagenes, Raynor and Hintz",
    "code": "#11d371"
  }, {
    "name": "Kris LLC",
    "code": "#41f765"
  }, {
    "name": "Zieme-Jones",
    "code": "#14f4b7"
  }, {
    "name": "Collier, White and Langworth",
    "code": "#18ece5"
  }, {
    "name": "Zboncak-Herman",
    "code": "#532e17"
  }, {
    "name": "Macejkovic-Auer",
    "code": "#d34503"
  }, {
    "name": "Leuschke Inc",
    "code": "#50f1b8"
  }, {
    "name": "Kassulke Group",
    "code": "#246deb"
  }, {
    "name": "Jacobi, Boyle and Hane",
    "code": "#329aa8"
  }, {
    "name": "Baumbach, Ward and Weber",
    "code": "#e60811"
  }, {
    "name": "Osinski, Beier and Yundt",
    "code": "#5e3597"
  }, {
    "name": "Osinski Inc",
    "code": "#4c1528"
  }, {
    "name": "Hayes-Kshlerin",
    "code": "#871782"
  }, {
    "name": "Runte Group",
    "code": "#aa49b8"
  }, {
    "name": "Mosciski Inc",
    "code": "#bfd4e0"
  }, {
    "name": "Sauer, Hackett and Kub",
    "code": "#7ddfc8"
  }, {
    "name": "Jones-Anderson",
    "code": "#e66ec7"
  }, {
    "name": "Huels Inc",
    "code": "#83b9ec"
  }, {
    "name": "Konopelski-Dicki",
    "code": "#6a3b4c"
  }, {
    "name": "O'Reilly, Schultz and Sawayn",
    "code": "#52bede"
  }, {
    "name": "Greenfelder Inc",
    "code": "#46ec66"
  }, {
    "name": "Beahan Inc",
    "code": "#d0c015"
  }, {
    "name": "Wintheiser LLC",
    "code": "#a67e17"
  }, {
    "name": "Bradtke-Abbott",
    "code": "#ab9b5e"
  }, {
    "name": "Davis-Predovic",
    "code": "#98a981"
  }, {
    "name": "Heathcote, Bergstrom and Spinka",
    "code": "#80de5c"
  }, {
    "name": "Ankunding, Fritsch and Cormier",
    "code": "#e9712a"
  }, {
    "name": "Mueller-Buckridge",
    "code": "#d0d362"
  }, {
    "name": "Cormier Group",
    "code": "#4e0cb7"
  }, {
    "name": "White Group",
    "code": "#69ccf6"
  }, {
    "name": "Wiegand, Lesch and Hansen",
    "code": "#99f367"
  }, {
    "name": "Howe-Wilderman",
    "code": "#e81db8"
  }, {
    "name": "Vandervort-Weimann",
    "code": "#c9e6be"
  }, {
    "name": "Homenick-Nienow",
    "code": "#e672be"
  },
  {
    "name": "Stamm LLC",
    "code": "#16ab75"
  }, {
    "name": "Lebsack-Sipes",
    "code": "#496d41"
  }, {
    "name": "Goodwin Inc",
    "code": "#82e5ef"
  }, {
    "name": "Prohaska LLC",
    "code": "#f369b7"
  }, {
    "name": "Hodkiewicz, Buckridge and Gleason",
    "code": "#72be52"
  }, {
    "name": "Barton-Schumm",
    "code": "#c05648"
  }, {
    "name": "McDermott-Reichert",
    "code": "#e7e190"
  }, {
    "name": "Dach-Leannon",
    "code": "#09fe9d"
  }, {
    "name": "Miller-Lowe",
    "code": "#29f933"
  }, {
    "name": "Schulist, Morissette and Dietrich",
    "code": "#ddaa60"
  }, {
    "name": "Crona-Murray",
    "code": "#728ad6"
  }, {
    "name": "Ullrich, Daniel and Pollich",
    "code": "#846e5d"
  }, {
    "name": "Parker and Sons",
    "code": "#6591c2"
  }, {
    "name": "Raynor-Abernathy",
    "code": "#935e13"
  }, {
    "name": "Moen-Toy",
    "code": "#7c94a7"
  }, {
    "name": "Botsford, Schimmel and Reichert",
    "code": "#bbe99c"
  }, {
    "name": "Macejkovic-Hickle",
    "code": "#997119"
  }, {
    "name": "Stracke, Kautzer and Gutkowski",
    "code": "#5eec3d"
  }, {
    "name": "Beier Group",
    "code": "#551f89"
  }, {
    "name": "Gibson, Aufderhar and Boyer",
    "code": "#c75804"
  }, {
    "name": "Roob-Lubowitz",
    "code": "#6b5407"
  }, {
    "name": "Williamson-Balistreri",
    "code": "#d74795"
  }, {
    "name": "Gleason Inc",
    "code": "#b0def3"
  }, {
    "name": "Treutel and Sons",
    "code": "#3d5cd7"
  }, {
    "name": "Jast Group",
    "code": "#378660"
  }, {
    "name": "Miller-Friesen",
    "code": "#b08dc7"
  }, {
    "name": "Breitenberg, Collins and Wilkinson",
    "code": "#ba4a93"
  }, {
    "name": "Yost LLC",
    "code": "#d220c5"
  }, {
    "name": "Hammes Group",
    "code": "#fc96f3"
  }, {
    "name": "Reinger Group",
    "code": "#0321df"
  }, {
    "name": "Schoen, Russel and Willms",
    "code": "#691c43"
  }, {
    "name": "Legros Group",
    "code": "#a05079"
  }, {
    "name": "Abbott LLC",
    "code": "#a36ace"
  }, {
    "name": "West, Frami and Schmitt",
    "code": "#538570"
  }, {
    "name": "Bogisich Inc",
    "code": "#af58c6"
  }, {
    "name": "Windler-Kunde",
    "code": "#91d6eb"
  }, {
    "name": "Rowe, Homenick and Thompson",
    "code": "#888f69"
  }, {
    "name": "Shanahan-White",
    "code": "#f8080f"
  }, {
    "name": "Welch-Littel",
    "code": "#d9e9f7"
  }, {
    "name": "Wehner LLC",
    "code": "#5d00a3"
  }, {
    "name": "Weimann-McGlynn",
    "code": "#49357e"
  }, {
    "name": "Block-Pacocha",
    "code": "#699c66"
  }, {
    "name": "Hauck, Gorczany and Fadel",
    "code": "#6df749"
  }, {
    "name": "Abernathy Inc",
    "code": "#d0a9e3"
  }, {
    "name": "Buckridge-Crooks",
    "code": "#e9a813"
  }, {
    "name": "Balistreri-Keebler",
    "code": "#06e7f1"
  }, {
    "name": "Green, Koch and Hackett",
    "code": "#75b9f3"
  }, {
    "name": "Koelpin Inc",
    "code": "#2ee3ef"
  }, {
    "name": "Wintheiser LLC",
    "code": "#e88e03"
  }, {
    "name": "Kautzer Group",
    "code": "#f100a7"
  }, {
    "name": "Rau, Crona and Skiles",
    "code": "#f3c83d"
  }, {
    "name": "Klocko-Keebler",
    "code": "#002499"
  }, {
    "name": "Hammes-Ebert",
    "code": "#d7d875"
  }, {
    "name": "Medhurst, Kuphal and Leannon",
    "code": "#ab7fb3"
  }, {
    "name": "Hane LLC",
    "code": "#370bc3"
  }, {
    "name": "Kassulke, Effertz and Heller",
    "code": "#118b18"
  }, {
    "name": "Funk, Cronin and Kshlerin",
    "code": "#037228"
  }, {
    "name": "Denesik-Waters",
    "code": "#c4c1d7"
  }, {
    "name": "Howell LLC",
    "code": "#025a1c"
  }, {
    "name": "Ryan, Mante and Harris",
    "code": "#d55664"
  }, {
    "name": "Stamm, Pouros and Abbott",
    "code": "#e0cac7"
  }, {
    "name": "Greenfelder Group",
    "code": "#b06ef9"
  }, {
    "name": "Krajcik and Sons",
    "code": "#1eae29"
  }, {
    "name": "Kris, Marks and Schuppe",
    "code": "#ad02f5"
  }, {
    "name": "Kirlin-Nikolaus",
    "code": "#9e913a"
  }, {
    "name": "Botsford-Dickinson",
    "code": "#e82a61"
  }, {
    "name": "Hagenes, Raynor and Hintz",
    "code": "#11d371"
  }, {
    "name": "Kris LLC",
    "code": "#41f765"
  }, {
    "name": "Zieme-Jones",
    "code": "#14f4b7"
  }, {
    "name": "Collier, White and Langworth",
    "code": "#18ece5"
  }, {
    "name": "Zboncak-Herman",
    "code": "#532e17"
  }, {
    "name": "Macejkovic-Auer",
    "code": "#d34503"
  }, {
    "name": "Leuschke Inc",
    "code": "#50f1b8"
  }, {
    "name": "Kassulke Group",
    "code": "#246deb"
  }, {
    "name": "Jacobi, Boyle and Hane",
    "code": "#329aa8"
  }, {
    "name": "Baumbach, Ward and Weber",
    "code": "#e60811"
  }, {
    "name": "Osinski, Beier and Yundt",
    "code": "#5e3597"
  }, {
    "name": "Osinski Inc",
    "code": "#4c1528"
  }, {
    "name": "Hayes-Kshlerin",
    "code": "#871782"
  }, {
    "name": "Runte Group",
    "code": "#aa49b8"
  }, {
    "name": "Mosciski Inc",
    "code": "#bfd4e0"
  }, {
    "name": "Sauer, Hackett and Kub",
    "code": "#7ddfc8"
  }, {
    "name": "Jones-Anderson",
    "code": "#e66ec7"
  }, {
    "name": "Huels Inc",
    "code": "#83b9ec"
  }, {
    "name": "Konopelski-Dicki",
    "code": "#6a3b4c"
  }, {
    "name": "O'Reilly, Schultz and Sawayn",
    "code": "#52bede"
  }, {
    "name": "Greenfelder Inc",
    "code": "#46ec66"
  }, {
    "name": "Beahan Inc",
    "code": "#d0c015"
  }, {
    "name": "Wintheiser LLC",
    "code": "#a67e17"
  }, {
    "name": "Bradtke-Abbott",
    "code": "#ab9b5e"
  }, {
    "name": "Davis-Predovic",
    "code": "#98a981"
  }, {
    "name": "Heathcote, Bergstrom and Spinka",
    "code": "#80de5c"
  }, {
    "name": "Ankunding, Fritsch and Cormier",
    "code": "#e9712a"
  }, {
    "name": "Mueller-Buckridge",
    "code": "#d0d362"
  }, {
    "name": "Cormier Group",
    "code": "#4e0cb7"
  }, {
    "name": "White Group",
    "code": "#69ccf6"
  }, {
    "name": "Wiegand, Lesch and Hansen",
    "code": "#99f367"
  }, {
    "name": "Howe-Wilderman",
    "code": "#e81db8"
  }, {
    "name": "Vandervort-Weimann",
    "code": "#c9e6be"
  }, {
    "name": "Homenick-Nienow",
    "code": "#e672be"
  },{
    "name": "Stamm LLC",
    "code": "#16ab75"
  }, {
    "name": "Lebsack-Sipes",
    "code": "#496d41"
  }, {
    "name": "Goodwin Inc",
    "code": "#82e5ef"
  }, {
    "name": "Prohaska LLC",
    "code": "#f369b7"
  }, {
    "name": "Hodkiewicz, Buckridge and Gleason",
    "code": "#72be52"
  }, {
    "name": "Barton-Schumm",
    "code": "#c05648"
  }, {
    "name": "McDermott-Reichert",
    "code": "#e7e190"
  }, {
    "name": "Dach-Leannon",
    "code": "#09fe9d"
  }, {
    "name": "Miller-Lowe",
    "code": "#29f933"
  }, {
    "name": "Schulist, Morissette and Dietrich",
    "code": "#ddaa60"
  }, {
    "name": "Crona-Murray",
    "code": "#728ad6"
  }, {
    "name": "Ullrich, Daniel and Pollich",
    "code": "#846e5d"
  }, {
    "name": "Parker and Sons",
    "code": "#6591c2"
  }, {
    "name": "Raynor-Abernathy",
    "code": "#935e13"
  }, {
    "name": "Moen-Toy",
    "code": "#7c94a7"
  }, {
    "name": "Botsford, Schimmel and Reichert",
    "code": "#bbe99c"
  }, {
    "name": "Macejkovic-Hickle",
    "code": "#997119"
  }, {
    "name": "Stracke, Kautzer and Gutkowski",
    "code": "#5eec3d"
  }, {
    "name": "Beier Group",
    "code": "#551f89"
  }, {
    "name": "Gibson, Aufderhar and Boyer",
    "code": "#c75804"
  }, {
    "name": "Roob-Lubowitz",
    "code": "#6b5407"
  }, {
    "name": "Williamson-Balistreri",
    "code": "#d74795"
  }, {
    "name": "Gleason Inc",
    "code": "#b0def3"
  }, {
    "name": "Treutel and Sons",
    "code": "#3d5cd7"
  }, {
    "name": "Jast Group",
    "code": "#378660"
  }, {
    "name": "Miller-Friesen",
    "code": "#b08dc7"
  }, {
    "name": "Breitenberg, Collins and Wilkinson",
    "code": "#ba4a93"
  }, {
    "name": "Yost LLC",
    "code": "#d220c5"
  }, {
    "name": "Hammes Group",
    "code": "#fc96f3"
  }, {
    "name": "Reinger Group",
    "code": "#0321df"
  }, {
    "name": "Schoen, Russel and Willms",
    "code": "#691c43"
  }, {
    "name": "Legros Group",
    "code": "#a05079"
  }, {
    "name": "Abbott LLC",
    "code": "#a36ace"
  }, {
    "name": "West, Frami and Schmitt",
    "code": "#538570"
  }, {
    "name": "Bogisich Inc",
    "code": "#af58c6"
  }, {
    "name": "Windler-Kunde",
    "code": "#91d6eb"
  }, {
    "name": "Rowe, Homenick and Thompson",
    "code": "#888f69"
  }, {
    "name": "Shanahan-White",
    "code": "#f8080f"
  }, {
    "name": "Welch-Littel",
    "code": "#d9e9f7"
  }, {
    "name": "Wehner LLC",
    "code": "#5d00a3"
  }, {
    "name": "Weimann-McGlynn",
    "code": "#49357e"
  }, {
    "name": "Block-Pacocha",
    "code": "#699c66"
  }, {
    "name": "Hauck, Gorczany and Fadel",
    "code": "#6df749"
  }, {
    "name": "Abernathy Inc",
    "code": "#d0a9e3"
  }, {
    "name": "Buckridge-Crooks",
    "code": "#e9a813"
  }, {
    "name": "Balistreri-Keebler",
    "code": "#06e7f1"
  }, {
    "name": "Green, Koch and Hackett",
    "code": "#75b9f3"
  }, {
    "name": "Koelpin Inc",
    "code": "#2ee3ef"
  }, {
    "name": "Wintheiser LLC",
    "code": "#e88e03"
  }, {
    "name": "Kautzer Group",
    "code": "#f100a7"
  }, {
    "name": "Rau, Crona and Skiles",
    "code": "#f3c83d"
  }, {
    "name": "Klocko-Keebler",
    "code": "#002499"
  }, {
    "name": "Hammes-Ebert",
    "code": "#d7d875"
  }, {
    "name": "Medhurst, Kuphal and Leannon",
    "code": "#ab7fb3"
  }, {
    "name": "Hane LLC",
    "code": "#370bc3"
  }, {
    "name": "Kassulke, Effertz and Heller",
    "code": "#118b18"
  }, {
    "name": "Funk, Cronin and Kshlerin",
    "code": "#037228"
  }, {
    "name": "Denesik-Waters",
    "code": "#c4c1d7"
  }, {
    "name": "Howell LLC",
    "code": "#025a1c"
  }, {
    "name": "Ryan, Mante and Harris",
    "code": "#d55664"
  }, {
    "name": "Stamm, Pouros and Abbott",
    "code": "#e0cac7"
  }, {
    "name": "Greenfelder Group",
    "code": "#b06ef9"
  }, {
    "name": "Krajcik and Sons",
    "code": "#1eae29"
  }, {
    "name": "Kris, Marks and Schuppe",
    "code": "#ad02f5"
  }, {
    "name": "Kirlin-Nikolaus",
    "code": "#9e913a"
  }, {
    "name": "Botsford-Dickinson",
    "code": "#e82a61"
  }, {
    "name": "Hagenes, Raynor and Hintz",
    "code": "#11d371"
  }, {
    "name": "Kris LLC",
    "code": "#41f765"
  }, {
    "name": "Zieme-Jones",
    "code": "#14f4b7"
  }, {
    "name": "Collier, White and Langworth",
    "code": "#18ece5"
  }, {
    "name": "Zboncak-Herman",
    "code": "#532e17"
  }, {
    "name": "Macejkovic-Auer",
    "code": "#d34503"
  }, {
    "name": "Leuschke Inc",
    "code": "#50f1b8"
  }, {
    "name": "Kassulke Group",
    "code": "#246deb"
  }, {
    "name": "Jacobi, Boyle and Hane",
    "code": "#329aa8"
  }, {
    "name": "Baumbach, Ward and Weber",
    "code": "#e60811"
  }, {
    "name": "Osinski, Beier and Yundt",
    "code": "#5e3597"
  }, {
    "name": "Osinski Inc",
    "code": "#4c1528"
  }, {
    "name": "Hayes-Kshlerin",
    "code": "#871782"
  }, {
    "name": "Runte Group",
    "code": "#aa49b8"
  }, {
    "name": "Mosciski Inc",
    "code": "#bfd4e0"
  }, {
    "name": "Sauer, Hackett and Kub",
    "code": "#7ddfc8"
  }, {
    "name": "Jones-Anderson",
    "code": "#e66ec7"
  }, {
    "name": "Huels Inc",
    "code": "#83b9ec"
  }, {
    "name": "Konopelski-Dicki",
    "code": "#6a3b4c"
  }, {
    "name": "O'Reilly, Schultz and Sawayn",
    "code": "#52bede"
  }, {
    "name": "Greenfelder Inc",
    "code": "#46ec66"
  }, {
    "name": "Beahan Inc",
    "code": "#d0c015"
  }, {
    "name": "Wintheiser LLC",
    "code": "#a67e17"
  }, {
    "name": "Bradtke-Abbott",
    "code": "#ab9b5e"
  }, {
    "name": "Davis-Predovic",
    "code": "#98a981"
  }, {
    "name": "Heathcote, Bergstrom and Spinka",
    "code": "#80de5c"
  }, {
    "name": "Ankunding, Fritsch and Cormier",
    "code": "#e9712a"
  }, {
    "name": "Mueller-Buckridge",
    "code": "#d0d362"
  }, {
    "name": "Cormier Group",
    "code": "#4e0cb7"
  }, {
    "name": "White Group",
    "code": "#69ccf6"
  }, {
    "name": "Wiegand, Lesch and Hansen",
    "code": "#99f367"
  }, {
    "name": "Howe-Wilderman",
    "code": "#e81db8"
  }, {
    "name": "Vandervort-Weimann",
    "code": "#c9e6be"
  }, {
    "name": "Homenick-Nienow",
    "code": "#e672be"
  },{
    "name": "Stamm LLC",
    "code": "#16ab75"
  }, {
    "name": "Lebsack-Sipes",
    "code": "#496d41"
  }, {
    "name": "Goodwin Inc",
    "code": "#82e5ef"
  }, {
    "name": "Prohaska LLC",
    "code": "#f369b7"
  }, {
    "name": "Hodkiewicz, Buckridge and Gleason",
    "code": "#72be52"
  }, {
    "name": "Barton-Schumm",
    "code": "#c05648"
  }, {
    "name": "McDermott-Reichert",
    "code": "#e7e190"
  }, {
    "name": "Dach-Leannon",
    "code": "#09fe9d"
  }, {
    "name": "Miller-Lowe",
    "code": "#29f933"
  }, {
    "name": "Schulist, Morissette and Dietrich",
    "code": "#ddaa60"
  }, {
    "name": "Crona-Murray",
    "code": "#728ad6"
  }, {
    "name": "Ullrich, Daniel and Pollich",
    "code": "#846e5d"
  }, {
    "name": "Parker and Sons",
    "code": "#6591c2"
  }, {
    "name": "Raynor-Abernathy",
    "code": "#935e13"
  }, {
    "name": "Moen-Toy",
    "code": "#7c94a7"
  }, {
    "name": "Botsford, Schimmel and Reichert",
    "code": "#bbe99c"
  }, {
    "name": "Macejkovic-Hickle",
    "code": "#997119"
  }, {
    "name": "Stracke, Kautzer and Gutkowski",
    "code": "#5eec3d"
  }, {
    "name": "Beier Group",
    "code": "#551f89"
  }, {
    "name": "Gibson, Aufderhar and Boyer",
    "code": "#c75804"
  }, {
    "name": "Roob-Lubowitz",
    "code": "#6b5407"
  }, {
    "name": "Williamson-Balistreri",
    "code": "#d74795"
  }, {
    "name": "Gleason Inc",
    "code": "#b0def3"
  }, {
    "name": "Treutel and Sons",
    "code": "#3d5cd7"
  }, {
    "name": "Jast Group",
    "code": "#378660"
  }, {
    "name": "Miller-Friesen",
    "code": "#b08dc7"
  }, {
    "name": "Breitenberg, Collins and Wilkinson",
    "code": "#ba4a93"
  }, {
    "name": "Yost LLC",
    "code": "#d220c5"
  }, {
    "name": "Hammes Group",
    "code": "#fc96f3"
  }, {
    "name": "Reinger Group",
    "code": "#0321df"
  }, {
    "name": "Schoen, Russel and Willms",
    "code": "#691c43"
  }, {
    "name": "Legros Group",
    "code": "#a05079"
  }, {
    "name": "Abbott LLC",
    "code": "#a36ace"
  }, {
    "name": "West, Frami and Schmitt",
    "code": "#538570"
  }, {
    "name": "Bogisich Inc",
    "code": "#af58c6"
  }, {
    "name": "Windler-Kunde",
    "code": "#91d6eb"
  }, {
    "name": "Rowe, Homenick and Thompson",
    "code": "#888f69"
  }, {
    "name": "Shanahan-White",
    "code": "#f8080f"
  }, {
    "name": "Welch-Littel",
    "code": "#d9e9f7"
  }, {
    "name": "Wehner LLC",
    "code": "#5d00a3"
  }, {
    "name": "Weimann-McGlynn",
    "code": "#49357e"
  }, {
    "name": "Block-Pacocha",
    "code": "#699c66"
  }, {
    "name": "Hauck, Gorczany and Fadel",
    "code": "#6df749"
  }, {
    "name": "Abernathy Inc",
    "code": "#d0a9e3"
  }, {
    "name": "Buckridge-Crooks",
    "code": "#e9a813"
  }, {
    "name": "Balistreri-Keebler",
    "code": "#06e7f1"
  }, {
    "name": "Green, Koch and Hackett",
    "code": "#75b9f3"
  }, {
    "name": "Koelpin Inc",
    "code": "#2ee3ef"
  }, {
    "name": "Wintheiser LLC",
    "code": "#e88e03"
  }, {
    "name": "Kautzer Group",
    "code": "#f100a7"
  }, {
    "name": "Rau, Crona and Skiles",
    "code": "#f3c83d"
  }, {
    "name": "Klocko-Keebler",
    "code": "#002499"
  }, {
    "name": "Hammes-Ebert",
    "code": "#d7d875"
  }, {
    "name": "Medhurst, Kuphal and Leannon",
    "code": "#ab7fb3"
  }, {
    "name": "Hane LLC",
    "code": "#370bc3"
  }, {
    "name": "Kassulke, Effertz and Heller",
    "code": "#118b18"
  }, {
    "name": "Funk, Cronin and Kshlerin",
    "code": "#037228"
  }, {
    "name": "Denesik-Waters",
    "code": "#c4c1d7"
  }, {
    "name": "Howell LLC",
    "code": "#025a1c"
  }, {
    "name": "Ryan, Mante and Harris",
    "code": "#d55664"
  }, {
    "name": "Stamm, Pouros and Abbott",
    "code": "#e0cac7"
  }, {
    "name": "Greenfelder Group",
    "code": "#b06ef9"
  }, {
    "name": "Krajcik and Sons",
    "code": "#1eae29"
  }, {
    "name": "Kris, Marks and Schuppe",
    "code": "#ad02f5"
  }, {
    "name": "Kirlin-Nikolaus",
    "code": "#9e913a"
  }, {
    "name": "Botsford-Dickinson",
    "code": "#e82a61"
  }, {
    "name": "Hagenes, Raynor and Hintz",
    "code": "#11d371"
  }, {
    "name": "Kris LLC",
    "code": "#41f765"
  }, {
    "name": "Zieme-Jones",
    "code": "#14f4b7"
  }, {
    "name": "Collier, White and Langworth",
    "code": "#18ece5"
  }, {
    "name": "Zboncak-Herman",
    "code": "#532e17"
  }, {
    "name": "Macejkovic-Auer",
    "code": "#d34503"
  }, {
    "name": "Leuschke Inc",
    "code": "#50f1b8"
  }, {
    "name": "Kassulke Group",
    "code": "#246deb"
  }, {
    "name": "Jacobi, Boyle and Hane",
    "code": "#329aa8"
  }, {
    "name": "Baumbach, Ward and Weber",
    "code": "#e60811"
  }, {
    "name": "Osinski, Beier and Yundt",
    "code": "#5e3597"
  }, {
    "name": "Osinski Inc",
    "code": "#4c1528"
  }, {
    "name": "Hayes-Kshlerin",
    "code": "#871782"
  }, {
    "name": "Runte Group",
    "code": "#aa49b8"
  }, {
    "name": "Mosciski Inc",
    "code": "#bfd4e0"
  }, {
    "name": "Sauer, Hackett and Kub",
    "code": "#7ddfc8"
  }, {
    "name": "Jones-Anderson",
    "code": "#e66ec7"
  }, {
    "name": "Huels Inc",
    "code": "#83b9ec"
  }, {
    "name": "Konopelski-Dicki",
    "code": "#6a3b4c"
  }, {
    "name": "O'Reilly, Schultz and Sawayn",
    "code": "#52bede"
  }, {
    "name": "Greenfelder Inc",
    "code": "#46ec66"
  }, {
    "name": "Beahan Inc",
    "code": "#d0c015"
  }, {
    "name": "Wintheiser LLC",
    "code": "#a67e17"
  }, {
    "name": "Bradtke-Abbott",
    "code": "#ab9b5e"
  }, {
    "name": "Davis-Predovic",
    "code": "#98a981"
  }, {
    "name": "Heathcote, Bergstrom and Spinka",
    "code": "#80de5c"
  }, {
    "name": "Ankunding, Fritsch and Cormier",
    "code": "#e9712a"
  }, {
    "name": "Mueller-Buckridge",
    "code": "#d0d362"
  }, {
    "name": "Cormier Group",
    "code": "#4e0cb7"
  }, {
    "name": "White Group",
    "code": "#69ccf6"
  }, {
    "name": "Wiegand, Lesch and Hansen",
    "code": "#99f367"
  }, {
    "name": "Howe-Wilderman",
    "code": "#e81db8"
  }, {
    "name": "Vandervort-Weimann",
    "code": "#c9e6be"
  }, {
    "name": "Homenick-Nienow",
    "code": "#e672be"
  },{
    "name": "Stamm LLC",
    "code": "#16ab75"
  }, {
    "name": "Lebsack-Sipes",
    "code": "#496d41"
  }, {
    "name": "Goodwin Inc",
    "code": "#82e5ef"
  }, {
    "name": "Prohaska LLC",
    "code": "#f369b7"
  }, {
    "name": "Hodkiewicz, Buckridge and Gleason",
    "code": "#72be52"
  }, {
    "name": "Barton-Schumm",
    "code": "#c05648"
  }, {
    "name": "McDermott-Reichert",
    "code": "#e7e190"
  }, {
    "name": "Dach-Leannon",
    "code": "#09fe9d"
  }, {
    "name": "Miller-Lowe",
    "code": "#29f933"
  }, {
    "name": "Schulist, Morissette and Dietrich",
    "code": "#ddaa60"
  }, {
    "name": "Crona-Murray",
    "code": "#728ad6"
  }, {
    "name": "Ullrich, Daniel and Pollich",
    "code": "#846e5d"
  }, {
    "name": "Parker and Sons",
    "code": "#6591c2"
  }, {
    "name": "Raynor-Abernathy",
    "code": "#935e13"
  }, {
    "name": "Moen-Toy",
    "code": "#7c94a7"
  }, {
    "name": "Botsford, Schimmel and Reichert",
    "code": "#bbe99c"
  }, {
    "name": "Macejkovic-Hickle",
    "code": "#997119"
  }, {
    "name": "Stracke, Kautzer and Gutkowski",
    "code": "#5eec3d"
  }, {
    "name": "Beier Group",
    "code": "#551f89"
  }, {
    "name": "Gibson, Aufderhar and Boyer",
    "code": "#c75804"
  }, {
    "name": "Roob-Lubowitz",
    "code": "#6b5407"
  }, {
    "name": "Williamson-Balistreri",
    "code": "#d74795"
  }, {
    "name": "Gleason Inc",
    "code": "#b0def3"
  }, {
    "name": "Treutel and Sons",
    "code": "#3d5cd7"
  }, {
    "name": "Jast Group",
    "code": "#378660"
  }, {
    "name": "Miller-Friesen",
    "code": "#b08dc7"
  }, {
    "name": "Breitenberg, Collins and Wilkinson",
    "code": "#ba4a93"
  }, {
    "name": "Yost LLC",
    "code": "#d220c5"
  }, {
    "name": "Hammes Group",
    "code": "#fc96f3"
  }, {
    "name": "Reinger Group",
    "code": "#0321df"
  }, {
    "name": "Schoen, Russel and Willms",
    "code": "#691c43"
  }, {
    "name": "Legros Group",
    "code": "#a05079"
  }, {
    "name": "Abbott LLC",
    "code": "#a36ace"
  }, {
    "name": "West, Frami and Schmitt",
    "code": "#538570"
  }, {
    "name": "Bogisich Inc",
    "code": "#af58c6"
  }, {
    "name": "Windler-Kunde",
    "code": "#91d6eb"
  }, {
    "name": "Rowe, Homenick and Thompson",
    "code": "#888f69"
  }, {
    "name": "Shanahan-White",
    "code": "#f8080f"
  }, {
    "name": "Welch-Littel",
    "code": "#d9e9f7"
  }, {
    "name": "Wehner LLC",
    "code": "#5d00a3"
  }, {
    "name": "Weimann-McGlynn",
    "code": "#49357e"
  }, {
    "name": "Block-Pacocha",
    "code": "#699c66"
  }, {
    "name": "Hauck, Gorczany and Fadel",
    "code": "#6df749"
  }, {
    "name": "Abernathy Inc",
    "code": "#d0a9e3"
  }, {
    "name": "Buckridge-Crooks",
    "code": "#e9a813"
  }, {
    "name": "Balistreri-Keebler",
    "code": "#06e7f1"
  }, {
    "name": "Green, Koch and Hackett",
    "code": "#75b9f3"
  }, {
    "name": "Koelpin Inc",
    "code": "#2ee3ef"
  }, {
    "name": "Wintheiser LLC",
    "code": "#e88e03"
  }, {
    "name": "Kautzer Group",
    "code": "#f100a7"
  }, {
    "name": "Rau, Crona and Skiles",
    "code": "#f3c83d"
  }, {
    "name": "Klocko-Keebler",
    "code": "#002499"
  }, {
    "name": "Hammes-Ebert",
    "code": "#d7d875"
  }, {
    "name": "Medhurst, Kuphal and Leannon",
    "code": "#ab7fb3"
  }, {
    "name": "Hane LLC",
    "code": "#370bc3"
  }, {
    "name": "Kassulke, Effertz and Heller",
    "code": "#118b18"
  }, {
    "name": "Funk, Cronin and Kshlerin",
    "code": "#037228"
  }, {
    "name": "Denesik-Waters",
    "code": "#c4c1d7"
  }, {
    "name": "Howell LLC",
    "code": "#025a1c"
  }, {
    "name": "Ryan, Mante and Harris",
    "code": "#d55664"
  }, {
    "name": "Stamm, Pouros and Abbott",
    "code": "#e0cac7"
  }, {
    "name": "Greenfelder Group",
    "code": "#b06ef9"
  }, {
    "name": "Krajcik and Sons",
    "code": "#1eae29"
  }, {
    "name": "Kris, Marks and Schuppe",
    "code": "#ad02f5"
  }, {
    "name": "Kirlin-Nikolaus",
    "code": "#9e913a"
  }, {
    "name": "Botsford-Dickinson",
    "code": "#e82a61"
  }, {
    "name": "Hagenes, Raynor and Hintz",
    "code": "#11d371"
  }, {
    "name": "Kris LLC",
    "code": "#41f765"
  }, {
    "name": "Zieme-Jones",
    "code": "#14f4b7"
  }, {
    "name": "Collier, White and Langworth",
    "code": "#18ece5"
  }, {
    "name": "Zboncak-Herman",
    "code": "#532e17"
  }, {
    "name": "Macejkovic-Auer",
    "code": "#d34503"
  }, {
    "name": "Leuschke Inc",
    "code": "#50f1b8"
  }, {
    "name": "Kassulke Group",
    "code": "#246deb"
  }, {
    "name": "Jacobi, Boyle and Hane",
    "code": "#329aa8"
  }, {
    "name": "Baumbach, Ward and Weber",
    "code": "#e60811"
  }, {
    "name": "Osinski, Beier and Yundt",
    "code": "#5e3597"
  }, {
    "name": "Osinski Inc",
    "code": "#4c1528"
  }, {
    "name": "Hayes-Kshlerin",
    "code": "#871782"
  }, {
    "name": "Runte Group",
    "code": "#aa49b8"
  }, {
    "name": "Mosciski Inc",
    "code": "#bfd4e0"
  }, {
    "name": "Sauer, Hackett and Kub",
    "code": "#7ddfc8"
  }, {
    "name": "Jones-Anderson",
    "code": "#e66ec7"
  }, {
    "name": "Huels Inc",
    "code": "#83b9ec"
  }, {
    "name": "Konopelski-Dicki",
    "code": "#6a3b4c"
  }, {
    "name": "O'Reilly, Schultz and Sawayn",
    "code": "#52bede"
  }, {
    "name": "Greenfelder Inc",
    "code": "#46ec66"
  }, {
    "name": "Beahan Inc",
    "code": "#d0c015"
  }, {
    "name": "Wintheiser LLC",
    "code": "#a67e17"
  }, {
    "name": "Bradtke-Abbott",
    "code": "#ab9b5e"
  }, {
    "name": "Davis-Predovic",
    "code": "#98a981"
  }, {
    "name": "Heathcote, Bergstrom and Spinka",
    "code": "#80de5c"
  }, {
    "name": "Ankunding, Fritsch and Cormier",
    "code": "#e9712a"
  }, {
    "name": "Mueller-Buckridge",
    "code": "#d0d362"
  }, {
    "name": "Cormier Group",
    "code": "#4e0cb7"
  }, {
    "name": "White Group",
    "code": "#69ccf6"
  }, {
    "name": "Wiegand, Lesch and Hansen",
    "code": "#99f367"
  }, {
    "name": "Howe-Wilderman",
    "code": "#e81db8"
  }, {
    "name": "Vandervort-Weimann",
    "code": "#c9e6be"
  }, {
    "name": "Homenick-Nienow",
    "code": "#e672be"
  },{
    "name": "Stamm LLC",
    "code": "#16ab75"
  }, {
    "name": "Lebsack-Sipes",
    "code": "#496d41"
  }, {
    "name": "Goodwin Inc",
    "code": "#82e5ef"
  }, {
    "name": "Prohaska LLC",
    "code": "#f369b7"
  }, {
    "name": "Hodkiewicz, Buckridge and Gleason",
    "code": "#72be52"
  }, {
    "name": "Barton-Schumm",
    "code": "#c05648"
  }, {
    "name": "McDermott-Reichert",
    "code": "#e7e190"
  }, {
    "name": "Dach-Leannon",
    "code": "#09fe9d"
  }, {
    "name": "Miller-Lowe",
    "code": "#29f933"
  }, {
    "name": "Schulist, Morissette and Dietrich",
    "code": "#ddaa60"
  }, {
    "name": "Crona-Murray",
    "code": "#728ad6"
  }, {
    "name": "Ullrich, Daniel and Pollich",
    "code": "#846e5d"
  }, {
    "name": "Parker and Sons",
    "code": "#6591c2"
  }, {
    "name": "Raynor-Abernathy",
    "code": "#935e13"
  }, {
    "name": "Moen-Toy",
    "code": "#7c94a7"
  }, {
    "name": "Botsford, Schimmel and Reichert",
    "code": "#bbe99c"
  }, {
    "name": "Macejkovic-Hickle",
    "code": "#997119"
  }, {
    "name": "Stracke, Kautzer and Gutkowski",
    "code": "#5eec3d"
  }, {
    "name": "Beier Group",
    "code": "#551f89"
  }, {
    "name": "Gibson, Aufderhar and Boyer",
    "code": "#c75804"
  }, {
    "name": "Roob-Lubowitz",
    "code": "#6b5407"
  }, {
    "name": "Williamson-Balistreri",
    "code": "#d74795"
  }, {
    "name": "Gleason Inc",
    "code": "#b0def3"
  }, {
    "name": "Treutel and Sons",
    "code": "#3d5cd7"
  }, {
    "name": "Jast Group",
    "code": "#378660"
  }, {
    "name": "Miller-Friesen",
    "code": "#b08dc7"
  }, {
    "name": "Breitenberg, Collins and Wilkinson",
    "code": "#ba4a93"
  }, {
    "name": "Yost LLC",
    "code": "#d220c5"
  }, {
    "name": "Hammes Group",
    "code": "#fc96f3"
  }, {
    "name": "Reinger Group",
    "code": "#0321df"
  }, {
    "name": "Schoen, Russel and Willms",
    "code": "#691c43"
  }, {
    "name": "Legros Group",
    "code": "#a05079"
  }, {
    "name": "Abbott LLC",
    "code": "#a36ace"
  }, {
    "name": "West, Frami and Schmitt",
    "code": "#538570"
  }, {
    "name": "Bogisich Inc",
    "code": "#af58c6"
  }, {
    "name": "Windler-Kunde",
    "code": "#91d6eb"
  }, {
    "name": "Rowe, Homenick and Thompson",
    "code": "#888f69"
  }, {
    "name": "Shanahan-White",
    "code": "#f8080f"
  }, {
    "name": "Welch-Littel",
    "code": "#d9e9f7"
  }, {
    "name": "Wehner LLC",
    "code": "#5d00a3"
  }, {
    "name": "Weimann-McGlynn",
    "code": "#49357e"
  }, {
    "name": "Block-Pacocha",
    "code": "#699c66"
  }, {
    "name": "Hauck, Gorczany and Fadel",
    "code": "#6df749"
  }, {
    "name": "Abernathy Inc",
    "code": "#d0a9e3"
  }, {
    "name": "Buckridge-Crooks",
    "code": "#e9a813"
  }, {
    "name": "Balistreri-Keebler",
    "code": "#06e7f1"
  }, {
    "name": "Green, Koch and Hackett",
    "code": "#75b9f3"
  }, {
    "name": "Koelpin Inc",
    "code": "#2ee3ef"
  }, {
    "name": "Wintheiser LLC",
    "code": "#e88e03"
  }, {
    "name": "Kautzer Group",
    "code": "#f100a7"
  }, {
    "name": "Rau, Crona and Skiles",
    "code": "#f3c83d"
  }, {
    "name": "Klocko-Keebler",
    "code": "#002499"
  }, {
    "name": "Hammes-Ebert",
    "code": "#d7d875"
  }, {
    "name": "Medhurst, Kuphal and Leannon",
    "code": "#ab7fb3"
  }, {
    "name": "Hane LLC",
    "code": "#370bc3"
  }, {
    "name": "Kassulke, Effertz and Heller",
    "code": "#118b18"
  }, {
    "name": "Funk, Cronin and Kshlerin",
    "code": "#037228"
  }, {
    "name": "Denesik-Waters",
    "code": "#c4c1d7"
  }, {
    "name": "Howell LLC",
    "code": "#025a1c"
  }, {
    "name": "Ryan, Mante and Harris",
    "code": "#d55664"
  }, {
    "name": "Stamm, Pouros and Abbott",
    "code": "#e0cac7"
  }, {
    "name": "Greenfelder Group",
    "code": "#b06ef9"
  }, {
    "name": "Krajcik and Sons",
    "code": "#1eae29"
  }, {
    "name": "Kris, Marks and Schuppe",
    "code": "#ad02f5"
  }, {
    "name": "Kirlin-Nikolaus",
    "code": "#9e913a"
  }, {
    "name": "Botsford-Dickinson",
    "code": "#e82a61"
  }, {
    "name": "Hagenes, Raynor and Hintz",
    "code": "#11d371"
  }, {
    "name": "Kris LLC",
    "code": "#41f765"
  }, {
    "name": "Zieme-Jones",
    "code": "#14f4b7"
  }, {
    "name": "Collier, White and Langworth",
    "code": "#18ece5"
  }, {
    "name": "Zboncak-Herman",
    "code": "#532e17"
  }, {
    "name": "Macejkovic-Auer",
    "code": "#d34503"
  }, {
    "name": "Leuschke Inc",
    "code": "#50f1b8"
  }, {
    "name": "Kassulke Group",
    "code": "#246deb"
  }, {
    "name": "Jacobi, Boyle and Hane",
    "code": "#329aa8"
  }, {
    "name": "Baumbach, Ward and Weber",
    "code": "#e60811"
  }, {
    "name": "Osinski, Beier and Yundt",
    "code": "#5e3597"
  }, {
    "name": "Osinski Inc",
    "code": "#4c1528"
  }, {
    "name": "Hayes-Kshlerin",
    "code": "#871782"
  }, {
    "name": "Runte Group",
    "code": "#aa49b8"
  }, {
    "name": "Mosciski Inc",
    "code": "#bfd4e0"
  }, {
    "name": "Sauer, Hackett and Kub",
    "code": "#7ddfc8"
  }, {
    "name": "Jones-Anderson",
    "code": "#e66ec7"
  }, {
    "name": "Huels Inc",
    "code": "#83b9ec"
  }, {
    "name": "Konopelski-Dicki",
    "code": "#6a3b4c"
  }, {
    "name": "O'Reilly, Schultz and Sawayn",
    "code": "#52bede"
  }, {
    "name": "Greenfelder Inc",
    "code": "#46ec66"
  }, {
    "name": "Beahan Inc",
    "code": "#d0c015"
  }, {
    "name": "Wintheiser LLC",
    "code": "#a67e17"
  }, {
    "name": "Bradtke-Abbott",
    "code": "#ab9b5e"
  }, {
    "name": "Davis-Predovic",
    "code": "#98a981"
  }, {
    "name": "Heathcote, Bergstrom and Spinka",
    "code": "#80de5c"
  }, {
    "name": "Ankunding, Fritsch and Cormier",
    "code": "#e9712a"
  }, {
    "name": "Mueller-Buckridge",
    "code": "#d0d362"
  }, {
    "name": "Cormier Group",
    "code": "#4e0cb7"
  }, {
    "name": "White Group",
    "code": "#69ccf6"
  }, {
    "name": "Wiegand, Lesch and Hansen",
    "code": "#99f367"
  }, {
    "name": "Howe-Wilderman",
    "code": "#e81db8"
  }, {
    "name": "Vandervort-Weimann",
    "code": "#c9e6be"
  }, {
    "name": "Homenick-Nienow",
    "code": "#e672be"
  },{
    "name": "Stamm LLC",
    "code": "#16ab75"
  }, {
    "name": "Lebsack-Sipes",
    "code": "#496d41"
  }, {
    "name": "Goodwin Inc",
    "code": "#82e5ef"
  }, {
    "name": "Prohaska LLC",
    "code": "#f369b7"
  }, {
    "name": "Hodkiewicz, Buckridge and Gleason",
    "code": "#72be52"
  }, {
    "name": "Barton-Schumm",
    "code": "#c05648"
  }, {
    "name": "McDermott-Reichert",
    "code": "#e7e190"
  }, {
    "name": "Dach-Leannon",
    "code": "#09fe9d"
  }, {
    "name": "Miller-Lowe",
    "code": "#29f933"
  }, {
    "name": "Schulist, Morissette and Dietrich",
    "code": "#ddaa60"
  }, {
    "name": "Crona-Murray",
    "code": "#728ad6"
  }, {
    "name": "Ullrich, Daniel and Pollich",
    "code": "#846e5d"
  }, {
    "name": "Parker and Sons",
    "code": "#6591c2"
  }, {
    "name": "Raynor-Abernathy",
    "code": "#935e13"
  }, {
    "name": "Moen-Toy",
    "code": "#7c94a7"
  }, {
    "name": "Botsford, Schimmel and Reichert",
    "code": "#bbe99c"
  }, {
    "name": "Macejkovic-Hickle",
    "code": "#997119"
  }, {
    "name": "Stracke, Kautzer and Gutkowski",
    "code": "#5eec3d"
  }, {
    "name": "Beier Group",
    "code": "#551f89"
  }, {
    "name": "Gibson, Aufderhar and Boyer",
    "code": "#c75804"
  }, {
    "name": "Roob-Lubowitz",
    "code": "#6b5407"
  }, {
    "name": "Williamson-Balistreri",
    "code": "#d74795"
  }, {
    "name": "Gleason Inc",
    "code": "#b0def3"
  }, {
    "name": "Treutel and Sons",
    "code": "#3d5cd7"
  }, {
    "name": "Jast Group",
    "code": "#378660"
  }, {
    "name": "Miller-Friesen",
    "code": "#b08dc7"
  }, {
    "name": "Breitenberg, Collins and Wilkinson",
    "code": "#ba4a93"
  }, {
    "name": "Yost LLC",
    "code": "#d220c5"
  }, {
    "name": "Hammes Group",
    "code": "#fc96f3"
  }, {
    "name": "Reinger Group",
    "code": "#0321df"
  }, {
    "name": "Schoen, Russel and Willms",
    "code": "#691c43"
  }, {
    "name": "Legros Group",
    "code": "#a05079"
  }, {
    "name": "Abbott LLC",
    "code": "#a36ace"
  }, {
    "name": "West, Frami and Schmitt",
    "code": "#538570"
  }, {
    "name": "Bogisich Inc",
    "code": "#af58c6"
  }, {
    "name": "Windler-Kunde",
    "code": "#91d6eb"
  }, {
    "name": "Rowe, Homenick and Thompson",
    "code": "#888f69"
  }, {
    "name": "Shanahan-White",
    "code": "#f8080f"
  }, {
    "name": "Welch-Littel",
    "code": "#d9e9f7"
  }, {
    "name": "Wehner LLC",
    "code": "#5d00a3"
  }, {
    "name": "Weimann-McGlynn",
    "code": "#49357e"
  }, {
    "name": "Block-Pacocha",
    "code": "#699c66"
  }, {
    "name": "Hauck, Gorczany and Fadel",
    "code": "#6df749"
  }, {
    "name": "Abernathy Inc",
    "code": "#d0a9e3"
  }, {
    "name": "Buckridge-Crooks",
    "code": "#e9a813"
  }, {
    "name": "Balistreri-Keebler",
    "code": "#06e7f1"
  }, {
    "name": "Green, Koch and Hackett",
    "code": "#75b9f3"
  }, {
    "name": "Koelpin Inc",
    "code": "#2ee3ef"
  }, {
    "name": "Wintheiser LLC",
    "code": "#e88e03"
  }, {
    "name": "Kautzer Group",
    "code": "#f100a7"
  }, {
    "name": "Rau, Crona and Skiles",
    "code": "#f3c83d"
  }, {
    "name": "Klocko-Keebler",
    "code": "#002499"
  }, {
    "name": "Hammes-Ebert",
    "code": "#d7d875"
  }, {
    "name": "Medhurst, Kuphal and Leannon",
    "code": "#ab7fb3"
  }, {
    "name": "Hane LLC",
    "code": "#370bc3"
  }, {
    "name": "Kassulke, Effertz and Heller",
    "code": "#118b18"
  }, {
    "name": "Funk, Cronin and Kshlerin",
    "code": "#037228"
  }, {
    "name": "Denesik-Waters",
    "code": "#c4c1d7"
  }, {
    "name": "Howell LLC",
    "code": "#025a1c"
  }, {
    "name": "Ryan, Mante and Harris",
    "code": "#d55664"
  }, {
    "name": "Stamm, Pouros and Abbott",
    "code": "#e0cac7"
  }, {
    "name": "Greenfelder Group",
    "code": "#b06ef9"
  }, {
    "name": "Krajcik and Sons",
    "code": "#1eae29"
  }, {
    "name": "Kris, Marks and Schuppe",
    "code": "#ad02f5"
  }, {
    "name": "Kirlin-Nikolaus",
    "code": "#9e913a"
  }, {
    "name": "Botsford-Dickinson",
    "code": "#e82a61"
  }, {
    "name": "Hagenes, Raynor and Hintz",
    "code": "#11d371"
  }, {
    "name": "Kris LLC",
    "code": "#41f765"
  }, {
    "name": "Zieme-Jones",
    "code": "#14f4b7"
  }, {
    "name": "Collier, White and Langworth",
    "code": "#18ece5"
  }, {
    "name": "Zboncak-Herman",
    "code": "#532e17"
  }, {
    "name": "Macejkovic-Auer",
    "code": "#d34503"
  }, {
    "name": "Leuschke Inc",
    "code": "#50f1b8"
  }, {
    "name": "Kassulke Group",
    "code": "#246deb"
  }, {
    "name": "Jacobi, Boyle and Hane",
    "code": "#329aa8"
  }, {
    "name": "Baumbach, Ward and Weber",
    "code": "#e60811"
  }, {
    "name": "Osinski, Beier and Yundt",
    "code": "#5e3597"
  }, {
    "name": "Osinski Inc",
    "code": "#4c1528"
  }, {
    "name": "Hayes-Kshlerin",
    "code": "#871782"
  }, {
    "name": "Runte Group",
    "code": "#aa49b8"
  }, {
    "name": "Mosciski Inc",
    "code": "#bfd4e0"
  }, {
    "name": "Sauer, Hackett and Kub",
    "code": "#7ddfc8"
  }, {
    "name": "Jones-Anderson",
    "code": "#e66ec7"
  }, {
    "name": "Huels Inc",
    "code": "#83b9ec"
  }, {
    "name": "Konopelski-Dicki",
    "code": "#6a3b4c"
  }, {
    "name": "O'Reilly, Schultz and Sawayn",
    "code": "#52bede"
  }, {
    "name": "Greenfelder Inc",
    "code": "#46ec66"
  }, {
    "name": "Beahan Inc",
    "code": "#d0c015"
  }, {
    "name": "Wintheiser LLC",
    "code": "#a67e17"
  }, {
    "name": "Bradtke-Abbott",
    "code": "#ab9b5e"
  }, {
    "name": "Davis-Predovic",
    "code": "#98a981"
  }, {
    "name": "Heathcote, Bergstrom and Spinka",
    "code": "#80de5c"
  }, {
    "name": "Ankunding, Fritsch and Cormier",
    "code": "#e9712a"
  }, {
    "name": "Mueller-Buckridge",
    "code": "#d0d362"
  }, {
    "name": "Cormier Group",
    "code": "#4e0cb7"
  }, {
    "name": "White Group",
    "code": "#69ccf6"
  }, {
    "name": "Wiegand, Lesch and Hansen",
    "code": "#99f367"
  }, {
    "name": "Howe-Wilderman",
    "code": "#e81db8"
  }, {
    "name": "Vandervort-Weimann",
    "code": "#c9e6be"
  }, {
    "name": "Homenick-Nienow",
    "code": "#e672be"
  },{
    "name": "Stamm LLC",
    "code": "#16ab75"
  }, {
    "name": "Lebsack-Sipes",
    "code": "#496d41"
  }, {
    "name": "Goodwin Inc",
    "code": "#82e5ef"
  }, {
    "name": "Prohaska LLC",
    "code": "#f369b7"
  }, {
    "name": "Hodkiewicz, Buckridge and Gleason",
    "code": "#72be52"
  }, {
    "name": "Barton-Schumm",
    "code": "#c05648"
  }, {
    "name": "McDermott-Reichert",
    "code": "#e7e190"
  }, {
    "name": "Dach-Leannon",
    "code": "#09fe9d"
  }, {
    "name": "Miller-Lowe",
    "code": "#29f933"
  }, {
    "name": "Schulist, Morissette and Dietrich",
    "code": "#ddaa60"
  }, {
    "name": "Crona-Murray",
    "code": "#728ad6"
  }, {
    "name": "Ullrich, Daniel and Pollich",
    "code": "#846e5d"
  }, {
    "name": "Parker and Sons",
    "code": "#6591c2"
  }, {
    "name": "Raynor-Abernathy",
    "code": "#935e13"
  }, {
    "name": "Moen-Toy",
    "code": "#7c94a7"
  }, {
    "name": "Botsford, Schimmel and Reichert",
    "code": "#bbe99c"
  }, {
    "name": "Macejkovic-Hickle",
    "code": "#997119"
  }, {
    "name": "Stracke, Kautzer and Gutkowski",
    "code": "#5eec3d"
  }, {
    "name": "Beier Group",
    "code": "#551f89"
  }, {
    "name": "Gibson, Aufderhar and Boyer",
    "code": "#c75804"
  }, {
    "name": "Roob-Lubowitz",
    "code": "#6b5407"
  }, {
    "name": "Williamson-Balistreri",
    "code": "#d74795"
  }, {
    "name": "Gleason Inc",
    "code": "#b0def3"
  }, {
    "name": "Treutel and Sons",
    "code": "#3d5cd7"
  }, {
    "name": "Jast Group",
    "code": "#378660"
  }, {
    "name": "Miller-Friesen",
    "code": "#b08dc7"
  }, {
    "name": "Breitenberg, Collins and Wilkinson",
    "code": "#ba4a93"
  }, {
    "name": "Yost LLC",
    "code": "#d220c5"
  }, {
    "name": "Hammes Group",
    "code": "#fc96f3"
  }, {
    "name": "Reinger Group",
    "code": "#0321df"
  }, {
    "name": "Schoen, Russel and Willms",
    "code": "#691c43"
  }, {
    "name": "Legros Group",
    "code": "#a05079"
  }, {
    "name": "Abbott LLC",
    "code": "#a36ace"
  }, {
    "name": "West, Frami and Schmitt",
    "code": "#538570"
  }, {
    "name": "Bogisich Inc",
    "code": "#af58c6"
  }, {
    "name": "Windler-Kunde",
    "code": "#91d6eb"
  }, {
    "name": "Rowe, Homenick and Thompson",
    "code": "#888f69"
  }, {
    "name": "Shanahan-White",
    "code": "#f8080f"
  }, {
    "name": "Welch-Littel",
    "code": "#d9e9f7"
  }, {
    "name": "Wehner LLC",
    "code": "#5d00a3"
  }, {
    "name": "Weimann-McGlynn",
    "code": "#49357e"
  }, {
    "name": "Block-Pacocha",
    "code": "#699c66"
  }, {
    "name": "Hauck, Gorczany and Fadel",
    "code": "#6df749"
  }, {
    "name": "Abernathy Inc",
    "code": "#d0a9e3"
  }, {
    "name": "Buckridge-Crooks",
    "code": "#e9a813"
  }, {
    "name": "Balistreri-Keebler",
    "code": "#06e7f1"
  }, {
    "name": "Green, Koch and Hackett",
    "code": "#75b9f3"
  }, {
    "name": "Koelpin Inc",
    "code": "#2ee3ef"
  }, {
    "name": "Wintheiser LLC",
    "code": "#e88e03"
  }, {
    "name": "Kautzer Group",
    "code": "#f100a7"
  }, {
    "name": "Rau, Crona and Skiles",
    "code": "#f3c83d"
  }, {
    "name": "Klocko-Keebler",
    "code": "#002499"
  }, {
    "name": "Hammes-Ebert",
    "code": "#d7d875"
  }, {
    "name": "Medhurst, Kuphal and Leannon",
    "code": "#ab7fb3"
  }, {
    "name": "Hane LLC",
    "code": "#370bc3"
  }, {
    "name": "Kassulke, Effertz and Heller",
    "code": "#118b18"
  }, {
    "name": "Funk, Cronin and Kshlerin",
    "code": "#037228"
  }, {
    "name": "Denesik-Waters",
    "code": "#c4c1d7"
  }, {
    "name": "Howell LLC",
    "code": "#025a1c"
  }, {
    "name": "Ryan, Mante and Harris",
    "code": "#d55664"
  }, {
    "name": "Stamm, Pouros and Abbott",
    "code": "#e0cac7"
  }, {
    "name": "Greenfelder Group",
    "code": "#b06ef9"
  }, {
    "name": "Krajcik and Sons",
    "code": "#1eae29"
  }, {
    "name": "Kris, Marks and Schuppe",
    "code": "#ad02f5"
  }, {
    "name": "Kirlin-Nikolaus",
    "code": "#9e913a"
  }, {
    "name": "Botsford-Dickinson",
    "code": "#e82a61"
  }, {
    "name": "Hagenes, Raynor and Hintz",
    "code": "#11d371"
  }, {
    "name": "Kris LLC",
    "code": "#41f765"
  }, {
    "name": "Zieme-Jones",
    "code": "#14f4b7"
  }, {
    "name": "Collier, White and Langworth",
    "code": "#18ece5"
  }, {
    "name": "Zboncak-Herman",
    "code": "#532e17"
  }, {
    "name": "Macejkovic-Auer",
    "code": "#d34503"
  }, {
    "name": "Leuschke Inc",
    "code": "#50f1b8"
  }, {
    "name": "Kassulke Group",
    "code": "#246deb"
  }, {
    "name": "Jacobi, Boyle and Hane",
    "code": "#329aa8"
  }, {
    "name": "Baumbach, Ward and Weber",
    "code": "#e60811"
  }, {
    "name": "Osinski, Beier and Yundt",
    "code": "#5e3597"
  }, {
    "name": "Osinski Inc",
    "code": "#4c1528"
  }, {
    "name": "Hayes-Kshlerin",
    "code": "#871782"
  }, {
    "name": "Runte Group",
    "code": "#aa49b8"
  }, {
    "name": "Mosciski Inc",
    "code": "#bfd4e0"
  }, {
    "name": "Sauer, Hackett and Kub",
    "code": "#7ddfc8"
  }, {
    "name": "Jones-Anderson",
    "code": "#e66ec7"
  }, {
    "name": "Huels Inc",
    "code": "#83b9ec"
  }, {
    "name": "Konopelski-Dicki",
    "code": "#6a3b4c"
  }, {
    "name": "O'Reilly, Schultz and Sawayn",
    "code": "#52bede"
  }, {
    "name": "Greenfelder Inc",
    "code": "#46ec66"
  }, {
    "name": "Beahan Inc",
    "code": "#d0c015"
  }, {
    "name": "Wintheiser LLC",
    "code": "#a67e17"
  }, {
    "name": "Bradtke-Abbott",
    "code": "#ab9b5e"
  }, {
    "name": "Davis-Predovic",
    "code": "#98a981"
  }, {
    "name": "Heathcote, Bergstrom and Spinka",
    "code": "#80de5c"
  }, {
    "name": "Ankunding, Fritsch and Cormier",
    "code": "#e9712a"
  }, {
    "name": "Mueller-Buckridge",
    "code": "#d0d362"
  }, {
    "name": "Cormier Group",
    "code": "#4e0cb7"
  }, {
    "name": "White Group",
    "code": "#69ccf6"
  }, {
    "name": "Wiegand, Lesch and Hansen",
    "code": "#99f367"
  }, {
    "name": "Howe-Wilderman",
    "code": "#e81db8"
  }, {
    "name": "Vandervort-Weimann",
    "code": "#c9e6be"
  }, {
    "name": "Homenick-Nienow",
    "code": "#e672be"
  },]

function Page() {
  return (
    <div>
      <QrCodeComponent data={jsonData} />
    </div>
  );
}

export default Page;
