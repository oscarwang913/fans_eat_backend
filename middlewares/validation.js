const userValidation = {
  register: (req, res, next) => {
    // For check userName
    if (!req.body.userName || req.body.userName.length < 5) {
      return res
        .status(400)
        .send({ errorMsg: "Please enter a userName with minimum 5 chars" });
    }

    // For check password
    if (!req.body.password || req.body.password.length < 8) {
      return res
        .status(400)
        .send({ errorMsg: "Please enter a userName with minimum 8 chars" });
    }
    next();
  },
};

module.exports = userValidation;
