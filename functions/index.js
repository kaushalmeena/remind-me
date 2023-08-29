const {onSchedule} = require("firebase-functions/v2/scheduler");
const {log, error} = require("firebase-functions/logger");
const axios = require("axios");

const events = require("./events.json");

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

const createMessageBody = (events) => {
  let html = "";
  html += "<b>📅 Event Reminder Alert</b>\n";
  html += "<i>Today's reminders:</i>\n";
  for (let i = 0; i < events.length; i++) {
    html += `<code>${events[i].name}</code>\n`;
  }
  return html;
};

const sendTelegramMessage = async (text) => {
  const options = {
    method: "POST",
    url: apiUrl,
    data: {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    },
  };
  try {
    const response = await axios.request(options);
    log("=== Success:", response.data);
  } catch (err) {
    error("=== Error:", err.response.data);
  }
};

exports.eventReminder = onSchedule("every day 00:00", async () => {
  const currentDate = new Date();
  const todaysEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      currentDate.getDate() === eventDate.getDate() &&
      currentDate.getMonth() === eventDate.getMonth()
    );
  });

  log("=== Event Reminder, Current Date: ", currentDate);

  if (todaysEvents.length > 0) {
    const messageBody = createMessageBody(todaysEvents);
    await sendTelegramMessage(messageBody);
  } else {
    log("=== No events today", currentDate);
  }
});
