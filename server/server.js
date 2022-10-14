require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
// Replacing process.env.MY_PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// Configuring the server to accept and update cookies. Helps decode cookie's information.
app.use(cookieParser());

require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/student.routes")(app);
require("./routes/teacher.routes")(app);

app.listen(process.env.PORT || port, () => {
  console.log(`Express server running.`);
});
