const Teacher = require("../models/teacher.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.findAllTeachers = (req, res) => {
  Teacher.find()
    .populate("createdBy", "username email")
    .then((allTeachers) => {
      console.log({ allTeachers });
      res.json({ allTeachers });
    })
    .catch((err) => {
      console.log("Find all Teachers failed.");
      res.status(400).json({ err });
    });
};

module.exports.createTeacher = (req, res) => {
  const newTeacherObject = new Teacher(req.body);
  // const decodedJWT = jwt.decode(req.cookies.usertoken, {
  //   complete: true
  // })

  //This works because of variable added on jwt.config.js
  newTeacherObject.createdBy = req.jwtpayload.id;

  // newOrderObject.createdBy = decodedJWT.payload.id

  newTeacherObject
    .save()
    .then((newTeacher) => res.json(newTeacher))
    .catch((err) => {
      console.log("Something went wrong in createNewTeacher.");
      res.status(400).json({ err });
    });
};

module.exports.findTeacher = (req, res) => {
  Teacher.findOne({ _id: req.params.id })
    .then((teacher) => res.json(teacher))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.updateTeacher = (req, res) => {
  Teacher.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedTeacher) => res.json(updatedTeacher))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.deleteTeacher = (req, res) => {
  Teacher.deleteOne({ _id: req.params.id })
    .then((deleteConfirmation) => res.json(deleteConfirmation))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.findAllTeachersByUser = (req, res) => {
  if (req.jwtpayload.username !== req.params.username) {
    User.findOne({ username: req.params.username })
      .then((userNotLoggedIn) => {
        Student.find({ createdBy: userNotLoggedIn._id })
          .populate("createdBy", "username email")
          .then((allTeachersfromUser) => {
            console.log(allTeachersfromUser);
            res.json(allTeachersfromUser);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  } else {
    Teacher.find({ createdBy: req.jwtpayload.id })
      .populate("createdBy", "username email")
      .then((allTeachersFromLoggedInUser) => {
        console.log(allTeachersFromLoggedInUser);
        res.json(allTeachersFromLoggedInUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};
