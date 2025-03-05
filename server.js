const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.createCompletion({
      model: "gpt-4",
      prompt: message,
      max_tokens: 100,
    });

    res.json({ reply: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
