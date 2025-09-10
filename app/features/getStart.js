// Function to send the welcome message when the user starts the bot
async function sendStart(bot, chatId, fullName) {
  return bot.sendMessage(
    chatId,
    `Hello ${fullName} I'm BotChild, I can help you to find a new quote and news also to track your expense 🤗\nHere is the list of command:\n\/menu\n\/start\n\/quote\n\/news`
  );
}

// Function to handle the /start command
function getStart(bot) {
  bot.onText(/^\/start$/i, (msg) => {
    const fullName = `${msg.from.first_name} ${
      msg.from.last_name ?? ""
    }`.trim();
    sendStart(bot, msg.chat.id, fullName);
  });
}

module.exports = { getStart, sendStart };
