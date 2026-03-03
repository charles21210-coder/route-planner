// ============================================
// ROUTE PLANNER - Main Application
// ============================================

// Known locations with approximate coordinates (lat, lng)
// These are the Belgian postal/logistics hubs from your data
const LOCATIONS = {
  "NEW BRU X": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "NEW ANTWERPEN X": { lat: 51.2194, lng: 4.4025, city: "Antwerp" },
  "NEW GENT X": { lat: 51.0543, lng: 3.7174, city: "Ghent" },
  "NEW LIEGE X": { lat: 50.6292, lng: 5.5797, city: "Liège" },
  "NEW CHARLEROI X": { lat: 50.4108, lng: 4.4446, city: "Charleroi" },
  "NAL": { lat: 50.9311, lng: 5.3325, city: "Hasselt area" },
  "BRUCARGO710 (VAS)": { lat: 50.9014, lng: 4.4844, city: "Zaventem" },
  "EMC BRUSSELS 3": { lat: 50.9014, lng: 4.4844, city: "Brussels EMC" },
  "EMC - BUILDING 709": { lat: 50.9014, lng: 4.4844, city: "Brussels EMC" },
  "AALST MAIL": { lat: 50.9364, lng: 4.0355, city: "Aalst" },
  "ANTWERPEN CENTRUM MAIL": { lat: 51.2211, lng: 4.3997, city: "Antwerp Centre" },
  "ANTWERPEN ZUID MAIL": { lat: 51.1965, lng: 4.3944, city: "Antwerp South" },
  "ARLON MAIL": { lat: 49.6833, lng: 5.8167, city: "Arlon" },
  "ATH MAIL": { lat: 50.6292, lng: 3.7786, city: "Ath" },
  "BASTOGNE MAIL": { lat: 50.0000, lng: 5.7167, city: "Bastogne" },
  "BEAUMONT MAIL": { lat: 50.2333, lng: 4.1000, city: "Beaumont" },
  "BEERSEL": { lat: 50.7667, lng: 4.3000, city: "Beersel" },
  "BEVEREN MAIL": { lat: 51.2117, lng: 4.2544, city: "Beveren" },
  "BOUSSU MAIL": { lat: 50.4333, lng: 3.8000, city: "Boussu" },
  "BRAINE-L'ALLEUD MAIL": { lat: 50.6833, lng: 4.3667, city: "Braine-l'Alleud" },
  "BRUGGE MAIL": { lat: 51.2093, lng: 3.2247, city: "Bruges" },
  "BRUXELLES NORD MAIL": { lat: 50.8603, lng: 4.3617, city: "Brussels North" },
  "CHARLEROI": { lat: 50.4108, lng: 4.4446, city: "Charleroi" },
  "DENDERMONDE MAIL": { lat: 51.0281, lng: 4.1014, city: "Dendermonde" },
  "DEURNE MAIL": { lat: 51.2117, lng: 4.4611, city: "Deurne" },
  "DIEST MAIL": { lat: 50.9875, lng: 5.0514, city: "Diest" },
  "DINANT MAIL": { lat: 50.2611, lng: 4.9122, city: "Dinant" },
  "EEKLO MAIL": { lat: 51.1867, lng: 3.5567, city: "Eeklo" },
  "GEEL MAIL": { lat: 51.1625, lng: 4.9897, city: "Geel" },
  "GENT MAIL": { lat: 51.0543, lng: 3.7174, city: "Ghent" },
  "GENK MAIL": { lat: 50.9650, lng: 5.5003, city: "Genk" },
  "GERAARDSBERGEN": { lat: 50.7706, lng: 3.8808, city: "Geraardsbergen" },
  "HASSELT MAIL": { lat: 50.9311, lng: 5.3378, city: "Hasselt" },
  "IEPER MAIL": { lat: 50.8514, lng: 2.8861, city: "Ypres" },
  "KORTRIJK MAIL": { lat: 50.8278, lng: 3.2650, city: "Kortrijk" },
  "LA LOUVIERE MAIL": { lat: 50.4789, lng: 4.1889, city: "La Louvière" },
  "LEUVEN MAIL": { lat: 50.8798, lng: 4.7005, city: "Leuven" },
  "LIBRAMONT-CHEVIGNY MAIL": { lat: 49.9206, lng: 5.3936, city: "Libramont" },
  "LIER MAIL": { lat: 51.1314, lng: 4.5697, city: "Lier" },
  "MECHELEN MAIL": { lat: 51.0259, lng: 4.4776, city: "Mechelen" },
  "MOL MAIL": { lat: 51.1894, lng: 5.1142, city: "Mol" },
  "MONS MAIL": { lat: 50.4542, lng: 3.9514, city: "Mons" },
  "NAMUR MAIL": { lat: 50.4669, lng: 4.8675, city: "Namur" },
  "NEW OOSTKAMP": { lat: 51.1539, lng: 3.2350, city: "Oostkamp" },
  "OOSTENDE MAIL": { lat: 51.2256, lng: 2.9175, city: "Ostend" },
  "OUDENAARDE MAIL": { lat: 50.8464, lng: 3.6067, city: "Oudenaarde" },
  "ROESELARE MAIL": { lat: 50.9444, lng: 3.1258, city: "Roeselare" },
  "SINT NIKLAAS MAIL": { lat: 51.1564, lng: 4.1431, city: "Sint-Niklaas" },
  "TIELT MAIL": { lat: 51.0000, lng: 3.3256, city: "Tielt" },
  "TIENEN MAIL": { lat: 50.8072, lng: 4.9381, city: "Tienen" },
  "TONGEREN MAIL": { lat: 50.7806, lng: 5.4644, city: "Tongeren" },
  "TOURNAI MAIL": { lat: 50.6050, lng: 3.3883, city: "Tournai" },
  "TURNHOUT MAIL": { lat: 51.3225, lng: 4.9481, city: "Turnhout" },
  "WAVRE MAIL": { lat: 50.7167, lng: 4.6000, city: "Wavre" },
  "ANDERLECHT OBX": { lat: 50.8333, lng: 4.3167, city: "Anderlecht" },
  "HAVENDOKLAAN": { lat: 50.8667, lng: 4.3500, city: "Brussels Port" },
  "NEW SCHAERBEEK": { lat: 50.8667, lng: 4.3833, city: "Schaerbeek" },
  "TERNAT MAIL": { lat: 50.8667, lng: 4.1667, city: "Ternat" },
  "ZAVENTEM MAIL": { lat: 50.8833, lng: 4.4667, city: "Zaventem" },
  "LAKEN MAIL": { lat: 50.8750, lng: 4.3500, city: "Laeken" },
  "MARCHE-EN-FAMENNE MAIL": { lat: 50.2264, lng: 5.3444, city: "Marche" },
  "MOUSCRON MAIL": { lat: 50.7394, lng: 3.2139, city: "Mouscron" },
  "SANKT VITH MAIL": { lat: 50.2833, lng: 6.1333, city: "Sankt Vith" },
  "VILLERS-LE-BOUILLET MAIL": { lat: 50.5833, lng: 5.2833, city: "Villers-le-Bouillet" },
  "SERAING MAIL": { lat: 50.5833, lng: 5.5000, city: "Seraing" },
  "SPRIMONT MAIL": { lat: 50.5000, lng: 5.6667, city: "Sprimont" },
  "WAREMME MAIL": { lat: 50.6944, lng: 5.2569, city: "Waremme" },
  "VISE MAIL": { lat: 50.7333, lng: 5.7000, city: "Visé" },
  "THIMISTER-CLERMONT MAIL": { lat: 50.6500, lng: 5.8500, city: "Thimister" },
  "LONTZEN MAIL": { lat: 50.7000, lng: 6.0000, city: "Lontzen" },

  // Additional locations from ROUTES_DATA
  "AALTER MAIL": { lat: 51.0767, lng: 3.4417, city: "Aalter" },
  "AARSCHOT MAIL": { lat: 50.9886, lng: 4.8297, city: "Aarschot" },
  "ACTO": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "AG INSURANCE": { lat: 50.8453, lng: 4.3569, city: "Brussels" },
  "ALLIANZ Belgium": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "ALTERNATE": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "AMP ARENDONK": { lat: 51.3219, lng: 5.0894, city: "Arendonk" },
  "AMP BRASSCHAAT": { lat: 51.2997, lng: 4.4917, city: "Brasschaat" },
  "AMP ESSEN": { lat: 51.4633, lng: 4.4681, city: "Essen" },
  "AMP GRACE-HOLLOGNE": { lat: 50.6233, lng: 5.5117, city: "Grâce-Hollogne" },
  "AMP HALLE BEERSEL": { lat: 50.7333, lng: 4.2333, city: "Halle-Beersel" },
  "AMP HEIST-OP-DEN-BERG": { lat: 51.0733, lng: 4.7317, city: "Heist-op-den-Berg" },
  "AMP HOUTDOK": { lat: 51.0683, lng: 3.7267, city: "Ghent Houtdok" },
  "AMP HUB BEERSEL": { lat: 50.7667, lng: 4.2833, city: "Beersel Hub" },
  "AMP HUB HAACHT": { lat: 50.9733, lng: 4.6317, city: "Haacht Hub" },
  "AMP KALMTHOUT": { lat: 51.3917, lng: 4.4600, city: "Kalmthout" },
  "AMP KAMP/HERENT": { lat: 50.9117, lng: 4.6800, city: "Herent" },
  "AMP LIER": { lat: 51.1314, lng: 4.5697, city: "Lier" },
  "AMP LONDERZEEL": { lat: 51.0117, lng: 4.3083, city: "Londerzeel" },
  "AMP OPWIJK MERCHTEM": { lat: 50.9417, lng: 4.2833, city: "Opwijk-Merchtem" },
  "AMP PUURS": { lat: 51.0717, lng: 4.2783, city: "Puurs" },
  "AMP RIJKEVORSEL": { lat: 51.3500, lng: 4.7767, city: "Rijkevorsel" },
  "AMP ROTSELAAR": { lat: 50.9667, lng: 4.7200, city: "Rotselaar" },
  "AMP VILVOORDE": { lat: 50.9317, lng: 4.4217, city: "Vilvoorde" },
  "AMP ZAVENTEM": { lat: 50.8833, lng: 4.4667, city: "Zaventem" },
  "ANTWERPEN LINKEROEVER MAIL": { lat: 51.2300, lng: 4.3833, city: "Antwerp Left Bank" },
  "ANZEGEM MAIL": { lat: 50.8317, lng: 3.4917, city: "Anzegem" },
  "ARENDONK MAIL": { lat: 51.3219, lng: 5.0894, city: "Arendonk" },
  "AS ADVENTURE": { lat: 51.1833, lng: 4.4167, city: "Antwerp" },
  "AS WATSON": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "AVEVE LEUVEN": { lat: 50.8798, lng: 4.7005, city: "Leuven" },
  "BEL&BO": { lat: 50.9333, lng: 3.8333, city: "Aalst area" },
  "BELOEIL MAIL": { lat: 50.5417, lng: 3.7317, city: "Beloeil" },
  "BILZEN MAIL": { lat: 50.8700, lng: 5.5117, city: "Bilzen" },
  "BINCHE MAIL": { lat: 50.4083, lng: 4.1683, city: "Binche" },
  "BLANKENBERGE MAIL": { lat: 51.3117, lng: 3.1317, city: "Blankenberge" },
  "BOCHOLT MAIL": { lat: 51.1683, lng: 5.5700, city: "Bocholt" },
  "BOES": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "BOL.COM(PAKKETWEG)": { lat: 51.1933, lng: 4.3950, city: "Antwerp" },
  "BOUILLON MAIL": { lat: 49.7983, lng: 5.0683, city: "Bouillon" },
  "BRAKEL MAIL": { lat: 50.7783, lng: 3.7567, city: "Brakel" },
  "BRASSCHAAT MAIL": { lat: 51.2997, lng: 4.4917, city: "Brasschaat" },
  "BREE MAIL": { lat: 51.1433, lng: 5.5983, city: "Bree" },
  "BUGGENHOUT MAIL": { lat: 51.0083, lng: 4.2000, city: "Buggenhout" },
  "BUROMAC NV": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "Belfius": { lat: 50.8453, lng: 4.3569, city: "Brussels" },
  "CAIROX Belgium": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "CAMBIER": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "CARDS ENCODING COMPANY": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "CEVA LOGISTICS": { lat: 50.9014, lng: 4.4844, city: "Zaventem" },
  "CHIMAY MAIL": { lat: 50.0483, lng: 4.3183, city: "Chimay" },
  "COLISSIMO FR": { lat: 50.9014, lng: 4.4844, city: "Brussels Airport" },
  "COMINES MAIL": { lat: 50.7617, lng: 3.0100, city: "Comines" },
  "CONSEIL DE LA COMMUNAUTE FRANCOPHONE": { lat: 50.8453, lng: 4.3569, city: "Brussels" },
  "COURCELLES MAIL": { lat: 50.4683, lng: 4.3683, city: "Courcelles" },
  "COUVIN MAIL": { lat: 50.0517, lng: 4.4983, city: "Couvin" },
  "CTR DIST Tim Jemelle": { lat: 50.1183, lng: 5.2217, city: "Jemelle" },
  "CYCLEON DB FLEXIBLE LOGISTICS": { lat: 50.9014, lng: 4.4844, city: "Zaventem" },
  "Crelan - BERCHEM": { lat: 51.1983, lng: 4.4283, city: "Berchem-Antwerp" },
  "D M S B": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "D&L PRODUCTS": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "DDC SCAN": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "DE BRUG": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "DE DUIF": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "DEINZE MAIL": { lat: 50.9817, lng: 3.5317, city: "Deinze" },
  "DEP TEXTIL JEMELLE": { lat: 50.1183, lng: 5.2217, city: "Jemelle" },
  "DEPOT Jemelle": { lat: 50.1183, lng: 5.2217, city: "Jemelle" },
  "DIKSMUIDE MAIL": { lat: 50.9883, lng: 2.8650, city: "Diksmuide" },
  "DILSEN-STOKKEM MAIL": { lat: 51.0183, lng: 5.7183, city: "Dilsen-Stokkem" },
  "DISTRICOS": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "DOCUFAST": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "DPD VILVOORDE": { lat: 50.9317, lng: 4.4217, city: "Vilvoorde" },
  "DREAMBABY": { lat: 50.9014, lng: 4.4844, city: "Zaventem" },
  "DRUKKERIJ GEERS": { lat: 51.0483, lng: 3.7183, city: "Ghent" },
  "DYNA BOOM": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "EASY CLOTHES": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "ELEKTRON": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "ELLE MILLA": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "ESSEN MAIL": { lat: 51.4633, lng: 4.4681, city: "Essen" },
  "EUROPESE UNIE": { lat: 50.8403, lng: 4.3683, city: "Brussels EU Quarter" },
  "EXTERIOO": { lat: 50.8333, lng: 3.3467, city: "Wielsbeke" },
  "FARCIENNES MAIL": { lat: 50.4183, lng: 4.5483, city: "Farciennes" },
  "FLEURUS MAIL": { lat: 50.4717, lng: 4.5583, city: "Fleurus" },
  "FM WASSERIJ": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "FOD ECONOMIE-KMO-MIDDENSTAND-ENERGIE (BLV ALBII)": { lat: 50.8453, lng: 4.3569, city: "Brussels" },
  "FOD FINANCIEN - BELASTINGEN": { lat: 50.8453, lng: 4.3569, city: "Brussels" },
  "FOD FINANCIEN - GALAXY": { lat: 50.8453, lng: 4.3569, city: "Brussels" },
  "FOD MOBILITEIT(CITY ATRIUM)": { lat: 50.8453, lng: 4.3569, city: "Brussels" },
  "GAR. LIBRAMONT-CHEVIGNY (PARKING)": { lat: 49.9206, lng: 5.3936, city: "Libramont" },
  "GERPINNES MAIL": { lat: 50.3317, lng: 4.5017, city: "Gerpinnes" },
  "GILLY MAIL": { lat: 50.4283, lng: 4.4383, city: "Gilly" },
  "HAACHT MAIL": { lat: 50.9733, lng: 4.6317, city: "Haacht" },
  "HALEWIJN": { lat: 50.7467, lng: 3.2117, city: "Halewijn" },
  "HARELBEKE MAIL": { lat: 50.8567, lng: 3.3083, city: "Harelbeke" },
  "HEIST-OP-DEN-BERG MAIL": { lat: 51.0733, lng: 4.7317, city: "Heist-op-den-Berg" },
  "HERENT MAIL": { lat: 50.9117, lng: 4.6800, city: "Herent" },
  "HERNE MAIL": { lat: 50.7300, lng: 4.0317, city: "Herne" },
  "HERZELE MAIL": { lat: 50.8833, lng: 3.8883, city: "Herzele" },
  "HEUSDEN ZOLDER MAIL": { lat: 50.9017, lng: 5.2883, city: "Heusden-Zolder" },
  "HOEILAART MAIL": { lat: 50.7617, lng: 4.4617, city: "Hoeilaart" },
  "HOUTHALEN HELCHTEREN MAIL": { lat: 51.0183, lng: 5.3817, city: "Houthalen-Helchteren" },
  "HULDENBERG MAIL": { lat: 50.7183, lng: 4.5817, city: "Huldenberg" },
  "ICHTEGEM MAIL": { lat: 51.0583, lng: 3.0033, city: "Ichtegem" },
  "IDL NL": { lat: 51.2194, lng: 4.4025, city: "Antwerp" },
  "INGRAM BPOST WAREHOUSE": { lat: 50.9014, lng: 4.4844, city: "Zaventem" },
  "IPEX GROUP": { lat: 50.6317, lng: 5.5717, city: "Liège" },
  "IPEX LIEGE S.A.": { lat: 50.6317, lng: 5.5717, city: "Liège" },
  "IZEGEM MAIL": { lat: 50.9167, lng: 3.2133, city: "Izegem" },
  "JANSSENS FIELD": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "JEP": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "JODOIGNE MAIL": { lat: 50.7183, lng: 4.8683, city: "Jodoigne" },
  "KALMTHOUT MAIL": { lat: 51.3917, lng: 4.4600, city: "Kalmthout" },
  "KAMER VAN VOLKSVERTEGENWOORDIGERS": { lat: 50.8467, lng: 4.3617, city: "Brussels Parliament" },
  "KAMPENHOUT MAIL": { lat: 50.9617, lng: 4.5533, city: "Kampenhout" },
  "KAPELLEN MAIL": { lat: 51.3183, lng: 4.4283, city: "Kapellen" },
  "KEERBERGEN MAIL": { lat: 51.0083, lng: 4.6317, city: "Keerbergen" },
  "KINROOI MAIL": { lat: 51.1483, lng: 5.7483, city: "Kinrooi" },
  "KNOKKE HEIST MAIL": { lat: 51.3533, lng: 3.2983, city: "Knokke-Heist" },
  "KRANTENDEPOT LOKEREN": { lat: 51.1000, lng: 4.0000, city: "Lokeren" },
  "L'OUVROIR ETA": { lat: 50.4500, lng: 4.8667, city: "Namur area" },
  "LANAKEN MAIL": { lat: 50.8883, lng: 5.6383, city: "Lanaken" },
  "LANDEN MAIL": { lat: 50.7483, lng: 5.0817, city: "Landen" },
  "LASNE MAIL": { lat: 50.6500, lng: 4.5217, city: "Lasne" },
  "LEDEBERG MAIL": { lat: 51.0317, lng: 3.7617, city: "Ledeberg" },
  "LEGIO INT. P/A KATOENNATIE": { lat: 51.2217, lng: 4.3967, city: "Antwerp Port" },
  "LELEU GROUP (1785 BRUSSEGEM)": { lat: 50.9283, lng: 4.2817, city: "Brussegem" },
  "LEUZE-EN-HAINAUT MAIL": { lat: 50.5983, lng: 3.6167, city: "Leuze-en-Hainaut" },
  "LIEGE RIVE GAUCHE MAIL": { lat: 50.6383, lng: 5.5483, city: "Liège Rive Gauche" },
  "LINEA 2000 - DOMO Elektro": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "LOCHRISTI MAIL": { lat: 51.1017, lng: 3.8300, city: "Lochristi" },
  "LOKEREN MAIL": { lat: 51.1000, lng: 4.0000, city: "Lokeren" },
  "LOMMEL MAIL": { lat: 51.2317, lng: 5.3133, city: "Lommel" },
  "LUMINUS": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "LUMMEN MAIL": { lat: 50.9883, lng: 5.1983, city: "Lummen" },
  "MALDEGEM MAIL": { lat: 51.2083, lng: 3.4383, city: "Maldegem" },
  "MARIAKERKE MAIL": { lat: 51.0733, lng: 3.6900, city: "Mariakerke" },
  "MARKO-SANDRINE SRL": { lat: 50.4108, lng: 4.4446, city: "Charleroi" },
  "MARTIN MATHYS": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "MASSPOST MOUSCRON": { lat: 50.7394, lng: 3.2139, city: "Mouscron" },
  "MC CHARLEROI": { lat: 50.4108, lng: 4.4446, city: "Charleroi" },
  "MEDI MARKET": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "MEDINA/BENT": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "MEDIPOST": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "MEDISPHERE": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "MEISE MAIL": { lat: 50.9483, lng: 4.3300, city: "Meise" },
  "MERELBEKE MAIL": { lat: 51.0083, lng: 3.7583, city: "Merelbeke" },
  "MERKSEM MAIL": { lat: 51.2383, lng: 4.4383, city: "Merksem" },
  "MINISTERE DE LA COMMUNAUTE FRANCAISE (LAVALLEE.)": { lat: 50.8453, lng: 4.3569, city: "Brussels" },
  "MIRTO": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "MONDIAL RELAY HARNES": { lat: 50.4383, lng: 2.9133, city: "Harnes (FR)" },
  "Mondial Relay HEM": { lat: 50.6417, lng: 3.1867, city: "Hem (FR)" },
  "NEVELE MAIL": { lat: 51.0183, lng: 3.5700, city: "Nevele" },
  "NEW ANDENNE": { lat: 50.4883, lng: 5.0967, city: "Andenne" },
  "NEW MENEN": { lat: 50.8033, lng: 3.1183, city: "Menen" },
  "NEW PHARMA": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "NEW RIJKEVORSEL": { lat: 51.3500, lng: 4.7767, city: "Rijkevorsel" },
  "NEW T-CORE": { lat: 50.9014, lng: 4.4844, city: "Zaventem" },
  "NEW VEURNE": { lat: 51.0717, lng: 2.6617, city: "Veurne" },
  "NIJLEN MAIL": { lat: 51.1683, lng: 4.6583, city: "Nijlen" },
  "NIVELLES MAIL": { lat: 50.5983, lng: 4.3283, city: "Nivelles" },
  "OMNILEVEL": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "OOSTROZEBEKE MAIL": { lat: 50.9100, lng: 3.3683, city: "Oostrozebeke" },
  "OVERIJSE MAIL": { lat: 50.7717, lng: 4.5383, city: "Overijse" },
  "OVERPELT MAIL": { lat: 51.2017, lng: 5.4183, city: "Overpelt" },
  "PAC ANTWERPEN": { lat: 51.2194, lng: 4.4025, city: "Antwerp" },
  "PAULI-MAARTEN": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "PAUWELS": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "PC GENT": { lat: 51.0543, lng: 3.7174, city: "Ghent" },
  "PEER MAIL": { lat: 51.1317, lng: 5.4567, city: "Peer" },
  "PELCKMANS": { lat: 51.2717, lng: 4.7017, city: "Kapellen-Antwerp" },
  "PHILIPPEVILLE MAIL": { lat: 50.1983, lng: 4.5517, city: "Philippeville" },
  "PIT & PIT (HOOGSTRATEN)": { lat: 51.4000, lng: 4.7900, city: "Hoogstraten" },
  "POPERINGE MAIL": { lat: 50.8533, lng: 2.7267, city: "Poperinge" },
  "PRIK&TIK": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "PUURS MAIL": { lat: 51.0717, lng: 4.2783, city: "Puurs" },
  "RAVELS MAIL": { lat: 51.3717, lng: 5.0000, city: "Ravels" },
  "RIEMST MAIL": { lat: 50.8133, lng: 5.5983, city: "Riemst" },
  "RIXENSART MAIL": { lat: 50.7183, lng: 4.5183, city: "Rixensart" },
  "ROSSEL NIVELLES": { lat: 50.5983, lng: 4.3283, city: "Nivelles" },
  "ROULARTA": { lat: 50.8283, lng: 3.1283, city: "Roeselare" },
  "RUG CONCENTRA (PAAL)": { lat: 50.9683, lng: 5.1133, city: "Paal" },
  "SAINT-GHISLAIN MAIL": { lat: 50.4517, lng: 3.8183, city: "Saint-Ghislain" },
  "SAMBREVILLE MAIL": { lat: 50.4183, lng: 4.5917, city: "Sambreville" },
  "SCHOTEN MAIL": { lat: 51.2583, lng: 4.4983, city: "Schoten" },
  "SEEDS & BULBS": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "SENAAT": { lat: 50.8467, lng: 4.3617, city: "Brussels Senate" },
  "SENEFFE MAIL": { lat: 50.5383, lng: 4.2817, city: "Seneffe" },
  "SINT AMANDSBERG MAIL": { lat: 51.0683, lng: 3.7683, city: "Sint-Amandsberg" },
  "SINT KATELIJNE WAVER MAIL": { lat: 51.0617, lng: 4.5183, city: "Sint-Katelijne-Waver" },
  "SINT TRUIDEN MAIL": { lat: 50.8100, lng: 5.1783, city: "Sint-Truiden" },
  "SOIGNIES MAIL": { lat: 50.5783, lng: 4.0700, city: "Soignies" },
  "SPEOS C/O RIZIV": { lat: 50.8667, lng: 4.3500, city: "Brussels" },
  "SPEOS FLEURUS": { lat: 50.4717, lng: 4.5583, city: "Fleurus" },
  "SPEOS SECURIPOST": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "SPF FINANCES (PACHECOLAAN - FINTO)": { lat: 50.8453, lng: 4.3569, city: "Brussels" },
  "ST-MARTENS-LATEM MAIL": { lat: 51.0083, lng: 3.6317, city: "Sint-Martens-Latem" },
  "ST. NIKLAAS RETAIL": { lat: 51.1564, lng: 4.1431, city: "Sint-Niklaas" },
  "STABROEK MAIL": { lat: 51.3317, lng: 4.3683, city: "Stabroek" },
  "STACI (NO LIMIT)": { lat: 50.9014, lng: 4.4844, city: "Zaventem" },
  "SUPPLY CHAIN (BX)": { lat: 50.9014, lng: 4.4844, city: "Brussels" },
  "SYMETA": { lat: 50.9014, lng: 4.4844, city: "Zaventem" },
  "Symeta Hybrid Heverlee": { lat: 50.8617, lng: 4.6883, city: "Heverlee" },
  "TEMSE MAIL": { lat: 51.1217, lng: 4.2183, city: "Temse" },
  "TESSENDERLO MAIL": { lat: 51.0683, lng: 5.0883, city: "Tessenderlo" },
  "TINLOT": { lat: 50.4733, lng: 5.5000, city: "Tinlot" },
  "TML": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "TORHOUT MAIL": { lat: 51.0683, lng: 3.1033, city: "Torhout" },
  "UBILOG": { lat: 50.9014, lng: 4.4844, city: "Zaventem" },
  "UITGEVERIJ PELCKMANS": { lat: 51.2717, lng: 4.7017, city: "Kapellen-Antwerp" },
  "UITGEVERIJ VAN IN - Wommelgem": { lat: 51.2183, lng: 4.5200, city: "Wommelgem" },
  "VINCI/OMEXOM": { lat: 50.8503, lng: 4.3517, city: "Brussels" },
  "VIRTON MAIL": { lat: 49.5683, lng: 5.5317, city: "Virton" },
  "VLAAMS PARLEMENT": { lat: 50.8467, lng: 4.3617, city: "Brussels" },
  "VOEREN MAIL": { lat: 50.7633, lng: 5.8483, city: "Voeren" },
  "WAREGEM MAIL": { lat: 50.8817, lng: 3.4283, city: "Waregem" },
  "WEBSHIP": { lat: 50.9014, lng: 4.4844, city: "Zaventem" },
  "WELLIN MAIL": { lat: 50.0817, lng: 5.1000, city: "Wellin" },
  "WEMMEL MAIL": { lat: 50.9083, lng: 4.3083, city: "Wemmel" },
  "WERVIK MAIL": { lat: 50.7817, lng: 3.0383, city: "Wervik" },
  "WETTEREN MAIL": { lat: 51.0033, lng: 3.8883, city: "Wetteren" },
  "WEVELGEM MAIL": { lat: 50.8083, lng: 3.1783, city: "Wevelgem" },
  "X2OVANMOER": { lat: 51.3083, lng: 4.2500, city: "Essen area" },
  "ZEDELGEM MAIL": { lat: 51.1183, lng: 3.1533, city: "Zedelgem" },
  "ZEGELVERDEELCENTR.MECHELEN": { lat: 51.0259, lng: 4.4776, city: "Mechelen" },
  "ZELZATE MAIL": { lat: 51.2017, lng: 3.8133, city: "Zelzate" },
  "ZOERSEL MAIL": { lat: 51.2683, lng: 4.6900, city: "Zoersel" },
  "ZONHOVEN MAIL": { lat: 50.9817, lng: 5.3783, city: "Zonhoven" }
};

