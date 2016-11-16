/**
 * Created by Connor on 2016-11-16.
 */

var mongoose = require('mongoose');

// define the class using a mongoose schema
var projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'No title entered'
    },
    language: {
        type: String,
        required: 'No language entered'
    },
    description: {
        type: String,
        required: 'No description entered'
    },
    team: {
        type: String,
        required: 'No year entered'
    },
    startdate:{
        type: String,
        required: 'No starting date entered'
    },
    active:{
        type: Boolean
    },
    completed:{
        type: Boolean,
        required: 'Completion status unknown'
    }
});

// make the class definition public as "Project"
module.exports = mongoose.model('Project', projectSchema);