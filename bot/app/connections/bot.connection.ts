import dotenv from "dotenv";
dotenv.config();
import TelegramBot from "node-telegram-bot-api";

export default new TelegramBot(process.env.TOKEN || "", { polling: true });
