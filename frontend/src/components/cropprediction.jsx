import React, { useState,useContext ,useEffect } from 'react';
import UserContext from "../context/userContext";
import axios from 'axios';
import './cropprice.css';

function CropPrediction() {
  const [inputs, setInputs] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    temperature: '',
    humidity: '',
    pH: '',
    rainfall: '',
    season: '',
    landSize: '',
    marketPlace: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {authTokens}=useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const userLocationResponse = await axios.get('http://127.0.0.1:8000/api/v1/auth/profile/farmer/',{
          headers:{
            Authorization:"Bearer "+authTokens.access
          }
        });
        console.log("user res is ",userLocationResponse.data);
        const packet = JSON.parse(JSON.stringify(userLocationResponse.data));
        const region = packet.region;
        console.log("loc res is ",region);
        const response = await axios.get(`http://127.0.0.1:8000/api/weather/temperature/?location=${region}`);
        console.log("for wehter response is",response.data);
        if (response.ok){
          console.log(response.data);
        }
        const data  = response.data;
        // Update the state with the fetched data
        var structdata ={};
        structdata['nitrogen']=data.N;
        structdata['phosphorus']=data.P;
        structdata['potassium']=data.K;
        structdata['temperature']=data.temperature_celsius;
        structdata['humidity']=data.humidity;
        structdata['pH']=data.Ph;
        structdata['rainfall']=data.Rainfall;
        structdata['season']='';
        structdata['landSize']='';
        structdata['marketPlace']='';
        await setInputs(structdata);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name,value);
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    var structdata2 ={};

    structdata2['N']=inputs.nitrogen;
    structdata2['P']=inputs.phosphorus;
    structdata2['K']=inputs.potassium;
    structdata2['temperature_celsius']=inputs.temperature;
    structdata2['humidity']=inputs.humidity;
    structdata2['Ph']=inputs.pH;
    structdata2['Rainfall']=inputs.rainfall;
    structdata2['season']=inputs.season;
    structdata2['area']=parseInt(inputs.landSize);
    structdata2['market_place']=inputs.marketPlace;
    structdata2['district']="kolhapur";
    structdata2['region']="Maharashtra";
    console.log("body data is",JSON.stringify(structdata2));
    console.log("temp data is",structdata2['temperature_celsius']);    
    console.log(JSON.stringify(inputs));
    try {
      const response = await fetch('http://127.0.0.1:8000/api/predict_combined/', {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(structdata2)
      }); // Replace '/api/cropPrediction' with your backend endpoint
      console.log("object is ",response);
      console.log("string is ",JSON.stringify(response));
      // setPrediction(response.data.prediction);

      // Fetch table data
      const tableResponse = await axios.get('/api/getTableData'); // Replace '/api/getTableData' with your backend endpoint
      setTableData(tableResponse.data);
    } catch (error) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  const seasonOptions = [
    { value: 'Season', label: 'Season' },
    { value: 'kharif', label: 'Kharif' },
    { value: 'Rabi', label: 'Rabi' },
    { value: 'Zaid', label: 'Zaid' },
    { value: 'Autumn', label: 'Autumn' }
    // Add more options as needed
  ];

  const marketOptions = [
    { value: 'Market', label: 'Market' },
    { value: 'Palamaner', label: 'Palamaner' },
    { value: 'Ramanujganj', label: 'Ramanujganj' },
    { value: 'Kota', label: 'Kota' },
    { value: 'Pathalgaon', label: 'Pathalgaon' },
    { value: 'Biranpur kalan (Sahaspur Lohra)', label: 'Biranpur kalan (Sahaspur Lohra)' },
    { value: 'Kawardha', label: 'Kawardha' },
    { value: 'Pandariya', label: 'Pandariya' },
    { value: 'Charama', label: 'Charama' },
    { value: 'Arang', label: 'Arang' },
    { value: 'Rajnandgaon', label: 'Rajnandgaon' },
    { value: 'Sanquelim', label: 'Sanquelim' },
    { value: 'Damnagar', label: 'Damnagar' },
    { value: 'Deesa(Deesa Veg Yard)', label: 'Deesa(Deesa Veg Yard)' }
  ];

  return (
    <div className="crop-prediction-container">
      <h2>Crop Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nitrogen:
          <input 
                type="text" 
                name="nitrogen" 
                value={inputs.nitrogen} 
                onChange={handleChange} 
                placeholder="28" 
          />
        </label>
        {/* Add similar inputs for Phosphorus and Potassium */}
        <label>
        Phosphorus:
          <input 
                type="text" 
                name="Phosphorus" 
                value={inputs. phosphorus} 
                onChange={handleChange} 
                placeholder="17" 
          />
        </label>

        <label>
        Potassium :
          <input 
                type="text" 
                name=" potassium " 
                value={inputs.potassium} 
                onChange={handleChange} 
                placeholder="32" 
          />
        </label>
       
        <label>
          Temperature:
          <input type="text" name="temperature" value={inputs.temperature} onChange={handleChange} placeholder="28 degree celcius"  />
        </label>
        <label>
          Humidity:
          <input type="text" name="humidity" value={inputs.humidity} onChange={handleChange} placeholder="12"  />
        </label>
        <label>
          pH:
          <input type="text" name="pH" value={inputs.pH} onChange={handleChange} placeholder="6" />
        </label>
        <label>
          Rainfall:
          <input type="text" name="rainfall" value={inputs.rainfall} onChange={handleChange} placeholder="280mm" />
        </label>
        <label>
          Season:
          <select name="season" value={inputs.season} onChange={handleChange}>
            {seasonOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label>
          Land Size:
          <input 
                type="text" 
                name="landSize" 
                value={inputs.landSize} 
                onChange={handleChange} 
                placeholder="Enter Land Size" 
          />
        </label>
        <label>
          Market Place:
          <select name="marketPlace" value={inputs.marketPlace} onChange={handleChange}>
            {marketOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={loading}>Predict</button>
      </form>
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">Error: {error}</p>}
      {prediction && <p className="prediction-text">Prediction: {prediction}</p>}
      
      {/* Generate jQuery table */}
      <div id="table-container">
        <table id="crop-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Price</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Crop</th>
              <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Production Yield</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.price}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.crop}</td>
                <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{item.productionYield}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CropPrediction;
