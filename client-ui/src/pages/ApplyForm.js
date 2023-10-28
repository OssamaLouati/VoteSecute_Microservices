import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ApplyForm() {
  const [hasApplied, setHasApplied] = useState(false);
  const location = window.location;

  const [formData, setFormData] = useState({
    role_being_candidated_for: "",
    img_URL: "",
    name: "",
    motivation_letter: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:7000/apply", formData);
      localStorage.setItem("applied", true);
      const email = localStorage.getItem("email");
      const response = await axios.put(
        "http://localhost:5000/api/auth/updateHasApplied",
        { email }
      );
      setHasApplied(response.data.hasApplied);
      toast.success("Application submitted successfully!");
      setTimeout(() => {
        location.reload();
      }
      , 1000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkIfUserHasApplied = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(
          "http://localhost:5000/api/auth/hasApplied",
          { params: { email } }
        );
        setHasApplied(response.data.hasApplied);
        

      } catch (error) {
        console.error("Error checking if user has applied:", error);
      }
    };
    
    checkIfUserHasApplied();
}, []);


  return (
    <div>
      {hasApplied ? (
        <div>
          <h2>Application Submitted!</h2>
          <p>Thank you for applying.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="role_being_candidated_for">Role:</label>
            <select
              name="role_being_candidated_for"
              value={formData.role_being_candidated_for}
              onChange={handleChange}
              required
            >
              <option value="">Select a Role</option>
              <option value="President">President</option>
              <option value="Secretariat">Secretariat</option>
              <option value="General Affairs">General Affairs</option>
              <option value="Pedagogic Committee">Pedagogic Committee</option>
            </select>
          </div>

          <div>
            <label htmlFor="img_URL">Image URL:</label>
            <input
              type="text"
              name="img_URL"
              value={formData.img_URL}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="motivation_letter">Motivation Letter:</label>
            <textarea
              name="motivation_letter"
              value={formData.motivation_letter}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit">Submit Application</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ApplyForm;
