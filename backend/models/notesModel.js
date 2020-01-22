const Sequelize = require("sequelize");
const db = require("../config/database.js");

const savedNotes = db.define(
  "stickynotes",
  {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    userIPinfo: {
      type: Sequelize.JSON
    },
    posts: {
      type: Sequelize.TEXT
    }
  },
  { timestamps: true }
);

module.exports = savedNotes;
