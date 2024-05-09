import { Message } from "node-telegram-bot-api";
import bot from "../connections/bot.connection";

bot.on("web_app_data", async (msg: Message) => {
  console.log(msg);
  if (msg.web_app_data) {
    const chatId = String(msg.chat.id);
    bot.sendMessage(chatId, msg.web_app_data.data);
  }
});