// ============================================
// DISTANCE CALCULATION (Haversine formula)
// ============================================
function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// Check if a point is roughly "on the way" between two other points
function isOnRoute(routeFrom, routeTo, deliveryPoint, maxDetourKm = 25) {
  const fromCoords = LOCATIONS[routeFrom];
  const toCoords = LOCATIONS[routeTo];
  if (!fromCoords || !toCoords) return { onRoute: false };

  // Direct distance of the route
  const directDist = haversineDistance(
    fromCoords.lat, fromCoords.lng, toCoords.lat, toCoords.lng
  );

  // Distance via the delivery point
  const distViaPoint = 
    haversineDistance(fromCoords.lat, fromCoords.lng, deliveryPoint.lat, deliveryPoint.lng) +
    haversineDistance(deliveryPoint.lat, deliveryPoint.lng, toCoords.lat, toCoords.lng);

  const detourKm = distViaPoint - directDist;
  // Estimate additional time: assume average speed 50 km/h for detour
  // Use Math.ceil so small detours (< 1 km) don't round down to 0 minutes
  const additionalMinutes = Math.ceil((detourKm / 50) * 60);

  return {
    onRoute: detourKm <= maxDetourKm,
    detourKm: Math.round(detourKm * 10) / 10,
    additionalMinutes: additionalMinutes,
    distanceFromStart: haversineDistance(
      fromCoords.lat, fromCoords.lng, deliveryPoint.lat, deliveryPoint.lng
    )
  };
}

