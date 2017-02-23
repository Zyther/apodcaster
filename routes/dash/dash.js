/**
 * Created by alecg on 2/22/2017.
 */

var express = require("express");
var router = express.Router();
var path = require("path");
var appRootDir = require('app-root-dir').get();



module.exports = function(passport) {
    router.use(isLoggedIn);
    router.use("/", express.static(path.join(appRootDir + "/srcwebapp")));

    return router;
};



function isLoggedIn(req,res,next){
    if (req.isAuthenticated()) {
        return next();
    }
    //else return to home
    res.redirect('/login');
}

