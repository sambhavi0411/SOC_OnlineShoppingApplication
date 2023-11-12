// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Placeholder for database (In a real app, you would use a database like MongoDB or MySQL)
let customers = [];
let products = [];

// Define API Endpoints for Customer Resource
app.post('/customers', (req, res) => {
    const { username, password, email } = req.body;
    const newCustomer = { id: customers.length + 1, username, email };
    customers.push(newCustomer);
    res.status(201).json(newCustomer);
});

app.get('/customers', (req, res) => {
    res.json(customers);
});

// Define API Endpoints for Product Resource
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.get('/products', (req, res) => {
    res.json(products);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// JavaScript source code
