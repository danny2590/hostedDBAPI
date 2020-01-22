const express = require("express");
const router = express.Router();

const notes = require("../models/notesModel");
// const user = require("../models/user.js");

router.get("/", (req, res) => {
  return notes
    .findAll()
    .then(allNotes => {
      res.json(allNotes);
    })
    .catch(err =>
      console.log("Could not fetch all entries in NOTES table " + err)
    );
});

router.post("/add", (req, res) => {
  const { uuid, username, userIPinfo, posts } = req.body;
  console.log(req.body);
  return notes
    .create({
      uuid,
      username,
      userIPinfo,
      posts
    })
    .then(data => res.send(data))
    .catch(err =>
      console.log("Could not post a new entry to the NOTES db" + err)
    );
});

router.delete("/:note_id", (req, res) => {
  notes.destroy({ where: { id: req.params.notes_id } });
  res.json({});
});

module.exports = router;

/*

NOTES: 
username: {
    type: Sequelize.STRING
  },
  userIPinfo: {
    type: Sequelize.JSON
  },
  posts: {
    type: Sequelize.TEXT
  },

USER:
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

*/
