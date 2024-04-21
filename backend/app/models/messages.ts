export default  (sequelize, type, User, Room) => {
  const Message = sequelize.define('messages', {
    messageId: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: type.STRING
    }
  })
  Message.belongsTo(User, { foreignKey: 'userId', as: 'user' })
  Message.belongsTo(Room, { foreignKey: 'roomId', as: 'room' })

  return Message
}
