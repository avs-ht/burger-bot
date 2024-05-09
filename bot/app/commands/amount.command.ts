import bot from "../connections/bot.connection";
import { getAllUsers } from "../sequelize/getAllUsers.sequelize";
import { getUserStatus } from "../sequelize/getUserStatus.sequelize";

bot.onText(/\/amount/, async (msg: any) => {
  const chatId = String(msg.chat.id);
  const userStatus = await getUserStatus(chatId);
  const isAdmin = userStatus === "admin" || userStatus === "owner";
  if (!isAdmin) return;

  const amount = await getAllUsers();
  bot.sendMessage(msg.chat.id, `Количество приглашенных: ${amount.length}👤`);
});
