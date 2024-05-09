import db from "../connections/db.connection";
import userModel from "../models/user.model";

export const getUserInvitesAmount = async (login: string) => {
  await db.sync();
  const foundedUser = await userModel.findOne({
    where: {
      login,
    },
  });
  const invitedUsers = foundedUser?.get("invitedUsers") as any[];
  return invitedUsers ? invitedUsers.length : 0;
};
