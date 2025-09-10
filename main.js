const RBot = require("./app/MyBot");
const dotEnv = require("dotenv");

dotEnv.config();

const token = process.env.TELEGRAM_TOKEN;
const options = {
  polling: true,
};

const rbot = new RBot(token, options);
rbot.getMenu();
rbot.getStart();
rbot.getQuote();
rbot.getNews();
rbot.getSticker();
