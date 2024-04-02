import React from 'react';
import Weather from '../components/weather';
import './weather.css';
function WeatherPage() {
    // Assuming selectedCity is obtained from the user's profile
    const selectedCity = 'Mumbai';

    return (
        <div>
            
            <Weather selectedCity={selectedCity} />
        </div>
    );
}

export default WeatherPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Weather from '../components/weather';
// import './weather.css';

// function WeatherPage() {
//     const [currentWeather, setCurrentWeather] = useState(null);
//     const [forecast, setForecast] = useState(null);
//     const selectedCity = 'Mumbai'; // Assuming selectedCity is obtained from the user's profile

//     useEffect(() => {
//         // Define the API endpoint URLs for current weather and forecast
//         const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=YOUR_API_KEY&units=metric`;
//         const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=YOUR_API_KEY&units=metric`;

//         // Make an HTTP GET request using Axios to fetch current weather
//         axios.get(currentWeatherUrl)
//             .then(response => {
//                 setCurrentWeather(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching current weather data:', error);
//             });

//         // Make an HTTP GET request using Axios to fetch forecast data
//         axios.get(forecastUrl)
//             .then(response => {
//                 setForecast(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching forecast data:', error);
//             });
//     }, [selectedCity]); // Fetch weather data whenever selectedCity changes

//     return (
//         <div>
//             {currentWeather && forecast ? (
//                 <div>
//                     <Weather weatherData={currentWeather} />
//                     <h2>Next 7 Days Forecast</h2>
//                     <div className="forecast-container">
//                         {forecast.list.map((item, index) => (
//                             <div key={index} className="forecast-item">
//                                 <p>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</p>
//                                 <p>{item.weather[0].description}</p>
//                                 <p>Temperature: {item.main.temp}°C</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// }

// export default WeatherPage;
