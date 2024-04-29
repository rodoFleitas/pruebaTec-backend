const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const authtoken = req.headers.authorization;
  jwt.verify(authtoken, ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) return res.status(401).json({ message: "Token invalido" });
    else if (data) {
      req.user = data;
      next();
    }
  });
};

module.exports = authenticateToken;
