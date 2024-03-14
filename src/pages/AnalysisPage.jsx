import React, { useState, useEffect } from 'react';
import { analysisByJobOffersWebiste, analysisByJobOffersCategory, analysisByAverageEarnings, analysisByEarningsHeatmap, analysisByJobOffersPerDay } from '../services/api/jobOffersService';
import EarningsChart from '../components/analysisCharts/earnings_chart/EarningsChart';
import WebsiteChart from '../components/analysisCharts/websiteChart/WebsiteChart';
import CategoryChart from '../components/analysisCharts/category_chart/CategoryChart';
import HeatMapChart from '../components/analysisCharts/heatmap_chart/HeatMapChart';
import OffersPerDayChart from '../components/analysisCharts/offers_per_day_chart/OffersPerDayChart';

function AnalysisPage() {
    const [websiteData, setWebsiteData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [earningsData, setEarningsData] = useState({ average_hourly_earnings: 0, average_monthly_earnings: 0 });
    const [heatmapData, setHeatmapData] = useState([]);
    const [offersPerDayData, setOffersPerDayData] = useState([]);

    const fetchWebsiteData = async () => {
        try {
            const websiteData = await analysisByJobOffersWebiste();
            setWebsiteData(websiteData);
            console.log("Website data: ", websiteData);
        } catch (error) {
            console.error('Error fetching website data: ', error);
        }
    };

    const fetchCategoryData = async () => {
        try {
            const analysisData = await analysisByJobOffersCategory();
            const topCategories = analysisData.slice(0, 10);
            const othersCount = analysisData.slice(10).reduce((acc, curr) => acc + curr.offers_count, 0);
            topCategories.push({ Category__Category_name: 'Inne', offers_count: othersCount });
            setCategoryData(topCategories);
            console.log("Categories data: ", analysisData);
            console.log("Top Categories data: ", topCategories);
        } catch (error) {
            console.error('Error fetching category data: ', error);
        }
    };

    const fetchEarningsData = async () => {
        try {
            const earningsData = await analysisByAverageEarnings();
            setEarningsData(earningsData);
            console.log("Earnings data: ", earningsData);
        } catch (error) {
            console.error('Error fetching earnings data:', error);
        }
    };

    const fetchHeatmapData = async () => {
        try {
            const heatmapData = await analysisByEarningsHeatmap();
            setHeatmapData(heatmapData);
            console.log("HeatMapa: ", heatmapData);
        } catch (error) {
            console.error('Error fetching heatmap data: ', error);
        }
    };

    const fetchOffersPerDay = async () => {
        try {
            const offersPerDayData = await analysisByJobOffersPerDay();
            setOffersPerDayData(offersPerDayData);
            console.log("OffersPerDayData: ", offersPerDayData);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    useEffect(() => {
        fetchHeatmapData();
        fetchEarningsData();
        fetchCategoryData();
        fetchWebsiteData();
        fetchOffersPerDay();
    }, []);

    return (
        <main className="main_page_analysis">
            <WebsiteChart data={websiteData} />
            <CategoryChart data={categoryData} />
            <EarningsChart data={earningsData} />
            <HeatMapChart data={heatmapData} />
            <OffersPerDayChart data={offersPerDayData} />
        </main>
    );
}

export default AnalysisPage;
