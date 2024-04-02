import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select'; // Import react-select
import './cropprice.css';

function PricePrediction() {
  const [inputs, setInputs] = useState({
    district: '',
    market: '',
    commodity: '',
    minPrice: '',
    maxPrice: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define options for districts (you can fetch this dynamically if needed)
  const districtOptions = [
    { value: 'Nashik', label: 'Nashik' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Ahmednagar', label: 'Ahmednagar' },
    { value: 'Solapur', label: 'Solapur' },
    { value: 'Sangli', label: 'Sangli' },
    { value: 'Satara', label: 'Satara' },
    { value: 'Jalgaon', label: 'Jalgaon' },
    { value: 'Aurangabad', label: 'Aurangabad' },
    { value: 'Kolhapur', label: 'Kolhapur' },
    { value: 'Nagpur', label: 'Nagpur' }
    // Add more district options here as needed
  ];

  // Define options for markets (you can fetch this dynamically if needed)
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

  const handleChange = (name, value) => {
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleDistrictChange = selectedOption => {
    handleChange('district', selectedOption.value);
  };

  const handleMarketChange = selectedOption => {
    handleChange('market', selectedOption.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/pricePrediction', inputs);
      setPrediction(response.data.prediction);
    } catch (error) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="price-prediction-container">
      <h2>Price Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          District:
          <Select
            options={districtOptions}
            value={districtOptions.find(option => option.value === inputs.district)}
            onChange={handleDistrictChange}
          />
        </label>
        <label>
          Market:
          <Select
            options={marketOptions}
            value={marketOptions.find(option => option.value === inputs.market)}
            onChange={handleMarketChange}
          />
        </label>
        <label>
          Commodity:
          <input type="text" name="commodity" value={inputs.commodity} onChange={e => handleChange('commodity', e.target.value)} />
        </label>
        <label>
          Minimum Price:
          <input type="text" name="minPrice" value={inputs.minPrice} onChange={e => handleChange('minPrice', e.target.value)} />
        </label>
        <label>
          Maximum Price:
          <input type="text" name="maxPrice" value={inputs.maxPrice} onChange={e => handleChange('maxPrice', e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>Predict</button>
      </form>
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">Error: {error}</p>}
      {prediction && <p className="prediction-text">Prediction: {prediction}</p>}
    </div>
  );
}

export default PricePrediction;
