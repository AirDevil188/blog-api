const DateTime = require("luxon").DateTime;

const jwtDecode = require("jwt-decode").jwtDecode;

const User = require("../models/user");

const checkJWT = async (req, res, next) => {
  console.log("check jwt running");
  if (!req.headers.authorization) {
    return next();
  }
  const token = String(req.headers.authorization.split("Bearer "));
  const decoded = jwtDecode(token);
  const tokenExpirationDate = DateTime.fromSeconds(decoded.exp);
  const currentDate = DateTime.fromMillis(Date.now());

  // if the token expired return
  if (currentDate > tokenExpirationDate) {
    console.log("token expired");
    return next();
  }

  // if the token is valid find the user and assign req.user to user / and then send the information of the user to the frontend
  try {
    const user = await User.findById(decoded.user);
    req.user = user;
    return res.json({ user: user });
  } catch (err) {
    return next(err);
  }
};

module.exports = checkJWT;
