const express = require('express');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 4000; // API Gateway will listen on port 6000

const AUTH_SERVICE_URL = 'http://localhost:5000/api/auth'; // URL of the auth-service

// Setup rate limiter
const limiter = rateLimit({
    windowMs: 1 * 1000, // 1 second
    max: 3, // limit each IP to 3 requests per windowMs
    message: "Too many requests, please try again later."
});

// Apply rate limiter to all requests
app.use(limiter);

// Forward requests to the auth-service
app.use('/api/auth', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `${AUTH_SERVICE_URL}${req.url}`,
            headers: req.headers,
            data: req.body,
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || {});
    }
});

// ... (You can add more routes as needed to forward to other microservices)

app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});
