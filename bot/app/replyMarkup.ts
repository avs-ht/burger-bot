import { InlineKeyboardButton } from "node-telegram-bot-api";
import { BOT_URL, WEB_APP_URL } from "./constants";

export default (userId: string, invitesAmount: number) => {
  const inline_keyboard: InlineKeyboardButton[][] = [
    [
      {
        text: "☺️ Профиль",
        web_app: { url: `${WEB_APP_URL}profile/${invitesAmount}` },
      },
    ],
    [
      {
        text: "🎁 Мои бонусы",
        web_app: { url: `${WEB_APP_URL}wallet` },
      },
    ],
    [
      {
        text: "📍 Наши контакты",
        web_app: { url: `${WEB_APP_URL}contacts` },
      },
    ],
    [
      {
        text: "🙍 Пригласить друга",
        switch_inline_query: `${BOT_URL}?start=${userId}`,
      },
    ],
  ];

  return {
    inline_keyboard,
  };
};

export const keyBoard = () => {
  return {
    keyboard: [
      [
        {
          text: "T Забронировать столик",
          web_app: { url: `${WEB_APP_URL}book` },
        },
      ],
      [{ text: "🗂 Меню", web_app: { url: WEB_APP_URL } }],
    ],
  };
};
