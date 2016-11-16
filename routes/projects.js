/**
 * Created by Connor on 2016-11-16.
 */
var express = require('express');
var router = express.Router();

var Project = require('../models/project');

// GET handler for /projects
router.get('/', function(req, res, next) {

    // use Project model to run a query
    Project.find(function(err, projects) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // load the games view
            res.render('projects', {
                title: 'Projects',
                pageNum: 2,
                games: projects
            });
        }
    });
});

module.exports = router;