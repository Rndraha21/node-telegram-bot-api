// Function to handle sticker messages and respond with the sticker's emoji
function getSticker(bot) {
  bot.on("sticker", (msg) => {
    bot.sendMessage(msg.chat.id, msg.sticker.emoji);
  });
}

module.exports = getSticker;
