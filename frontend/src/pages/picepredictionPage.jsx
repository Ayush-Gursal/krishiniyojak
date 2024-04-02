import React from "react";
import PricePrediction from "../components/priceprediction";

import './prediction.css'; // Add any CSS styling specific to the prediction page

function PricePredictionPage(props) {
  // You can set any necessary state or props here

  return (
    <div className="prediction-page-container">
      <div className="price-prediction-box">
        <PricePrediction />
      </div>
    </div>
  );
}

export default PricePredictionPage;