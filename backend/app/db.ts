import Sequelize from 'sequelize'
import 'dotenv'
import UserModel from './models/users'
import RoomModel from './models/rooms'
import UserRoomModel from './models/users_rooms'
import MessageModel from './models/messages'

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'dev'
  }
)

const User = UserModel(sequelize, Sequelize)
const Room = RoomModel(sequelize)
const UserRoom = UserRoomModel(sequelize, User, Room)
const Message = MessageModel(sequelize, Sequelize, User, Room)

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Table sincronized')
  })
  .catch((error) => {
    console.error('Error al crear la base de datos:', error)
  })

module.exports = {
  Room,
  Sequelize,
  User,
  UserRoom,
  Message,
  sequelize
}
