export default  (sequelize, type) => {
  return sequelize.define('user', {
    userId: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: type.STRING,
      unique: true
    },
    displayName: {
      type: type.STRING
    },
    password: type.STRING
  })
}
