import React from 'react';
import FarmerMarket from '../components/farmermarket'; // Import the FarmerMarket component

const FarmerPage = () => {
  return (
    <div className="farmer-page-container">
      <h1 className="farmer-page-heading">Welcome to Farmer Page</h1>
      <div className="farmer-market-wrapper">
        <FarmerMarket />
      </div>
    </div>
  );
};

export default FarmerPage;