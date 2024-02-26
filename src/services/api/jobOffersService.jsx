import axios from 'axios';

const fetchAllJobOffers = async (page) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/all_offers/`, { params: { page } });
        return handleResponse(response);
    } catch (error) {
        throw new Error(error.response?.data?.message || "Wystąpił błąd podczas pobierania wszystkich ofert pracy.");
    }
};

const fetchAllJobOffersByCategory = async (categoryId, page) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/oferty/kategoria/${categoryId}/`, { params: { page } });
        return handleResponse(response);
    } catch (error) {
        return handleError(error);
    }
};

const searchJobOffersByPositionAndProvince = async (searchQuery, province, page) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/offers/`, {
            params: { search: searchQuery, province, page }
        });
        return handleResponse(response);
    } catch (error) {
        throw new Error(error.response?.data?.message || "Wystąpił błąd podczas wyszukiwania ofert pracy.");
    }
};

const filtrateJobOffers = async (categoryId, page, filters, searchQuery = "") => {
    try {
        const params = createFilterParams(filters, page, searchQuery);
        const response = await axios.get(`http://localhost:8000/api/oferty/filtrowane/${categoryId}/`, { params });
        return handleResponse(response);
    } catch (error) {
        throw new Error(error.response?.data?.message || "Wystąpił błąd podczas wyszukiwania ofert pracy.");
    }
};

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

const createFilterParams = (filters, page, searchQuery) => {
    const params = new URLSearchParams({ page, search: searchQuery });

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

const filtrateAndSearchAllJobOffers = async (query, province, currentPage, filters) => {
    try {
        const params = createFilterParams(filters, currentPage, query);
        params.set('province', province);

        const response = await axios.get(`http://localhost:8000/api/all_offers/search/`, { params: params });
        return handleResponse(response);
    } catch (error) {
        throw new Error(error.response?.data?.message || "Wystąpił błąd podczas wyszukiwania ofert pracy.");
    }
};


export { fetchAllJobOffers, fetchAllJobOffersByCategory, searchJobOffersByPositionAndProvince, filtrateJobOffers, filtrateAndSearchAllJobOffers };