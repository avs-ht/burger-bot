import db from "../connections/db.connection";
import userModel from "../models/user.model";

export const getUserStatus = async (login: string) => {
  await db.sync();
  const user = await userModel.findOne({
    where: {
      login,
    },
  });
  const status = user?.get("privileged");
  return status;
};
