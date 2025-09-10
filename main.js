// Require necessary modules
const RBot = require("./app/MyBot");
const dotEnv = require("dotenv");

// Load environment variables from .env file
dotEnv.config();

const token = process.env.TELEGRAM_TOKEN;
const options = {
  polling: true,
};

// Initialize and start the bot
const rbot = new RBot(token, options);
rbot.init();
