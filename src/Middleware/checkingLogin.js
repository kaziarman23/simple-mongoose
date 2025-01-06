const jwt = require("jsonwebtoken");

const checkingLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    const { user, userId } = decoded;
    req.user = user;
    req.userId = userId;
    console.log("is working", decoded);
    next();
  } catch {
    next("authentication failure !");
  }
};

module.exports = checkingLogin;
