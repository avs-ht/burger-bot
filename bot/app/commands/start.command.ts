import replyMarkup, { keyBoard } from "../replyMarkup";
import bot from "../connections/bot.connection";
import { saveUser } from "../sequelize/saveUser.sequelize";
import { getUserInvitesAmount } from "../sequelize/getUserInvites.sequelize";
import { getBanned } from "../sequelize/getBanned.sequelize";
import { getUserStatus } from "../sequelize/getUserStatus.sequelize";

const handleStartCommand = async (msg) => {
  const name = msg.from?.first_name || msg.from?.username || "гость";
  const username = msg.from?.username || "";
  const chatId = String(msg.chat.id);
  const banned = await getBanned(chatId);

  if (banned) return;
  const invitedBy = msg.text.split(" ")[1];
  try {
    const answer = await saveUser(chatId, invitedBy || "", username);

    const invitedUsers = await getUserInvitesAmount(chatId);

    await bot.sendMessage(
      chatId,
      `Привет ${name}! Мы рады тебя видеть в нашем заведении!\nВыбери пункт из меню`,
      {
        reply_markup: replyMarkup(chatId, invitedUsers || 0),
      }
    );

    const status = await getUserStatus(chatId);
    bot.sendMessage(chatId, `Либо же нажми на появившиеся кнопки снизу!`, {
      reply_markup: keyBoard(),
    });
    // if (status === "admin") {
    //   bot.setMyCommands(
    //     [
    //       { command: "/mailing", description: "Рассылка" },
    //       { command: "/amount", description: "Количество приглашенных" },
    //       { command: "/ban {id}", description: "Забанить пользователя" },
    //     ],
    //     {
    //       scope: {
    //         type: "chat",
    //         chat_id: chatId,
    //       },
    //     }
    //   );
    // } else if (status === "owner") {
    //   bot.setMyCommands(
    //     [
    //       { command: "/mailing", description: "Рассылка" },
    //       { command: "/amount", description: "Количество приглашенных" },
    //       { command: "/ban {id}", description: "Забанить пользователя" },
    //       { command: "/newAdmin", description: "Добавить админа" },
    //       { command: "/deleteAdmin", description: "Удалить админа" },
    //       { command: "/getAdmins", description: "Получить список админов" },
    //     ],
    //     {
    //       scope: {
    //         type: "chat",
    //         chat_id: chatId,
    //       },
    //     }
    //   );
    // }

    if (!answer.invitedBy) return;

    await bot.sendMessage(
      answer.invitedBy,
      `${name} присоединился к нам по вашей ссылке! Спасибо!`
    );
    const senderInvitedUsers = await getUserInvitesAmount(answer.invitedBy);
    await bot.sendMessage(
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
