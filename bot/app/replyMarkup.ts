import { BOT_URL, WEB_APP_URL } from "./constants";

export default (userId: string, invitesAmount: number) => {
  return {
    inline_keyboard: [
      [{ text: "🗂 Меню", web_app: { url: WEB_APP_URL } }],
      [
        {
          text: "☺️ Профиль",
          web_app: { url: `${WEB_APP_URL}profile/${invitesAmount}` },
        },
      ],
      [
        {
          text: "📋 Забронировать стол",
          web_app: { url: `${WEB_APP_URL}book` },
        },
      ],
      [
        {
          text: "🎁 Мои бонусы",
          url: "https://t.me/wallet?startattach",
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
    ],
  };
};
