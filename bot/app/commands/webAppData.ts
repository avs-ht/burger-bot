import { ChatId, Message } from "node-telegram-bot-api";
import bot from "../connections/bot.connection";
import { getAdmins } from "../sequelize/getAdmins.sequilize";
import { getBanned } from "../sequelize/getBanned.sequelize";

bot.on("web_app_data", async (msg: Message) => {
  const chatId = String(msg.chat.id);
  const banned = await getBanned(chatId);

  if (banned) return;
  if (msg.web_app_data) {
    const admins = await getAdmins();
    admins.forEach((admin) => {
      bot.sendMessage(admin.id as ChatId, msg.web_app_data.data);
    });
  }
});
