const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers")

// middleware
const authMiddleware = require("../middlewares/authMiddlewares");



// signup page  
router
    .route("/signup").
    post(userControllers.userSignup);

// login page  
router
    .route("/login").
    post(userControllers.loginUser);

// user login [which user is log (admin or not)]
router
    .route("/user-details")
    .get(authMiddleware, userControllers.getUserDetails);





module.exports = router; 
