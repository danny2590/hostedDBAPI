const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const user = require("../models/user.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/", (req, res) => {
  return user
    .findAll()
    .then(allUsers => {
      res.json(allUsers);
    })
    .catch(err =>
      console.log("Could not fetch all USERS in userAccont table " + err)
    );
});

// req
//     .checkBody("passwordMatch", "Passwords do not match, please try again.")
//     .equals(req.body.password);

//   const errors = req.validationErrors();

//   if (errors) {
//     console.log(`errors: ${JSON.stringify(errors)}`);

//     res.render("login", {
//       title: "Login Error",
//       errors: errors
//     });
//   } else {
// }

// Store hashed password in DB.
router.post("/add", (req, res) => {
  const { username, password, email, accessibleBy, chosenColor } = req.body;
  console.log(req.body);
  bcrypt.hash(password, saltRounds, function(err, hash) {
    return user
      .create({
        username,
        password,
        email,
        accessibleBy,
        chosenColor
      })
      .then(data => res.send(data))
      .catch(err =>
        console.log(
          "Could not post this new account to the userAccounts table! " + err
        )
      );
  });
});

module.exports = router;
