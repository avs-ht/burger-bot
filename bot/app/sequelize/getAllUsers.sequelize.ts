import db from "../connections/db.connection";
import userModel from "../models/user.model";

export const getAllUsers = async () => {
  await db.sync();
  const users = await userModel.findAll();
  const usersObjects = users.map(async (user) => ({
    id: await user.get("login"),
    username: `@${await user.get("username")}`,
    isBanned: await user.get("isBanned"),
  }));
  return await Promise.all(usersObjects);
};
