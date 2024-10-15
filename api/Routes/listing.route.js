const express = require("express");

const { createListing } =  require ("../Controller/listing.controller.js");
const { verifyToken } = require( "../Utils/verifyUser.js");

const router = express.Router();


router.post('/create', verifyToken, createListing)

module.exports = router;