// ============================================
// MAIN SEARCH FUNCTION
// ============================================
function findDeliveryOptions(request) {
  /*
    request = {
      pickupLocation: { lat, lng, name },
      deliveryLocation: { lat, lng, name },
      containersNeeded: number,
      earliestTime: "HH:MM",  (delivery window)
      latestTime: "HH:MM",
      dayOfWeek: number (0-6, 0=Sunday)
    }
  */

  const results = [];

  for (const route of ROUTES_DATA) {
    // 1. Check if route runs on the requested day (use pre-parsed days)
    if (!route._parsedDays.includes(request.dayOfWeek)) continue;

    // 2. Check if pickup is near route origin OR on the route
    const pickupCheck = isOnRoute(
      route.from, route.to, request.pickupLocation, 30
    );

    // 3. Check if delivery is near route destination OR on the route
    const deliveryCheck = isOnRoute(
      route.from, route.to, request.deliveryLocation, 30
    );

    // At least one of pickup/delivery must be on or near the route
    if (!pickupCheck.onRoute && !deliveryCheck.onRoute) continue;

    // 4. Use pre-parsed timing
    const depMinutes = route._depMinutes;
    const arrMinutes = route._arrMinutes;
    if (depMinutes === null || arrMinutes === null) continue;

    const requestEarliest = timeToMinutes(request.earliestTime + ":00");
    const requestLatest = timeToMinutes(request.latestTime + ":00");

    // Estimate when the truck would pass the delivery point
    const routeDuration = arrMinutes >= depMinutes 
      ? arrMinutes - depMinutes 
      : (arrMinutes + 1440) - depMinutes;
    
    const totalRouteDist = route.plannedDistance;
    const fractionAlongRoute = deliveryCheck.distanceFromStart 
      ? Math.min(deliveryCheck.distanceFromStart / Math.max(totalRouteDist, 1), 1)
      : 0.5;
    
    const estimatedPassTime = depMinutes + (routeDuration * fractionAlongRoute);
    const estimatedDeliveryTime = estimatedPassTime + deliveryCheck.additionalMinutes;

    // Check if estimated delivery falls within the time window
    const withinWindow = estimatedDeliveryTime >= requestEarliest && 
                          estimatedDeliveryTime <= requestLatest;

    // 5. Check capacity
    const capacityWarning = request.containersNeeded > route.capacity;

    // 6. Calculate total additional time (detour for both pickup and delivery)
    const totalAdditionalMinutes = 
      (pickupCheck.onRoute ? pickupCheck.additionalMinutes : 0) +
      (deliveryCheck.onRoute ? deliveryCheck.additionalMinutes : 0);

    results.push({
      route: route,
      totalAdditionalMinutes: totalAdditionalMinutes,
      pickupDetourKm: pickupCheck.detourKm || 0,
      deliveryDetourKm: deliveryCheck.detourKm || 0,
      estimatedDeliveryTime: formatMinutes(estimatedDeliveryTime),
      withinTimeWindow: withinWindow,
      capacityWarning: capacityWarning,
      capacityAvailable: route.capacity,
      score: totalAdditionalMinutes + (withinWindow ? 0 : 60) + (capacityWarning ? 20 : 0)
    });
  }

  // Sort by additional time (ascending — least detour first)
  results.sort((a, b) => a.totalAdditionalMinutes - b.totalAdditionalMinutes);
  return results.slice(0, 10);
}

