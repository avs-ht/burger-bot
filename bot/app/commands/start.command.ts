import replyMarkup, { keyBoard } from "../replyMarkup";
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
    const answer = await saveUser(chatId, invitedBy || "");

    const invitedUsers = await getUserInvitesAmount(chatId);

    const message = await bot.sendMessage(
      chatId,
      `Привет ${name}! Мы рады тебя видеть в нашем заведении!\nВыбери пункт из меню`,
      {
        reply_markup: replyMarkup(chatId, invitedUsers || 0),
      }
    );

    bot.sendMessage(chatId, `Либо же нажми на появившиеся кнопки снизу!`, {
      reply_markup: keyBoard(),
    });

    if (!answer.invitedBy) return;

    await bot.sendMessage(
      answer.invitedBy,
      `${name} присоединился к нам по вашей ссылке! Спасибо!`
    );
    const senderInvitedUsers = await getUserInvitesAmount(answer.invitedBy);
    const senderMessage = await bot.sendMessage(
      answer.invitedBy,
      "Мы рады тебя видеть в нашем заведении!",
      {
        reply_markup: replyMarkup(answer.invitedBy, senderInvitedUsers || 0),
      }
    );
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
