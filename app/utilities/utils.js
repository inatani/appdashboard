'use strict';
/**
 * Created by inatani on 5/4/16.
 */
var jwt = require('jwt-simple');

function genToken(user){
  var expires = expiresIn(1);
  var token = jwt.encode({
    exp:expires
  }, require('../utilities/secret')());

  var filteredUser = {
    username : user.firstName + ' ' + user.lastName,
    emailid : user.emailID,
    role : user.role,
    empid : user.empID
  };

  return {
    token : token,
    expires : expires,
    user : filteredUser
  };
}

function expiresIn(numberInDays){
  var date = new Date();
  return date.setDate(date.getDate()+numberInDays);
}
