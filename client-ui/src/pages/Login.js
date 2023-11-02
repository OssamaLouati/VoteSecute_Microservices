import React, { useState} from 'react';
import axios from '../hoc/Axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const backendURL = 'http://localhost:4000/api/auth';  // Pointing to the API Gateway

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${backendURL}/register`, { email, password });
            toast.success(response.data.message);
        } catch (error) {
            if (error.response?.status === 429) {
                toast.error('Too many requests, please try again later.');
            } else {
                toast.error(error.response?.data?.message || 'Server error');
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
            localStorage.setItem('hasApplied', data.hasApplied);
            localStorage.setItem('hasVoted', data.hasVoted);
            localStorage.setItem('isEligibleToVote', data.isEligibleToVote);
            localStorage.setItem('isEligibleToApply', data.isEligibleToApply);

            toast.success('Login successful');

            setTimeout(() => {
                navigate('/home');
            }, 1000);


        } catch (error) {
            if (error.response?.status === 429) {
                toast.error('Too many requests, please try again later.');
            } else {
                toast.error(error.response?.data?.message || 'Server error');
            }
        }
    };

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

        </div>
    );
};

export default Login;
