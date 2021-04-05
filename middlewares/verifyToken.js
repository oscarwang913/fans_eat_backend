const jwt = require("jsonwebtoken");
const config = require("../config/secretConfig");

const checkLogInStatus = (req, res, next) => {
  let token = req.headers["authorization"];
  token = token.replace(/^Bearer\s+/, "");

  if (!token) {
    return res
      .status(403)
      .send({ auth: false, message: "Please login or register" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: err,
      });
    }
    // put the decoded info to req
    req.userId = decoded.id;
    req.token = token;
    next();
  });
};

module.exports = checkLogInStatus;
