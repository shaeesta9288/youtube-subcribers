const express = require('express');
const app = express()
const path = require('path');
const subscriberModal = require('./models/subscribers')

// Parse JSON bodies that API clients send.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Web page explaination how to use various API quesries is shown  to the user.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

// Route to show all Database Response with an array of subscribers.
app.get('/subscribers', async (req, res) => {
    try {
        const subscribers = await subscriberModal.find().select("-__v");
        res.status(200).json(subscribers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get list of subscribers with name and subscriber channels in the database.
app.get('/subscribers/names', async (req, res) => {
    try {
        const subscribersnames = await subscriberModal.find().select("-_id -subscribedDate -__v");
        res.status(200).json(subscribersnames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get subscriber with specicfic ID from the database.
app.get('/subscribers/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const subscriberId = await subscriberModal.findById(id).select("-__v");
        res.status(200).json(subscriberId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Subscriber doesn't exist with the given subscriber _id" });
    }
});

// Handles any unwanted or irrational requests.
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});















module.exports = app;
