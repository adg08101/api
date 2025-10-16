const jwt = require("jsonwebtoken");
const { secretConfig } = require("../config");

const JWT_SECRET = secretConfig.secretToken;

function verifyToken(req, res, next) {
  const token = req.cookies?.user;
  if (!token) {
    console.log("Not authorized");
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log("Authorized");
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalid or expired" });
  }
}

module.exports = verifyToken;
