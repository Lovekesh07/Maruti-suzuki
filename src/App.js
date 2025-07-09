import React, { useState } from "react";
import "./App.css";
import stateCharges from "./stateCharges"; // make sure this file exists

const carData = {
  Swift: { LXi: 600000, VXi: 700000, ZXi: 800000 },
  Baleno: { Sigma: 650000, Delta: 750000, Zeta: 850000 },
  Brezza: { LXi: 800000, VXi: 900000, ZXi: 1000000 },
  Ertiga: { LXi: 950000, VXi: 1050000, ZXi: 1150000 },
  Dzire: { LXi: 650000, VXi: 750000, ZXi: 850000 },
  Fronx: { Sigma: 800000, Delta: 900000, Alpha: 1000000 },
  XL6: { Zeta: 1100000, Alpha: 1200000 },
};

const accessoriesList = [
  { name: "Seat Cover", price: 5000 },
  { name: "Alloy Wheels", price: 15000 },
  { name: "Touchscreen", price: 10000 },
  { name: "Floor Mats", price: 2000 },
  { name: "Reverse Camera", price: 8000 },
];

function App() {
  const [selectedModel, setSelectedModel] = useState("Swift");
  const [selectedVariant, setSelectedVariant] = useState("LXi");
  const [selectedState, setSelectedState] = useState("Delhi");
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  const basePrice = carData[selectedModel][selectedVariant];
  const { rto, insurance } = stateCharges[selectedState];
  const accessoriesTotal = selectedAccessories.reduce((sum, acc) => sum + acc.price, 0);
  const totalPrice = basePrice + basePrice * rto + basePrice * insurance + accessoriesTotal;

  function toggleAccessory(accessory) {
    setSelectedAccessories((prev) => {
      const exists = prev.find((a) => a.name === accessory.name);
      return exists ? prev.filter((a) => a.name !== accessory.name) : [...prev, accessory];
    });
  }

  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/car-bg.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div className="container">
        <h1>Maruti Suzuki Car Price Calculator</h1>

        <div className="selector">
          <label>Car Model:</label>
          <select
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              setSelectedVariant(Object.keys(carData[e.target.value])[0]);
            }}
          >
            {Object.keys(carData).map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="selector">
          <label>Variant:</label>
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
          >
            {Object.keys(carData[selectedModel]).map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>

        <div className="selector">
          <label>State:</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {Object.keys(stateCharges).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="accessories">
          <h2>Select Accessories:</h2>
          {accessoriesList.map((acc) => (
            <label key={acc.name}>
              <input
                type="checkbox"
                checked={selectedAccessories.some((a) => a.name === acc.name)}
                onChange={() => toggleAccessory(acc)}
              />
              {acc.name} (₹{acc.price.toLocaleString()})
            </label>
          ))}
        </div>

        <div className="price-card">
          <h2>Price Breakdown:</h2>
          <p>Ex-Showroom Price: ₹{basePrice.toLocaleString()}</p>
          <p>RTO ({rto * 100}%): ₹{(basePrice * rto).toLocaleString()}</p>
          <p>Insurance ({insurance * 100}%): ₹{(basePrice * insurance).toLocaleString()}</p>
          <p>Accessories: ₹{accessoriesTotal.toLocaleString()}</p>
          <hr />
          <h3>Total Price: ₹{totalPrice.toLocaleString()}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
