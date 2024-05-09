import replyMarkup from "../replyMarkup";
import bot from "../connections/bot.connection";
import { saveUser } from "../sequelize/saveUser.sequelize";
import { getUserInvitesAmount } from "../sequelize/getUserInvites.sequelize";
import { getLastMessageBot } from "../sequelize/getLastMessageBot.sequelize";
import { setLastMessageBot } from "../sequelize/setLastMessageBot.sequelize";

const handleStartCommand = async (msg) => {
  const name = msg.from?.first_name || msg.from?.username || "гость";
  const chatId = String(msg.chat.id);
  const invitedBy = msg.text.split(" ")[1];
  try {
    const answer = await saveUser(chatId, invitedBy);

    const invitedUsers = await getUserInvitesAmount(chatId);

    const lastBotMessage = await getLastMessageBot(chatId);

    if (lastBotMessage) {
      bot.deleteMessage(chatId, +lastBotMessage);
      bot.deleteMessage(chatId, msg.message_id);
    }

    const message = await bot.sendMessage(
      chatId,
      `Привет ${name}! Мы рады тебя видеть в нашем заведении!`,
      {
        reply_markup: replyMarkup(chatId, invitedUsers || 0),
      }
    );
    setLastMessageBot(chatId, message.message_id.toString());
  } catch (error) {
    console.log(error);
    bot.sendMessage(
      chatId,
      `У нас возникла ошибка! Разработчики уже чинят эту ошибку!`
    );
  }
};

bot.onText(/\/start \d+|\/start/, (msg: any) => {
  handleStartCommand(msg);
});
