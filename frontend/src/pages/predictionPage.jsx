// import React from "react";
// import CropPrediction from "../components/cropprediction";
// import PricePrediction from "../components/priceprediction";
// import './prediction.css'; // Add any CSS styling specific to the prediction page


// function PredictionPage(props) {
//   // You can set any necessary state or props here

//   return (
//     <div className="prediction-page-container">
//       <div className="crop-prediction-box">
//         <CropPrediction />
//       </div>

//       <div className="price-prediction-box">
//         <PricePrediction />
//       </div>
//     </div>
//   );
// }

// export default PredictionPage;

import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom to handle navigation
import './prediction.css'; // Add any CSS styling specific to the prediction page
import Image1 from "./cropimage.jpeg"; // Import the image
import Image2 from "./fertiliser.jpeg"
function PredictionPage(props) {
  // You can set any necessary state or props here

  return (
    <div className="prediction-page">
      <h1>Welcome to the Prediction Page</h1>
      <div className="image-container">
        {/* Image 1 */}
        <div className="image-wrapper">
          <Link to="/cropprediction" className="link-no-underline">
            <img src={Image1} alt="Image 1" />
            <div className="image-footer">Crop Prediction</div>
          </Link>
        </div>
        {/* Image 2 */}
        <div className="image-wrapper">
          <Link to="/fertiliser">
            <img src={Image2} alt="Image 2" />
            <div className="image-footer">Fertiliser Prediction</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PredictionPage;