/**
 * Created by Connor on 2016-11-29.
 */
var mongoose = require('mongoose');

// define the class using a mongoose schema
var plm = require('passport-local-mongoose');


var accountSchema = new mongoose.Schema
({
    username: String
});

accountSchema.plugin(plm);
// make the class definition public as "Account"
module.exports = mongoose.model('Account', accountSchema);