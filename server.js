const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");  // Corrected import
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This must be set in Render
});

// Default home route to confirm backend is running
app.get("/", (req, res) => {
    res.send("Downscale Chatbot Backend is Running!");
});

// Main chatbot route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
      max_tokens: 100,
    });

    res.json({ reply: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
