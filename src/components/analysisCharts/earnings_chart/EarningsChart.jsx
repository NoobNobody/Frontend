import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function EarningsChart({ data, color, name }) {
    const formatter = (value, name, props) => {
        return [`${value} PLN`, name];
    };

    return (
        <ResponsiveContainer width="100%" height={400} >
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={formatter} />
                <Legend />
                <Bar dataKey="value" fill={color} name={name} />
            </BarChart>
        </ResponsiveContainer>
    );
}

function AnalysisPage({ data }) {
    const hourlyData = [
        { name: 'Minimalne', value: data.min_hourly_earnings },
        { name: 'Średnie', value: data.average_hourly_earnings },
        { name: 'Maksymalne', value: data.max_hourly_earnings },
    ];

    const monthlyData = [
        { name: 'Minimalne', value: data.min_monthly_earnings },
        { name: 'Średnie', value: data.average_monthly_earnings },
        { name: 'Maksymalne', value: data.max_monthly_earnings },
    ];

    return (
        <ResponsiveContainer height={400} className="category-analise-container">
            <h3 style={{ textAlign: 'center' }}>Analiza zarobków</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '50%' }}>
                    <h4 style={{ textAlign: 'center' }}>Zarobki godzinowe</h4>
                    <EarningsChart data={hourlyData} color="#8884d8" name="Zarobki godzinowe" />
                </div>
                <div style={{ width: '50%' }}>
                    <h4 style={{ textAlign: 'center' }}>Zarobki miesięczne</h4>
                    <EarningsChart data={monthlyData} color="#82ca9d" name="Zarobki miesięczne" />
                </div>
            </div>
        </ResponsiveContainer>


    );
}

export default AnalysisPage;
