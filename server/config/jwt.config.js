const jwt = require("jsonwebtoken");

module.exports = {
  authenticate(req, res, next) {
    jwt.verify(
      req.cookies.usertoken,
      "kajfd1234fg564rjdfa87954djiemceiwo",
      (err, payload) => {
        if (err) {
          console.log(err);
          res.status(401).json({ verified: false });
        } else {
          console.log(payload);
          req.jwtpayload = payload;
          next();
        }
      }
    );
  },
};
