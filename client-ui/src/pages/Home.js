// Home.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEligibleToApply, setIsEligibleToApply] = useState(localStorage.getItem("isEligibleToApply") === "true");
  const isEligibleToVote = localStorage.getItem("isEligibleToVote") === "true";
  const location = window.location;

  const fetchUserEmail = () => {
    const email = localStorage.getItem("email"); 
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserEmail("");

    navigate("/login");
  };

  const openApplications = async () => {
    try{
      await axios.put("http://localhost:5000/api/auth/make-eligible-to-apply", {isAdmin});
      localStorage.setItem("isEligibleToVote", true);
      localStorage.setItem("isEligibleToApply", true);
      setIsEligibleToApply(true);
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
      await axios.put("http://localhost:5000/api/auth/make-ineligible-to-apply", {isAdmin});
      localStorage.setItem("isEligibleToVote", true);
      localStorage.setItem("isEligibleToApply", false);
      setIsEligibleToApply(false);
      toast.success("Applications are now closed");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }

  const terminateElection = async () => {
    try{
      await axios.put("http://localhost:5000/api/auth/closeElection", {isAdmin});
      localStorage.setItem("isEligibleToVote", false);
      toast.success("Election has been terminated");
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchIsEligibleToApply = async () => {
    try {
      const email = localStorage.getItem("email");
      const response = await axios.get(
        "http://localhost:5000/api/auth/isEligibleToApply",
        {
          params: { email }, // Correct way to pass email as a parameter
        }
      );
      localStorage.setItem("isEligibleToVote", response.data.isEligibleToVote);
      setIsEligibleToApply(response.data.isEligibleToApply === true);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchUserEmail();

    const isAdminFromLocalStorage = localStorage.getItem("isAdmin");
    setIsAdmin(isAdminFromLocalStorage === "true");

    fetchIsEligibleToApply();

    toast.success("is Eligible to Apply: " + isEligibleToApply);

  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Welcome {userEmail}</h2>

      

      <button onClick={handleLogout}>Logout</button>

      {!isEligibleToApply && isEligibleToVote && <button onClick={() => navigate("/election")}>Go to Election Page</button>}

      {isAdmin && <button onClick={ () => navigate("/admin")}>See Voting Statistics</button>}
      
      {isAdmin && !isEligibleToApply && <button onClick={openApplications}>Open Applications</button>}
      
      {isAdmin && isEligibleToApply && <button onClick={closeApplications}>Close Applications</button>}

      {isAdmin && !isEligibleToApply && <button onClick={terminateElection}>Terminate Election</button>}
      
      {isEligibleToApply &&  <button onClick={ () => navigate("/apply")}>Apply for a position</button>}
    </div>
  );
};

export default Home;
