const mongoose = require("mongoose");

mongoose
  // .connect(`mongodb://localhost/${process.env.DB_NAME}`, {
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      `Established a connection to the database called ${process.env.DB_NAME}.`
    )
  )
  .catch((err) =>
    console.log("Something went wrong when connecting to the database.", err)
  );
