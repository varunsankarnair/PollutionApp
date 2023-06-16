import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function Graph(props){

    const graphdata = props.data
    
    return (
        <LineChart width={600} height={300} data={graphdata}>
            <Line type="monotone" dataKey='value' stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey='location' />
            <YAxis />
        </LineChart>
    )
}