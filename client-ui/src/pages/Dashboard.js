import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Results() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:7000/results')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => console.error("Error fetching results:", error));
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {data.map((result, index) => (
                <div key={index}>
                    <h2>Role: {result.role}</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart 
                            data={result.candidates} 
                            margin={{top: 15, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="votes_number" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
}

export default Results;
