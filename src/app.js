const createError = require('http-errors');
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const logger = require('morgan');
const route = require('./routes/index');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const loginCheck = require('./auth/passport');
const flash = require('express-flash');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(expressSession({ secret: process.env.SECRET_SESSION, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//conect to db
const connectionString = process.env.MONGOLAB_URI;
mongoose.connect(connectionString)
  .then(() => console.log("Connected successfully"))
  .catch(err => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


route(app);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

loginCheck(passport);

app.listen(PORT, () => console.log(`Server is running at PORT:${PORT}`));


module.exports = app;
