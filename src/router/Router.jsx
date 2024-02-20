import { createBrowserRouter } from 'react-router-dom';
import JobOffersPage from '../pages/JobOffersPage';
import NotFoundPage from '../pages/NotFoundPage';
import HomePage from '../pages/HomePage';
import CategoriesPage from '../pages/categories_page/CategoriesPage';
import EmployersPage from '../pages/EmployersPage';
import JobOffersByCategory from '../pages/job_offers_by_category/JobOffersByCategory';
function Router() {
    return createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
            errorElement: <NotFoundPage />
        },
        {
            path: "/oferty",
            element: <JobOffersPage />
        },
        {
            path: "/oferty/kategoria/:categoryId",
            element: <JobOffersByCategory />
        },
        {
            path: "/kategorie",
            element: <CategoriesPage />
        },
        {
            path: "/pracodawcy",
            element: <EmployersPage />
        },

    ]);
}

export default Router
