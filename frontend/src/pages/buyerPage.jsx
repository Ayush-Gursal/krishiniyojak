import React from 'react';
import BuyerMarket from '../components/buyermarket'; // Import the BuyerMarket component

const BuyerPage = () => {
  return (
    <div className="buyer-page-container">
      <h1 className="buyer-page-heading">Welcome to Buyer Page</h1>
      <div className="buyer-market-wrapper">
        <BuyerMarket />
      </div>
    </div>
  );
};

export default BuyerPage;