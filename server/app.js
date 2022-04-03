const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const db = require('./lib/mysql');
const session = require('express-session');
const cors = require("cors")

const app = express();
app.use(session({
  secret: "PLMS?Baleum!",
  resave: true,
  saveUninitialized: true,
}))
const passport = require('./lib/passport')(app, db)

const apiRouter = require('./routes/api');
const classRouter = require('./routes/class');
const indexRouter = require('./routes/index');
const inputRouter = require('./routes/input');
const usersRouter = require('./routes/users')(passport);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors({
  credentials: true,
  origin: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/class', classRouter);
app.use('/input', inputRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
