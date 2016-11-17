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
                projects: projects
            });
        }
    });
});

router.get('/add', function(req,res,next){
   res.render('addProject',{
       title: 'Add new project',
       pageNum: 2
    });
});

router.post('/add', function(req, res, next) {
    // use the Project model and call the Mongoose create function
    Project.create( {
        title: req.body.title,
        language: req.body.language,
        description: req.body.description,
        team: req.body.team,
        startdate: req.body.startdate,
        active: req.body.active,
        completed: req.body.completed
    }, function(err, Project) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            res.redirect('/projects');
        }
    });
});

module.exports = router;