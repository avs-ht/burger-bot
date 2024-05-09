import db from "../connections/db.connection";
import userModel from "../models/user.model";

export const getAdmins = async () => {
  await db.sync();
  const admins = await userModel.findAll({
    where: {
      privileged: "admin",
    },
  });
  return admins.map((user) => user.get("login"));
};
