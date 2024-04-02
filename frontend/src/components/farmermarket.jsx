import React, { useState } from 'react';
import axios from 'axios';
import './market.css'; // Import CSS file

const FarmerMarket = () => {
  const [formData, setFormData] = useState({
    name: '',
    crop: '',
    production: '',
    unit: '',
    contact: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to backend
    axios.post('/api/farmer-data', formData) // Adjust the URL as per your backend route
      .then(response => {
        console.log('Data successfully sent to backend:', response.data);
        // Reset form data after successful submission if needed
        setFormData({
          name: '',
          crop: '',
          production: '',
          unit: '',
          contact: ''
        });
      })
      .catch(error => {
        console.error('Error sending data to backend:', error);
      });
  };

  return (
    <div className="farmer-market-container">
      <h1>Farmer Marketplace</h1>
      <form onSubmit={handleSubmit} className="farmer-form">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
        <input type="text" name="crop" placeholder="Crop" value={formData.crop} onChange={handleInputChange} required />
        <input type="number" name="production" placeholder="Production" value={formData.production} onChange={handleInputChange} required />
        <select name="unit" value={formData.unit} onChange={handleInputChange} required>
          <option value="">Select Unit</option>
          <option value="tonnes">Tonnes</option>
          <option value="quintal">Quintal</option>
          {/* Add more options as needed */}
        </select>
        <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleInputChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FarmerMarket;
