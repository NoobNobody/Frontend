import { createBrowserRouter } from 'react-router-dom';
import JobOffersPage from '../pages/job_offers_page/JobOffersPage';
import NotFoundPage from '../pages/NotFoundPage';
import HomePage from '../pages/HomePage';
import CategoriesPage from '../pages/categories_page/CategoriesPage';
import AnalysisPage from '../pages/AnalysisPage';
import JobOffersByCategory from '../pages/job_offers_by_category/JobOffersByCategory';

function Router() {
    return createBrowserRouter([
        {
            path: "/",
            element: <HomePage />,
            errorElement: <NotFoundPage />
        },
        {
            path: "/offers",
            element: <JobOffersPage />
        },
        {
            path: "/offers/category/:categoryId",
            element: <JobOffersByCategory />
        },
        {
            path: "/categories",
            element: <CategoriesPage />
        },
        {
            path: "/analysis",
            element: <AnalysisPage />
        },

    ]);
}

export default Router
