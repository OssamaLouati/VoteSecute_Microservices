import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Election from "./pages/Election";
import ProtectedRoute from "./hoc/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Toaster>
        
      </Toaster>
      <div className="App">
        <main>
          <Routes>
            {/* Route for the Login page */}
            <Route path="/login" element={<Login />} />

            {/* Route for the Election page */}
            <Route path="/election" element={
                    <ProtectedRoute>
                        <Election />
                    </ProtectedRoute>
                } />

            {/* Route for the Home page */}
            <Route path="/home" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />

            {/* Default route for the Home page */}
            <Route path="/" element={<Login/>} />

            {/* Route for admin dashboard */}
            <Route path="/admin" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
