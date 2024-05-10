import { ChatId, Message } from "node-telegram-bot-api";
import bot from "../connections/bot.connection";
import { getAdmins } from "../sequelize/getAdmins.sequilize";

bot.on("web_app_data", async (msg: Message) => {
  if (msg.web_app_data) {
    const admins = await getAdmins();
    admins.forEach((admin) => {
      bot.sendMessage(admin as ChatId, msg.web_app_data.data);
    });
  }
});
