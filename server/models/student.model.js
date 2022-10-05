const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema(
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
      min: "2003-01-01",
    },
    grade: {
      type: String,
      enum: ["Select a grade", "Kinder A", "Kinder B", "1A", "1B", "2A", "2B"],
      default: "Select a grade",
      required: [true, "Grade is required"],
    },
    accountStanding: {
      type: String,
      enum: ["Select options", "Current", "Late"],
      default: "Select options",
    },
    mothersName: {
      type: String,
      required: [true, "Mother's name is required"],
      minlength: [6, "Mother's name must be at least 6 characters long."],
    },
    fathersName: {
      type: String,
      required: [true, "Father's name is required"],
      minlength: [6, "Father's name must be at least 6 characters long."],
    },
    legalGuardiansName: {
      type: String,
      required: [true, "Legal Guardian's name is required"],
      minlength: [
        6,
        "Legal Guardian's name must be at least 6 characters long.",
      ],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      //   Ref should be equal to the name of the collection you want this collection to be linked to.
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
