/* user.js
*  user model
*  originally written by TheCallSign
* https://github.com/TheCallSign
*
*  Maintained by ZytherXYZ
* https://github.com/Zyther
*  zytherxyz
*/

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// schema for user model
var userSchema = mongoose.Schema({
    local   : {
       email        : String,
       password     : String
    }
});

// Methods ==========
//gen a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Checking if password is correct
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
