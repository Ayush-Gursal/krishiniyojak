import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import Image1 from "./buyer.jpg";
import Image2 from "./farmer.jpg";
import './marketpage.css'

const MarketPage = () => {
  return (
    <div className="market-page-container">
      <h1>Welcome to Market Page</h1>
      <div className="links-container">
        <Link to="/farmermarket">
          <img src={Image2} alt="Farmer" className="link-image" />
          <p className="link-footer">Are you are a farmer ?? </p>
        </Link>
        <Link to="/buyermarket">
          <img src={Image1} alt="Buyer" className="link-image" />
          <p className="link-footer">Are you are a buyer ?? </p>
        </Link>
      </div>
    </div>
  );
};

export default MarketPage;
