import dotenv from "dotenv";
dotenv.config();
import { Dialect, Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    dialect: process.env.POSTGRES_DIALECT as Dialect,
  }
);
export default db;
