import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { fetchAllJobOffers, searchJobOffersByPosition, filtrateJobOffers } from '../../services/api/jobOffersService';
import CustomPagination from '../../components/pagination/CustomPagination';
import JobCard from '../../components/job_card/JobCard';
import { scrollToTop } from '../../utils/scrollToTop';
import './joboffersbycategory.css';
import Filters from '../../containers/Filters'


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


    const [selectedSalaryType, setSelectedSalaryType] = useState();
    const [selectedSalaryRange, setSelectedSalaryRange] = useState();
    const [filtersApplied, setFiltersApplied] = useState();

    const [filters, setFilters] = useState({
        selectedDate: null,
        selectedJobTime: [],
        selectedJobModel: [],
        selectedJobType: [],
        selectedSalaryType: null,
        selectedSalaryRange: null,
    });

    // Pobieranie danych
    const fetchData = async (page) => {
        console.log(`Fetching data for category: ${categoryId}, page: ${page}`);

        let response;
        if (searchQuery) {
            response = await searchJobOffersByPosition(categoryId, page, searchQuery);
            console.log(`searchJobOffersByPosition called with categoryId: ${categoryId}, page: ${page}, query: ${searchQuery}`);
        } else if (Object.values(filters).some(filter => filter)) {
            response = await filtrateJobOffers(categoryId, page, filters);
            console.log(`filtrateJobOffers called with categoryId: ${categoryId}, page: ${page}, filters:`, filters);
        } else {
            response = await fetchAllJobOffers(categoryId, page);
            console.log(`fetchAllJobOffers called with categoryId: ${categoryId}, page: ${page}`);
        }

        if (response) {
            setJobOffers(response.jobOffers);
            setTotalPages(response.totalPages);
            setCurrentPage(page);
            console.log("Offers fetched successfully.");
        } else {
            console.log("Failed to fetch offers.");
        }
    };

    // Pobieranie wszystkich ofert
    const fetchInitialJobOffers = async () => {
        console.log("Fetching initial job offers");
        const response = await fetchAllJobOffers(categoryId, 1);
        if (response) {
            setJobOffers(response.jobOffers);
            setTotalPages(response.totalPages);
            setCurrentPage(1);
            scrollToTop();
        } else {
            console.log("No response or error in fetchInitialJobOffers");
        }
    };

    // Logika przejścia do kolejnej strony
    useEffect(() => {
        const page = new URLSearchParams(location.search).get('page') || 1;
        fetchData(page);
    }, [location.search, categoryId, filters]);

    // Zmiana strony bez stosowania kryteriów wyszukiwania
    const handleChangePage = (newPage) => {
        console.log(`Page change requested to ${newPage}`);
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('page', newPage);
        console.log(`Navigating to page ${newPage} with filters: ${searchParams.toString()}`);
        navigate(`/oferty/kategoria/${categoryId}/?${searchParams.toString()}`);
    };

    // Zmiana strony z uwzględnieniem kryteriów wyszukiwania
    const handleSearchPageChange = (newPage) => {
        console.log(`Page change requested to ${newPage} with query: ${searchQuery}`);
        fetchData(newPage);
    };

    // Wyszukiwanie ofert po stanowisku
    const onSubmitSearch = async (e) => {
        e.preventDefault();
        console.log(`Submitting search for ${query}`);
        const response = await searchJobOffersByPosition(categoryId, 1, query);
        console.log("Response from searchJobOffersByPosition:", response);

        if (response.jobOffers.length === 0) {
            console.log("No job offers found for the search");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                setQuery("");
                setSearchQuery("");
                fetchInitialJobOffers();
            }, 5000);
        } else {
            setSearchQuery(query);
            setJobOffers(response.jobOffers);
            setTotalPages(response.totalPages);
            setCurrentPage(1);
            scrollToTop();
        }
    };

    // Obsługa kasowania zawartości pola query i searchquery
    const clearSearch = () => {
        console.log("Clearing search");
        if (searchQuery) {
            fetchInitialJobOffers();
        }
        setQuery("");
        setSearchQuery("");
        scrollToTop();
    };

    // Filtrowanie ofert
    const submitFilters = async (e) => {
        e.preventDefault();

        if (selectedSalaryType === 'any' || selectedSalaryRange === 'any') {
            alert('Proszę wybrać zarówno typ wynagrodzenia, jak i zakres wynagrodzenia.');
            return;
        }

        const response = await filtrateJobOffers(categoryId, 1, filters);

        if (response.jobOffers.length === 0) {
            console.log("No job offers found. Showing alert.");
            scrollToTop();
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                fetchInitialJobOffers();
            }, 5000);
        } else {
            setFiltersApplied(true);
            setJobOffers(response.jobOffers);
            setTotalPages(response.totalPages);
            setCurrentPage(1);
            scrollToTop();
            setShowAlert(false);
        }
    };


    const clearAllFilters = async () => {
        const response = await filtrateJobOffers(categoryId, 1, filters);
        console.log("Clearing all filters.");
        setFilters({
            selectedDate: null,
            selectedJobTime: [],
            selectedJobModel: [],
            selectedJobType: [],
            selectedSalaryType: null,
            selectedSalaryRange: null,
        });
        setFiltersApplied(false);
        setCurrentPage(1);
        navigate(`/oferty/kategoria/${categoryId}/?page=1`);
        fetchData();
        console.log("All filters cleared.");
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
                    <Filters
                        filters={filters}
                        setFilters={setFilters}
                        selectedSalaryType={selectedSalaryType}
                        setSelectedSalaryType={setSelectedSalaryType}
                        selectedSalaryRange={selectedSalaryRange}
                        setSelectedSalaryRange={setSelectedSalaryRange}
                        submitFilters={submitFilters}
                        clearAllFilters={clearAllFilters}
                        filtersApplied={filtersApplied}
                    />
                </Col>
                <Col sm={8}>
                    <InputGroup className="mb-3" as="form" onSubmit={onSubmitSearch}>
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
                            onPageChange={searchQuery ? handleSearchPageChange : handleChangePage}
                        />
                    </div>
                </Col>
            </Row>
        </Container >
    );
}

export default JobOffersByCategory;