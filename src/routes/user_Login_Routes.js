const express = require("express");
const router = express.Router();
const userLoginController = require("../controllers/user_Login_Controllers");
const passport = require("../config/passport");

// Google OAuth routes
router.get('/google',  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', userLoginController.googleCallback, );
router.get('/login', userLoginController.renderLoginPage);

// Logout route
router.get('/logout', userLoginController.logout);
router.get('/userDetails/:userId', userLoginController.getUserDetails);


module.exports = router; 

