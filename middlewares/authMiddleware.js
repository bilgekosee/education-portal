const User = require("../models/User");

module.exports = async (req, res, next) => {
  if (!req.session.userID) {
    console.log("User not authenticated");
    return res.redirect("/login");
  }
  try {
    const user = await User.findById(req.session.userID).exec();
    if (!user) {
      console.log("User not found");
      return res.redirect("/login");
    }
    console.log("User authenticated:", user);
    next();
  } catch (error) {
    console.log("Error finding user:", error);
    res.redirect("login");
  }
};
