import bot from "../connections/bot.connection";
import { server } from "../connections/server.connection";

server.post("/book", async (req, res) => {
  try {
    const { chatId } = req.query;
    const { message } = req.query;
    bot.sendMessage(chatId, message);
    return res.json({ success: true });
  } catch (err) {
    console.warn(err);
  }
});
