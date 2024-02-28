import React, { useState, useEffect } from 'react';
import SearchBar from "../components/SearchBar";
import { Container, Row, Col, Form, FormControl, InputGroup, Button, Alert } from 'react-bootstrap';
import { provinceNames, locationsByProvince } from '../utils/Filters';
import { fetchCategories, filterAllJobOffers } from '../services/api/jobOffersService';
import { useNavigate } from 'react-router-dom';

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
        <main>
            <div className="container mt-5">
                <InputGroup className="mb-3" as="form" onSubmit={handleSubmit}>
                    <div className="col-4">
                        <FormControl
                            placeholder="Szukaj oferty po stanowisku"
                            aria-label="Search"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
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
                        <Form.Select aria-label="Kategoria" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="">Wybierz kategorię</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat.Category_name}>{cat.Category_name}</option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button variant="outline-secondary" type="submit">
                            Szukaj oferty
                        </Button>
                    </div>

                </InputGroup>


                <div className="text-start mt-4">
                    <h2>Twoja nowa praca</h2>
                    <p>
                        Znajdź swoją nową pracę już dziś.
                    </p>
                </div>
                <div className="d-flex mt-5">
                    <SearchBar />
                </div>
                <div className="mt-5">
                    <h2 >Kategorie prac</h2>
                    <p>
                        Sprawdź ile prac mamy w najbardziej popularnych kategoriach.
                    </p>
                </div>
                <div className="mt-5">
                    {/* <JobCategories /> */}
                </div>
            </div >
        </main >
    );
}

export default HomePage;