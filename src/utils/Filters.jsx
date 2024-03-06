const dateFilters = {
    all: "Wszystkie",
    last24Hours: "Ostatnie 24 godziny",
    last3Days: "Ostatnie 3 dni",
    lastWeek: "Ostatni tydzień",
    last2Weeks: "Ostatnie 2 tygodnie"
};

const jobTypeFilters = {
    contractOfEmployment: 'Umowa o pracę',
    mandateContract: 'Umowa zlecenie',
    different: 'Inny',
    contractWork: 'Umowa o dzieło',
    selfEmployment: 'Samozatrudnienie',
    internship: 'Staż / Praktyka',
    b2bContract: 'Kontrakt B2B'
};

const jobModelFilters = {
    stationaryWork: 'Praca stacjonarna',
    hybridWork: 'Praca hybrydowa',
    remoteWork: 'Praca zdalna',
    mobileWork: 'Praca mobilna'
};

const jobTimeFilters = {
    fullTime: 'Pełny etat',
    partTime: 'Część etatu',
    temporary: 'Tymczasowa praca',
};

const salaryTypes = {
    hourly: "Godzinowe",
    monthly: "Miesięczne"
};

const salaryRange = {
    hourly_range: ['Mniejsze niż 20zł', '20 - 25zł', '25 - 30zł', '30 - 40zł', '40 - 50zł', 'Większe niż 50 zł'],
    monthly_range: ['Mniejsze niż 3500zł', '3500 - 4000zł', '4000 - 5000zł', '5000 - 8000zł', '8000 - 15000zł', 'Większe niż 15000zł'],
};

const filterCategories = {
    selectedDate: 'Data dodania',
    selectedJobTime: 'Czas pracy',
    selectedJobModel: 'Model pracy',
    selectedJobType: 'Typ pracy',
    selectedSalaryType: "Typ wynagodrodzenia",
    selectedSalaryRange: "Zakres zarobków"
};

const filtersCombined = {
    all: "Wszystkie",
    last24Hours: "Ostatnie 24 godziny",
    last3Days: "Ostatnie 3 dni",
    lastWeek: "Ostatni tydzień",
    last2Weeks: "Ostatnie 2 tygodnie",
    stationaryWork: 'Praca stacjonarna',
    hybridWork: 'Praca hybrydowa',
    remoteWork: 'Praca zdalna',
    mobileWork: 'Praca mobilna',
    contractOfEmployment: 'Umowa o pracę',
    mandateContract: 'Umowa zlecenie',
    different: 'Inny',
    contractWork: 'Umowa o dzieło',
    selfEmployment: 'Samozatrudnienie',
    internship: 'Staż / Praktyka',
    b2bContract: 'Kontrakt B2B',
    fullTime: 'Pełny etat',
    partTime: 'Część etatu',
    temporary: 'Tymczasowa praca',
    monthly: 'miesięczne',
    hourly: 'godzinowe',
};

const provinceNames = {
    dolnoslaskie: "dolnośląskie",
    kujawskopomorskie: "kujawsko-pomorskie",
    lubelskie: "lubelskie",
    lubuskie: "lubuskie",
    lodzkie: "łódzkie",
    malopolskie: "małopolskie",
    mazowieckie: "mazowieckie",
    opolskie: "opolskie",
    podkarpackie: "podkarpackie",
    podlaskie: "podlaskie",
    pomorskie: "pomorskie",
    slaskie: "śląskie",
    swietokrzyskie: "świętokrzyskie",
    warminskomazurskie: "warmińsko-mazurskie",
    wielkopolskie: "wielkopolskie",
    zachodniopomorskie: "zachodniopomorskie",
};

