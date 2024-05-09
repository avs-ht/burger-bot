import db from "../connections/db.connection";
import userModel from "../models/user.model";
export const getAdminState = async (login: string) => {
  await db.sync();

  const admin = await userModel.findOne({
    where: {
      login,
    },
  });

  return admin?.get("status");
};
