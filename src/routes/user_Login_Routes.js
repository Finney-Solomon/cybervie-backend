// const express = require("express");
// const router = express.Router();
// const userLoginController = require("../controllers/user_Login_Controllers");
// const passport = require("../config/passport");

// // Google OAuth routes
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


// router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     // Extract user ID from req.user or any other source in your backend
//     const userId = req.user._id; // Assuming you have user data available in req.user after authentication

//     // Redirect to frontend with user ID as query parameter
//     res.redirect(`hhttp://localhost:3000/welcome?userId=${userId}`);
// });
// // router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
// //     // (req, res) => {
// //     //     // Redirect to the login page with user data
// //     //     res.redirect('/welcome');
// //     //   }
// // });
// // router.get('/google',  passport.authenticate('google', { scope: ['profile', 'email'] }));

// // router.get('/auth/google/callback', userLoginController.googleCallback, );
// router.get('/login', userLoginController.renderLoginPage);

// // Logout route
// router.get('/logout', userLoginController.logout);
// router.get('/userDetails/:userId', userLoginController.getUserDetails);


// module.exports = router; 



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



