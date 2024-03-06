import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Text, ResponsiveContainer } from 'recharts';

function CustomizedAxisTick(props) {
    const { x, y, payload } = props;

    return (
        <Text
            x={x}
            y={y}
            width={90}
            angle={-50}
            textAnchor="end"
            verticalAnchor="start"
        >
            {payload.value}
        </Text>
    );
}

const CategoryChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={500} className="mt-5">
            <h3 style={{ textAlign: 'center' }}>Analiza ofert pracy z danej kategorii</h3>
            <BarChart width={1500} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="Category__Category_name"
                    interval={0}
                    tick={<CustomizedAxisTick />}
                    height={150}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="offers_count" fill="#0099ff" name="Ilość ofert" />
            </BarChart></ResponsiveContainer>

    );
}

export default CategoryChart;
