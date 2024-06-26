import bot from "../connections/bot.connection";

import { changeAdminState } from "../sequelize/changeAdminState.sequelize";
import { getAdminState } from "../sequelize/getAdminState.sequelize";
import { getBanned } from "../sequelize/getBanned.sequelize";
import { getUserStatus } from "../sequelize/getUserStatus.sequelize";
import { updateUserStatus } from "../sequelize/updateUserStatus.sequerlize";

bot.onText(/\/newAdmin/, async (msg: any) => {
  const chatId = String(msg.chat.id);
  const banned = await getBanned(chatId);

  if (banned) return;
  const userStatus = await getUserStatus(chatId);
  if (userStatus !== "owner") return;

  await changeAdminState(chatId, "newAdmin");
  bot.sendMessage(
    chatId,
    `Напишите id чата пользователя с ботом, которого вы хотите сделать администратором или /cancelNewAdmin, чтобы отменить добавление нового админа`
  );
});

bot.onText(/\/cancelNewAdmin/, async (msg: any) => {
  const chatId = String(msg.chat.id);
  const banned = await getBanned(chatId);

  if (banned) return;
  const userStatus = await getUserStatus(chatId);
  if (userStatus !== "owner") return;

  await changeAdminState(chatId, "off");
  bot.sendMessage(chatId, "Добавление нового админа отменено");
});

bot.on("message", async (msg: any) => {
  if (msg.text === "/cancelNewAdmin" || msg.text === "/newAdmin") return;
  const chatId = String(msg.chat.id);
  const banned = await getBanned(chatId);

  if (banned) return;
  const userStatus = await getUserStatus(chatId);
  if (userStatus !== "owner") return;

  const state = await getAdminState(chatId);
  if (state !== "newAdmin") return;

  const newAdmin = msg.text;
  const newAdminStatus = await getUserStatus(newAdmin);
  if (!newAdminStatus) {
    bot.sendMessage(
      chatId,
      `Пользователь ${newAdmin} не найден. Введите правильный id чата`
    );
    return;
  }

  await updateUserStatus(newAdmin, "admin");
  await changeAdminState(chatId, "off");
  bot.sendMessage(
    chatId,
    `Пользователь ${newAdmin} добавлен как новый администратор`
  );
});
