const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
    }

    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    console.error("Error in verifyToken", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};

module.exports = verifyToken;
