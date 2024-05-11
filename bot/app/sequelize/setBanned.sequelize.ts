import db from "../connections/db.connection";
import userModel from "../models/user.model";

export const setBanned = async (login: string, isBanned: boolean) => {
  await db.sync();
  const user = await userModel.findOne({
    where: {
      login,
    },
  });
  await user?.update({
    isBanned,
  });
  return true;
};
