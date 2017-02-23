// routes root
// routes.js
// Zyther 2/22/17


var dashRoute = require("./dash/dash");

module.exports = function(app, passport){

    app.use("/dash", dashRoute(passport));

    app.get("/login", function(req, res, next){
        if (req.isAuthenticated()){
            res.redirect("/dash");
        } else {
            res.render('login.ejs', {user: req.user, message: req.flash('loginMessage')});
        }
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dash', // on correct pass
        failureRedirect : '/login', // on incorrect pass
        failureFlash : true
    }));


    app.get("/signup", function(req,res,next){
        if (req.isAuthenticated()){
            res.redirect("/dash");
        } else {
            res.render('signup.ejs', {user: req.user, message: req.flash('loginMessage')});


        }
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dash',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/logout', function(req,res,next){
        req.logout();
        res.redirect('/');
    });

    app.get("/", function(req,res,next){
        res.render("index.ejs", {user: req.user});
    });


};

