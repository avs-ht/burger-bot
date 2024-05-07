import { WEB_APP_URL } from "./constants";

export default (userId: number | undefined = 0) => {
  return {
    inline_keyboard: [
      [{ text: "Меню", web_app: { url: WEB_APP_URL } }],
      [{ text: "Профиль", web_app: { url: WEB_APP_URL } }],
      [{ text: "Мои заказы", web_app: { url: WEB_APP_URL } }],
      [{ text: "Наши контакты", web_app: { url: WEB_APP_URL } }],
      [{ text: "Пригласить друга", url: `${WEB_APP_URL}/?start=${userId}` }],
    ],
  };
};
