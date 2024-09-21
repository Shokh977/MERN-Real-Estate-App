const express = require('express')

const authController = require('../Controller/auth.controller')

const router = express.Router()

router.post('/signup', authController.signup)
router.post('/signin', authController.signin)
router.post('/google', authController.google)


module.exports = router