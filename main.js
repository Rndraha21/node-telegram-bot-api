// Require necessary modules
const RBot = require("./app/MyBot");
const dotEnv = require("dotenv");
const express = require("express");

// Load environment variables from .env file
dotEnv.config();

const app = express();

const token = process.env.TELEGRAM_TOKEN;
const options = {
  polling: true,
};

// Initialize and start the bot
const rbot = new RBot(token, options);
rbot.init();

// Endpoint for healt check render
app.get("/", (req, res) => res.send("Bot is running!"));

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Bot is running");
});
