function getSticker(bot) {
  bot.on("sticker", (msg) => {
    bot.sendMessage(msg.chat.id, msg.sticker.emoji);
  });
}

module.exports = getSticker;
