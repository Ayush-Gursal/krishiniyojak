import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./pages/homePage";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import ProfilePage from "./pages/profilePage";
import Logout from "./pages/logout";
import AnalyticsPage from "./pages/analytics";
import WeatherPage from "./pages/weatherPage";
import PredictionPage from "./pages/predictionPage";
// import Marketplace from "./pages/marketPage";
import MarketPage from "./pages/marketPage";
import CropPredictionPage from "./components/cropprediction";
import FarmerPage from "./pages/farmerPage";
import  BuyerPage from "./pages/buyerPage";
// import Signup from "./pages/userRegistrationPage";
// import PricePredictionPage from "./components/priceprediction";

import FertilizerPredictionPage from "./pages/fertiliserPage";
import "./App.css";


import ChatbotPage from "./pages/chatbotPage";



function App() {
  const [keyword, setKeyword] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const keywordParam = queryParams.get("keyword")
    ? queryParams.get("keyword")
    : "";

  useEffect(() => {
    setKeyword(keywordParam);
  },[keywordParam]);

  return (
    <div>
      <UserProvider>

        <Header keyword={keyword} setKeyword={setKeyword} />
        <main className="py-3">
          <Container>
            
              
                <Routes>
                  <Route path="/" element={<RegisterPage />} exact/>
                  <Route path="/home" element={<HomePage />} exact />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/chat" element={<ChatbotPage />} />
                  <Route path="/Weatherupdates" element={<WeatherPage />} />
                  <Route path="/prediction" element={<PredictionPage/>} />
                  <Route path="/marketplace" element={<MarketPage/>} />
                  <Route path="/cropprediction" element={<CropPredictionPage/>} />
                  <Route path="/cropprediction" element={<CropPredictionPage/>} />
                  {/* <Route path="/priceprediction" element={<PricePredictionPage/>} /> */}
                  <Route path="/buyermarket" element={< BuyerPage />} />
                  <Route path="/farmermarket" element={<FarmerPage/>} />
                  <Route path="/fertiliser" element={< FertilizerPredictionPage/>} />
                  <Route path="/buyermarket" element={< BuyerPage />} />
                  {/* <Route path="/Signup" element={< Signup />} /> */}
                </Routes>
              
            
          </Container>
        </main>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
