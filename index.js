// index.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // For making HTTP requests

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample in-memory database for demonstration purposes
const services = {
    customers: 'http://localhost:3001',
    orders: 'http://localhost:3002',
    products: 'http://localhost:3003',
};

// Simple routing logic to forward requests to the appropriate service
app.use('/customers', createProxyMiddleware('customers'));
app.use('/orders', createProxyMiddleware('orders'));
app.use('/products', createProxyMiddleware('products'));

// Generic proxy middleware
function createProxyMiddleware(serviceName) {
    return async (req, res) => {
        try {
            const response = await axios({
                method: req.method,
                url: `${services[serviceName]}${req.path}`,
                data: req.body,
                headers: req.headers,
            });

            res.status(response.status).json(response.data);
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).json(error.response.data);
            } else {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };
}

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
});
// JavaScript source code
