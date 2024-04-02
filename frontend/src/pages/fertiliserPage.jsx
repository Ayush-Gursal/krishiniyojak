import React from "react";
import FertilizerPrediction from "../components/fertiliser";
import './prediction.css'; // Add any CSS styling specific to the prediction page

function FertilizerPredictionPage(props) {
  // You can set any necessary state or props here

  return (
    <div className="prediction-page-container">
      <div className="fertilizer-prediction-box">
        <FertilizerPrediction />
      </div>
    </div>
  );
}

export default FertilizerPredictionPage;