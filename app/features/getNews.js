// Require parser => npm install rss-parser
const Parser = require("rss-parser");
const parser = new Parser();

function extractImage(htmlContent) {
  const match = htmlContent.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

function formateDate(pubDate) {
  const date = new Date(pubDate);
  const now = new Date();

  const formattedDate = date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  let relative;
  if (diffMin < 1) {
    relative = "baru saja";
  } else if (diffMin < 60) {
    relative = `${diffMin} menit lalu`;
  } else if (diffMin < 24) {
    relative`${diffHour} jam lalu`;
  } else {
    relative = `${diffDay} hari lalu`;
  }

  return `• ${relative}`;
}

async function getNews(bot) {
  bot.onText(/^\/news$/i, async (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "⌛ Tunggu sebentar sedang mencari...");
    const feed = await parser.parseURL(
      "https://www.cnnindonesia.com/nasional/rss"
    );

    await new Promise((resolve) =>
      setTimeout(() => {
        bot.sendMessage(chatId, "🎉 Ditemukan 5 berita terbaru");
        resolve();
      }, 3000)
    );

    for (let i = 0; i < 5; i++) {
      const item = feed.items[i];
      const title = item.title;
      const description = item["content:encoded"] || item.contentSnippet;
      const link = item.link;
      const imageUrl = extractImage(item.content);
      const pubDate = formateDate(item.pubDate);

      const caption = `📰 <b>${title}</b>\n\n${description}\n\nPublish ${pubDate}\n\n🔗 <a href="${link}">Selengkapnya</a>`;

      if (imageUrl) {
        await bot.sendPhoto(chatId, imageUrl, {
          caption,
          parse_mode: "HTML",
        });
      } else {
        await bot.sendMessage(chatId, caption, { parse_mode: "HTML" });
      }
    }
  });
}

module.exports = getNews;
