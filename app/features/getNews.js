async function sendNews(bot, chatId) {
  // Fetch news from the API and send the top 5 news to the user
  const newsApi = process.env.NEWS_API;
  try {
    await bot.sendMessage(chatId, "⌛ Searching for news...");
    const response = await fetch(newsApi);
    const data = await response.json();

    await new Promise((r) =>
      setTimeout(() => {
        bot.sendMessage(chatId, "🎉 Found 5 news for you...");
        r();
      }, 3000)
    );

    for (let i = 0; i < 5; i++) {
      const news = data.posts[i];
      const { image, title, headline, category, pusblised_at } = news;

      await bot.sendPhoto(chatId, image, {
        caption: `🚀 Category: ${category}\n📝 Title: ${title}\n\n🤖 Headline: ${headline}\n⬆️ Publish at: ${pusblised_at}`,
      });
    }
  } catch (err) {
    console.error(err);
    return bot.sendMessage(chatId, "⚠️ Failed to fetch news.");
  }
}

// Function to handle the /news command
function getNews(bot) {
  bot.onText(/^\/news$/i, (msg) => sendNews(bot, msg.chat.id));
}

module.exports = { getNews, sendNews };
