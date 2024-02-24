import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, FormControl, InputGroup, Button, Alert } from 'react-bootstrap';
import { fetchAllJobOffers, searchJobOffersByPosition, filtrateJobOffers } from '../../services/api/jobOffersService';
import CustomPagination from '../../components/pagination/CustomPagination';
import JobCard from '../../components/job_card/JobCard';
import { scrollToTop } from '../../utils/scrollToTop';
import './joboffersbycategory.css';
import { dateFilters, jobModelFilters, jobTypeFilters, jobTimeFilters, salaryTypes, salaryRange, filterCategories, filtersCombined } from '../../utils/Filters';
import ObjectFilter from '../../components/filters/ObjectFilter';
import ElementFilter from '../../components/filters/ElementFilter';
import SalaryTypeFilter from '../../components/filters/salary_type_filter/SalaryTypeFilter';

function JobOffersByCategory() {
    const location = useLocation();
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [query, setQuery] = useState("");
    const [jobOffers, setJobOffers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        selectedDate: null,
        selectedJobTime: [],
        selectedJobModel: [],
        selectedJobType: [],
        selectedSalaryType: null,
        selectedSalaryRange: null,
    });
    const [appliedFilters, setAppliedFilters] = useState({
        selectedDate: null,
        selectedJobTime: [],
        selectedJobModel: [],
        selectedJobType: [],
        selectedSalaryType: null,
        selectedSalaryRange: null,
    });

    useEffect(() => {
        fetchDataFromUrl();
    }, [location.search, categoryId]);

    // Pobieranie danych manualnie przy pomocy URL
    const fetchDataFromUrl = async () => {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page'), 10) || 1;
        const searchQueryFromUrl = params.get('search') || "";

        let isValid = true;

        let currentFilters = {
            selectedDate: params.get('selectedDate'),
            selectedJobTime: params.getAll('selectedJobTime'),
            selectedJobModel: params.getAll('selectedJobModel'),
            selectedJobType: params.getAll('selectedJobType'),
            selectedSalaryType: params.get('selectedSalaryType'),
            selectedSalaryRange: params.get('selectedSalaryRange'),
        };

        if (currentFilters.selectedDate && !dateFilters[currentFilters.selectedDate]) {
            isValid = false;
        }

        ['selectedJobTime', 'selectedJobModel', 'selectedJobType'].forEach(filterKey => {
            if (currentFilters[filterKey].some(value => !filtersCombined[value])) {
                isValid = false;
            }
        });

        if (currentFilters.selectedSalaryType && !salaryTypes[currentFilters.selectedSalaryType]) {
            isValid = false;
        }

        if (currentFilters.selectedSalaryRange && currentFilters.selectedSalaryType) {
            const ranges = salaryRange[currentFilters.selectedSalaryType + '_range'];
            const formattedSelectedRange = `${currentFilters.selectedSalaryRange}zł`;
            if (!ranges.includes(formattedSelectedRange)) {
                isValid = false;
            }
        }

        console.log("Current filters from URL:", currentFilters);

        if (!isValid) {
            console.log("Filters are not valid:", currentFilters);
            setShowAlert(true);
            setJobOffers([]);
            setTotalPages(0);
            navigate(`/oferty/kategoria/${categoryId}/`);
            return;
        }

        setFilters(currentFilters);
        setAppliedFilters(currentFilters);
        setQuery(searchQueryFromUrl);
        setSearchQuery(searchQueryFromUrl);
        setCurrentPage(page);
        await fetchData(page, searchQueryFromUrl, currentFilters);
    };


    // Pobieranie danych na stronie
    const fetchData = async (page, searchQuery = "", currentFilters = filters) => {
        console.log("Fetching data with:", { page, searchQuery, currentFilters });
        try {
            let response;
            if (searchQuery) {
                response = await searchJobOffersByPosition(categoryId, page, searchQuery);
            } else if (Object.values(currentFilters).some(value => value && (Array.isArray(value) ? value.length : true))) {
                response = await filtrateJobOffers(categoryId, page, currentFilters);
                console.log("Response from backend:", response);
            } else {
                response = await fetchAllJobOffers(categoryId, page);
            }

            if (response.jobOffers.length === 0) {
                setShowAlert(true);
                setJobOffers([]);
                setTotalPages(0);
            } else {
                setJobOffers(response.jobOffers);
                setTotalPages(response.totalPages);
                console.log("Setting current page to:", page);
                setCurrentPage(page);
                scrollToTop();
                setShowAlert(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
            setShowAlert(true);
            setJobOffers([]);
            setTotalPages(0);
        }
    };

    // Aktualizacja URL
    const updateUrl = (page, searchQuery = "", currentFilters = filters) => {
        console.log("UPDATE URL: ", currentFilters)
        const params = new URLSearchParams();
        if (searchQuery) {
            params.set('search', searchQuery);
        }
        Object.entries(currentFilters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.filter(v => v).forEach(v => params.append(key, v));
            } else if (value && value !== null && value !== 'any' && value.trim() !== '') {
                params.set(key, value);
            }
        });
        if (page !== 1) {
            params.set('page', page);
        }
        const finalUrl = `/oferty/kategoria/${categoryId}/?${params.toString()}`;
        console.log("Final URL:", finalUrl);

        navigate(finalUrl, { replace: true });
    };

    // Obsługa zmiany strony
    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
        updateUrl(newPage, searchQuery, filters);
        fetchData(newPage, searchQuery, filters);
    };

    // Szukanie ofert za pomocą stanowiska
    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        setSearchQuery(query);
        updateUrl(1, query, filters);
        await fetchData(1, query, filters);
    };

    // Czyszczenie pola szukania ofert za pomocą stanowiska
    const clearSearch = () => {
        setQuery("");
        if (searchQuery) {
            setSearchQuery("");
            const newFilters = {
                selectedDate: null,
                selectedJobTime: [],
                selectedJobModel: [],
                selectedJobType: [],
                selectedSalaryType: null,
                selectedSalaryRange: null,
            };
            setFilters(newFilters);
            setAppliedFilters(newFilters);
            updateUrl(1, "", newFilters);
            fetchData(1, "", newFilters);
        } else {
            setQuery("");
        }
    };

    // Filtrowanie ofert 
    const handleFilterSubmit = async (e) => {
        e.preventDefault();
        console.log("Before submitting filters:", { currentPage: 1, searchQuery, filters });
        setAppliedFilters(filters);
        console.log("After submitting filters - before update and fetch:", { currentPage: 1, searchQuery, filters });
        updateUrl(1, searchQuery, filters);
        await fetchData(1, searchQuery, filters);
        console.log("After fetchData:", { currentPage: 1, searchQuery, filters, appliedFilters });
    };

    // Obsługa wybrania filtrów
    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value };
        setFilters(newFilters);
    };

    // Czyszczenie wszsytkich filtrów
    const clearAllFilters = () => {
        const newFilters = {
            selectedDate: null,
            selectedJobTime: [],
            selectedJobModel: [],
            selectedJobType: [],
            selectedSalaryType: null,
            selectedSalaryRange: null,
        };
        setFilters(newFilters);
        setAppliedFilters(newFilters);
        updateUrl(currentPage, searchQuery, newFilters);
        fetchData(currentPage, searchQuery, newFilters);
    };

    const calculateNewFilters = (currentFilters, filterType, valueToRemove) => {
        const newFilters = { ...currentFilters }; // Tworzenie kopii obiektu filtrów

        // Sprawdzanie typu filtra i odpowiednie jego aktualizowanie
        if (Array.isArray(newFilters[filterType])) {
            // Jeśli filtr jest tablicą, usuwamy z niej wartość
            newFilters[filterType] = newFilters[filterType].filter(value => value === valueToRemove);
        } else {
            // Jeśli filtr nie jest tablicą, ustawiamy go na null (lub inną domyślną wartość)
            newFilters[filterType] = null;
        }

        return newFilters;
    };



    const removeFilter = (filterType, valueToRemove) => {
        // Oblicz nowe filtry bez usuwanego filtra
        const newFilters = calculateNewFilters(filters, filterType, valueToRemove);

        // Bezpośrednio aktualizuj stan za pomocą nowych filtrów
        setFilters(newFilters);
        setAppliedFilters(newFilters);

        // Bezpośrednio przekazuj nowe filtry do funkcji updateUrl i fetchData
        updateUrl(currentPage, searchQuery, newFilters);
        fetchData(currentPage, searchQuery, newFilters);
    };



    // Sprawdzenie czy są wybrane jakieś filtry
    const areAnyFiltersApplied = () => {
        const isAnyFilterApplied = Object.entries(appliedFilters).some(([key, value]) => {
            if (Array.isArray(value)) {
                const isArrayNotEmpty = value.length > 0;
                return isArrayNotEmpty;
            } else {
                const isValueNotNull = value !== null && value !== 'any';
                return isValueNotNull;
            }
        });
        return isAnyFilterApplied;
    };

    // Obsługa typu zarobków
    const handleSalaryTypeChange = (salaryType) => {
        setFilters(prevFilters => {
            const newFilters = {
                ...prevFilters,
                selectedSalaryType: salaryType,
                selectedSalaryRange: null
            };
            return newFilters;
        });
    };

    // Obsługa zakresu zarobków
    const handleSalaryRangeChange = (range) => {
        let sanitizedRange;
        if (range.includes('Mniejsze niż')) {
            sanitizedRange = '<' + range.replace('Mniejsze niż', '').replace('zł', '').trim();
        } else if (range.includes('Większe niż')) {
            sanitizedRange = '>' + range.replace('Większe niż', '').replace('zł', '').trim();
        } else {
            sanitizedRange = range.replace('zł', '').trim();
        }

        setFilters(prevFilters => {
            const newFilters = { ...prevFilters, selectedSalaryRange: sanitizedRange };
            return newFilters;
        });
    };

    return (
        <Container className='mt-2'>
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    Nie znaleziono ofert pasujących do kryteriów.
                </Alert>
            )}
            <h2>{searchQuery ? `Szukane stanowisko: ${searchQuery}` : "Wszystkie oferty"}</h2>
            <Row className='mt-5'>
                <Col sm={4} className="filter-column">
                    {areAnyFiltersApplied() && (
                        <div className="active-filters">
                            <h5>Aktywne filtry</h5>
                            {
                                Object.entries(appliedFilters).map(([key, value]) => {
                                    if (Array.isArray(value) && value.length === 0) return null;
                                    if (value === null) return null;
                                    return (
                                        <div key={`${key}-${value}`} className="active-filter-badge">
                                            <strong>{filterCategories[key]}:</strong> {filtersCombined[value] || value}
                                            <button onClick={() => removeFilter(key, value)}>×</button>
                                        </div>
                                    );
                                })
                            }
                            <Button onClick={clearAllFilters} variant="secondary">Wyczyść filtry</Button>
                        </div>
                    )}
                    <ElementFilter
                        filterLabel="Data dodania"
                        filterOptions={dateFilters}
                        selectedFilters={filters.selectedDate}
                        onFilterChange={(value) => handleFilterChange('selectedDate', value)}
                    />
                    <SalaryTypeFilter
                        filterLabel="Zarobki"
                        filterOptions={salaryTypes}
                        selectedFilters={filters.selectedSalaryType}
                        onFilterChange={handleSalaryTypeChange}
                    />
                    {filters.selectedSalaryType && salaryRange[filters.selectedSalaryType + '_range'] && (
                        <div className="salary-range-filters">
                            {salaryRange[filters.selectedSalaryType + '_range'].map(range => (
                                <Form.Check
                                    key={range}
                                    type="radio"
                                    id={`salary-range-filter-${range}`}
                                    name="salary-range-filter"
                                    label={range}
                                    checked={filters.selectedSalaryRange === range}
                                    onChange={() => handleSalaryRangeChange(range)}
                                />
                            ))}
                        </div>
                    )}
                    <ObjectFilter
                        filterLabel="Model pracy"
                        filterOptions={jobModelFilters}
                        selectedFilters={filters.selectedJobModel}
                        onFilterChange={(value) => handleFilterChange('selectedJobModel', value)}
                    />
                    <ObjectFilter
                        filterLabel="Typ pracy"
                        filterOptions={jobTypeFilters}
                        selectedFilters={filters.selectedJobType}
                        onFilterChange={(value) => handleFilterChange('selectedJobType', value)}
                    />
                    <ObjectFilter
                        filterLabel="Czas pracy"
                        filterOptions={jobTimeFilters}
                        selectedFilters={filters.selectedJobTime}
                        onFilterChange={(value) => handleFilterChange('selectedJobTime', value)}
                    />
                    <Button onClick={handleFilterSubmit} variant="primary">Szukaj oferty</Button>
                </Col>
                <Col sm={8}>
                    <InputGroup className="mb-3" as="form" onSubmit={handleSearchSubmit}>
                        <FormControl
                            placeholder="Szukaj oferty po stanowisku"
                            aria-label="Search"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        <Button variant="outline-secondary" type="submit">
                            Search
                        </Button>
                        {query && (
                            <Button variant="outline-danger" onClick={clearSearch} type="button">
                                &times;
                            </Button>
                        )}
                    </InputGroup>
                    {jobOffers.map((offer, index) => (
                        <JobCard key={offer.id || index} offer={offer} />
                    ))}
                    <div className="d-flex justify-content-center" style={{ marginTop: "20px" }}>
                        <CustomPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handleChangePage}
                        />
                    </div>
                </Col>
            </Row>
        </Container >
    );
}

export default JobOffersByCategory;