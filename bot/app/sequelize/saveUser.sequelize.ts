import db from "../connections/db.connection";
import userModel from "../models/user.model";
export const saveUser = async (login: string, invitedBy?: string) => {
  await db.sync();

  const foundedUser = await userModel.findOne({
    where: {
      login,
    },
  });

  if (!foundedUser) {
    const sender = await userModel.findOne({
      where: {
        login: invitedBy || "",
      },
    });
    await userModel.create({
      login: login,
      invitedBy: sender ? invitedBy : "",
    });

    if (sender) {
      const senderInvitedUsers = (sender.get("invitedUsers") as any[]) || [];
      await sender.update({
        invitedUsers: [...senderInvitedUsers, login],
      });
      return {
        invitedBy: invitedBy,
      };
    }
    return null;
  }
  return null;
};
