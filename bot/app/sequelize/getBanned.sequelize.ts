import db from "../connections/db.connection";
import userModel from "../models/user.model";

export const getBanned = async (login: string) => {
  await db.sync();
  const user = await userModel.findOne({
    where: {
      login,
    },
  });
  return !!user?.get("isBanned");
};
