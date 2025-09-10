const formattedRupiah = require("../utils/formatRupiah");

// Main function to handle expense tracking feature
function expenseTracker(bot) {
  bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;

    // Handle different callback query data
    if (query.data === "Pemasukan" || query.data === "Pengeluaran") {
      bot.pendingActions[chatId] = { type: query.data, step: "amount" };

      await bot.sendMessage(chatId, "Silahkan masukkan nominalnya:");
    } else if (query.data === "report") {
      if (bot.expenses.length === 0) {
        await bot.sendMessage(chatId, "Catatan pemasukan atau pengeluaran mu tidak ditemukan 🤗");
      } else {
        let report = "Laporan keuangan: \n";
        let totalIncome = 0,
          totalExpense = 0;

        bot.expenses.forEach((e, i) => {
          const formatted = formattedRupiah(e.amount);

          const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          };

          report += `${i + 1}. ${e.type} ${formatted} - ${
            e.note
          } at ${e.date.toLocaleString("id-ID", options)}\n`;
          if (e.type === "Pemasukan") totalIncome += e.amount;
          else totalExpense += e.amount;
        });

        const balance = totalIncome - totalExpense;

        report += `\n💵 Total pemasukan: ${formattedRupiah(
          totalIncome
        )}\n📤 Total pengeluaran: ${formattedRupiah(
          totalExpense
        )}\n💰 Selisih: ${formattedRupiah(balance)}`;
        await bot.sendMessage(chatId, report);
      }
    } else if (query.data === "clear") {
      if (bot.expenses.length === 0) {
        bot.sendMessage(chatId, "Tidak ada catatan pemasukan/pengeluaran yang dapat dibersihkan...");
      } else {
        bot.expenses = [];
        bot.sendMessage(chatId, "Catatan berhasil dibersihkan 🗑️");
      }
    }

    bot.answerCallbackQuery(query.id);
  });

  // Method to handle messages related to expense tracking
  bot.handleExpenseMessage = (msg) => {
    const chatId = msg.chat.id;
    const action = bot.pendingActions[chatId];

    if (!action) return false;

    if (action.step === "amount") {
      const amount = parseInt(msg.text, 10);

      if (isNaN(amount)) {
        return bot.sendMessage(
          chatId,
          "Silahkan masukan jumlah dengan benar..."
        );
      }

      // Pending action to track the current step and data
      bot.pendingActions[chatId] = { ...action, amount, step: "note" };
      return bot.sendMessage(chatId, "Masukkan catatan untuk transaksi ini:");
    }

    // Check if the current step is to add a note
    if (action.step === "note") {
      const note = msg.text;
      const formatted = formattedRupiah(action.amount);

      bot.expenses.push({
        type: action.type,
        amount: action.amount,
        note,
        date: new Date(),
      });

      // Clear the pending action after completing the expense entry
      delete bot.pendingActions[chatId];
      return bot.sendMessage(
        chatId,
        `✅ ${action.type} ${formatted} ${note} berhasil ditambahkan!`
      );
    }
  };
}

module.exports = expenseTracker;
