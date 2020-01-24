const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const user = require("../models/user.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Return a full listing of all accounts in Table
router.get("/", async (req, res) => {
  return await user
    .findAll()
    .then(allUsers => {
      res.json(allUsers);
    })
    .catch(err =>
      console.log("Could not fetch all USERS in userAccont table " + err)
    );
});

// Store hashed password in DB and validate user entered data meets necessary requirements
router.post(
  "/add",
  [
    expressValidator
      .check("username")
      .not()
      .isEmpty()
      .withMessage("Username cannot be left blank!"),
    expressValidator.check("email").isEmail(),
    expressValidator
      .check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be longer than 6 characters")
  ],
  (req, res) => {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, password, email, accessibleBy, chosenColor } = req.body;
    console.log(req.body);
    bcrypt.hash(password, saltRounds, function(err, hash) {
      return user
        .create({
          username,
          password: hash,
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
  }
);

// Delete an account by it's username
router.delete("/:username/delete", async (req, res) => {
  const accountDeleted = await user.destroy({
    where: { username: req.params.username }
  });
  return res.json({ accountDeleted });
});

// Log-in function to find an account by it's username and verify the password
router.get("/login/:username", async (req, res) => {
  const givenUsername = req.params.username;
  const givenPassword = req.body.password;
  await user
    .findOne({
      where: {
        username: givenUsername
      }
    })
    .then(retrieved => {
      const match = bcrypt.compareSync(givenPassword, retrieved.password);
      if (match) {
        console.log("Login True");
        return res.json({ retrieved });
      } else {
        console.log("Password did not match!");
        return res
          .status(418)
          .send("Log-in credentials could not be verified.");
      }
    })
    .catch(err =>
      console.log("Error with get function call. Review submitted data" + err)
    );
});

module.exports = router;
