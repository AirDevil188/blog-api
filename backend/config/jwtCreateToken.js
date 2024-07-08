const jwt = require("jsonwebtoken");

exports.jwtCreateToken = (req, res) => {
  jwt.sign(
    { user: req.user._id },
    process.env.SECRET,
    { expiresIn: "25min" },
    (err, token) => {
      res.json({
        token,
      });
    }
  );
};
