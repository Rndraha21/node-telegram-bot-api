// Function to send the welcome message when the user starts the bot
async function sendStart(bot, chatId, fullName) {
  return bot.sendMessage(
    chatId,
    `Hello ${fullName} Saya adalah bot yang dibuat oleh Robin 🤗\nBerikut adalah perintah yang dapat kamu gunakan:\n/menu - kamu dapat membuka melihat menu yang interaktif serta fitur tambahan yang tidak ada dalam daftar perintah\n/start - kamu dapat berinteraksi denga ku dengan perintah ini\n/quote - kamu bisa mendapatkan "quote" dengan perintah ini\n/news - kamu bisa mendapatkan 5 berita terbaru dengan perintah ini`
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
