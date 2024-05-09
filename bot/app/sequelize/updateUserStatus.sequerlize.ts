import db from "../connections/db.connection";
import userModel from "../models/user.model";

export const updateUserStatus = async (
  login: string,
  status: "user" | "admin"
) => {
  await db.sync();
  const user = await userModel.findOne({
    where: {
      login,
    },
  });
  await user?.update({
    status,
  });
  return true;
};
