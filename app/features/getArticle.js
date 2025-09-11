function getArticle(bot) {
  bot.onText(/^\/article (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const keyword = match[1];

    const url = `https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      keyword
    )}`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      const { content_urls } = data;

      const more = `<a href="${content_urls.desktop.page}">Selengkapnya</a>`;

      if (data.title && data.extract) {
        let text = `📖 <b>${data.title}</b>\n\n${data.extract}\n\n<i>🔗 ${more}</i>`;
        await bot.sendMessage(chatId, text, { parse_mode: "HTML" });
      } else {
        bot.sendMessage(
          chatId,
          `❌ Artikel "${keyword}" nggak ketemu di Wikipedia.`
        );
      }
    } catch (error) {
      bot.sendMessage(chatId, "Gagal mendapatkan artikel. 🥲");
    }
  });
}

module.exports = getArticle;
