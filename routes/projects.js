/**
 * Created by Connor on 2016-11-16.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('projects', {
        title: 'Projects',
        pageNum: 2
    });
});

module.exports = router;