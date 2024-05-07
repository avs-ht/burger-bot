import TelegramBot from "node-telegram-bot-api";

import { TOKEN } from "./app/constants";
import replyMarkup from "./app/replyMarkup";

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  const name = msg.from?.first_name || msg.from?.username || "гость";
  bot.sendMessage(
    chatId,
    `Привет ${name}! Мы рады тебя видеть в нашем заведении`,
    {
      reply_markup: replyMarkup(userId),
    }
  );
});
