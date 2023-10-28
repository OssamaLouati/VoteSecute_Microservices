import React, { useState, useEffect } from 'react';
import axios from '../hoc/Axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(localStorage.getItem('authMessage') || '');
    const navigate = useNavigate();

    const backendURL = 'http://localhost:4000/api/auth';  // Pointing to the API Gateway

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${backendURL}/register`, { email, password });
            setMessage(response.data.message);
        } catch (error) {
            if (error.response?.status === 429) {
                setMessage('Too many requests, please try again later.');
            } else {
                setMessage(error.response?.data?.message || 'Server error');
            }
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${backendURL}/login`, { email, password });
            const data = response.data;
            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('email', data.email);
            localStorage.setItem('isAdmin', data.isAdmin);
            localStorage.setItem('isEligibleToApply', data.isEligibleToApply);

            setMessage('Login successful');

            navigate('/home');
            
        } catch (error) {
            if (error.response?.status === 429) {
                setMessage('Too many requests, please try again later.');
            } else {
                setMessage(error.response?.data?.message || 'Server error');
            }
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
        </div>
    );
};

export default Login;
