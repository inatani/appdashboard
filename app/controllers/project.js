'use strict';
/**
 * Created by inatani on 5/11/16.
 */

var Models = require('../models');

var ProjectController_ = {
  createProject: function(req, res) {
    var createProj = req.body;
    Models.Project.findOne({
      'project.name' : createProj.project.name
    }, function(err, response) {
      if (err) {
        throw err;
      }
      if (response) {
        res.status(200).send({
          error: 'Project already exists'
        });
        return;
      }
      var project= new Models.Project(req.body);
      project.save(function(err, response) {
        if (err) {
          throw err;
        }
        console.log('Create User Result ' + JSON.stringify(response));
        res.status(200).send({
          status: 'success'
        });
      });
    });
  },
  getAll: function(req, res) {
    Models.Project.find(function(err, response) {
      if (err) {
        throw err;
      }
      res.status(200).send(response);
    });
  },
  getOne: function(req, res) {
    Models.Project.findOne({
      'project.name' : req.params.projectName
    }, function(err, response) {
      if (err) {
        throw err;
      }
      res.status(200).send(response);
    });
  },
  update: function(req, res) {
    var project = new Models.Project(req.body);
    Models.Project.findOneAndUpdate({
      'project.name': req.params.id
    }, {
      $set: req.body
    }, {
      upsert: true
    }, function(err, response) {
      if (err) {
        throw err;
      } else {
        res.status(200).send({
          status: 'success'
        });
      }
    });
  },
  delete: function(req, res) {
    Models.Project.findOneAndRemove({
      'project.name': req.params.projectName
    }, function(err, response) {
      if (err) {
        throw err;
      } else {
        res.status(200).send({
          status: 'success'
        });
      }
    });
  }
};

module.exports = UserController_;