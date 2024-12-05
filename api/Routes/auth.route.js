const express = require('express')

const authController = require('../Controller/auth.controller')

const router = express.Router()
const verifyToken = require('../Middleware/verifyToken')

router.post('/signup', authController.signup)
router.post('/signin', authController.signin)
router.post('/google', authController.google)
router.get('/signout', authController.signout)
router.get('/checkauth',verifyToken, authController.checkAuth)
router.delete("/delete", verifyToken, authController.deleteProfile);





module.exports = router