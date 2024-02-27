import React from 'react';
import { Pagination } from 'react-bootstrap';
import './custom_pagination.css';

function CustomPagination({ currentPage, totalPages, onPageChange }) {
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
            pages = range(1, totalPages);
        } else {
            pages.push(1);

            let startPage, endPage;

            if (currentPage < 5) {
                startPage = 2;
                endPage = 5;
                pages.push(...range(startPage, endPage), '...');
            } else if (currentPage > totalPages - 4) {
                startPage = totalPages - 4;
                pages.push('...', ...range(startPage, totalPages));
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
                pages.push('...', ...range(startPage, endPage), '...');
            }
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