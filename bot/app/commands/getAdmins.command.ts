import bot from "../connections/bot.connection";
import { getAdmins } from "../sequelize/getAdmins.sequilize";
import { getBanned } from "../sequelize/getBanned.sequelize";
import { getUserStatus } from "../sequelize/getUserStatus.sequelize";

bot.onText(/\/getAdmins/, async (msg: any) => {
  const chatId = String(msg.chat.id);
  const banned = await getBanned(chatId);

  if (banned) return;
  const userStatus = await getUserStatus(chatId);
  if (userStatus !== "owner") return;

  const admins = await getAdmins();
  bot.sendMessage(
    chatId,
    `Список ID администраторов: ${admins
      .map((a) => `${a.id} - ${a.username}`)
      .join(", ")}`
  );
});
