import { Sequelize } from "sequelize";
import dotenv from "dotenv";

import UserModel from "./models/users";
import RoomModel from "./models/rooms";
import UserRoomModel from "./models/users_rooms";
import MessageModel from "./models/messages";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME || "XatSprint7",
  process.env.DATABASE_USER || "root",
  process.env.DATABASE_PASSWORD || "",
  {
    host: process.env.DATABASE_HOST || "localhost",
    dialect: "mysql",
    logging: process.env.NODE_ENV === "dev",
  }
);

const User = UserModel(sequelize, Sequelize);
const Room = RoomModel(sequelize);
const UserRoom = UserRoomModel(sequelize, User, Room);
const Message = MessageModel(sequelize, Sequelize, User, Room);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tables synchronized");
  })
  .catch((error) => {
    console.error("Error creating database tables:", error);
  });

export { Room, Sequelize, User, UserRoom, Message, sequelize };
