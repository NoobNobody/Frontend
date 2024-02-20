import axios from 'axios';
import { dateFilters } from '../../utils/Filters';

const fetchAllJobOffers = async (categoryId, page) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/oferty/kategoria/${categoryId}/`, {
            params: { page }
        });
        const jobOffers = response.data && Array.isArray(response.data.results) ? response.data.results : [];
        const totalItems = response.data.count || 0;
        const pageSize = 10;
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            jobOffers,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        console.error("Error fetching all job offers", error);
        return { jobOffers: [], totalPages: 0, currentPage: page };
    }
};

const searchJobOffersByPosition = async (categoryId, page, searchQuery) => {
    try {
        console.log("Wpisana fraza: ", searchQuery);
        const response = await axios.get(`http://localhost:8000/api/oferty/kategoria/${categoryId}/search/`, {
            params: { page, search: searchQuery }
        });
        console.log("Szukaj query: ", response);
        const jobOffers = response.data && Array.isArray(response.data.results) ? response.data.results : [];
        const totalItems = response.data.count || 0;
        const pageSize = 10;
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            jobOffers,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        console.error("Error searching job offers by position", error);
        return { jobOffers: [], totalPages: 0, currentPage: page };
    }
};

const filtrateOffersByDate = async (categoryId, page, dateFilter) => {

    const params = new URLSearchParams({ page });
    if (dateFilter) {
        params.append('dateRange', dateFilter);
    }

    try {
        const response = await axios.get(`http://localhost:8000/api/oferty/kategoria/${categoryId}/?${params.toString()}`)
        console.log("Date filter query: ", response);
        const jobOffers = response.data && Array.isArray(response.data.results) ? response.data.results : [];
        const totalItems = response.data.count || 0;
        const pageSize = 10;
        const totalPages = Math.ceil(totalItems / pageSize);
        console.log("Fetch date:", response);
        return {
            jobOffers,
            totalPages,
            currentPage: page,
        };

    } catch (error) {
        console.error("Error fetching job offers and category name", error);
        return { jobOffers: [], totalPages: 0, currentPage: page };
    }
};

const filtrateOffersByWorkingHours = async (categoryId, page, WorkingHourTypes) => {

    const params = new URLSearchParams({ page });

    if (Array.isArray(WorkingHourTypes)) {
        WorkingHourTypes.forEach(type => params.append('WorkingHourTypes', type));
    }

    try {
        const response = await axios.get(`http://localhost:8000/api/oferty/filtrowane/${categoryId}/`, { params });
        console.log("Czas pracy filter query: ", response);
        const jobOffers = response.data && Array.isArray(response.data.results) ? response.data.results : [];
        const totalItems = response.data.count || 0;
        const pageSize = 10;
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            jobOffers,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        console.error("Error fetching job offers with employment type filtering", error);
        return { jobOffers: [], totalPages: 0, currentPage: page };
    }
};

const filtrateJobOffers = async (categoryId, page, filters) => {

    const { selectedDate, selectedJobType, selectedJobModel, selectedJobTime, selectedSalaryType,
        selectedSalaryRange } = filters;
    const params = new URLSearchParams({ page });

    if (selectedDate && selectedDate !== dateFilters.all) {
        params.append('dateRange', selectedDate);
    }

    selectedJobTime.forEach(type => params.append('workingHourTypes', type));
    selectedJobModel.forEach(type => params.append('jobModels', type));
    selectedJobType.forEach(type => params.append('jobType', type));

    if (selectedSalaryType && selectedSalaryRange && selectedSalaryRange !== 'any') {
        params.append('salaryType', selectedSalaryType);
        params.append('salaryRange', selectedSalaryRange);
    }

    try {
        console.log(params.toString());

        const response = await axios.get(`http://localhost:8000/api/oferty/filtrowane/${categoryId}/`, { params });


        const jobOffers = response.data && Array.isArray(response.data.results) ? response.data.results : [];
        const totalItems = response.data.count || 0;
        const pageSize = 10;
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            jobOffers,
            totalPages,
            currentPage: page,
        };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Endpoint not found or invalid parameters", error.response);
        } else {
            console.error("Error fetching filtered job offers", error);
        }
        // Możesz tutaj zdecydować, co zrobić w przypadku błędu.
    }
};



export { fetchAllJobOffers, searchJobOffersByPosition, filtrateOffersByDate, filtrateOffersByWorkingHours, filtrateJobOffers };