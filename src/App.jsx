import React from "react";
import { Home, Map } from "./pages/index.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/map" element={<Map />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
