'use strict';
/**
 * Created by inatani on 5/4/16.
 */
var jwt = require('jwt-simple');
var validateUser = require('../controllers/auth').validateUser;

var validateRequests = function(req, res, next){
  var token = (req.body && req.body.accessToken) || (req.query && req.query.accessToken) ||(req.headers['x-access-token']);
  var key =  (req.body && req.body.xKey) || (req.query && req.query.xKey) ||(req.headers['x-key']);

  if (token || key){
    try{
      var decoded = jwt.decode(token, require('../utilities/secret'));
      if(decoded.exp <=Date.now()){
        res.state(400);
        res.json({
          'status' : 400,
          'message' : 'Token Expired'
        });
        return;
      }
      var loginUser = validateUser(key);
      if(loginUser){
        if(loginUser.emailID === key){
          next();
        } else {
          res.status(403);
          res.json({
            'status' : 403,
            'message' : 'unauthorized user'
          });
          return;
        }
      } else {
        res.status(401);
        res.json({
          'status' : 401,
          'message' : 'invalid user'
        });
      }
    } catch(err) {
      res.status(500);
      res.json({
        'status' : 500,
        'message' : 'Server Error'
      });
    }
  } else {
    res.status(401);
    res.json({
      'status' : 401,
      'message' : 'Invalid Token or Key'
    });
    return;
  }
};
module.exports = validateRequests;
