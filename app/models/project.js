'use strict';

/**
 * Created by inatani on 5/11/16.
 */
var mongoose = require('mongoose');

var Project_ = new mongoose.Schema({
  project : {
    name: String,
    platform: [
      {
        name: String,
        build: [
          {
            buildID: String,
            URL: String,
            uploadBy: String,
            bugCount: {
              total: Integer
            }
          }
        ]
      }
    ]
  }
});

module.exports = mongoose.model('project', Project_);
