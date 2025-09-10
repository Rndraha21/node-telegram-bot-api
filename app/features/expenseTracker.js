const formattedRupiah = require("../utils/formatRupiah");

function expenseTracker(bot) {
  bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;

    if (query.data === "Income" || query.data === "Expense") {
      bot.pendingActions[chatId] = { type: query.data, step: "amount" };

      await bot.sendMessage(chatId, "Please enter the amount");
    } else if (query.data === "report") {
      if (bot.expenses.length === 0) {
        await bot.sendMessage(chatId, "Income/expense not found 🤗");
      } else {
        let report = "Balance report: \n";
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
          if (e.type === "Income") totalIncome += e.amount;
          else totalExpense += e.amount;
        });

        const balance = totalIncome - totalExpense;

        report += `\n💵 Total Income: ${formattedRupiah(
          totalIncome
        )}\n📤 Total Expense: ${formattedRupiah(
          totalExpense
        )}\n💰 Balance:${formattedRupiah(balance)}`;
        await bot.sendMessage(chatId, report);
      }
    } else if (query.data === "clear") {
      if (bot.expenses.length === 0) {
        bot.sendMessage(chatId, "Nothing to clear...");
      } else {
        bot.expenses = [];
        bot.sendMessage(chatId, "Clear note successfully 🗑️");
      }
    }

    bot.answerCallbackQuery(query.id);
  });

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const action = bot.pendingActions[chatId];

    if (!action) return;

    if (action.step === "amount") {
      const amount = parseInt(msg.text, 10);

      if (isNaN(amount)) {
        return bot.sendMessage(
          chatId,
          "Please enter the nominal amount correctly..."
        );
      }

      bot.pendingActions[chatId] = { ...action, amount, step: "note" };
      return bot.sendMessage(chatId, "Enter the description");
    }

    if (action.step === "note") {
      const note = msg.text;
      const formatted = formattedRupiah(action.amount);

      bot.expenses.push({
        type: action.type,
        amount: action.amount,
        note,
        date: new Date(),
      });
      delete bot.pendingActions[chatId];
      return bot.sendMessage(
        chatId,
        `✅ ${action.type} ${formatted} ${note} successfully noted!`
      );
    }
  });
}

module.exports = expenseTracker;
