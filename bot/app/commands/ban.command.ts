import bot from "../connections/bot.connection";
import { getBanned } from "../sequelize/getBanned.sequelize";
import { getUserStatus } from "../sequelize/getUserStatus.sequelize";
import { setBanned } from "../sequelize/setBanned.sequelize";

bot.onText(/\/ban \d+/, async (msg: any) => {
  const chatId = String(msg.chat.id);
  const banned = await getBanned(chatId);

  if (banned) return;

  const status = await getUserStatus(chatId);
  if (status !== "admin" && status !== "owner") return;

  const userId = msg.text.split(" ")[1];
  const banUserStatus = await getUserStatus(userId);
  if (banUserStatus === "admin" || banUserStatus === "owner") {
    bot.sendMessage(chatId, `Нельзя забанить администратора`);
    return;
  }
  if (!banUserStatus) {
    bot.sendMessage(chatId, `Пользователь ${userId} не найден`);
    return;
  }

  await setBanned(userId, true);
  await bot.sendMessage(chatId, `Пользователь ${userId} забанен`);
});

bot.onText(/\/ban/, async (msg: any) => {
  if (msg.text !== "/ban") return;
  const chatId = String(msg.chat.id);
  const banned = await getBanned(chatId);
  if (banned) return;

  const status = await getUserStatus(chatId);
  if (status !== "admin" && status !== "owner") return;
  bot.sendMessage(chatId, `Напишите /ban (id пользователя)`);
});
