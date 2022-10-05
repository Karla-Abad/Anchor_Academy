const TeacherController = require("../controllers/teacher.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.get("/api/teachers", TeacherController.findAllTeachers);
  app.post("/api/teachers", authenticate, TeacherController.createTeacher);
  app.get(
    "/api/teachers/:username",
    authenticate,
    TeacherController.findAllTeachersByUser
  );
  app.get("/api/teacher/:id", TeacherController.findTeacher);
  app.put("/api/teacher/:id", TeacherController.updateTeacher);
  app.delete("/api/teacher/:id", TeacherController.deleteTeacher);
};
