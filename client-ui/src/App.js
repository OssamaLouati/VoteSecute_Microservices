import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            {/* Route for the Login page */}
            <Route path="/login" element={<Login />} />
            
            {/* Default route for the Home page */}
            <Route path="/" element={<Login/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
