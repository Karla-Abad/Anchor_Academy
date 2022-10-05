const Student = require("../models/student.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.findAllStudents = (req, res) => {
  Student.find()
    .populate("createdBy", "username email")
    .then((allStudents) => {
      console.log({ allStudents });
      res.json({ allStudents });
    })
    .catch((err) => {
      console.log("Find all Students failed.");
      res.status(400).json({ err });
    });
};

module.exports.createStudent = (req, res) => {
  const newStudentObject = new Student(req.body);
  // const decodedJWT = jwt.decode(req.cookies.usertoken, {
  //   complete: true
  // })

  //This works because of variable added on jwt.config.js
  newStudentObject.createdBy = req.jwtpayload.id;

  // newOrderObject.createdBy = decodedJWT.payload.id

  newStudentObject
    .save()
    .then((newStudent) => res.json(newStudent))
    .catch((err) => {
      console.log("Something went wrong in createNewStudent.");
      res.status(400).json({ err });
    });
};

module.exports.findStudent = (req, res) => {
  Student.findOne({ _id: req.params.id })
    .then((student) => res.json(student))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.updateStudent = (req, res) => {
  Student.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedStudent) => res.json(updatedStudent))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.deleteStudent = (req, res) => {
  Student.deleteOne({ _id: req.params.id })
    .then((deleteConfirmation) => res.json(deleteConfirmation))
    .catch((err) => res.status(400).json({ err }));
};

module.exports.findAllStudentsByUser = (req, res) => {
  if (req.jwtpayload.username !== req.params.username) {
    User.findOne({ username: req.params.username })
      .then((userNotLoggedIn) => {
        Student.find({ createdBy: userNotLoggedIn._id })
          .populate("createdBy", "username email")
          .then((allStudentsfromUser) => {
            console.log(allStudentsfromUser);
            res.json(allStudentsfromUser);
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
    Student.find({ createdBy: req.jwtpayload.id })
      .populate("createdBy", "username email")
      .then((allStudentsFromLoggedInUser) => {
        console.log(allStudentsFromLoggedInUser);
        res.json(allStudentsFromLoggedInUser);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};
