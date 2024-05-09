import { getAllUsers } from "../sequelize/getAllUsers.sequelize";
import bot from "../connections/bot.connection";

bot.on("callback_query", async (query) => {
  if (query.data !== "mailing") return;

  const amount = await getAllUsers();
  bot.sendMessage(
    query.message.chat.id,
    `⬇️ Отправьте сообщение, которое будет отправлено всем юзерам ⬇️`
  );
});
