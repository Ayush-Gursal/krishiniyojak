import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { Oval } from 'react-loader-spinner';


function Weather({ selectedCity }) {
    
    const [weather, setWeather] = useState({
        loading: false,
        data: null,
        error: false,
    });

    useEffect(() => {
        const fetchWeatherData = async () => {
            setWeather({ ...weather, loading: true });
            const url = 'https://api.openweathermap.org/data/2.5/weather';
            const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

            try {
                const response = await axios.get(url, {
                    params: {
                        q: selectedCity ,
                        units: 'metric',
                        appid: api_key,
                    },
                });
                setWeather({ data: response.data, loading: false, error: false });
            } catch (error) {
                setWeather({ ...weather, data: null, loading: false, error: true });
                console.log('error', error);
            }
        };

        fetchWeatherData();
    }, [selectedCity]);

    const toDateFunction = () => {
        const currentDate = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return currentDate.toLocaleDateString('en-US', options);
    };

    return (
        <div className="Weather">
           
            {weather.loading && (
                <>
                    <br />
                    <br />
                    <Oval type="Oval" color="black" height={100} width={100} />
                </>
            )}
            {weather.error && (
                <>
                    <br />
                    <br />
                    <span className="error-message">
                        <FontAwesomeIcon icon={faFrown} />
                        <span style={{ fontSize: '20px' }}>City not found</span>
                    </span>
                </>
            )}
            {weather.data && (
                <div>
                    <div className="city-name">
                        <h2>
                            {weather.data.name}, <span>{weather.data.sys.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{toDateFunction()}</span>
                    </div>
                    <div className="icon-temp">
                        <img
                            className=""
                            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                            alt={weather.data.weather[0].description}
                        />
                        {Math.round(weather.data.main.temp)}
                        <sup className="deg">°C</sup>
                    </div>
                    <div className="des-wind">
                        <p>{weather.data.weather[0].description.toUpperCase()}</p>
                        <p>Wind Speed: {weather.data.wind.speed}m/s</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;