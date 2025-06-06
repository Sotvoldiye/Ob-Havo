import React, { useEffect, useState } from "react";
import WeatherCountry from "./pages/weatherCountry/WeatherCountry";
import { ToastContainer } from "react-toastify";
import WeatherWidget from "./pages/WeatherWidget/WeatherWidget";

function App() {
  return (
    <div>
      <WeatherWidget />
      <ToastContainer />
    </div>
  );
}

export default App;
