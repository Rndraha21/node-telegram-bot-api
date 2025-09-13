// commands for the bot
const commands = {
  start: /^\/start$/i,
  qoute: /^\/quote$/i,
  news: /^\/news$/i,
  menu: /^\/menu$/i,
  weather: /^\/weather(?:\s+(.+))?/,
  search: /^\/article(?:\s+(.+))?/,
  translate: /^\/translate(?:\s+(.+))?$/i,
  langcodes: /^\/langcodes$/,
};

module.exports = commands;
