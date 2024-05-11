import db from "../connections/db.connection";
import userModel from "../models/user.model";

export const getAdmins = async () => {
  await db.sync();
  const admins = await userModel.findAll({
    where: {
      privileged: "admin",
    },
  });
  const adminsObjects = admins.map(async (user) => ({
    id: await user.get("login"),
    username: `@${await user.get("username")}`,
  }));
  return await Promise.all(adminsObjects);
};
