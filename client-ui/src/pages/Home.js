// Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    const fetchUserEmail = () => {
        // Logic to fetch the user's email, for example from the backend or local storage
        const email = localStorage.getItem('user'); // Placeholder logic
        setUserEmail(email);
    };

    const handleLogout = () => {
        // Logic to logout the user
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        setUserEmail('');

        navigate('/login');
    }

    return (
        <div>
            <h1>Home Page</h1>
            {userEmail ? <p>User Email: {userEmail}</p> : <button onClick={fetchUserEmail}>Show Email</button>}
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate('/election')}>Go to Election Page</button>
        </div>
    );
};

export default Home;
