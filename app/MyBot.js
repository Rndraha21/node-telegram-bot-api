const TelegramBot = require("node-telegram-bot-api");
const { getStart } = require("./features/getStart");
const { getQuote } = require("./features/getQoute");
const getMenu = require("./features/getMenu");
const getSticker = require("./features/getSticker");
const expenseTracker = require("./features/expenseTracker");
const commands = require("./libs/commands");
const getWeather = require("./features/getWeather");
const getArticle = require("./features/getArticle");
const getNews = require("./features/getNews");
const getTranslate = require("./features/getTranslate");
const getHelp = require("./features/getHelp");

// Extend the TelegramBot class to add custom properties and methods
class RBot extends TelegramBot {
  // constructor to initialize the bot with token and options
  constructor(token, options) {
    super(token, options);
    this.expenses = [];
    this.pendingActions = {};

    // Listen for messages and handle commands or expense tracking
    this.on("message", async (msg) => {
      if (this.handleExpenseMessage && this.handleExpenseMessage(msg)) return;
      if (await this.handleTranslations(msg)) return;

      // Check if the message matches any known commands
      const isCommands = Object.values(commands).some((command) =>
        command.test(msg.text)
      );

      if (!isCommands) {
        this.sendMessage(
          msg.chat.id,
          "Maaf perintah tidak dikenali, silahkan klik /menu atau /start untuk melihat daftar perintah yang tersedia😊"
        );
      }
    });
  }
  // Method to initialize all bot features
  init() {
    getStart(this);
    getSticker(this);
    getQuote(this);
    getMenu(this);
    expenseTracker(this);
    getWeather(this);
    getArticle(this);
    getNews(this);
    getTranslate(this);
    getHelp(this)
  }
}

module.exports = RBot;
