import { DataTypes } from "sequelize";
import db from "../connections/db.connection";

export default db.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    privileged: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    invitedUsers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    invitedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastBotMessage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,

      allowNull: true,
    },
  },
  { timestamps: true, updatedAt: true }
);
