import db from "../connections/db.connection";
import userModel from "../models/user.model";

export const updateUsername = async (login: string, username: string) => {
  await db.sync();
  const user = await userModel.findOne({
    where: {
      login,
    },
  });
  await user?.update({
    username,
  });
  return true;
};
