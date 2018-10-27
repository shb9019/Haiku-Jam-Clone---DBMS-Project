const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');
const Jam = require('./Jam');

const hooks = {};

const tableName = 'comments';

const Comments = sequelize.define('Comments', {
  jam_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, { hooks, tableName });

Comments.belongsTo(Jam, { foreignKey: 'jam_id' });
Comments.belongsTo(User, { foreignKey: 'user_id' });

// eslint-disable-next-line
Comments.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Comments;
