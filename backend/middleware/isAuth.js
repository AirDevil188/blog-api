const passport = require("passport");
const asyncHandler = require("express-async-handler");

exports.isAuth = asyncHandler(async (req, res, next) => {
  passport.authenticate("jwt", { session: false });
});
