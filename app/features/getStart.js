// Function to send the welcome message when the user starts the bot
async function sendStart(bot, chatId, fullName) {
  return bot.sendMessage(
    chatId,
    `Hello ${fullName}, aku bot buatan Robin 🤗\nBerikut perintah yang bisa kamu gunakan:\n\n/menu - buka menu interaktif & fitur tambahan\n/start - mulai berinteraksi dengan bot\n/quote - dapatkan kutipan inspiratif random\n/news - lihat 5 berita terbaru\n/weather - cek cuaca kota tertentu\n/article - cari ringkasan artikel Wikipedia\n/translate - terjemahkan teks ke bahasa lain.
`
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
