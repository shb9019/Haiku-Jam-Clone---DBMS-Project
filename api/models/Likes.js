const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');
const Jam = require('./Jam');

const hooks = {};

const tableName = 'likes';

const Likes = sequelize.define('Likes', {
  jam_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, { hooks, tableName });

Likes.belongsTo(Jam, { foreignKey: 'jam_id' });
Likes.belongsTo(User, { foreignKey: 'user_id' });

// eslint-disable-next-line
Likes.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Likes;
