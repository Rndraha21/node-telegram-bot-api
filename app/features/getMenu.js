const { sendNews } = require("./getNews");
const { sendQuote } = require("./getQoute");
const { sendStart } = require("./getStart");

// Function to send the expense tracker menu
async function sendExpenseMenu(bot, chatId) {
  bot.sendMessage(chatId, "Choose the option below", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Add income 💵", callback_data: "Income" },
          { text: "Expenses 📤", callback_data: "Expense" },
        ],
        [
          { text: "View report 📊", callback_data: "report" },
          { text: "Clear 🗑️", callback_data: "clear" },
        ],
      ],
    },
  });
}

// Main function to handle the menu feature
function getMenu(bot) {
  bot.onText(/^\/menu$/i, (msg) => {
    bot.sendMessage(msg.chat.id, "Choose the command below", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Start 🚀", callback_data: "start" },
            { text: "Quote 🔗", callback_data: "quote" },
          ],
          [
            { text: "News 📰", callback_data: "news" },
            { text: "Expense Tracker Asistant 💸", callback_data: "tracker" },
          ],
          [{ text: "Help ❓", callback_data: "help" }],
        ],
      },
    });
  });

  // Handle callback queries from the inline keyboard
  bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const fullName = `${query.from.first_name} ${
      query.from.last_name ?? ""
    }`.trim();

    if (query.data === "start") await sendStart(bot, chatId, fullName);
    else if (query.data === "quote") await sendQuote(bot, chatId);
    else if (query.data === "news") await sendNews(bot, chatId);
    else if (query.data === "help")
      await bot.sendMessage(
        chatId,
        "List command: \n/menu\n/start\n/quote\n/news"
      );
    else if (query.data === "tracker") await sendExpenseMenu(bot, chatId);
    
    // Answer the callback query to remove the loading state
    bot.answerCallbackQuery(query.id);
  });
}

module.exports = getMenu;
