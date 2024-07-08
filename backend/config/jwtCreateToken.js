const jwt = require("jsonwebtoken");

exports.jwtCreateToken = (req, res) => {
  const expirationTime = Math.floor(Date.now() / 1000) + 25 * 60; // 25 minutes
  jwt.sign(
    { user: req.user._id },
    process.env.SECRET,
    { expiresIn: expirationTime },
    (err, token) => {
      res.json({
        token,
      });
    }
  );
};
