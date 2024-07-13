const { validationResult, body } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const passport = require("passport");
const { jwtCreateToken } = require("../config/jwtCreateToken");

// List of Users

exports.list_users_controller_get = asyncHandler(async (req, res, next) => {
  const users = await User.find({}, "username").sort({ username: 1 }).exec();

  return res.send(Object.values(users));
});

// Create User - Sign in User

exports.user_create_controller_post = [
  body("username", "Username  must not be empty!")
    .isLength({ min: 1 })
    .escape(),

  body("password", "Password must not be empty!").isLength({ min: 1 }).escape(),

  body("confirm_password", "Password must match!").custom((value, { req }) => {
    return value === req.body.password;
  }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      console.log("err");

      return res.status(400).json([errors]);
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
          const user = new User({
            username: req.body.username,
            password: hashedPassword,
            admin: false,
          });
          await user.save();
        } catch {
          return next(err);
        }
      });
      return res.send(req.body);
    }
  }),
];

// exports.user_create_controller_post = asyncHandler(async (req, res, next) => {
//   bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
//     try {
//       const user = new User({
//         username: req.body.username,
//         password: hashedPassword,
//         admin: false,
//       });
//       await user.save();
//     } catch {
//       next(err);
//     }
//   });
//   return res.send(req.body);
// });

// Delete User

exports.user_delete_controller = asyncHandler(async (req, res, next) => {
  return res.send("Deleting User DELETE");
});

// Log In User

exports.user_log_in_controller_post = asyncHandler(async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json(info);
    }

    req.login(user, { session: false });
    jwtCreateToken(req, res);
    console.log(req.user);
  })(req, res, next);
});
