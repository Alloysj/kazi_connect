const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Session = sequelize.define('Session', {
  session_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  session_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'sessions',
  timestamps: false
});
// Associations
const User = require('./user');
Session.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
  as: 'user'
}); 
// Sync the model with the database
(async () => {
  try {
    await Session.sync();
    console.log('Session model synced successfully');
  } catch (error) {
    console.error('Error syncing Session model:', error);
  }
})();
module.exports = Session;
// This code defines a Sequelize model for a session table in a database.