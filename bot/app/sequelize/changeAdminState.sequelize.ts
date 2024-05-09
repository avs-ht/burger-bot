import db from "../connections/db.connection";
import userModel from "../models/user.model";

export const changeAdminState = async (
  login: string,
  state: "sendingMailing" | "off" | "newAdmin" | "deleteAdmin"
) => {
  await db.sync();
  const user = await userModel.findOne({
    where: {
      login,
    },
  });
  await user?.update({
    state: state,
  });

  return true;
};
