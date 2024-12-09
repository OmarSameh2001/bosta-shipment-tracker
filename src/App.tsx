import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Track from "./pages/Track";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Track />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
