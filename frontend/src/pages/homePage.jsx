import React, { useContext, useEffect, useState } from "react";
// import { Row, Col } from "react-bootstrap";

// import ProductsContext from "../context/productsContext";
// import Loader from "../components/loader";
// import Message from "../components/message";

// import TOPOLOGY from './vanta/src/vanta.topology'
import Weather from '../components/weather';
import Profile from '../components/profile';
import './weather.css';
import './styless.css';



function HomePage(props) {
  // const { error, products, loadProducts, brands, categories } = useContext(ProductsContext);
  // const [loading, setLoading] = useState(true);

 

  const selectedCity = 'Pune';

    return (
      <div className="home-page-container">

        <div className="crop-update-box">
          <Profile/>
        </div>

        <div className="weather-box">
          <Weather selectedCity={selectedCity} />
        </div>


        
        
      </div>

      

      
    );
}

export default HomePage;



// import React, { useEffect } from "react";
// import Weather from '../components/weather';
// import Profile from '../components/profile';
// import './weather.css';
// import './styless.css';

// function HomePage(props) {
//   useEffect(() => {
//     const setVanta = () => {
//       if (window.VANTA) {
//         window.VANTA.TOPOLOGY({
//           el: ".s-page-1 .s-section-1 .s-section",
//           mouseControls: true,
//           touchControls: true,
//           gyroControls: false,
//           minHeight: 200.00,
//           minWidth: 200.00,
//           scale: 1.00,
//           scaleMobile: 1.00
//         });
//       }
//     };

//     setVanta(); // Initialize Vanta effect when component mounts

//     return () => {
//       // Cleanup function to remove Vanta effect when component unmounts
//       if (window.VANTA) {
//         window.VANTA.destroy();
//       }
//     };
//   }, []);

//   const selectedCity = 'Pune';

//   return (
//     <div className="home-page-container">
//       <div className="crop-update-box">
//         <Profile/>
//       </div>
//       <div className="weather-box">
//         <Weather selectedCity={selectedCity} />
//       </div>
//     </div>
//   );
// }

// export default HomePage;
