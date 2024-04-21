export default (sequelize, User, Room) => {
  const UserRoom = sequelize.define('users_rooms', {}, { timestamps: false })
  User.belongsToMany(Room, {
    through: UserRoom,
    foreignKey: 'userId',
    otherKey: 'roomId'
  })
  Room.belongsToMany(User, {
    through: UserRoom,
    foreignKey: 'roomId',
    otherKey: 'userId'
  })
  return UserRoom
}
