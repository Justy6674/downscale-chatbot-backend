// Install dependencies: express, cors, dotenv, node-fetch
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Secure API Key Storage

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

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

// Start server
const PORT = process.env.PORT || 3000;  // ✅ Use the correct port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
