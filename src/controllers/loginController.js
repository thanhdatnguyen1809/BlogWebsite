const User = require("../models/User");

class loginController {
  index(req, res) {
    res.render("login");
  }
  
  checkAuthentication(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/blog');
    } else {
        next();
    }
  }

  checkNotAuthentication(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/login');
    }
  }

  logOut(req, res, next) {
    req.logOut(err => {
      if(err) return next(err);
      res.redirect('/login');
    });
  }
}



module.exports = new loginController();
