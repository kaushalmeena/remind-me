import { Handler, schedule } from '@netlify/functions';
import events from "../../events.json";
import axios from "axios";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const createMessageBody = (events: any[]) => {
  let html = "";
  html += "<b>📅 Event Reminder Alert</b>\n";
  html += "<i>Today's reminders:</i>\n";
  for (let i = 0; i < events.length; i++) {
    html += `<code>${events[i].name}</code>\n`;
  }
  return html;
};

const sendTelegramMessage = async (text: string) => {
  const options = {
    method: "POST",
    url: API_URL,
    data: {
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
    },
  };
  return axios.request(options);
};

const sendReminderHandler: Handler = async () => {
  const currentDate = new Date();
    const todaysEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        currentDate.getDate() === eventDate.getDate() &&
    currentDate.getMonth() === eventDate.getMonth()
      );
    });

    console.log("=== Event Reminder, Current Date: ", currentDate);

    if (todaysEvents.length > 0) {
      const messageBody = createMessageBody(todaysEvents);
      try {
        const response = await sendTelegramMessage(messageBody);
        console.log("=== ✅ Reminders sent successfully:", response.data);
      } catch (error) {
        console.error("=== ❌ Unable to send reminders:", error);
      }
    } else {
      console.log("=== 🛑 No reminders sent", currentDate);
    }

  return {
    statusCode: 200
  }
}

export const handler = schedule("@daily", sendReminderHandler)
