// Home.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEligibleToApply, setIsEligibleToApply] = useState(false);
  const areOpened = localStorage.getItem("areOpened") === "true";
  const location = window.location;

  const fetchUserEmail = () => {
    // Logic to fetch the user's email, for example from the backend or local storage
    const email = localStorage.getItem("email"); // Placeholder logic
    setUserEmail(email);
  };

  const handleLogout = () => {
    // Logic to logout the user
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isEligibleToApply");
    localStorage.removeItem("hasApplied");
    localStorage.removeItem("hasVoted");
    localStorage.removeItem("email");
    setUserEmail("");

    navigate("/login");
  };

  const openApplications = async () => {
    try{
      await axios.put("http://localhost:5000/api/auth/make-eligible", {isAdmin});
      localStorage.setItem("areOpened", true);
      toast.success("Applications are now open");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }

  const closeApplications = async () => {
    try{
      await axios.put("http://localhost:5000/api/auth/make-ineligible", {isAdmin});
      localStorage.setItem("areOpened", false);
      toast.success("Applications are now closed");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    const isAdminFromLocalStorage = localStorage.getItem("isAdmin");
    setIsAdmin(isAdminFromLocalStorage === "true");
    const isEligibleToApplyFromLocalStorage = localStorage.getItem("isEligibleToApply");
    setIsEligibleToApply(isEligibleToApplyFromLocalStorage === "true");
  }, []);

  console.log("isAdmin", isAdmin);
  console.log("isEligibleToApply", isEligibleToApply);
  console.log("areOpened", areOpened);

  return (
    <div>
      <h1>Home Page</h1>

      {userEmail ? (
        <p>User Email: {userEmail}</p>
      ) : (
        <button onClick={fetchUserEmail}>Show Email</button>
      )}

      <button onClick={handleLogout}>Logout</button>

      <button onClick={() => navigate("/election")}>Go to Election Page</button>

      {isAdmin && <button onClick={ () => navigate("/admin")}>Admin Button</button>}
      
      {isAdmin && !areOpened && <button onClick={openApplications}>Open Applications</button>}
      
      {isAdmin && areOpened && <button onClick={closeApplications}>Close Applications</button>}
      
      {isEligibleToApply &&  <button onClick={ () => navigate("/apply")}>Apply for a position</button>}
    </div>
  );
};

export default Home;
