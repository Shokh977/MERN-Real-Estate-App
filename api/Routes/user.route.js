const express = require("express");

const controller = require('../Controller/User.controller');
const { verifyToken } = require("../Utils/verifyUser");

const router = express.Router();

router.get("/test", controller.test);
router.post("/update/:id", verifyToken, controller.updateUser);
router.delete("/delete/:id", verifyToken, controller.deleteUser);



module.exports = router;
