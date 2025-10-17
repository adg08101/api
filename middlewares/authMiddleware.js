const jwt = require("jsonwebtoken");
const { secretConfig } = require("../config");

const JWT_SECRET = secretConfig.secretToken;

function verifyToken(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Not authorized, please login" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalid or expired" });
  }
}

module.exports = verifyToken;
