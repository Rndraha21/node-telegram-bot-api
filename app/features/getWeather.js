function getWeather(bot) {
  const API_KEY = process.env.WEATHER_API_KEY;

  bot.onText(/^\/weather (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;

    // Capture the city name
    const city = match[1];

    // Fetch open weather api
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`
      );
      const data = await response.json();
      const { description, icon } = data.weather[0];
      const { sys, name, main, wind } = data;
      const { temp, feels_like, humidity } = main;

      const conditionMapEmot = {
        "awan mendung": "☁️",
        cerah: "☀️",
        "cerah berawan": "🌤️",
        "hujan ringan": "🌦️",
        "hujan deras": "🌧️",
        "badai petir": "⛈️",
        kabut: "🌫️",
      };

      const getTempEmoji = (temp) => {
        if (temp <= 0) return "❄️";
        if (temp <= 15) return "🧥";
        if (temp <= 25) return "🌤️";
        if (temp <= 32) return "☀️";
        return "🥵";
      };

      const getHumidityEmoji = (humidity) => {
        if (humidity < 30) return "🔥";
        if (humidity < 60) return "💨";
        if (humidity < 80) return "💧";
        return "🌊";
      };

      const emotTemp = getTempEmoji(temp);
      const emotFeel = getTempEmoji(feels_like);
      const emotHumidity = getHumidityEmoji(humidity)

      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      bot.sendPhoto(chatId, iconUrl, {
        caption: `🌍 Cuaca di ${name}, ${sys.country}:\n\nKondisi: ${description} ${conditionMapEmot[description]}\nSuhu: ${temp}°C ${emotTemp}\nTerasa: ${feels_like}°C ${emotFeel}\nKelembapan: ${humidity}% ${emotHumidity}\nAngin: ${wind.speed}m/s 💨`,
      });
    } catch (error) {
      bot.sendMessage(chatId, "Gagal mendapatkan informasi cuaca 🥲");
    }
  });
}

module.exports = getWeather;
