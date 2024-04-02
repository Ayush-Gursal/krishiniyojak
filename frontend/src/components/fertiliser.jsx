// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './cropprice.css'; // Import CSS file

// function Fertiliser() {
//   const [fieldsData, setFieldsData] = useState({
//     temperature: '',
//     humidity: '',
//     moisture: '',
//     soilType: '',
//     cropType: '',
//     nitrogen: '',
//     potassium: '',
//     phosphorous: ''
//   });
//   const [outputData, setOutputData] = useState(null);

//   useEffect(() => {
//     // Fetch initial data using Axios
//     axios.get('your_api_endpoint')
//       .then(response => {
//         setFieldsData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFieldsData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Axios PUT request to update data
//     axios.put('your_api_endpoint', fieldsData)
//       .then(response => {
//         console.log('Data updated successfully:', response.data);
//         setOutputData(response.data); // Store output data
//       })
//       .catch(error => {
//         console.error('Error updating data:', error);
//       });
//   };

//   return (
//     <div className="fertiliser-container">
//       <h2 className="fertiliser-title">Fertiliser Form</h2>
//       <form className="fertiliser-form" onSubmit={handleSubmit}>
//         {/* Input fields */}
//         <label className="fertiliser-label">
//           Temperature:
//           <input
//             type="text"
//             name="temperature"
//             value={fieldsData.temperature}
//             onChange={handleChange}
//             className="fertiliser-input"
//           />
//         </label>
//         <br />
//         <label className="fertiliser-label">
//           Humidity:
//           <input
//             type="text"
//             name="humidity"
//             value={fieldsData.humidity}
//             onChange={handleChange}
//             className="fertiliser-input"
//           />
//         </label>
//         <br />
//         {/* Add more fields here */}
//         <label className="fertiliser-label">
//           Moisture:
//           <input
//             type="text"
//             name="moisture"
//             value={fieldsData.moisture}
//             onChange={handleChange}
//             className="fertiliser-input"
//           />
//         </label>
//         <br />
//         <label className="fertiliser-label">
//           Soil Type:
//           <input
//             type="text"
//             name="soilType"
//             value={fieldsData.soilType}
//             onChange={handleChange}
//             className="fertiliser-input"
//           />
//         </label>
//         <br />
//         <label className="fertiliser-label">
//           Crop Type:
//           <input
//             type="text"
//             name="cropType"
//             value={fieldsData.cropType}
//             onChange={handleChange}
//             className="fertiliser-input"
//           />
//         </label>
//         <br />
//         <label className="fertiliser-label">
//           Nitrogen:
//           <input
//             type="text"
//             name="nitrogen"
//             value={fieldsData.nitrogen}
//             onChange={handleChange}
//             className="fertiliser-input"
//           />
//         </label>
//         <br />
//         <label className="fertiliser-label">
//           Potassium:
//           <input
//             type="text"
//             name="potassium"
//             value={fieldsData.potassium}
//             onChange={handleChange}
//             className="fertiliser-input"
//           />
//         </label>
//         <br />
//         <label className="fertiliser-label">
//           Phosphorous:
//           <input
//             type="text"
//             name="phosphorous"
//             value={fieldsData.phosphorous}
//             onChange={handleChange}
//             className="fertiliser-input"
//           />
//         </label>
//         <br />
//         <button type="submit" className="fertiliser-submit">Submit</button>
//       </form>

//       {/* Output data */}
//       {outputData && (
//         <div className="fertiliser-output">
//           <h2>Output Data</h2>
//           <pre>{JSON.stringify(outputData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Fertiliser;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cropprice.css';

function Fertilizer() {
  const [inputs, setInputs] = useState({
    temperature: '',
    humidity: '',
    moisture: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    soilType: '',
    cropType: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/getFertilizerData'); // Replace '/api/getFertilizerData' with your backend endpoint
        const { data } = response;
        // Update the state with the fetched data
        setInputs(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/fertilizerPrediction', inputs); // Replace '/api/fertilizerPrediction' with your backend endpoint
      setPrediction(response.data.prediction);
    } catch (error) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  const soilOptions = [
    { value: 'Clay', label: 'Clay' },
    { value: 'Sandy', label: 'Sandy' },
    { value: 'Loamy', label: 'Loamy' },
    { value: 'Peaty', label: 'Peaty' },
    // Add more options as needed
  ];

  const cropOptions = [
    { value: 'Wheat', label: 'Wheat' },
    { value: 'Rice', label: 'Rice' },
    { value: 'Maize', label: 'Maize' },
    { value: 'Soybean', label: 'Soybean' },
    // Add more options as needed
  ];

  return (
    <div className="fertilizer-prediction-container">
      <h2>Fertilizer Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Temperature:
          <input type="text" name="temperature" value={inputs.temperature} onChange={handleChange} />
        </label>
        <label>
          Humidity:
          <input type="text" name="humidity" value={inputs.humidity} onChange={handleChange} />
        </label>
        <label>
          Moisture:
          <input type="text" name="moisture" value={inputs.moisture} onChange={handleChange} />
        </label>
        <label>
          Nitrogen:
          <input type="text" name="nitrogen" value={inputs.nitrogen} onChange={handleChange} />
        </label>
        <label>
          Phosphorus:
          <input type="text" name="phosphorus" value={inputs.phosphorus} onChange={handleChange} />
        </label>
        <label>
          Potassium:
          <input type="text" name="potassium" value={inputs.potassium} onChange={handleChange} />
        </label>
        <label>
          Soil Type:
          <select name="soilType" value={inputs.soilType} onChange={handleChange}>
            <option value="">Select Soil Type</option>
            {soilOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label>
          Crop Type:
          <select name="cropType" value={inputs.cropType} onChange={handleChange}>
            <option value="">Select Crop Type</option>
            {cropOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={loading}>Predict</button>
      </form>
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">Error: {error}</p>}
      {prediction && <p className="prediction-text">Prediction: {prediction}</p>}
    </div>
  );
}

export default Fertilizer;

