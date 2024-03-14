import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Form, FormControl, Button } from 'react-bootstrap';
import { provinceNames, locationsByProvince } from '../../utils/Filters';
import { fetchCategories, filterAllJobOffers, jobOffersLocationMap } from '../../services/api/jobOffersService';
import { useNavigate } from 'react-router-dom';
import JobByLocationMap from '../../components/analysisCharts/job_by_location_map/JobByLocationMap';
import './home_page.css';

function HomePage() {

    const [query, setQuery] = useState('');
    const [province, setProvince] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [availableJobLocations, setAvailableJobLocations] = useState([]);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [locationMap, setLocationMap] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            const categoryName = categories.find(cat => cat.Category_name === category)?.Category_name;
            const result = await filterAllJobOffers(categoryName, query, jobLocation, province, page);

            if (result) {
                const searchParams = new URLSearchParams({
                    search: query,
                    jobLocation,
                    province,
                    categoryName,
                    page: page.toString(),
                }).toString();

                navigate(`/offers?${searchParams}`, {
                    state: {
                        jobOffers: result.jobOffers,
                        query,
                        jobLocation,
                        province,
                        categoryName,
                        page,
                    },
                });
            } else {
                console.error('Brak danych w odpowiedzi:', result);
            }
        } catch (error) {
            console.error('Błąd podczas wyszukiwania ofert pracy:', error);
        } finally {
            setIsLoading(false);
        }
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

    const fetchLocationMap = async () => {
        try {
            const locationMap = await jobOffersLocationMap();
            setLocationMap(locationMap);
            console.log("LocationMap: ", locationMap);
        } catch (error) {
            console.error('Error fetching LocationMap data: ', error);
        }
    };

    useEffect(() => {
        fetchLocationMap();
    }, []);

    return (
        <main className="main_page">
            {isLoading ? (
                <div className="loading-container" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Ładowanie...</span>
                    </div>
                </div>
            ) : (
                <Container fluid className="homepage-header">
                    <div className="header-content">
                        <h1>Znajdz pracę, która pokochasz</h1>
                        <p>Job Buffer to centrum ofert pracy, w którym z łatwością znajdziesz oferty, które przypadną Ci do gustu</p>
                    </div>
                    <div className="job-search">
                        <Form>
                            <Row>
                                <Col xs={12} md={4}>
                                    <FormControl
                                        placeholder="Szukaj oferty po stanowisku"
                                        aria-label="Search"
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                    />
                                </Col>
                                <Col xs={6} md={2}>
                                    <Form.Select aria-label="Województwo" value={province} onChange={e => setProvince(e.target.value)}>
                                        <option value="">Województwo</option>
                                        {Object.entries(provinceNames).map(([key, name]) => (
                                            <option key={key} value={name}>{name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col xs={6} md={2}>
                                    <Form.Select aria-label="Lokalizacja" value={jobLocation} onChange={e => setJobLocation(e.target.value)}>
                                        <option value="">Lokalizacja</option>
                                        {availableJobLocations.map((city, index) => (
                                            <option key={index} value={city}>{city}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col xs={6} md={2}>
                                    <Form.Select aria-label="Kategoria" value={category} onChange={e => setCategory(e.target.value)}>
                                        <option value="">Kategoria</option>
                                        {categories.map((cat, index) => (
                                            <option key={index} value={cat.Category_name}>{cat.Category_name}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col xs={6} md={2}>
                                    <Button className="home-button" variant="outline-secondary" type="submit" onClick={handleSubmit}>
                                        Szukaj oferty
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className="header-image"></div>
                </Container>
            )}
            <JobByLocationMap data={locationMap} />
        </main>
    );
}

export default HomePage;