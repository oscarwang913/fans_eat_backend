const jwt = require("jsonwebtoken");
const config = process.env.SECRET;

const checkLogInStatus = (req, res, next) => {
  let token = req.headers["authorization"];
  token = token.replace(/^Bearer\s+/, "");

  if (!token) {
    return res
      .status(403)
      .send({ auth: false, message: "Please login or register" });
  }
  jwt.verify(token, config, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: err,
      });
    }
    // put the decoded info to req
    req.userId = decoded.id;
    req.userName = decoded.username;
    req.token = token;
    next();
  });
};

module.exports = checkLogInStatus;
