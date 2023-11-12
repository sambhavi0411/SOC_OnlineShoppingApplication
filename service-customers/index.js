// service-customers/index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Sample in-memory database for demonstration purposes
const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Customer endpoints
app.get('/customers', (req, res) => {
    res.json(customers);
});

app.get('/customers/:id', (req, res) => {
    const customer = customers.find(cust => cust.id === parseInt(req.params.id));
    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
});

app.post('/customers', (req, res) => {
    const { name, email } = req.body;
    const newCustomer = { id: customers.length + 1, name, email };
    customers.push(newCustomer);
    res.status(201).json(newCustomer);
});

app.listen(PORT, () => {
    console.log(`Customers Service is running on http://localhost:${PORT}`);
});
// JavaScript source code
