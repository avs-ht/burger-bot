import TelegramBot from "node-telegram-bot-api";

import { TOKEN } from "./app/constants";
import replyMarkup from "./app/replyMarkup";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start \d+|\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  const invitedBy = msg?.text?.split(" ")[1];

  const name = msg.from?.first_name || msg.from?.username || "гость";
  bot.sendMessage(
    chatId,
    `Привет ${name}! Мы рады тебя видеть в нашем заведении!`,
    {
      reply_markup: replyMarkup(userId),
    }
  );
});