const locationsByProvince = {
    "dolnośląskie": ["Bardo", "Bielawa", "Bierutów", "Bogatynia", "Boguszów-Gorce",
        "Bolesławiec", "Bolków", "Brzeg Dolny", "Bystrzyca Kłodzka", "Chocianów",
        "Chojnów", "Duszniki-Zdrój", "Dzierżoniów", "Gryfów Śląski", "Góra", "Głogów",
        "Głuszyca", "Jawor", "Jaworzyna Śląska", "Jedlina-Zdrój", "Jelcz-Laskowice",
        "Jelenia Góra", "Kamieniec Ząbkowicki", "Kamienna Góra", "Karpacz", "Kowary",
        "Kudowa-Zdrój", "Kąty Wrocławskie", "Kłodzko", "Legnica", "Leśna", "Lubawka",
        "Lubań", "Lubin", "Lubomierz", "Lwówek Śląski", "Lądek-Zdrój", "Mieroszów", "Milicz",
        "Mirsk", "Międzybórz", "Międzylesie", "Miękinia", "Niemcza", "Nowa Ruda", "Nowogrodziec",
        "Oborniki Śląskie", "Oleśnica", "Olszyna", "Oława", "Piechowice", "Pieszyce", "Pieńsk",
        "Piława Górna", "Polanica-Zdrój", "Polkowice", "Prochowice", "Prusice", "Przemków",
        "Radków", "Siechnice", "Sobótka", "Stronie Śląskie", "Strzegom", "Strzelin", "Syców",
        "Szczawno-Zdrój", "Szczytna", "Szklarska Poręba", "Ścinawa", "Środa Śląska", "Świdnica",
        "Świebodzice", "Świeradów-Zdrój", "Świerzawa", "Trzebnica", "Twardogóra", "Wałbrzych",
        "Wiązów", "Wleń", "Wojcieszów", "Wołów", "Wrocław", "Wąsosz", "Węgliniec", "Zawidów",
        "Zgorzelec", "Ziębice", "Ząbkowice Śląskie", "Złotoryja", "Złoty Stok", "Żarów", "Żmigród"
    ],
    "kujawsko-pomorskie": [
        "Aleksandrów Kujawski", "Barcin", "Bobrowniki (miasto)", "Brodnica", "Brześć Kujawski",
        "Bydgoszcz", "Chełmno", "Chełmża", "Chodecz", "Ciechocinek", "Dobrzyń nad Wisłą",
        "Gąsawa", "Gniewkowo", "Golub-Dobrzyń", "Górzno", "Grudziądz", "Inowrocław",
        "Izbica Kujawska", "Jabłonowo Pomorskie", "Janikowo", "Janowiec Wielkopolski",
        "Kamień Krajeński", "Kcynia", "Kikół", "Koronowo", "Kowal (miasto)", "Kowalewo Pomorskie",
        "Kruszwica", "Lipno", "Lubień Kujawski", "Lubraniec", "Łabiszyn", "Łasin", "Mogilno",
        "Mrocza", "Nakło nad Notecią", "Nieszawa", "Nowe", "Pakość", "Piotrków Kujawski",
        "Pruszcz", "Radziejów", "Radzyń Chełmiński", "Rypin", "Sępólno Krajeńskie", "Skępe",
        "Solec Kujawski", "Strzelno", "Szubin", "Świecie", "Toruń", "Tuchola", "Wąbrzeźno",
        "Więcbork", "Włocławek", "Żnin"
    ],
    "lubelskie": ["Annopol", "Bełżyce", "Biała Podlaska", "Biłgoraj", "Bychawa", "Chełm",
        "Czemierniki", "Dęblin", "Frampol", "Goraj", "Hrubieszów", "Izbica (miasto)", "Janów Lubelski",
        "Józefów (powiat biłgorajski)", "Józefów nad Wisłą", "Kamionka (powiat lubartowski)",
        "Kazimierz Dolny", "Kock", "Krasnobród", "Krasnystaw", "Kraśnik", "Lubartów", "Lublin",
        "Lubycza Królewska", "Łaszczów", "Łęczna", "Łuków", "Międzyrzec Podlaski", "Modliborzyce",
        "Nałęczów", "Opole Lubelskie", "Ostrów Lubelski", "Parczew", "Piaski (miasto)", "Piszczac",
        "Poniatowa", "Puławy", "Radzyń Podlaski", "Rejowiec", "Rejowiec Fabryczny", "Ryki",
        "Siedliszcze", "Stoczek Łukowski", "Szczebrzeszyn", "Świdnik", "Tarnogród", "Terespol",
        "Tomaszów Lubelski", "Turobin", "Tyszowce", "Urzędów", "Włodawa", "Zamość", "Zwierzyniec (miasto)"
    ],
    "lubuskie": ["Babimost", "Brody (powiat żarski)", "Bytom Odrzański", "Cybinka", "Czerwieńsk",
        "Dobiegniew", "Drezdenko", "Gorzów Wielkopolski", "Gozdnica", "Gubin", "Iłowa", "Jasień (miasto)",
        "Kargowa", "Kostrzyn nad Odrą", "Kożuchów", "Krosno Odrzańskie", "Lubniewice", "Lubsko", "Łęknica",
        "Małomice", "Międzyrzecz", "Nowa Sól", "Nowe Miasteczko", "Nowogród Bobrzański", "Ośno Lubuskie",
        "Otyń", "Rzepin", "Skwierzyna", "Sława (miasto)", "Słubice", "Strzelce Krajeńskie", "Sulechów",
        "Sulęcin", "Szlichtyngowa", "Szprotawa", "Świebodzin", "Torzym", "Trzciel", "Witnica", "Wschowa",
        "Zbąszynek", "Zielona Góra", "Żagań", "Żary"
    ],
    "łódzkie": ["Aleksandrów Łódzki", "Biała Rawska", "Białaczów", "Bełchatów", "Błaszki",
        "Bolesławiec", "Bolimów", "Brzeziny", "Dąbrowice", "Drzewica (miasto)", "Działoszyn", "Głowno",
        "Grabów", "Inowłódz", "Jeżów", "Kamieńsk", "Kiernozia", "Koluszki", "Konstantynów Łódzki",
        "Krośniewice", "Kutno", "Lutomiersk", "Lututów", "Łask", "Łęczyca", "Łowicz", "Łódź", "Opoczno",
        "Osjaków", "Ozorków", "Pabianice", "Pajęczno", "Parzęczew", "Piątek (miasto)", "Piotrków Trybunalski",
        "Poddębice", "Przedbórz", "Radomsko", "Rawa Mazowiecka", "Rozprza", "Rzgów", "Sieradz", "Skierniewice",
        "Stryków", "Sulejów", "Szadek", "Tomaszów Mazowiecki", "Tuszyn", "Ujazd (powiat tomaszowski)", "Uniejów",
        "Warta (miasto)", "Wieluń", "Wieruszów", "Wolbórz", "Zduńska Wola", "Zelów", "Zgierz", "Złoczew", "Żarnów", "Żychlin"
    ],
    "małopolskie": ["Alwernia", "Andrychów", "Biecz", "Bobowa", "Bochnia", "Brzesko", "Brzeszcze", "Bukowno",
        "Chełmek", "Chrzanów", "Ciężkowice", "Czarny Dunajec (miasto)", "Czchów", "Dąbrowa Tarnowska", "Dobczyce",
        "Gorlice", "Grybów", "Jordanów", "Kalwaria Zebrzydowska", "Kęty", "Koszyce",
        "Kraków", "Krynica-Zdrój", "Krzeszowice", "Książ Wielki", "Libiąż", "Limanowa", "Maków Podhalański",
        "Miechów", "Mszana Dolna", "Muszyna", "Myślenice", "Niepołomice", "Nowe Brzesko", "Nowy Sącz", "Nowy Targ",
        "Nowy Wiśnicz", "Olkusz", "Oświęcim", "Piwniczna-Zdrój", "Proszowice", "Rabka-Zdrój", "Radłów", "Ryglice",
        "Skała (miasto)", "Skawina", "Słomniki", "Stary Sącz", "Sucha Beskidzka", "Sułkowice", "Szczawnica",
        "Szczucin", "Świątniki Górne", "Tarnów", "Trzebinia", "Tuchów", "Wadowice", "Wieliczka", "Wojnicz", "Wolbrom",
        "Zakliczyn", "Zakopane", "Zator (miasto)", "Żabno"
    ],
    "mazowieckie": ["Białobrzegi", "Bieżuń", "Błonie", "Bodzanów", "Brok", "Brwinów", "Cegłów", "Chorzele",
        "Ciechanów", "Ciepielów", "Czerwińsk nad Wisłą", "Dobre", "Drobin", "Garwolin", "Gąbin", "Gielniów",
        "Glinojeck", "Głowaczów", "Gostynin", "Góra Kalwaria", "Grodzisk Mazowiecki", "Grójec", "Halinów",
        "Iłża", "Jadów", "Jastrząb", "Jedlnia-Letnisko", "Józefów (powiat otwocki)", "Kałuszyn", "Karczew",
        "Kobyłka", "Konstancin-Jeziorna", "Kosów Lacki", "Kozienice", "Latowicz", "Legionowo", "Lipsko",
        "Lubowidz", "Łaskarzew", "Łochów", "Łomianki", "Łosice", "Maciejowice", "Magnuszew", "Maków Mazowiecki",
        "Marki", "Milanówek", "Mińsk Mazowiecki", "Mława", "Mogielnica", "Mordy", "Mrozy", "Mszczonów", "Myszyniec",
        "Nasielsk", "Nowe Miasto", "Nowe Miasto nad Pilicą", "Nowy Dwór Mazowiecki", "Odrzywół", "Osieck",
        "Ostrołęka", "Ostrów Mazowiecka", "Otwock", "Ożarów Mazowiecki", "Piaseczno", "Piastów", "Pilawa", "Pionki",
        "Płock", "Płońsk", "Podkowa Leśna", "Pruszków", "Przasnysz", "Przysucha", "Przytyk", "Pułtusk", "Raciąż",
        "Radom", "Radzymin", "Różan", "Sanniki", "Serock", "Siedlce", "Siennica", "Sienno", "Sierpc", "Skaryszew",
        "Sochaczew", "Sochocin", "Sokołów Podlaski", "Solec nad Wisłą", "Sulejówek", "Szydłowiec", "Tarczyn",
        "Tłuszcz", "Warka", "Warszawa", "Węgrów", "Wiskitki", "Wołomin", "Wyszków", "Wyszogród", "Wyśmierzyce",
        "Zakroczym", "Ząbki", "Zielonka", "Zwoleń", "Żelechów", "Żuromin", "Żyrardów"
    ],
    "opolskie": ["Baborów", "Biała", "Brzeg", "Byczyna", "Dobrodzień", "Głogówek", "Głubczyce", "Głuchołazy",
        "Gogolin", "Gorzów Śląski", "Grodków", "Kędzierzyn-Koźle", "Kietrz", "Kluczbork", "Kolonowskie",
        "Korfantów", "Krapkowice", "Leśnica", "Lewin Brzeski", "Namysłów", "Niemodlin", "Nysa", "Olesno",
        "Opole", "Otmuchów", "Ozimek", "Paczków", "Praszka", "Prószków", "Prudnik", "Strzelce Opolskie",
        "Strzeleczki", "Tułowice", "Ujazd", "Wołczyn", "Zawadzkie", "Zdzieszowice"
    ],
    "podkarpackie": ["Baranów Sandomierski", "Bircza", "Błażowa", "Boguchwała", "Brzostek", "Brzozów",
        "Cieszanów", "Dębica", "Dubiecko", "Dukla", "Dynów", "Głogów Małopolski", "Iwonicz-Zdrój", "Jarosław",
        "Jasło", "Jawornik Polski", "Jedlicze", "Kańczuga", "Kolbuszowa", "Kołaczyce", "Krosno", "Lesko", "Leżajsk",
        "Lubaczów", "Łańcut", "Mielec", "Narol", "Nisko", "Nowa Dęba", "Nowa Sarzyna", "Oleszyce", "Pilzno", "Pruchnik",
        "Przecław", "Przemyśl", "Przeworsk", "Radomyśl Wielki", "Radymno", "Ropczyce", "Rudnik nad Sanem", "Rymanów",
        "Rzeszów", "Sanok", "Sędziszów Małopolski", "Sieniawa", "Sokołów Małopolski", "Stalowa Wola", "Strzyżów",
        "Tarnobrzeg", "Tyczyn", "Ulanów", "Ustrzyki Dolne", "Zagórz", "Zaklików"
    ],
    "podlaskie": ["Augustów", "Białystok", "Bielsk Podlaski", "Brańsk", "Choroszcz", "Ciechanowiec",
        "Czarna Białostocka", "Czyżew", "Dąbrowa Białostocka", "Drohiczyn", "Goniądz", "Grajewo", "Hajnówka",
        "Jedwabne", "Kleszczele", "Knyszyn", "Kolno", "Krynki", "Lipsk", "Łapy", "Łomża", "Michałowo", "Mońki",
        "Nowogród", "Rajgród", "Sejny", "Siemiatycze", "Sokółka", "Stawiski", "Suchowola", "Supraśl", "Suraż",
        "Suwałki", "Szczuczyn", "Szepietowo", "Tykocin", "Wasilków", "Wysokie Mazowieckie", "Zabłudów", "Zambrów"
    ],
    "pomorskie": ["Brusy", "Bytów", "Chojnice", "Czarna Woda", "Czarne", "Czersk", "Człuchów",
        "Debrzno", "Dzierzgoń", "Gdańsk", "Gdynia", "Gniew", "Hel", "Jastarnia", "Kartuzy", "Kępice",
        "Kościerzyna", "Krynica Morska", "Kwidzyn", "Lębork", "Łeba", "Malbork", "Miastko", "Nowy Dwór Gdański",
        "Nowy Staw", "Pelplin", "Prabuty", "Pruszcz Gdański", "Puck", "Reda", "Rumia", "Skarszewy", "Skórcz",
        "Słupsk", "Sopot", "Starogard Gdański", "Sztum", "Tczew", "Ustka", "Wejherowo", "Władysławowo", "Żukowo"
    ],
    "śląskie": ["Będzin", "Bielsko-Biała", "Bieruń", "Blachownia", "Bytom", "Chorzów", "Cieszyn",
        "Czechowice-Dziedzice", "Czeladź", "Czerwionka-Leszczyny", "Częstochowa", "Dąbrowa Górnicza",
        "Gliwice", "Imielin", "Jastrzębie-Zdrój", "Jaworzno", "Kalety", "Katowice", "Kłobuck", "Knurów",
        "Koniecpol", "Koziegłowy", "Krzanowice", "Krzepice", "Kuźnia Raciborska", "Lędziny", "Lubliniec",
        "Łaziska Górne", "Łazy", "Miasteczko Śląskie", "Mikołów", "Mysłowice", "Myszków", "Ogrodzieniec",
        "Olsztyn", "Orzesze", "Piekary Śląskie", "Pilica", "Poręba", "Przyrów", "Pszczyna", "Pszów", "Pyskowice",
        "Racibórz", "Radlin", "Radzionków", "Ruda Śląska", "Rybnik", "Rydułtowy", "Siemianowice Śląskie",
        "Siewierz", "Skoczów", "Sławków", "Sosnowiec", "Sośnicowice", "Strumień", "Szczekociny", "Szczyrk",
        "Świętochłowice", "Tarnowskie Góry", "Toszek", "Tychy", "Ustroń", "Wilamowice", "Wisła", "Włodowice",
        "Wodzisław Śląski", "Wojkowice", "Woźniki", "Zabrze", "Zawiercie", "Żarki", "Żory", "Żywiec"
    ],
    "świętokrzyskie": ["Bodzentyn", "Bogoria", "Busko-Zdrój", "Chęciny", "Chmielnik", "Ćmielów", "Daleszyce",
        "Działoszyce", "Gowarczów", "Iwaniska", "Jędrzejów", "Kazimierza Wielka", "Kielce", "Klimontów",
        "Końskie", "Koprzywnica", "Kunów", "Łagów", "Łopuszno", "Małogoszcz", "Morawica", "Nowa Słupia",
        "Nowy Korczyn", "Oleśnica", "Opatowiec", "Opatów", "Osiek", "Ostrowiec Świętokrzyski", "Ożarów",
        "Pacanów", "Piekoszów", "Pierzchnica", "Pińczów", "Połaniec", "Radoszyce", "Sandomierz", "Sędziszów",
        "Skalbmierz", "Skarżysko-Kamienna", "Starachowice", "Staszów", "Stąporków", "Stopnica", "Suchedniów",
        "Szydłów", "Wąchock", "Wiślica", "Włoszczowa", "Wodzisław", "Zawichost"
    ],
    "warmińsko-mazurskie": ["Barczewo", "Bartoszyce", "Biała Piska", "Biskupiec", "Bisztynek", "Braniewo",
        "Dobre Miasto", "Działdowo", "Elbląg", "Ełk", "Frombork", "Giżycko", "Gołdap", "Górowo Iławeckie",
        "Iława", "Jeziorany", "Kętrzyn", "Kisielice", "Korsze", "Lidzbark", "Lidzbark Warmiński", "Lubawa",
        "Mikołajki", "Miłakowo", "Miłomłyn", "Młynary", "Morąg", "Mrągowo", "Nidzica", "Nowe Miasto Lubawskie",
        "Olecko", "Olsztyn", "Olsztynek", "Orneta", "Orzysz", "Ostróda", "Pasłęk", "Pasym", "Pieniężno", "Pisz",
        "Reszel", "Ruciane-Nida", "Ryn", "Sępopol", "Susz", "Szczytno", "Tolkmicko", "Węgorzewo", "Wielbark", "Zalewo"
    ],
    "wielkopolskie": ["Bojanowo", "Borek Wielkopolski", "Budzyń", "Buk", "Chocz", "Chodzież", "Czarnków", "Czempiń",
        "Czerniejewo", "Dąbie", "Dobra", "Dobrzyca", "Dolsk", "Gniezno", "Golina", "Gołańcz", "Gostyń",
        "Grabów nad Prosną", "Grodzisk Wielkopolski", "Jaraczewo", "Jarocin", "Jastrowie", "Jutrosin", "Kaczory",
        "Kalisz", "Kępno", "Kleczew", "Kłecko", "Kłodawa", "Kobylin", "Koło", "Konin", "Kostrzyn", "Kościan",
        "Koźmin Wielkopolski", "Koźminek", "Kórnik", "Krajenka", "Krobia", "Krotoszyn", "Krzywiń", "Krzyż Wielkopolski",
        "Książ Wielkopolski", "Leszno", "Luboń", "Lwówek", "Łobżenica", "Margonin", "Miasteczko Krajeńskie",
        "Miejska Górka", "Mieścisko", "Międzychód", "Mikstat", "Miłosław", "Mosina", "Murowana Goślina", "Nekla",
        "Nowe Skalmierzyce", "Nowy Tomyśl", "Oborniki", "Obrzycko", "Odolanów", "Okonek", "Opalenica", "Opatówek",
        "Osieczna", "Ostroróg", "Ostrów Wielkopolski", "Ostrzeszów", "Piła", "Pleszew", "Pniewy", "Pobiedziska",
        "Pogorzela", "Poniec", "Poznań", "Przedecz", "Puszczykowo", "Pyzdry", "Rakoniewice", "Raszków", "Rawicz",
        "Rogoźno", "Rychtal", "Rychwał", "Rydzyna", "Sieraków", "Skoki", "Słupca", "Sompolno", "Stawiszyn", "Stęszew",
        "Sulmierzyce", "Swarzędz", "Szamocin", "Szamotuły", "Ślesin", "Śmigiel", "Śrem", "Środa Wielkopolska",
        "Trzcianka", "Trzemeszno", "Tuliszków", "Turek", "Ujście", "Wągrowiec", "Wieleń", "Wielichowo", "Witkowo",
        "Wolsztyn", "Wronki", "Września", "Wyrzysk", "Wysoka", "Zagórów", "Zbąszyń", "Zduny", "Złotów", "Żerków"
    ],
    "zachodniopomorskie": ["Barlinek", "Barwice", "Białogard", "Biały Bór", "Bobolice", "Borne Sulinowo", "Cedynia",
        "Chociwel", "Chojna", "Choszczno", "Czaplinek", "Człopa", "Darłowo", "Dębno", "Dobra", "Dobrzany", "Drawno",
        "Drawsko Pomorskie", "Dziwnów", "Golczewo", "Goleniów", "Gościno", "Gryfice", "Gryfino", "Ińsko",
        "Kalisz Pomorski", "Kamień Pomorski", "Karlino", "Kołobrzeg", "Koszalin", "Lipiany", "Łobez", "Maszewo",
        "Mielno", "Mieszkowice", "Międzyzdroje", "Mirosławiec", "Moryń", "Myślibórz", "Nowe Warpno", "Nowogard",
        "Pełczyce", "Płoty", "Polanów", "Police", "Połczyn-Zdrój", "Pyrzyce", "Recz", "Resko", "Sianów", "Sławno",
        "Stargard", "Stepnica", "Suchań", "Szczecin", "Szczecinek", "Świdwin", "Świnoujście", "Trzcińsko-Zdrój",
        "Trzebiatów", "Tuczno", "Tychowo", "Wałcz", "Węgorzyno", "Wolin", "Złocieniec"
    ]


};

export { dateFilters, jobTypeFilters, jobModelFilters, jobTimeFilters, salaryTypes, filterCategories, filtersCombined, salaryRange, provinceNames, locationsByProvince }