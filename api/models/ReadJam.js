const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');
const Jam = require('./Jam');

const hooks = {};

const tableName = 'readjam';

const ReadJam = sequelize.define('ReadJam', {
  jam_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
}, { hooks, tableName });

ReadJam.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' });
ReadJam.belongsTo(Jam, { foreignKey: 'jam_id', targetKey: 'jam_id' });

// eslint-disable-next-line
ReadJam.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  return values;
};

module.exports = ReadJam;
