var express = require('express');
var router = express.Router();

// GET users listing.
router.get('/', function(req, res, next) {

    /*
    // use Project model to run a query
    Account.find(function(err, users) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // load the project view
            res.render('users',{
                title: 'users',
                user: req.user,
                userlist: users,
                pageNum: 5
            });
        };
    });
    */
    res.render('users',{
        title: 'users',
        user: req.user,
        pageNum: 5
    });
});


module.exports = router;
