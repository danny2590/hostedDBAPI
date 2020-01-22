const Sequelize = require("sequelize");
const db = require("../config/database.js");
const notes = require("/notesModel");

const account = db.define(
  "userAccount",
  {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.TEXT
    },
    email: {
      type: Sequelize.CHAR
    },
    accessibleBy: {
      type: Sequelize.TEXT
    }
  },
  { timestamps: true }
);

account.hasOne(notes, { foreignKey: "username" });

account.sync().then(function() {
  console.log("The Notes Table Exists");
});
