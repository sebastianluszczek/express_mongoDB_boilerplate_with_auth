import jwt from "jsonwebtoken";

// Verify Token
const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split header for token
    const token = bearerHeader.split(" ")[1];

    // Verify authentication
    jwt.verify(token, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.authData = authData;
      }
    });

    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
