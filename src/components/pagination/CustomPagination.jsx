import React from 'react';
import { Pagination } from 'react-bootstrap';
import './custom_pagination.css';

function CustomPagination({ currentPage, totalPages, onPageChange }) {
    // Pomocnicza funkcja do generowania zakresu numerów stron
    const range = (from, to) => {
        let i = from;
        const range = [];
        while (i <= to) {
            range.push(i);
            i++;
        }
        return range;
    };

    function fetchPageNumbers() {
        let pages = [];

        if (totalPages <= 7) {
            // Jeśli całkowita liczba stron jest mniejsza lub równa 7, pokazujemy wszystkie bez "..."
            pages = range(1, totalPages);
        } else {
            // Zawsze pokazujemy pierwszą stronę
            pages.push(1);

            // Definiowanie dynamicznego zakresu stron w zależności od bieżącej strony
            let startPage, endPage;

            // Specjalne traktowanie dla stron blisko początku
            if (currentPage < 5) {
                startPage = 2;
                endPage = 5;
                pages.push(...range(startPage, endPage), '...');
            } else if (currentPage > totalPages - 4) {
                // Dla ostatnich 4 stron pokazujemy '...' i ostatnie 4 strony
                startPage = totalPages - 4;
                pages.push('...', ...range(startPage, totalPages));
            } else {
                // Dla pozostałych stron pokazujemy '...' po obu stronach wybranego zakresu stron
                startPage = currentPage - 1;
                endPage = currentPage + 1;
                pages.push('...', ...range(startPage, endPage), '...');
            }

            // Zawsze pokazujemy ostatnią stronę, jeśli nie jesteśmy w zakresie ostatnich 4 stron
            if (currentPage <= totalPages - 4) {
                pages.push(totalPages);
            }
        }

        return pages;
    }

    const pages = fetchPageNumbers();

    return (
        <Pagination>
            {currentPage > 1 && (
                <Pagination.Item onClick={() => onPageChange(currentPage - 1)}>
                    Poprzednia
                </Pagination.Item>
            )}
            {pages.map((page, index) => (
                <React.Fragment key={index}>
                    {page === '...' ? (
                        <Pagination.Ellipsis />
                    ) : (
                        <Pagination.Item active={page === currentPage} onClick={() => onPageChange(page)}>
                            {page}
                        </Pagination.Item>
                    )}
                </React.Fragment>
            ))}
            {currentPage < totalPages && (
                <Pagination.Item onClick={() => onPageChange(currentPage + 1)}>
                    Następna
                </Pagination.Item>
            )}
        </Pagination>
    );
}
export default CustomPagination