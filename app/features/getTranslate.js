const { translate } = require("@vitalets/google-translate-api");
const languageCodes = require("../libs/langCodes");

async function gTranslate(text, targetLang = "id") {
  try {
    const response = await translate(text, { to: targetLang });
    return response.text;
  } catch (error) {
    console.log("Translate error", error);
    return `❌ Gagal menerjemahkan ${text} ke ${targetLang}`;
  }
}

async function getTranslate(bot) {
  const pendingTranslations = {};
  const langCodes = languageCodes;

  bot.onText(/^\/translate(?:\s+(\w+))?$/, async (msg, match) => {
    const chatId = msg.chat.id;

    let lang;
    if (match[1]) {
      lang = match[1].toLowerCase();
    } else {
      lang = "id";
      await bot.sendMessage(
        chatId,
        `Bahasa di set ke default: ${lang.toUpperCase()}\nKlik <a href="https://www.w3schools.com/tags/ref_language_codes.asp">disini</a> untuk melihat kumpulan kode bahasa`,
        { parse_mode: "HTML" }
      );
    }

    if (!langCodes[lang]) {
      lang = "id";
      await bot.sendMessage(
        chatId,
        `Kode bahasa tidak ditemukan, bahasa di set ke default ${lang.toUpperCase()}\nnKlik <a href="https://www.w3schools.com/tags/ref_language_codes.asp">disini</a> untuk melihat kumpulan kode bahasa`,
        { parse_mode: "HTML" }
      );
    }

    pendingTranslations[chatId] = { step: "waitingText", lang };
    await bot.sendMessage(
      chatId,
      `🌍 Bahasa target: ${lang.toUpperCase()}\nSilahkan ketik teks yang mau diterjemahkan:`
    );
  });

  bot.handleTranslations = async (msg) => {
    const chatId = msg.chat.id;

    if (
      pendingTranslations[chatId] &&
      pendingTranslations[chatId].step === "waitingText"
    ) {
      const { lang } = pendingTranslations[chatId];
      const text = msg.text;
      try {
        const translation = await gTranslate(text, lang);

        await bot.sendMessage(
          chatId,
          `✅ Translate ke ${lang.toUpperCase()}:\n\`${translation}\``,
          { parse_mode: "Markdown" }
        );

        await bot.sendMessage(chatId, "Proses selesai...");

        delete pendingTranslations[chatId];
      } catch (err) {
        console.error("error", err);
        bot.sendMessage(
          chatId,
          "Format tidak sesuai, anda dapat menemukan petunjuk di `/start` atau `/menu help`",
          { parse_mode: "Markdown" }
        );
      }
    }
  };
}

module.exports = getTranslate;
