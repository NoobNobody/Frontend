import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OffersPerDayChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={600} className="category-analise-container">
            <h3 style={{ textAlign: 'center' }}>Dodane oferty w przedziale czasowym</h3>
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 15,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" label={{ value: 'Dzień', position: 'insideBottomRight', offset: -10 }} />
                <YAxis allowDecimals={false} label={{ value: 'Liczba ofert', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value, name) => [value, 'Liczba ofert']} />
                <Line type="monotone" dataKey="offers_count" name="Liczba ofert" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default OffersPerDayChart;
