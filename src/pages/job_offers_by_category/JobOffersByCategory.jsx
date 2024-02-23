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

    const fetchDataFromUrl = async () => {

        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page'), 10) || 1;
        const searchQueryFromUrl = params.get('search') || "";
        let currentFilters = {
            selectedDate: params.get('selectedDate'),
            selectedJobTime: params.getAll('selectedJobTime'),
            selectedJobModel: params.getAll('selectedJobModel'),
            selectedJobType: params.getAll('selectedJobType'),
            selectedSalaryType: params.get('selectedSalaryType'),
            selectedSalaryRange: params.get('selectedSalaryRange'),
        };
        setFilters(currentFilters);
        setQuery(searchQueryFromUrl);
        setSearchQuery(searchQueryFromUrl);
        setCurrentPage(page);
        await fetchData(page, searchQueryFromUrl, currentFilters);
    };

    const fetchData = async (page, searchQuery = "", currentFilters = filters) => {
        console.log("Fetching data with:", { page, searchQuery, currentFilters });
        try {
            let response;
            if (searchQuery) {
                response = await searchJobOffersByPosition(categoryId, page, searchQuery);
            } else if (Object.values(currentFilters).some(value => value && (Array.isArray(value) ? value.length : true))) {
                response = await filtrateJobOffers(categoryId, page, currentFilters);
                console.log("Filtrate: ", response, "Current page: ", page);
            } else {
                response = await fetchAllJobOffers(categoryId, page);
            }

            setJobOffers(response.jobOffers);
            setTotalPages(response.totalPages);
            console.log("Setting current page to:", page);
            setCurrentPage(page);
            scrollToTop();
            setShowAlert(false);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            setShowAlert(true);
            setJobOffers([]);
            setTotalPages(0);
        }
    };

    const updateUrl = (page, searchQuery = "", currentFilters = filters) => {
        const params = new URLSearchParams();
        console.log("Updating URL with:", { page, searchQuery, currentFilters });

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


    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value };
        setFilters(newFilters);
    };

    const clearFilters = () => {
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

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        setSearchQuery(query);
        updateUrl(1, query, filters);
        await fetchData(1, query, filters);
    };

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
        updateUrl(newPage, searchQuery, filters);
        fetchData(newPage, searchQuery, filters);
    };

    const clearSearch = () => {
        setQuery("");
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
        updateUrl(1, "", newFilters);
        fetchData(1, "", newFilters);
    };


    const submitFilters = async (e) => {
        e.preventDefault();
        console.log("Submitting filters with:", { currentPage: 1, searchQuery, filters });
        setAppliedFilters(filters);
        updateUrl(1, searchQuery, filters);
        await fetchData(1, searchQuery, filters);
    }




    const removeFilter = (filterType, valueToRemove) => {
        console.log(`Removing filter: ${filterType} with value ${valueToRemove}`); // Dodanie logowania
        setFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
            if (Array.isArray(updatedFilters[filterType])) {
                updatedFilters[filterType] = updatedFilters[filterType].filter(value => value !== valueToRemove);
            } else {
                updatedFilters[filterType] = null; // Dla filtrów niebędących tablicami, resetujemy wartość
            }
            return updatedFilters;
        });
        // Aktualizacja URL i ponowne pobranie danych po usunięciu filtra
        updateUrl(currentPage, searchQuery, filters);
        fetchData(currentPage, searchQuery, filters);
    };


    // const removeFilter = (filterType, valueToRemove) => {
    //     setFilters(prevFilters => {
    //         const filterValues = Array.isArray(prevFilters[filterType]) ? prevFilters[filterType] : [];
    //         const newFilterValues = filterValues.filter(value => value !== valueToRemove);
    //         const newFilters = {
    //             ...prevFilters,
    //             [filterType]: newFilterValues
    //         };

    //         const filtersLeft = Object.values(newFilters).some(
    //             value => Array.isArray(value) ? value.length > 0 : value
    //         );

    //         if (!filtersLeft) {
    //             clearAllFilters();
    //         } else {
    //             setFiltersApplied(filtersLeft);
    //             updateUrlWithFilters(1, newFilters);
    //             fetchData(1, newFilters);
    //         }

    //         return newFilters;
    //     });
    // };

    // const handleFilterChange = (filterType, value) => {
    //     setFilters(prevFilters => {
    //         if (['selectedJobTime', 'selectedJobModel', 'selectedJobType'].includes(filterType)) {
    //             const isSelected = prevFilters[filterType].includes(value);
    //             return {
    //                 ...prevFilters,
    //                 [filterType]: isSelected
    //                     ? prevFilters[filterType].filter(type => type !== value)
    //                     : [...prevFilters[filterType], value],
    //             };
    //         }
    //         else {
    //             return {
    //                 ...prevFilters,
    //                 [filterType]: value,
    //             };
    //         }
    //     });
    // };

    const areAnyFiltersApplied = () => {
        return Object.entries(appliedFilters).some(([key, value]) => {
            if (Array.isArray(value)) {
                return value.length > 0;
            } else {
                return value && value !== 'any';
            }
        });
    };

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

    const findSalaryLabel = (salaryType, salaryValue) => {
        const rangeKey = salaryType + '_range';
        const ranges = salaryRange[rangeKey];
        if (!ranges) return salaryValue;
        if (salaryValue.startsWith('<')) {
            return ranges[0];
        } else if (salaryValue.startsWith('>')) {
            return ranges[ranges.length - 1];
        }
        return ranges.find(range => range.includes(salaryValue)) || salaryValue;
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
                            {Object.entries(filters).map(([key, values]) => (
                                Array.isArray(values) && values.length > 0 ?
                                    values.map(value => (
                                        <div key={`${key}-${value}`} className="active-filter-badge">
                                            <strong>{filterCategories[key]}:</strong> {filtersCombined[value] || value}
                                            <button onClick={() => removeFilter(key, value)}>×</button>
                                        </div>
                                    )) : null
                            ))}

                            {filters.selectedDate && filters.selectedDate !== dateFilters.all && (
                                <div className="active-filter-badge">
                                    <strong>{filterCategories.selectedDateFilter}:</strong> {filtersCombined[filters.selectedDate]}
                                    <button onClick={() => removeFilter('selectedDate', filters.selectedDate)}>×</button>
                                </div>
                            )}

                            {filters.selectedSalaryType && filters.selectedSalaryType !== "any" && filters.selectedSalaryRange && filters.selectedSalaryRange !== "any" && (
                                <div className="active-filter-badge">
                                    <strong>Zarobki w zakresie:</strong> {salaryTypes[filters.selectedSalaryType]} {findSalaryLabel(filters.selectedSalaryType, filters.selectedSalaryRange)}
                                    <button onClick={() => handleSalaryRangeChange()}>×</button>
                                </div>
                            )}
                            <Button onClick={clearFilters} variant="secondary">Wyczyść filtry</Button>
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
                    <Button onClick={submitFilters} variant="primary">Szukaj oferty</Button>
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