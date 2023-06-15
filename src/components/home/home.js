import React, { useState } from 'react';
import axios from 'axios';
import  './styles.css'

export default function WeatherPage(){

    const [city, setCity] = useState([])
    const [data, setData] = useState([])
    const [graphData, setGraphData] = useState([])
    const [error, setError] = useState('')

    const handleSearch = (event) => {
        
        event.preventDefault();
        const cityValue = event.target.elements.city.value;
        setCity(cityValue)
        axios.get(`https://api.openaq.org/v2/measurements?limit=2&location=${cityValue}`).then((resp => {
            if (resp.status === 200){
                if( resp.data.results.length > 0){
                    setData(resp.data.results)
                }else{
                    setError('Data is not available, try with another city (eg: Mumbai, Chennai)')
                    setData([])
                }
            }else {
                setError('Data is not available, try with another city (eg: Mumbai, Chennai)')
                setData([])
            }
        }))
    }

    const handleDateSearch = (event) => {
        event.preventDefault();
        const fromDate = event.target.elements.start.value;
        const toDate = event.target.elements.end.value;
        console.log('fromDate', fromDate);
        console.log('toDate', toDate);
        axios.get(`https://api.openaq.org/v2/measurements?limit=2&location=${city}&date=${fromDate}`).then((resp => {
            if (resp.status === 200){
                setGraphData(resp.data.results)
            }
        }))
        
    }
        

    return(
        <div className="app">
            <div className="header">
                <h1>Weather App</h1>
                <div>
                <form className="search-container" onSubmit={handleSearch}>
                    <input type="text" name="city" placeholder="enter city" className="search-field" />
                    <button className="search-button">Search</button>
                </form>
                </div>
                {data && data.length > 0 && <div>
                <p className="separator">Select between dates to display in graph format</p>
                <form className="search-container" onSubmit={handleDateSearch}>
                    <label htmlFor="start">Start Date: </label>
                    <input type="date" id="start" name="start" className="form-input" />
                    <label htmlFor="end">End Date: </label>
                    <input type="date" id="end" name="end" className="form-input" />
                    <button className="search-button"> Submit Dates</button>
                </form>
                </div>}
            </div>
            <div className="content">
                <div className="card-container">
                    {console.log('data', data)} 
                { data && data.length > 0 ? data.map((item, key) => {
                    return (
                        <div className="card" key={key}>
                            <h2>Name: Vaarun</h2>
                            <p>Address: hjhjhjhjhj</p>
                        </div>
                    )
                }) : 
                    <p className="error-message">{error}</p>
                }
                </div>
            </div>
    </div>
    )
}