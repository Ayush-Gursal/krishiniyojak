import React from "react";
import CropPrediction from "../components/cropprediction";

import './prediction.css'; // Add any CSS styling specific to the prediction page

function CropPredictionPage(props) {
  // You can set any necessary state or props here

  return (
    <div className="prediction-page-container">
      <div className="crop-prediction-box">
        <CropPrediction />
      </div>
    </div>
  );
}

export default CropPredictionPage;