import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [authMessage, setAuthMessage] = useState(localStorage.getItem('authMessage') || '');

    const backendURL = 'http://localhost:5000/api/auth'; 

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${backendURL}/register`, { email, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Server error');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${backendURL}/login`, { email, password });
            const token = response.data.token;
            // Store the token in local storage or context
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('user', email);

            setMessage('Login successful');

            navigate('/home');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Server error');
        }
    };

    useEffect(() => {
        // Clear the message from local storage after reading it
        localStorage.removeItem('authMessage');
    }, []);

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
            {message && <p>{message}</p>}
            {authMessage && <p>{authMessage}</p>}
        </div>
    );
};

export default Login;
