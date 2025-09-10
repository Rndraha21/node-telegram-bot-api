const TelegramBot = require("node-telegram-bot-api");
const { getNews } = require("./features/getNews");
const { getStart } = require("./features/getStart");
const { getQuote } = require("./features/getQoute");
const getMenu = require("./features/getMenu");
const getSticker = require("./features/getSticker");
const expenseTracker = require("./features/expenseTracker");
const commands = require("./libs/commands");

// Extend the TelegramBot class to add custom properties and methods
class RBot extends TelegramBot {
  // constructor to initialize the bot with token and options
  constructor(token, options) {
    super(token, options);
    this.expenses = [];
    this.pendingActions = {};

    // Listen for messages and handle commands or expense tracking
    this.on("message", (msg) => {
      if (this.handleExpenseMessage && this.handleExpenseMessage(msg)) {
        return;
      }

      // Check if the message matches any known commands
      const isCommands = Object.values(commands).some((command) =>
        command.test(msg.text)
      );
      !isCommands
        ? this.sendMessage(
            msg.chat.id,
            "Sorry but I don't recognize the command you type 🙏\n If you're new to this bot please read this below.\n\nHere is the list of commands: \n/start - allow you to start acces the feature of this bot\n/menu - allow you to open the menu, there is also exist a good feature which there is not of the listing command\n/qoute - allow you to get qoute\n/news - allow you to get 5 news per request"
          )
        : "";
    });
  }
  // Method to initialize all bot features
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
