import React, { useState } from 'react';
import SearchBar from "../components/SearchBar";
import { Container, Row, Col, Form, FormControl, InputGroup, Button, Alert } from 'react-bootstrap';
import { provinceNames } from '../utils/Filters';
import { searchJobOffersByPositionAndProvince } from '../services/api/jobOffersService';
import { useNavigate } from 'react-router-dom';

function HomePage() {

    const [query, setQuery] = useState('');
    const [province, setProvince] = useState('');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const result = await searchJobOffersByPositionAndProvince(query, province, page);
            if (result) {
                const searchParams = new URLSearchParams({
                    search: query,
                    province,
                    page: page.toString(),
                }).toString();

                navigate(`/offers/?${searchParams}`, {
                    state: {
                        jobOffers: result,
                        query,
                        province,
                        page,
                    },
                });
                setIsLoading(false);
            } else {
                console.error('Brak danych w odpowiedzi:', result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Błąd podczas wyszukiwania ofert pracy:', error);
            setIsLoading(false);
        }
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
        <main>
            <div className="container mt-5">
                <InputGroup className="mb-3" as="form" onSubmit={handleSubmit}>
                    <FormControl
                        placeholder="Szukaj oferty po stanowisku"
                        aria-label="Search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <Form.Select aria-label="Województwo" value={province} onChange={e => setProvince(e.target.value)}>
                        <option value="">Wybierz województwo</option>
                        {Object.entries(provinceNames).map(([key, name]) => (
                            <option key={key} value={name}>{name}</option>
                        ))}
                    </Form.Select>
                    <Button variant="outline-secondary" type="submit">
                        Search
                    </Button>
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
                <div className="mt-5">
                    XD
                </div>
            </div>
        </main >
    );
}

export default HomePage;