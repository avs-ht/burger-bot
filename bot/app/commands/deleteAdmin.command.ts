import bot from "../connections/bot.connection";
import { changeAdminState } from "../sequelize/changeAdminState.sequelize";
import { getAdminState } from "../sequelize/getAdminState.sequelize";
import { getUserStatus } from "../sequelize/getUserStatus.sequelize";
import { updateUserStatus } from "../sequelize/updateUserStatus.sequerlize";

bot.onText(/\/deleteAdmin/, async (msg: any) => {
  const chatId = String(msg.chat.id);
  const userStatus = await getUserStatus(chatId);
  if (userStatus !== "owner") return;

  await changeAdminState(chatId, "deleteAdmin");
  bot.sendMessage(
    chatId,
    `Напишите id чата пользователя с ботом, которого вы хотите убрать из администраторов или /cancelDeleteAdmin, чтобы отменить удаление админа`
  );
});

bot.onText(/\/cancelDeleteAdmin/, async (msg: any) => {
  const chatId = String(msg.chat.id);
  const userStatus = await getUserStatus(chatId);
  if (userStatus !== "owner") return;

  await changeAdminState(chatId, "off");
  bot.sendMessage(chatId, "Удаление админа отменено");
});

bot.on("message", async (msg: any) => {
  const chatId = String(msg.chat.id);
  const userStatus = await getUserStatus(chatId);
  if (userStatus !== "owner") return;

  const state = await getAdminState(chatId);
  if (state !== "deleteAdmin") return;

  const prevAdmin = msg.text;
  const prevAdminStatus = await getUserStatus(prevAdmin);
  if (!prevAdminStatus) {
    bot.sendMessage(
      chatId,
      `Пользователь ${prevAdmin} не найден. Введите правильный id чата`
    );
    return;
  }

  await updateUserStatus(prevAdmin, "user");
  bot.sendMessage(
    chatId,
    `Пользователь ${prevAdmin} удален из списка администраторов`
  );
});
