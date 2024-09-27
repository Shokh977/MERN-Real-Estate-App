const { errorHandler } = require("./error");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));


    //  we are getting user id (token + env.JWT_SECRET) as user here and setting it to req.user
    // and call next() so it goes next function in router (router.get("/update/:id", verifyToken, controller.updateUser);)
    // idea is getting user by thier id to update the one 
    req.user = user
    next()
  });
};
