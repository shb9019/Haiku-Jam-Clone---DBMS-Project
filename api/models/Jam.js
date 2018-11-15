const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');

const hooks = {};

const tableName = 'jam';

const Jam = sequelize.define('Jam', {
  jam_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  verse_1: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  verse_2: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  verse_3: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  user_id_1: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
  user_id_2: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
  user_id_3: {
    type: Sequelize.INTEGER,
    defaultValue: null,
  },
  is_complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
}, { hooks, tableName });

Jam.belongsTo(User, { foreignKey: 'user_id_1', targetKey: 'user_id' });
Jam.belongsTo(User, { foreignKey: 'user_id_2', targetKey: 'user_id' });
Jam.belongsTo(User, { foreignKey: 'user_id_3', targetKey: 'user_id' });

// eslint-disable-next-line
Jam.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Jam;
