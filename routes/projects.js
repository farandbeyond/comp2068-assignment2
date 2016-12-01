/**
 * Created by Connor on 2016-11-16.
 */
var express = require('express');
var router = express.Router();

var Project = require('../models/project');
var passport = require('passport');

// auth check
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

// GET handler for /projects
router.get('/', isLoggedIn, function(req, res, next) {
    // use Project model to run a query
    Project.find(function(err, projects) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // load the project view
            res.render('projects', {
                title: 'Projects',
                user: req.user,
                pageNum: 2,
                projects: projects
            });
        }
    });
});
// load empty form, and create a project
router.get('/add',isLoggedIn, function(req,res,next){
   res.render('addProject',{
       title: 'Add new project',
       user: req.user,
       pageNum: 2
    });
});
//add a project to the DB, after hitting the submit button
router.post('/add',isLoggedIn, function(req, res, next) {
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
//delete a project from the DB
router.get('/delete/:_id',isLoggedIn, function(req, res, next) {
    // read the id value from the url
    var _id = req.params._id;
    // use mongoose to delete this game
    Project.remove( { _id: _id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {message: 'Delete Error'});
        }
        res.redirect('/projects');
    });
});
//grab a project's data for editing
router.get('/:_id',isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // look up the selected Project document with this _id
    Project.findById(_id,  function(err, project) {
        if (err) {
            console.log(err);
            res.render('error', { message: 'Could not find Project'});
        }
        else {
            // load the edit form
            res.render('editProject', {
                title: 'Edit Game',
                project: project,
                user: req.user,
                pageNum: 10
                //user: req.user
            });
        }
    });
});
//update a project's data into the DB
router.post('/:_id',isLoggedIn, function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // instantiate a new Game object & populate it from the form
    var game = new Project( {
        _id: _id,
        title: req.body.title,
        language: req.body.language,
        description: req.body.description,
        team: req.body.team,
        startDate: req.body.startdate,
        active: req.body.active,
        complete: req.body.complete
    });

    // save the update using Mongoose
    Project.update( { _id: _id }, game, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {message: 'Could not Update Project'});
        }
        else {
            res.redirect('/projects');
        }
    });
});





module.exports = router;