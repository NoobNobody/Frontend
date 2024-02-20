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
    selectedDateFilter: 'Data dodania',
    selectedWorkingHourTypes: 'Wymiar pracy',
    selectedJobModel: 'Tryb pracy',
    selectedJobType: 'Typ pracy',
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
};

export { dateFilters, jobTypeFilters, jobModelFilters, jobTimeFilters, salaryTypes, filterCategories, filtersCombined, salaryRange }