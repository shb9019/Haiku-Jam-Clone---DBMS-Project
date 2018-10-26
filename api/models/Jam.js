const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const hooks = {};

const tableName = 'jam';

const Jam = sequelize.define('Jam', {
  jam_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
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
    defaultValue: -1,
  },
  user_id_2: {
    type: Sequelize.INTEGER,
    defaultValue: -1,
  },
  user_id_3: {
    type: Sequelize.INTEGER,
    defaultValue: -1,
  },
  is_complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
}, { hooks, tableName });

// eslint-disable-next-line
Jam.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Jam;
