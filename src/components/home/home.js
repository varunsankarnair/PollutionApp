import React, { useState } from 'react';
import { getPollutionDetails } from './services'
import Graph from '../../ui-components/graph';
import  './styles.css'

export default function WeatherPage(){

    const [city, setCity] = useState([])
    const [data, setData] = useState([])
    const [graphData, setGraphData] = useState([])
    const [error, setError] = useState('')

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleSearch = (event) => {
        
        event.preventDefault();
        const cityValue = capitalizeFirstLetter(event.target.elements.city.value)
        setCity(cityValue)
        setGraphData([])
        getPollutionDetails(cityValue).then((resp => {
            if (resp.status === 200){
                if( resp.data.results.length > 0){
                    setData(resp.data.results)
                    setError('')
                }else{
                    setError('Data is not available, try with another city (eg: Mumbai, Chennai)')
                    setData([])
                }
            }else {
                setError('Api failed, try again')
                setData([])
            }
        }))
    }

    const handleDateSearch = async (event) => {
        event.preventDefault();
        const fromDate = event.target.elements.start.value;
        getPollutionDetails(city, fromDate).then((response) => {
            if(response.status === 200){
                const { results } = response.data;
                results.forEach((element) => element.dateValue = element.date.utc)
                setGraphData(results);
            }
        })
      };
        
    
        

    return(
        <div className="app">
            <div className="header">
                <h1>Pollution App</h1>
                <div>
                <form className="search-container" onSubmit={handleSearch}>
                    <input type="text" name="city" placeholder="enter city" className="search-field" />
                    <button className="search-button">Search</button>
                </form>
                </div>
                {data && data.length > 0 &&  <div>
                    <p className="separator">Select a date to show pollution data on a graph</p>
                    <form className="search-container" onSubmit={handleDateSearch}>
                        <label htmlFor="start">Start Date: </label>
                        <input type="date" id="start" name="start" className="form-input" />
                        <button className="search-button"> Submit Dates</button>
                    </form>
                </div>}
            </div>
            <div className="content">
                <div className="card-container">
                { data && data.length > 0 && graphData && graphData.length === 0  ? data.map((item, key) => {
                    return (
                        <div className="card" key={key}>
                            <h2>Value: {item.value} µg/m³</h2>
                            <p>Place: {item.location}</p>
                        </div>
                    )
                }) : 
                    <p className="error-message">{error}</p>
                }
                {graphData && graphData.length > 0 && <div className="graph-container">
                    <Graph data={data} />
                </div>}
                
                </div>
            </div>
    </div>
    )
}