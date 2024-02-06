import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';


function JobOffersPage() {
    const [oferty, setOferty] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [categoryChanged, setCategoryChanged] = useState(false);

    useEffect(() => {
        if (selectedCategory) {
            setCategoryChanged(true);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (categoryChanged) {
            setCurrentPage(0);
            setCategoryChanged(false);
        } else {
            const categoryPath = selectedCategory ? `/kategoria/${selectedCategory}` : '';
            const pageNumber = currentPage + 1; // Zmiana tutaj, jeśli numeracja stron zaczyna się od 1
            const url = `http://localhost:8000/oferty${categoryPath}/?page=${pageNumber}&limit=${itemsPerPage}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setOferty(data.results || []);
                    setPageCount(Math.ceil(data.count / itemsPerPage));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [categoryChanged, selectedCategory, currentPage]);


    const kategorie = [
        { id: 41, nazwa: 'Administracja biurowa' },
        { id: 42, nazwa: 'Badania i rozwój' },
        { id: 43, nazwa: 'Budowa / remonty' },
        { id: 44, nazwa: 'Dostawca, kurier miejski' },
        { id: 45, nazwa: 'E - commerce(handel internetowy)' },
        { id: 46, nazwa: 'Edukacja' },
        { id: 47, nazwa: 'Energetyka' },
        { id: 48, nazwa: 'Finanse / księgowość' },
        { id: 49, nazwa: 'Franczyza / Własna firma' },
        { id: 50, nazwa: 'Fryzjerstwo, kosmetyka' },
        { id: 51, nazwa: 'Gastronomia' },
        { id: 52, nazwa: 'HR' },
        { id: 53, nazwa: 'Hostessa, roznoszenie ulotek' },
        { id: 54, nazwa: 'Hotelarstwo' },
        { id: 55, nazwa: 'Inżynieria' },
        { id: 56, nazwa: 'IT / telekomunikacja' },
        { id: 57, nazwa: 'Kierowca' },
        { id: 58, nazwa: 'Logistyka, zakupy, spedycja' },
        { id: 59, nazwa: 'Marketing i PR' },
        { id: 60, nazwa: 'Mechanika i lakiernictwo' },
        { id: 61, nazwa: 'Montaż i serwis' },
        { id: 62, nazwa: 'Obsługa klienta i call center' },
        { id: 63, nazwa: 'Ochrona' },
        { id: 64, nazwa: 'Opieka' },
        { id: 65, nazwa: 'Praca za granicą' },
        { id: 66, nazwa: 'Prace magazynowe' },
        { id: 67, nazwa: 'Pracownik sklepu' },
        { id: 68, nazwa: 'Produkcja' },
        { id: 69, nazwa: 'Rolnictwo i ogrodnictwo' },
        { id: 70, nazwa: 'Sprzątanie' },
        { id: 71, nazwa: 'Sprzedaż' },
        { id: 72, nazwa: 'Wykładanie i ekspozycja towaru' },
        { id: 73, nazwa: 'Zdrowie' },
        { id: 74, nazwa: 'Pozostałe ofert pracy' },
        { id: 75, nazwa: 'Praktyki / staże' },
        { id: 76, nazwa: 'Kadra kierownicza' },
        { id: 77, nazwa: 'Praca sezonowa' },
    ];

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const currentItems = oferty;

    return (
        <div>
            <h1>Oferty Pracy</h1>
            <select onChange={e => setSelectedCategory(e.target.value)}>
                <option value="">Wybierz kategorię</option>
                {kategorie.map(Category => (
                    <option key={Category.id} value={Category.id}>
                        {Category.nazwa}
                    </option>
                ))}
            </select>
            <table className="table-fixed">
                <thead>
                    <tr>
                        <th className="column-id">Numer Oferty</th>
                        <th className="column-position">Stanowisko</th>
                        <th className="column-company">Firma</th>
                        <th className="column-location">Lokalizacja</th>
                        <th className="column-date">Data Publikacji</th>
                        <th className="column-link">Link</th>
                        <th className="column-work-model">Model Pracy</th>
                        <th className="column-contract">Rodzaj Umowy</th>
                        <th className="column-time">Wymiar Czasu Pracy</th>
                        <th className="column-salary">Zarobki</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((oferta, index) => (
                        <tr key={oferta.id}>
                            <td>{currentPage * itemsPerPage + index + 1}</td>
                            <td>{oferta.Position}</td>
                            <td>{oferta.Firm}</td>
                            <td>{oferta.Location}</td>
                            <td>{oferta.Date}</td>
                            <td><a href={oferta.Link} target="_blank" rel="noopener noreferrer">Link do oferty</a></td>
                            <td>{oferta.Job_model}</td>
                            <td>{oferta.Job_type}</td>
                            <td>{oferta.Working_hours}</td>
                            <td>{oferta.Earnings}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={'Poprzednia'}
                nextLabel={'Następna'}
                breakLabel={'...'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                forcePage={currentPage}
            />
        </div>
    );
}

export default JobOffersPage