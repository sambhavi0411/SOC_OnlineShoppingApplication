// JavaScript source code
// service-orders/index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());

// Sample in-memory database for demonstration purposes
const orders = [
    { id: 1, customerId: 1, product: 'Product A' },
    { id: 2, customerId: 2, product: 'Product B' },
];

// Order endpoints
app.get('/orders', (req, res) => {
    res.json(orders);
});

app.get('/orders/:id', (req, res) => {
    const order = orders.find(ord => ord.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
});

app.post('/orders', (req, res) => {
    const { customerId, product } = req.body;
    const newOrder = { id: orders.length + 1, customerId, product };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

app.listen(PORT, () => {
    console.log(`Orders Service is running on http://localhost:${PORT}`);
});
