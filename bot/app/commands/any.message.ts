import bot from "../connections/bot.connection";
import { getBanned } from "../sequelize/getBanned.sequelize";
import { getUserStatus } from "../sequelize/getUserStatus.sequelize";
import { getUsername } from "../sequelize/getUsername.sequelize";
import { updateUsername } from "../sequelize/updateUsername.sequelize";

bot.on("message", async (msg: any) => {
  try {
    const chatId = String(msg.chat.id);
    const banned = await getBanned(chatId);

    if (banned) return;
    const status = await getUserStatus(chatId);
    const username = msg.from?.username;
    const dbUsername = await getUsername(chatId);

    if (username !== dbUsername) {
      updateUsername(chatId, username);
    }

    console.log(1);
  } catch (error) {
    console.log(error);
  }
});
