import { ChatId } from "node-telegram-bot-api";
import bot from "../connections/bot.connection";
import { changeAdminState } from "../sequelize/changeAdminState.sequelize";
import { getAdminState } from "../sequelize/getAdminState.sequelize";
import { getAllUsers } from "../sequelize/getAllUsers.sequelize";
import { getUserStatus } from "../sequelize/getUserStatus.sequelize";
bot.onText(/\/mailing/, async (msg: any) => {
  const status = await getUserStatus(msg.chat.id);
  if (status !== "admin" && status !== "owner") return;

  await changeAdminState(msg.chat.id, "sendingMailing");
  bot.sendMessage(
    msg.chat.id,
    `⬇️ Отправьте сообщение, которое будет отправлено всем юзерам или напишите /cancelMailing, чтоб отменить ввод рассылки ⬇️`
  );
});

bot.onText(/\/cancelMailing/, async (msg: any) => {
  const status = await getUserStatus(msg.chat.id);
  if (status !== "admin" && status !== "owner") return;

  await changeAdminState(msg.chat.id, "off");
  bot.sendMessage(msg.chat.id, "Рассылка отменена");
});

bot.on("message", async (msg: any) => {
  const chatId = String(msg.chat.id);
  const status = await getUserStatus(chatId);
  if (status !== "admin" && status !== "owner") return;

  const state = await getAdminState(chatId);
  if (state !== "sendingMailing") return;

  const users = await getAllUsers();
  await bot.sendMessage(
    chatId,
    `Рассылка началась! Ожидайте заверешния, я вас оповещу`
  );

  for (const user of users) {
    try {
      await bot.forwardMessage(user as ChatId, chatId, msg.message_id);
    } catch (error) {
      console.log(error);
    }
  }

  await bot.sendMessage(chatId, `Рассылка успешно завершилась`);
});