function formatMinutes(mins) {
  const h = Math.floor(mins / 60) % 24;
  const m = Math.round(mins % 60);
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

// ============================================
// UI RENDERING
// ============================================
function renderResults(results, container) {
  if (results.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <h3>⚠️ No existing routes can accommodate this delivery</h3>
        <p><strong>A NEW ROUTE IS REQUIRED.</strong></p>
        <p>No routes were found that pass near both the pickup and delivery locations on the requested day/time.</p>
      </div>`;
    return;
  }

  let html = '<h3>Top 10 Options (sorted by additional time)</h3>';
  html += '<table class="results-table">';
  html += `<tr>
    <th>#</th>
    <th>Service</th>
    <th>From → To</th>
    <th>Departure</th>
    <th>Est. Delivery</th>
    <th>Extra Time</th>
    <th>Extra KM</th>
    <th>Capacity</th>
    <th>Days</th>
    <th>Warnings</th>
  </tr>`;

  results.forEach((r, i) => {
    const dayNames = {'0':'Sun','1':'Mon','2':'Tue','3':'Wed','4':'Thu','5':'Fri','6':'Sat'};
    const days = r.route.ospFrequency.split('').map(d => dayNames[d] || d).join(', ');
    
    const warnings = [];
    if (r.capacityWarning) warnings.push('🟡 Bigger truck needed');
    if (!r.withinTimeWindow) warnings.push('🟠 Outside time window');

    const rankLabel = i === 0 ? '🥇 1' : i === 1 ? '🥈 2' : i === 2 ? '🥉 3' : (i + 1);
    html += `<tr class="${warnings.length ? 'has-warning' : 'good-match'}">
      <td><strong>${rankLabel}</strong></td>
      <td><strong>${r.route.service}</strong><br><small>${r.route.trip}</small></td>
      <td>${r.route.from} → ${r.route.to}</td>
      <td>${r.route.departure}</td>
      <td>${r.estimatedDeliveryTime}</td>
      <td><strong>+${r.totalAdditionalMinutes} min</strong></td>
      <td>+${r.pickupDetourKm + r.deliveryDetourKm} km</td>
      <td>${r.capacityAvailable} containers</td>
      <td><small>${days}</small></td>
      <td>${warnings.join('<br>') || '✅ OK'}</td>
    </tr>`;
  });

  html += '</table>';
  container.innerHTML = html;
}