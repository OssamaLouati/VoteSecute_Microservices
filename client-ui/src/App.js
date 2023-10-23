import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Election from "./pages/Election";
import ProtectedRoute from "./hoc/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            {/* Route for the Login page */}
            <Route path="/login" element={<Login />} />

            {/* Route for the Election page */}
            <Route path="/election" element={<Election />} />

            {/* Route for the Home page */}
            <Route path="/home" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />

            {/* Default route for the Home page */}
            <Route path="/" element={<Login/>} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
