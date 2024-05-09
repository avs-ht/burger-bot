import bot from "../connections/bot.connection";
import { getAdmins } from "../sequelize/getAdmins.sequilize";
import { getUserStatus } from "../sequelize/getUserStatus.sequelize";

bot.onText(/\/getAdmins/, async (msg: any) => {
  const chatId = String(msg.chat.id);
  const userStatus = await getUserStatus(chatId);
  if (userStatus !== "owner") return;

  const admins = await getAdmins();
  bot.sendMessage(chatId, `Список ID администраторов: ${admins.join(", ")}`);
});
