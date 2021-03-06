const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', (req, res) => res.redirect('/sign-up'));
app.get('/sign-up', (req, res) => res.render('index'));
app.get('/login', (req, res) => res.render('index'));
app.get('/verify-email/:token', (req, res) => res.render('index'));
app.post('/sign-up', require('./routes/sign-up'));
app.post('/login', require('./routes/login'));
app.post('/verify-email', require('./routes/verify-email'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
