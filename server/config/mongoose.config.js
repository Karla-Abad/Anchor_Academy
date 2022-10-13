const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://localhost/AnchorAcademy_db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(
      `Established a connection to the database called AnchorAcademy_db.`
    )
  )
  .catch((err) =>
    console.log("Something went wrong when connecting to the database.", err)
  );
