const { sendNews } = require("./getNews");
const { sendQuote } = require("./getQoute");
const { sendStart } = require("./getStart");

// Function to send the expense tracker menu
async function sendExpenseMenu(bot, chatId) {
  bot.sendMessage(chatId, "Silahkan pilih menu di bawah ini", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Pemasukan💵", callback_data: "Pemasukan" },
          { text: "Pengeluaran 📤", callback_data: "Pengeluaran" },
        ],
        [
          { text: "Laporan keuangan 📊", callback_data: "report" },
          { text: "Bersihkan catatan 🗑️", callback_data: "clear" },
        ],
      ],
    },
  });
}

// Main function to handle the menu feature
function getMenu(bot) {
  bot.onText(/^\/menu$/i, (msg) => {
    bot.sendMessage(msg.chat.id, "Silahkan pilih menu di bawah ini", {
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
        "Daftar perintah: \n/menu - masuk ke menu\n/start - memulai\n/quote - dapatkan quote\n/news - dapatkan 5 berita terbaru\n/weather - dapatkan kondisi cuaca. Contoh: `/weather Jakarta`\n/article - dapatkan article. Contoh: `/article Jokowi`\n/translate - terjemahkan teks berdasarkan kode bahasa. Contoh: `/translate en`\n\nUntuk Expense Tracker Asistant, silahkan klik tombol 'Expense Tracker Asistant 💸' pada menu atau ketik /menu untuk membuka menu.",
        {
          parse_mode: "Markdown",
        }
      );
    else if (query.data === "tracker") await sendExpenseMenu(bot, chatId);

    // Answer the callback query to remove the loading state
    bot.answerCallbackQuery(query.id);
  });
}

module.exports = getMenu;
