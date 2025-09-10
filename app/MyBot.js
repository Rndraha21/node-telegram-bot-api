const TelegramBot = require("node-telegram-bot-api");
const { getNews } = require("./features/getNews");
const { getStart } = require("./features/getStart");
const { getQuote } = require("./features/getQoute");
const getMenu = require("./features/getMenu");
const getSticker = require("./features/getSticker");
const expenseTracker = require("./features/expenseTracker");

class RBot extends TelegramBot {
  constructor(token, options) {
    super(token, options);
    this.expenses = [];
    this.pendingActions = {};
  }

  init() {
    getStart(this);
    getSticker(this);
    getQuote(this);
    getNews(this);
    getMenu(this);
    expenseTracker(this);
  }
}

module.exports = RBot;
