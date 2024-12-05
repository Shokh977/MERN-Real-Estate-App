const express = require("express");
const controller = require("../Controller/User.controller");
const verifyToken = require("../Middleware/verifyToken");

const router = express.Router();

router.get("/test", controller.test);
router.post("/update/:id", verifyToken, controller.updateUser);
router.delete("/delete/:id", verifyToken, controller.deleteUser);
router.get("/listing/:id", verifyToken, controller.getUserListings);
router.get("/:id", verifyToken, controller.getUser);

module.exports = router;
