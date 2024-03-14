import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import JobCard from '../../components/job_card/JobCard';
import { Container, Row, Col, Form, FormControl, InputGroup, Button, Alert } from 'react-bootstrap';
import CustomPagination from '../../components/pagination/CustomPagination';
import { fetchAllJobOffers, fetchCategories, filterAllJobOffers } from '../../services/api/jobOffersService';
import ObjectFilter from '../../components/filters/ObjectFilter';
import ElementFilter from '../../components/filters/ElementFilter';
import SalaryTypeFilter from '../../components/filters/salary_type_filter/SalaryTypeFilter';
import { dateFilters, jobModelFilters, jobTypeFilters, jobTimeFilters, salaryTypes, salaryRange, provinceNames, filterCategories, filtersCombined, locationsByProvince } from '../../utils/Filters';
import { scrollToTop } from '../../utils/scrollToTop';
import './jobofferspage.css';
import { RiDeleteBinLine } from "react-icons/ri";

function JobOffersPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const jobOffersData = location.state?.jobOffers || { jobOffers: [], totalPages: 0, currentPage: 1 };
    const [jobOffers, setJobOffers] = useState(Array.isArray(jobOffersData.jobOffers) ? jobOffersData.jobOffers : []);
    const [currentPage, setCurrentPage] = useState(jobOffersData.currentPage || 1);
    const [totalPages, setTotalPages] = useState(jobOffersData.totalPages || 0);
    const [query, setQuery] = useState(location.state?.query || '');

    const [province, setProvince] = useState(location.state?.province || '');
    const [appliedProvince, setAppliedProvince] = useState(location.state?.province || '');

    const [availableJobLocations, setAvailableJobLocations] = useState([]);
    const [jobLocation, setJobLocation] = useState(location.state?.jobLocation || '');
    const [appliedJobLocation, setAppliedJobLocation] = useState(location.state?.jobLocation || '');

    const [categoryName, setCategoryName] = useState(location.state?.categoryName || '');
    const [appliedCategoryName, setAppliedCategoryName] = useState(location.state?.categoryName || '');

    const [categories, setCategories] = useState([]);

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

    const fetchData = async (categoryName, query, jobLocation, province, currentPage, filters) => {
        console.log("Fetching data with:", { categoryName, query, jobLocation, province, currentPage, filters });

        setIsLoading(true);
        try {
            let response;
            const safeFilters = filters || {};
            const areFiltersSet = Object.values(safeFilters).some(value => Array.isArray(value) ? value.length > 0 : value);
            const isSearchCriteriaSet = categoryName || query || jobLocation || province || areFiltersSet;

            if (isSearchCriteriaSet) {
                response = await filterAllJobOffers(categoryName, query, jobLocation, province, currentPage, safeFilters);
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
            const categoryName = params.get('categoryName') || "";
            const queryFromUrl = params.get('search') || "";
            const jobLocation = params.get('jobLocation') || "";
            const province = params.get('province') || "";
            const page = parseInt(params.get('page'), 10) || 1;

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

            if (currentFilters.selectedSalaryRange) {
                const ranges = salaryRange[currentFilters.selectedSalaryType + '_range'];
                if (!ranges.includes(currentFilters.selectedSalaryRange)) {
                    isValid = false;
                }
            }

            setQuery(queryFromUrl);
            setProvince(province);
            setAppliedProvince(province);
            setJobLocation(jobLocation);
            setAppliedJobLocation(jobLocation);
            setCategoryName(categoryName);
            setAppliedCategoryName(categoryName);
            setCurrentPage(page);
            setFilters(currentFilters);
            setAppliedFilters(currentFilters);

            if (!isValid) {
                setShowAlert(true);
                setJobOffers([]);
                setTotalPages(0);
                navigate(`${location.pathname}`, { replace: true });
                return;
            }


            console.log("Query z URL:", queryFromUrl, "Province z URL:", province, "jobLocation z URL:", jobLocation, "categoryName z URL:", categoryName, "Page z URL:", page, "currentFilters z URL:", currentFilters);
            await fetchData(categoryName, queryFromUrl, jobLocation, province, page, currentFilters);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const updateUrl = (categoryName, query, jobLocation, province, page, currentFilters = filters) => {
        const params = new URLSearchParams();

        if (province) {
            params.set('province', province)
        }
        if (jobLocation && jobLocation !== 'undefined') {
            params.set('jobLocation', jobLocation);
        }
        if (categoryName && categoryName !== 'undefined') {
            params.set('categoryName', categoryName);
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
        console.log("W URL FILTRY: ", currentFilters)

        navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    };


    const handleChangePage = (page) => {
        setCurrentPage(page);
        console.log("Parametry strony: ", { categoryName, query, jobLocation, province, currentPage, filters });
        updateUrl(categoryName, query, jobLocation, province, page, filters);
        fetchData(categoryName, query, jobLocation, province, page, filters);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        setSearchQuery(query);
        updateUrl(categoryName, query, jobLocation, province, 1, filters);
        await fetchData(categoryName, query, jobLocation, province, 1, filters);
    };

    const clearSearch = () => {
        setQuery("");
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
            scrollToTop();
            updateUrl(categoryName, query, jobLocation, province, 1, filters);
            await fetchData(categoryName, query, jobLocation, province, 1, filters);
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

        updateUrl('', '', '', '', 1, newFilters);
        fetchData('', '', '', '', 1, newFilters);
    };

    const removeFilter = (filterType, valueToRemove) => {
        console.log(`Usuwanie filtra: ${filterType} z wartością: ${valueToRemove}`);

        let newFilters = { ...filters };
        let newProvince = province;
        let newJobLocation = jobLocation;
        let newCategoryName = categoryName;
        let newQuery = query;

        if (filterType === 'province') {
            newProvince = '';
            newJobLocation = '';
            console.log(`Resetowanie województwa i lokalizacji`);
        } else if (filterType === 'jobLocation') {
            newJobLocation = '';
            console.log(`Resetowanie lokalizacji`);
        } else if (filterType === 'categoryName') {
            newCategoryName = '';
            console.log(`Resetowanie kategorii`);
        } else if (filterType === 'query') {
            newQuery = '';
            console.log(`Resetowanie zapytania`);
        } else if (filterType === 'selectedSalaryType' || filterType === 'selectedSalaryRange') {
            newFilters.selectedSalaryType = null;
            newFilters.selectedSalaryRange = null;
            console.log(`Resetowanie typu i zakresu wynagrodzenia`);
        } else {
            if (Array.isArray(newFilters[filterType])) {
                newFilters[filterType] = [];
            } else {
                newFilters[filterType] = null;
            }
            console.log(`Resetowanie filtra ${filterType}`);
        }

        setFilters(newFilters);
        setAppliedFilters(newFilters);
        setProvince(newProvince);
        setAppliedProvince(newProvince);
        setJobLocation(newJobLocation);
        setAppliedJobLocation(newJobLocation);
        setCategoryName(newCategoryName);
        setAppliedCategoryName(newCategoryName);
        setQuery(newQuery);

        updateUrl(newCategoryName, newQuery, newJobLocation, newProvince, 1, newFilters);
        fetchData(newCategoryName, newQuery, newJobLocation, newProvince, 1, newFilters);
    };

    const areAnyFiltersApplied = () => {
        const isAnyStateSelected = appliedProvince || appliedJobLocation || appliedCategoryName;

        const isAnyFilterApplied = Object.entries(appliedFilters).some(([key, value]) => {
            if (Array.isArray(value)) {
                return value.length > 0;
            } else {
                return value !== null && value !== 'any';
            }
        });
        return isAnyFilterApplied || isAnyStateSelected;
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

    useEffect(() => {
        setIsLoading(true);
        fetchCategories()
            .then(data => {
                setCategories(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
        return () => setIsLoading(false);
    }, []);

    useEffect(() => {
        if (province === '') {
            setJobLocation('');
        }
        setAvailableJobLocations(province ? locationsByProvince[province] || [] : []);
    }, [province]);

    return (
        <main className="main_page">
            {isLoading ? (
                <div className="loading-container" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Ładowanie...</span>
                    </div>
                </div>
            ) : (
                <Container>
                    <Row>
                        <Col sm={4} className="filter-column">
                            {areAnyFiltersApplied() && (
                                <div className="active-filters">
                                    <h5>Aktywne filtry</h5>
                                    {appliedProvince && (
                                        <div className="active-filter-badge">
                                            <span className="text-muted">Wybrane województwo:</span>
                                            <span className="mx-2">{appliedProvince}</span>
                                            <RiDeleteBinLine
                                                className="text-danger p-0 ms-auto delete-pointer"
                                                onClick={() => removeFilter('province', province)}
                                            />
                                        </div>
                                    )}
                                    {appliedJobLocation && (
                                        <div className="active-filter-badge">
                                            <span className="text-muted">Wybrana lokalizacja:</span>
                                            <span className="mx-2">{appliedJobLocation}</span>
                                            <RiDeleteBinLine
                                                className="text-danger p-0 ms-auto delete-pointer"
                                                onClick={() => removeFilter('jobLocation', jobLocation)}
                                            />
                                        </div>
                                    )}
                                    {appliedCategoryName && (
                                        <div className="active-filter-badge">
                                            <span className="text-muted">Wybrana kategoria:</span>
                                            <span className="mx-2">{appliedCategoryName}</span>
                                            <RiDeleteBinLine
                                                className="text-danger p-0 ms-auto delete-pointer"
                                                onClick={() => removeFilter('categoryName', categoryName)}
                                            />
                                        </div>
                                    )}
                                    {
                                        Object.entries(appliedFilters).map(([key, value]) => {
                                            if (Array.isArray(value) && value.length === 0) return null;
                                            if (value === null) return null;
                                            return (
                                                <div key={`${key}-${value}`} className="active-filter-badge">
                                                    <span className="text-muted">{filterCategories[key]}:</span>
                                                    <span className="mx-2">{filtersCombined[value] || value}</span>
                                                    <RiDeleteBinLine
                                                        className="text-danger p-0 ms-auto delete-pointer"
                                                        onClick={() => removeFilter(key)}
                                                    />
                                                </div>
                                            );
                                        })
                                    }
                                    <div className="clear-filters-button" onClick={clearAllFilters}>
                                        <i className="bi bi-trash"></i> Wyczyść filtry
                                    </div>
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
                                    {salaryRange[filters.selectedSalaryType + '_range'].map(range => {
                                        return (
                                            <Form.Check
                                                key={range}
                                                type="radio"
                                                id={`salary-range-filter-${range}`}
                                                name="salary-range-filter"
                                                label={range}
                                                checked={filters.selectedSalaryRange === range}
                                                onChange={() => setFilters(prevFilters => ({
                                                    ...prevFilters,
                                                    selectedSalaryRange: range
                                                }))}
                                            />
                                        );
                                    })}
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
                                <div className="col-4">
                                    <InputGroup>
                                        <FormControl
                                            placeholder="Szukaj oferty po stanowisku"
                                            aria-label="Search"
                                            value={query}
                                            onChange={e => setQuery(e.target.value)}
                                        />
                                        {query && (
                                            <InputGroup.Text
                                                variant="outline-secondary"
                                                onClick={clearSearch}
                                                aria-label="Clear search"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                &times;
                                            </InputGroup.Text>
                                        )}
                                    </InputGroup>
                                </div>
                                <div className="col-2">
                                    <Form.Select aria-label="Województwo" value={province} onChange={e => setProvince(e.target.value)}>
                                        <option value="">Wybierz województwo</option>
                                        {Object.entries(provinceNames).map(([key, name]) => (
                                            <option key={key} value={name}>{name}</option>
                                        ))}
                                    </Form.Select>
                                </div>
                                <div className="col-2">
                                    <Form.Select aria-label="Lokalizacja" value={jobLocation} onChange={e => setJobLocation(e.target.value)}>
                                        <option value="">Wybierz lokalizację</option>
                                        {availableJobLocations.map((city, index) => (
                                            <option key={index} value={city}>{city}</option>
                                        ))}
                                    </Form.Select>
                                </div>
                                <div className="col-2">
                                    <Form.Select aria-label="Kategoria" value={categoryName} onChange={e => setCategoryName(e.target.value)}>
                                        <option value="">Wybierz kategorię</option>
                                        {categories.map((cat, index) => (
                                            <option key={index} value={cat.Category_name}>{cat.Category_name}</option>
                                        ))}
                                    </Form.Select>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button variant="custom-primary" type="submit">
                                        Szukaj oferty
                                    </Button>
                                </div>

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
            )}
        </main>

    );
}

export default JobOffersPage;
