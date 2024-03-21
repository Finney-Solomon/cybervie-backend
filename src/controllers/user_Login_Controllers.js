const passport = require("passport");
const User = require("../models/user_login_model");
const bcrypt = require('bcrypt');
const googleCallback = async (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/auth/google/error' }, async (error, userData, info) => {
    if (error) {
      return res.send({ message: error });
    }
    if (userData) {
      console.log (userData,"userData")
      try {
        // let user = await User.findOne({ email: userData._json.email });
        let id= userData?._id
         return res.redirect(`http://localhost:3000/welcome?userId=${id}`);
        
        if (userData) {

          return res.redirect(`http://localhost:3000/welcome?userId=${userData._id}`);
        } 
        // else {
        //   const hashedToken = await bcrypt.hash(userData._json.sub, 10);
        //   user = new User({
        //     userName: userData._json.name,
        //     email: userData._json.email,
        //     userType: "user",
        //     googleToken: hashedToken,
        //     image: userData._json.picture
        //   });
        //   await user.save();

        //   return res.redirect(`http://localhost:3000/welcome?userId=${user._id}`);
        // }
      } catch (error) {
        return res.send({ message: error.message });
      }
    }
  })(req, res, next);
};


const renderLoginPage = (req, res) => {
  res.send('Login page'); 
};


const logout = (req, res) => {
  req.logout();
  res.redirect('/'); 
};


const getUserDetails = async (req, res) => {
  const userId = req.params.userId;
  try {

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user details" });
  }
};


module.exports = {
  googleCallback,
  renderLoginPage,
  logout,
  getUserDetails
};



// const passport = require("passport");
// const User = require("../models/user_login_model");


// const googleCallback = passport.authenticate('google', { failureRedirect: '/auth/google/error' })
//   ;


// const renderLoginPage = (req, res) => {
//   res.render('login', { user: req.user }); 
// };


// const logout = (req, res) => {
//   req.logout();
//   res.redirect('/'); 
// };


// const getUserDetails = async (req, res) => {
//   const userId = req.params.userId;
//   try {

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.json({ success: true, data: user });
//   } catch (error) {
//     console.error("Error fetching user details:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch user details" });
//   }
// };


// module.exports = {
//   googleCallback,
//   renderLoginPage,
//   logout,
//   getUserDetails
// };
