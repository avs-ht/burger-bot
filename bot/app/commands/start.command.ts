import replyMarkup from "../replyMarkup";
import bot from "../connections/bot.connection";
import { saveUser } from "./sequelize/saveUser.sequelize";
import { getUserInvitesAmount } from "./sequelize/getUserInvites.sequelize";

const handleStartCommand = async (msg) => {
  const name = msg.from?.first_name || msg.from?.username || "гость";
  const chatId = String(msg.chat.id);
  const invitedBy = msg.text.split(" ")[1];
  try {
    let invitedUsers = 0;
    const result = await saveUser(chatId, invitedBy);
    if (result !== "created") {
      invitedUsers = await getUserInvitesAmount(chatId);
    }

    bot.sendMessage(
      chatId,
      `Привет ${name}! Мы рады тебя видеть в нашем заведении!`,
      {
        reply_markup: replyMarkup(chatId, invitedUsers || 0),
      }
    );
  } catch (error) {
    console.log(error);
    bot.sendMessage(
      chatId,
      `Привет ${name}! У нас возникла ошибка! Разработчики уже чинят эту ошибку!`
    );
  }

  return chatId;
};

bot.onText(/\/start \d+|\/start/, (msg: any) => {
  handleStartCommand(msg);
});
