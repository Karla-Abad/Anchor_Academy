const StudentController = require("../controllers/student.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.get("/api/students", StudentController.findAllStudents);
  app.post("/api/students", authenticate, StudentController.createStudent);
  app.get(
    "/api/students/:username",
    authenticate,
    StudentController.findAllStudentsByUser
  );
  app.get("/api/student/:id", StudentController.findStudent);
  app.put("/api/student/:id", StudentController.updateStudent);
  app.delete("/api/student/:id", StudentController.deleteStudent);
};
