import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Room = sequelize.define('room', {
    roomId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    roomName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      collate: 'utf8_bin'
    }
  });

  return Room;
};
