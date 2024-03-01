import axios from 'axios';

const handleResponse = (response) => {
    const jobOffers = response.data.results || [];
    const totalItems = response.data.count || 0;
    const pageSize = 10;
    const totalPages = Math.ceil(totalItems / pageSize);
    return { jobOffers, totalPages, currentPage: parseInt(response.config.params.page) };
};

const fetchAllJobOffers = async (page) => {
    try {
        const response = await axios.get(`https://jobbufferback.azurewebsites.net/api/offers/`, { params: { page } });
        return handleResponse(response);
    } catch (error) {
        throw new Error(error.response?.data?.message || "Wystąpił błąd podczas pobierania wszystkich ofert pracy.");
    }
};

const fetchCategories = async () => {
    try {
        const response = await axios.get('https://jobbufferback.azurewebsites.net/api/categories/');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania kategorii:', error);
        throw new Error(error.response?.data?.message || "Wystąpił błąd podczas pobierania kategorii.");
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
        const response = await axios.get(`http://localhost:8000/api/offers/filter/`, { params });
        return handleResponse(response);
    } catch (error) {
        console.error('Błąd podczas wykonywania żądania do API:', error);
        throw new Error(error.response?.data?.message || "Wystąpił błąd podczas wyszukiwania ofert pracy.");
    }
};

const analysisByJobOffersWebiste = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/analysis/job_offers');
        return response.data;
    } catch (error) {
        console.error('Error fetching job offers analysis data: ', error);
        throw error;
    }
};

const analysisByJobOffersCategory = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/analysis/job_offers_category/');
        return response.data;
    } catch (error) {
        console.error('Error fetching job offers category analysis data: ', error);
        throw error;
    }
};

const analysisByAverageEarnings = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/analysis/average_earnings/');
        return (response.data);
    } catch (error) {
        console.error('Error fetching earnings data:', error);
        throw error;
    }
};

const analysisByEarningsHeatmap = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/analysis/earnings_heatmap/');
        return response.data;
    } catch (error) {
        console.error('Error fetching earnings heatmap data: ', error);
        throw error;
    }
};

const analysisByJobOffersPerDay = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/analysis/job_offers_by_day/');
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
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

export { fetchAllJobOffers, filterAllJobOffers, fetchCategories, analysisByJobOffersWebiste, analysisByJobOffersCategory, analysisByAverageEarnings, analysisByEarningsHeatmap, analysisByJobOffersPerDay };