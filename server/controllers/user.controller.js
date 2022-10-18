// Using ES5 syntax for import vs ES6 due to scoping. ES6 will not work as expected.
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res) => {
    const user = new User(req.body);
    user
      .save()
      .then((newUser) => {
        console.log(newUser);
        console.log("Successfully registered.");
        res.json({
          successMessage: "Thank you for registering.",
          user: newUser,
        });
      })
      .catch((err) => {
        console.log("Registration NOT sucessful!!");
        res.status(400).json(err);
      });
  },

  updateUser: (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => res.status(400).json({ err }));
  },

  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((userRecord) => {
        //check if returned obj is null
        if (userRecord === null) {
          //email not found
          res.status(400).json({ message: "Invalid Login attempt!" });
        } else {
          //if email is found
          bcrypt
            .compare(req.body.password, userRecord.password) //both salted 10 times and it will return a bolean t/f
            .then((isPasswordValid) => {
              if (isPasswordValid) {
                console.log("Password is valid.");
                res
                  .cookie(
                    "usertoken",
                    jwt.sign(
                      {
                        //payload is the data we want to save
                        id: userRecord._id,
                        email: userRecord.email,
                        username: userRecord.username,
                      },
                      // wee need the scret key to sign the payload and make sure our information is secured.
                      process.env.JWT_SECRET
                    ),
                    {
                      //we will make sure these cookies are "httpOnly". This means that the cookes are essentially invisible to client-side JavaScript and can only be read by the server.
                      httpOnly: true,
                      // Even if user doesnt logout, cookie will be cleared automatically in set time.
                      expires: new Date(Date.now() + 90000000),
                    }
                  )
                  .json({
                    message: "Successfully logged in.",
                    userLoggedIn: userRecord.username,
                    userId: userRecord._id,
                  });
              } else {
                res.status(400).json({
                  message: "Invalid email and/or password.",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ message: "1 Invalid attempt" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "2 Invalid attempt" });
      });
  },

  logout: (req, res) => {
    console.log("logging out");
    res.clearCookie("usertoken");
    res.json({
      message: "You have successfully logged out.",
    });
  },

  getLoggedInUser: (req, res) => {
    User.findOne({ _id: req.jwtpayload.id })
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },

  findAllUsers: (req, res) => {
    User.find()
      .then((allUsers) => {
        res.json(allUsers);
      })
      .catch((err) => {
        console.log("Find All Users failed.");
        res.json({
          messagee: "Something went wrong in findAll Users.",
          error: err,
        });
      });
  },
};
