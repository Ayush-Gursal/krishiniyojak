import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './market.css'; // Import CSS file
import $ from 'jquery'; // Import jQuery

const BuyerMarket = () => {
  const [farmers, setFarmers] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [searchDistrict, setSearchDistrict] = useState('');
  const [searchCrop, setSearchCrop] = useState('');
  
  // Options for district dropdown
  const districtOptions = [
    { value: 'Ahmednagar', label: 'Ahmednagar' },
    { value: 'Akola', label: 'Akola' },
    { value: 'Amravati', label: 'Amravati' },
    { value: 'Beed', label: 'Beed' },
    { value: 'Bhandara', label: 'Bhandara' },
    { value: 'Buldhana', label: 'Buldhana' },
    { value: 'Chandrapur', label: 'Chandrapur' },
    { value: 'Chhatrapati Sambhajinagar', label: 'Chhatrapati Sambhajinagar' },
    { value: 'Dharashiv', label: 'Dharashiv' },
    { value: 'Dhule', label: 'Dhule' },
    { value: 'Gadchiroli', label: 'Gadchiroli' },
    { value: 'Gondia', label: 'Gondia' },
    { value: 'Hingoli', label: 'Hingoli' },
    { value: 'Jalgaon', label: 'Jalgaon' },
    { value: 'Jalna', label: 'Jalna' },
    { value: 'Kolhapur', label: 'Kolhapur' },
    { value: 'Latur', label: 'Latur' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Mumbai Suburban', label: 'Mumbai Suburban' },
    { value: 'Nagpur', label: 'Nagpur' },
    { value: 'Nanded', label: 'Nanded' },
    { value: 'Nandurbar', label: 'Nandurbar' },
    { value: 'Nashik', label: 'Nashik' },
    { value: 'Palghar', label: 'Palghar' },
    { value: 'Parbhani', label: 'Parbhani' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Raigad', label: 'Raigad' },
    { value: 'Ratnagiri', label: 'Ratnagiri' },
    { value: 'Sangli', label: 'Sangli' },
    { value: 'Satara', label: 'Satara' },
    { value: 'Sindhudurg', label: 'Sindhudurg' },
    { value: 'Solapur', label: 'Solapur' },
    { value: 'Thane', label: 'Thane' },
    { value: 'Wardha', label: 'Wardha' },
    { value: 'Washim', label: 'Washim' },
    { value: 'Yavatmal', label: 'Yavatmal' }
    // Add more districts as needed
  ];

  // Options for crop dropdown
  const cropOptions = [
    { value: 'Season', label: 'Season' },
    { value: 'Kharif', label: 'Kharif' },
    { value: 'Rabi', label: 'Rabi' },
    { value: 'Zaid', label: 'Zaid' },
    { value: 'Autumn', label: 'Autumn' }
    // Add more crops as needed
  ];

  useEffect(() => {
    fetchData();
  }, [searchDistrict, searchCrop]);

  useEffect(() => {
    renderTable(filteredFarmers);
  }, [filteredFarmers]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/farmers', {
        params: {
          district: searchDistrict,
          crop: searchCrop
        }
      });
      setFarmers(response.data);
      setFilteredFarmers(response.data); // Initially set filtered farmers to all farmers
    } catch (error) {
      console.error('Error fetching farmer data:', error);
    }
  };

  const handleDistrictFilter = (e) => {
    setSearchDistrict(e.target.value);
  };

  const handleCropFilter = (e) => {
    setSearchCrop(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  // Function to render table using jQuery
  const renderTable = (data) => {
    $('#farmerTable tbody').empty(); // Clear table body before rendering
    if (data.length > 0) {
      data.forEach(farmer => {
        $('#farmerTable tbody').append(
          `<tr>
            <td>${farmer.name}</td>
            <td>${farmer.crop}</td>
            <td>${farmer.production}</td>
            <td>${farmer.contact}</td>
          </tr>`
        );
      });
    } else {
      // Display a message when no data is available
      $('#farmerTable tbody').html('<tr><td colspan="4">No data available</td></tr>');
    }
  };

  return (
    <div className="buyer-market-container">
      <h1>Buyer Marketplace</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="filters">
          <select value={searchDistrict} onChange={handleDistrictFilter}>
            <option value="">Select District</option>
            {districtOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select value={searchCrop} onChange={handleCropFilter}>
            <option value="">Select Crop</option>
            {cropOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </div>
      </form>
      <table id="farmerTable" className="farmer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Crop</th>
            <th>Production Yield</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {/* Table body will be populated dynamically using jQuery */}
          {renderTable(filteredFarmers)}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerMarket;
