import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#00cc00', '#ff3300', '#663300', '#6600ff', '#0099ff', '#332F2F', '#006600', '#669999'];

const renderCustomizedLabel = ({
    cx, cy, midAngle, outerRadius, index, payload
}) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 10;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text
            x={x}
            y={y}
            fill={COLORS[index % COLORS.length]}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            strok="none"
        >
            {`${payload.Website__Website_name}: ${payload.offers_count}`}
        </text>
    );
};

const WebsiteChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={600}>
        <h3 style={{ textAlign: 'center' }}>Analiza ofert pracy z danej strony internetowej</h3>
        <PieChart>
            <Pie
                dataKey="offers_count"
                nameKey="Website__Website_name"
                isAnimationActive={false}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={renderCustomizedLabel}
                labelLine={false}
                stroke="none"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    </ResponsiveContainer>
);

export default WebsiteChart;
