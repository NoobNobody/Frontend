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

const filtrateAndSearchJobOffersByCategory = async (categoryId, page, filters, searchQuery = "") => {
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
    const params = new URLSearchParams();

    if (searchQuery && searchQuery !== 'undefined') {
        params.set('search', searchQuery);
    }

    if (page && page !== 'undefined') {
        params.set('page', page.toString());
    }

    if (typeof filters === 'object' && filters !== null) {
        Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(singleValue => {
                    if (singleValue && singleValue !== 'undefined') {
                        params.append(key, singleValue);
                    }
                });
            } else if (value && value !== 'undefined') {
                params.set(key, value);
            }
        });
    }

    return params;
};


const searchJobOffersByPositionAndProvince = async (searchQuery, province, page) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/offers/search/`, {
            params: { search: searchQuery, province, page }
        });
        return handleResponse(response);
    } catch (error) {
        throw new Error(error.response?.data?.message || "Wystąpił błąd podczas wyszukiwania ofert pracy.");
    }
};


const filtrateAndSearchAllJobOffers = async (query, province, jobLocation, currentPage, filters) => {
    try {
        const params = createFilterParams(filters, currentPage, query);

        if (province && province !== 'undefined') {
            params.set('province', province);
        }
        if (jobLocation && jobLocation !== 'undefined') {
            params.set('jobLocation', jobLocation);
        }

        const response = await axios.get(`http://localhost:8000/api/offers/search/`, { params: params });
        return handleResponse(response);
    } catch (error) {
        throw new Error(error.response?.data?.message || "Wystąpił błąd podczas wyszukiwania ofert pracy.");
    }
};

const filterAllJobOffers = async (categoryName, query, jobLocation, province, currentPage, filters) => {
    try {
        const params = createFilterParams(filters, currentPage, query);

        if (categoryName && categoryName !== 'undefined') {
            params.set('categoryName', categoryName);
        }
        if (province && province !== 'undefined') {
            params.set('province', province);
        }
        if (jobLocation && jobLocation !== 'undefined') {
            params.set('jobLocation', jobLocation);
        }
        params.set('page', currentPage.toString());
        const response = await axios.get(`http://localhost:8000/api/offers/zwraca/`, { params });
        return handleResponse(response);
    } catch (error) {
        console.error('Błąd podczas wykonywania żądania do API:', error);
        throw new Error(error.response?.data?.message || "Wystąpił błąd podczas wyszukiwania ofert pracy.");
    }
};



const fetchCategories = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/categories/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania kategorii:', error);
        throw new Error(error.response?.data?.message || "Wystąpił błąd podczas pobierania kategorii.");
    }
};


export { filterAllJobOffers, fetchAllJobOffers, fetchAllJobOffersByCategory, filtrateAndSearchJobOffersByCategory, filtrateAndSearchAllJobOffers, searchJobOffersByPositionAndProvince, fetchCategories };