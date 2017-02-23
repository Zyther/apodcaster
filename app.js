/**
* aPodcaster - ZytherXYZ
* app.js
* 2/22/17 - initial write
*
**/

//// includes
var express   = require("express"),
    mongoose  = require("mongoose"),
    passport  = require("passport"),
    flash     = require("connect-flash"),
    morgan    = require("morgan"),
    cookieP   = require("cookie-parser"),
    bodyP     = require("body-parser"),
    session   = require("express-session"),
    path      = require("path"),
    config    = require("./config/config");



//// inits
var app = express(),
    port = config.appPort || 8080;

require('app-root-dir').set(__dirname);


// connect to db
mongoose.connect(config.dbUrl);

// init passport
require("./auth/passport")(passport);

// express stuffs
app.use(morgan(config.environment || "dev"));
app.use(cookieP());
app.use(bodyP());
app.set("view engine", "ejs");

// serve static files
app.use("/3p", express.static(path.join(__dirname, "bower_components")));


// express + passport
app.use(session({secret: config.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// attach routes
require("./routes/routes.js")(app, passport);


// all is well, start the listening
app.listen(port);
console.log("aPodcaster live on port " + port);


// you 404'd.

app.use(function(req, res){
    var yourIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("The call below came from IP: " + yourIP);
    res.send('what???', 404);
});

app.enable('trust proxy');