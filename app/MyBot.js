const TelegramBot = require("node-telegram-bot-api");

class RBot extends TelegramBot {
  constructor(token, options) {
    super(token, options);
  }

  async sendStart(chatId, fullName) {
    return this.sendMessage(
      chatId,
      `Hello ${fullName} I'm BotChild, I can help you to find a new quote and news 🤗`
    );
  }

  async sendQuote(chatId) {
    const API_KEY = process.env.QUOTE_API;
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes?", {
        headers: { "X-Api-Key": API_KEY },
      });
      const data = await response.json();
      const { quote, author } = data[0];
      return this.sendMessage(
        chatId,
        `<i>"${quote}"</i>\n\n<strong>Author: ${author}</strong>`,
        { parse_mode: "HTML" }
      );
    } catch (err) {
      console.error(err);
      return this.sendMessage(chatId, "⚠️ Failed to fetch quote.");
    }
  }

  async sendNews(chatId) {
    const newsApi = process.env.NEWS_API;
    try {
      await this.sendMessage(chatId, "⌛ Searching for news...");
      const response = await fetch(newsApi);
      const data = await response.json();

      await new Promise((r) =>
        setTimeout(() => {
          this.sendMessage(chatId, "🎉 Found 5 news for you...");
          r();
        }, 3000)
      );

      for (let i = 0; i < 5; i++) {
        const news = data.posts[i];
        console.log(news)
        const { image, title, headline, category, pusblised_at } = news;
        await this.sendPhoto(chatId, image, {
          caption: `🚀 Category: ${category}\n📝 Title: ${title}\n\n🤖 Headline: ${headline}\n⬆️ Publish at: ${pusblised_at}`,
        });
      }
    } catch (err) {
      console.error(err);
      return this.sendMessage(chatId, "⚠️ Failed to fetch news.");
    }
  }

  getMenu() {
    this.onText(/^\/menu$/i, (msg) => {
      this.sendMessage(msg.chat.id, "Choose the command below", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Start 🚀", callback_data: "start" },
              { text: "Quote 🔗", callback_data: "quote" },
              { text: "News 📰", callback_data: "news" },
              { text: "Expense Tracker Asistant 💸", callback_data: "expense" },
            ],
            [{ text: "Help ❓", callback_data: "help" }],
          ],
        },
      });
    });

    this.on("callback_query", async (query) => {
      const chatId = query.message.chat.id;
      const fullName = `${query.from.first_name} ${
        query.from.last_name ?? ""
      }`.trim();

      if (query.data === "start") await this.sendStart(chatId, fullName);
      else if (query.data === "quote") await this.sendQuote(chatId);
      else if (query.data === "news") await this.sendNews(chatId);
      else if (query.data === "help")
        await this.sendMessage(
          chatId,
          "List command: \n/menu\n/start\n/quote\n/news"
        );

      this.answerCallbackQuery(query.id);
    });
  }

  getStart() {
    this.onText(/^\/start$/i, (msg) => {
      const fullName = `${msg.from.first_name} ${
        msg.from.last_name ?? ""
      }`.trim();
      this.sendStart(msg.chat.id, fullName);
    });
  }

  getQuote() {
    this.onText(/^\/quote$/i, (msg) => this.sendQuote(msg.chat.id));
  }

  getNews() {
    this.onText(/^\/news$/i, (msg) => this.sendNews(msg.chat.id));
  }

  getSticker() {
    this.on("sticker", (msg) => {
      this.sendMessage(msg.chat.id, msg.sticker.emoji);
    });
  }
}

module.exports = RBot;
