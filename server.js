var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// connect to db
mongoose.connect(configDB.url);

require('./config/passport')(passport);

// set up express app
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static('public'));

// set up ejs for templating
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'secret key' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require('./routes/index')(app, passport);
require('./routes/login')(app, passport);
require('./routes/profile')(app, passport);
require('./routes/signup')(app, passport);
require('./routes/logout')(app, passport);
require('./routes/settings')(app, passport);
require('./routes/admin_tools')(app, passport);

// launch
app.listen(port);
console.log('Server running on port:', port);
