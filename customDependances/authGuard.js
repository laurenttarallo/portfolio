const UserModel = require("../models/user.js");
// const { route } = require("../routes/userRouter.js");
let routeGuard = async (req, res, next) => {
  let user = await UserModel.findOne({_id: req.session.userId});
  if (user) {
    next();
  } else {
    res.redirect("/main");
  }
};


module.exports = routeGuard