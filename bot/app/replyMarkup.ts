import { BOT_URL, WEB_APP_URL } from "./constants";

export default (userId: number | undefined = 0) => {
  return {
    inline_keyboard: [
      [{ text: "🗂 Меню", web_app: { url: WEB_APP_URL } }],
      [{ text: "☺️ Профиль", web_app: { url: `${WEB_APP_URL}/profile` } }],
      [{ text: "📋 Мои заказы", web_app: { url: `${WEB_APP_URL}/orders` } }],
      [
        {
          text: "📍 Наши контакты",
          web_app: { url: `${WEB_APP_URL}/contacts` },
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
