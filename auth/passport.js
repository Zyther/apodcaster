////////////////////
// Podcaster
// passport.js
// Written by:
// -- Zyther
// https://github.com/Zyther
// -- TheCallSign
// https://github.com/TheCallSign
////////////////////

////////////////////
// Load everything
////////////////////

//load passport strategy lib
var LocalStrategy = require('passport-local').Strategy;

// now the user mdoel
var User = require('../db/models/user');


////////////////////
// export function
////////////////////
module.exports = function(passport){

    ////////////////////
    // passport sesh setup
    //
    // required for login sesh to persist
    // needs to serialize and deserialize a user
    ////////////////////
    //serialize
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    //deserialize
    passport.deserializeUser(function(id,done){
        User.findById(id, function(err,user){
            done(err,user);
        });
    });

    ////////////////////
    // Signup
    // for now only local
    ////////////////////

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req,email,password,done){
        //async
        process.nextTick(function(){
            User.findOne({'local.email': email}, function(err,user){
                if (err) {
                    return done(err);
                }
                if (user) {
                    // cant use a used email
                    return done(null, false, req.flash('loginMessage', 'Email is already taken. Please use another, or log in if this is your account.'));
                } else {
                    // no user with that email, continue
                    var newUser = new User();

                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);

                    // save it
                    newUser.save(function(err){
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));


    ////////////////////
    // Login
    ////////////////////
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req,email,password,done){
        User.findOne({'local.email' : email}, function(err,user){
            if(err){
                return done(err);
            }

            if(!user) {
                return done(null,false,req.flash('loginMessage', 'Invalid User or password.'));
            }
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Invalid User or password.'));
            }
            return done(null, user);
        });
    }));
};
