import axios from 'axios';
// Import odpowiednich filtrów i konfiguracji

const fetchAllJobOffers = async (categoryId, page) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/oferty/kategoria/${categoryId}/`, { params: { page } });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const searchJobOffersByPosition = async (categoryId, page, searchQuery) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/oferty/kategoria/${categoryId}/search/`, {
            params: { page, search: searchQuery }
        });
        return handleResponse(response);
    } catch (error) {
        throw new Error(error.response?.data?.message || "Wystąpił błąd podczas wyszukiwania ofert pracy.");
    }
};

const filtrateJobOffers = async (categoryId, page, filters) => {
    try {
        const params = createFilterParams(filters, page);
        const response = await axios.get(`http://localhost:8000/api/oferty/filtrowane/${categoryId}/`, { params });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

// Pomocnicze funkcje do obsługi odpowiedzi i błędów
const handleResponse = (response) => {
    const jobOffers = response.data.results || [];
    const totalItems = response.data.count || 0;
    const pageSize = 10;
    const totalPages = Math.ceil(totalItems / pageSize);
    return { jobOffers, totalPages, currentPage: parseInt(response.config.params.page) };
};

const handleError = (error) => {
    console.error("Error fetching data", error);
    return { jobOffers: [], totalPages: 0, currentPage: 0 };
};

const createFilterParams = (filters, page) => {
    const params = new URLSearchParams({ page });

    Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(singleValue => {
                if (singleValue) params.append(key, singleValue);
            });
        } else if (value) {
            params.set(key, value);
        }
    });

    return params;
};

export { fetchAllJobOffers, searchJobOffersByPosition, filtrateJobOffers };