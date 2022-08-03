const blogRouter = require('./blog');
const loginRouter = require('./login');
const loginController = require('../controllers/loginController');

const route = function(app) {
  app.use('/blog',loginController.checkNotAuthentication, blogRouter);
  app.use('/login',loginController.checkAuthentication, loginRouter);
  app.get('/logout', loginController.logOut);
  app.use('/', (req, res) => {
    res.redirect('/login');
  });
}


module.exports = route;
