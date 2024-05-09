import db from "../connections/db.connection";
import userModel from "../models/user.model";

export const getAllUsers = async () => {
  await db.sync();
  const users = await userModel.findAll();
  return users.map((user) => user.get("login"));
};
