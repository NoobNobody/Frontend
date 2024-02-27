import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import JobCard from '../../components/job_card/JobCard';
import { Container, Row, Col, Form, FormControl, InputGroup, Button, Alert } from 'react-bootstrap';
import CustomPagination from '../../components/pagination/CustomPagination';
import { fetchAllJobOffers, filtrateAndSearchAllJobOffers } from '../../services/api/jobOffersService';
import ObjectFilter from '../../components/filters/ObjectFilter';
import ElementFilter from '../../components/filters/ElementFilter';
import SalaryTypeFilter from '../../components/filters/salary_type_filter/SalaryTypeFilter';
import { dateFilters, jobModelFilters, jobTypeFilters, jobTimeFilters, salaryTypes, salaryRange, provinceNames, filterCategories, filtersCombined } from '../../utils/Filters';
import { scrollToTop } from '../../utils/scrollToTop';

function JobOffersPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const jobOffersData = location.state?.jobOffers || { jobOffers: [], totalPages: 0, currentPage: 1 };
    const [jobOffers, setJobOffers] = useState(Array.isArray(jobOffersData.jobOffers) ? jobOffersData.jobOffers : []);
    const [currentPage, setCurrentPage] = useState(jobOffersData.currentPage || 1);
    const [totalPages, setTotalPages] = useState(jobOffersData.totalPages || 0);
    const [query, setQuery] = useState(location.state?.query || '');
    const [province, setProvince] = useState(location.state?.province || '');
    const [jobLocation, setJobLocation] = useState(location.state?.jobLocation || '');
    const [searchQuery, setSearchQuery] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const fetchData = async (currentPage, query, jobLocation, province, filters) => {
        console.log("Fetching data with:", { query, province, jobLocation, currentPage, filters });
        setIsLoading(true);
        try {
            let response;
            const safeFilters = filters || {};
            const areFiltersSet = Object.values(safeFilters).some(value => Array.isArray(value) ? value.length > 0 : value);
            const isSearchCriteriaSet = query || province || (jobLocation && jobLocation !== 'undefined') || areFiltersSet;

            if (isSearchCriteriaSet) {
                response = await filtrateAndSearchAllJobOffers(query, jobLocation || '', province, currentPage, safeFilters);
            } else {
                response = await fetchAllJobOffers(currentPage);
            }

            console.log("Received data:", response);
            if (response.jobOffers.length === 0) {
                setShowAlert(true);
                setJobOffers([]);
                setTotalPages(0);
            } else {
                setJobOffers(response.jobOffers);
                setTotalPages(response.totalPages);
                setCurrentPage(currentPage);
                scrollToTop();
                setShowAlert(false);
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            setShowAlert(true);
            setJobOffers([]);
            setTotalPages(0);
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchDataFromUrl();
    }, [location.search]);

    const fetchDataFromUrl = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams(location.search);
            const page = parseInt(params.get('page'), 10) || 1;
            const queryFromUrl = params.get('search') || "";
            const province = params.get('province') || "";
            const jobLocation = params.get('jobLocation') || "";

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

            if (!isValid) {
                setShowAlert(true);
                setJobOffers([]);
                setTotalPages(0);
                navigate(`${location.pathname}`, { replace: true });
                return;
            }

            setQuery(queryFromUrl);
            setProvince(province);
            // setJobLocation(jobLocation);
            setCurrentPage(page);
            setFilters(currentFilters);
            setAppliedFilters(currentFilters);
            await fetchData(page, queryFromUrl, province, jobLocation, currentFilters);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const updateUrl = (page, query, province, jobLocation, currentFilters = filters) => {
        const params = new URLSearchParams();

        if (province) {
            params.set('province', province)

        }
        if (jobLocation && jobLocation !== 'undefined') {
            params.set('jobLocation', jobLocation);
        }
        if (query) {
            params.set('search', query);
        }
        if (page) {
            params.set('page', page.toString());
        }
        Object.entries(currentFilters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.filter(v => v).forEach(v => params.append(key, v));
            } else if (value && value !== null && value !== 'any' && value.trim() !== '') {
                if (key === 'selectedSalaryType' && !currentFilters.selectedSalaryRange) {
                    return;
                }
                params.set(key, value);
            }
        });

        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    };


    const handleChangePage = (page) => {
        setCurrentPage(page);
        console.log("Paramtery strony: ", { page, query, jobLocation, province, filters });
        updateUrl(page, query, province);
        fetchData(page, query, province);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        setSearchQuery(query);
        updateUrl(1, query, province);
        await fetchData(1, query, province);
    };

    const clearSearch = () => {
        setQuery("");
        setProvince("");
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
            updateUrl(1, "", "", "", filters);
            fetchData(1, "", "", "", filters);
        } else {
            setQuery("");
        }
    };

    const handleFilterSubmit = async (event) => {
        event.preventDefault();

        const isOnlySalaryTypeSelected = filters.selectedSalaryType && !filters.selectedSalaryRange;

        const isAnyFilterApplied = Object.values(filters).some(value => {
            return Array.isArray(value) ? value.length > 0 : value;
        }) || query;

        if (isOnlySalaryTypeSelected) {
            alert("Wybierz zakres zarobków");
        } else if (isAnyFilterApplied) {
            setSearchQuery(query);
            updateUrl(1, query, "", province, filters);
            await fetchData(1, query, "", province, filters);
        }
    };

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value };
        setFilters(newFilters);
    };

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

        updateUrl(1, searchQuery, province, newFilters);
        fetchData(1, searchQuery, province, newFilters);
    };

    const calculateNewFilters = (currentFilters, filterType, valueToRemove) => {
        const newFilters = { ...currentFilters };

        if (Array.isArray(newFilters[filterType])) {
            newFilters[filterType] = newFilters[filterType].filter(value => value === valueToRemove);
        } else {
            newFilters[filterType] = null;
        }
        return newFilters;
    };

    const removeFilter = (filterType, valueToRemove) => {
        let newFilters = { ...filters };

        if (filterType === 'selectedSalaryType' || filterType === 'selectedSalaryRange') {
            newFilters.selectedSalaryType = null;
            newFilters.selectedSalaryRange = null;
        } else {
            newFilters = calculateNewFilters(filters, filterType, valueToRemove);
        }

        setFilters(newFilters);
        setAppliedFilters(newFilters);

        updateUrl(1, searchQuery, "", province, newFilters);
        fetchData(1, searchQuery, "", province, newFilters);
    };

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



    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Ładowanie...</span>
                </div>
            </div>
        );
    }

    return (
        <Container className='mt-2'>
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
                        <Form.Select
                            aria-label="Województwo"
                            value={province}
                            onChange={e => setProvince(e.target.value)}
                        >
                            <option value="">Wybierz województwo</option>
                            {Object.entries(provinceNames).map(([key, name]) => (
                                <option key={key} value={name}>{name}</option>
                            ))}
                        </Form.Select>


                        <Button variant="outline-secondary" type="submit">
                            Search
                        </Button>
                        {query && (
                            <Button variant="outline-danger" onClick={clearSearch} type="button">
                                &times;
                            </Button>
                        )}
                    </InputGroup>
                    {showAlert && (
                        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                            Nie znaleziono ofert pasujących do kryteriów.
                        </Alert>
                    )}
                    {jobOffers.map((offer, index) => (
                        <JobCard key={offer.id || index} offer={offer} />
                    ))}
                    <div className="d-flex justify-content-center" style={{ marginTop: "20px" }}>
                        <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleChangePage} />
                    </div>
                </Col>
            </Row>
        </Container >
    );
}

export default JobOffersPage;