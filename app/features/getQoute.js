async function sendQuote(bot, chatId) {
  // Fetch a random quote from the API and send it to the user
  const API_KEY = process.env.QUOTE_API;
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes?", {
      headers: { "X-Api-Key": API_KEY },
    });
    const data = await response.json();
    const { quote, author } = data[0];
    return bot.sendMessage(
      chatId,
      `<i>"${quote}"</i>\n\n<strong>Author: ${author}</strong>`,
      { parse_mode: "HTML" }
    );
  } catch (err) {
    console.error(err);
    return bot.sendMessage(
      chatId,
      "⚠️ Ups... sory saya gagal mendapatkan quote untukmu."
    );
  }
}

// Function to handle the /quote command
function getQuote(bot) {
  bot.onText(/^\/quote$/i, (msg) => sendQuote(bot, msg.chat.id));
}

module.exports = { getQuote, sendQuote };
