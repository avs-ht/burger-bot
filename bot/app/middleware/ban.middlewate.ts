import { getBanned } from "../sequelize/getBanned.sequelize";

const banMiddlewareHandler = async () => {
  const isBanned = await getBanned((this as any).chatId);
  return isBanned;
};
