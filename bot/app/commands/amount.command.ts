import bot from "../connections/bot.connection";
import { getAllUsers } from "../sequelize/getAllUsers.sequelize";
import { getBanned } from "../sequelize/getBanned.sequelize";
import { getUserStatus } from "../sequelize/getUserStatus.sequelize";

bot.onText(/\/amount/, async (msg: any) => {
  const chatId = String(msg.chat.id);
  const banned = await getBanned(chatId);

  if (banned) return;
  const userStatus = await getUserStatus(chatId);
  const isAdmin = userStatus === "admin" || userStatus === "owner";
  if (!isAdmin) return;

  const message = await bot.sendMessage(msg.chat.id, "Подсчитываем все данные");
  const users = await getAllUsers();
  bot.sendMessage(msg.chat.id, `Количество приглашенных: ${users.length}👤`);
  bot.sendMessage(
    msg.chat.id,
    `Список людей:\n${users
      .map(
        (u) =>
          `${u.id} - ${u.username} (${u.isBanned ? "забанен" : "не забанен"})`
      )
      .join("\n")}`
  );

  bot.deleteMessage(message.chat.id, message.message_id);
  bot.sendMessage(msg.chat.id, "Данные подсчитаны");
});
