const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: '*',  // Allow requests from anywhere (for now)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Secure API Key Storage

// ✅ Test route to confirm server is running
app.get('/', (req, res) => {
    res.send('✅ Chatbot backend is running!');
});

// ✅ Chatbot API route
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message || "No message received";

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        res.json({ response: data.choices[0].message.content });

    } catch (error) {
        res.status(500).json({ error: "Error communicating with OpenAI API." });
    }
});

// ✅ Force the correct port (3000)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is now running correctly on port ${PORT}`);
});
