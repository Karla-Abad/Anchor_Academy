const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      minlength: [3, "First name must be at least 3 characters long."],
    },
    middleName: {
      type: String,
      required: [true, "Middle name is required."],
      minlength: [3, "Middle name must be at least 3 characters long."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      minlength: [3, "Last name must be at least 3 characters long."],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of Birth is required."],
      min: "1950-01-01",
    },
    section: {
      type: String,
      enum: [
        "Select a section",
        "Early Education",
        "Elementary",
        "Middle School",
        "High School",
      ],
      default: "Select a section",
      required: [true, "Section is required."],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required."],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      //   Ref should be equal to the name of the collection you want this collection to be linked to.
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
