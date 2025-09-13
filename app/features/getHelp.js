const langcodes = require("../libs/langCodes");

function getHelp(bot) {
  const codeList = Object.entries(langcodes)
    .map(([code, name]) => `${code} = ${name}`)
    .join("\n");

  bot.onText(/^\/langcodes$/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      `Berikut adalah daftar kode bahasa yang tersedia\n${codeList}`
    );
  });
}

module.exports = getHelp;
