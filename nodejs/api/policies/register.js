/**
 * register
 *
 * @module      :: Policy
 * @description :: Simple policy for checking wheter registration is enabled
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (sails.config.globals.allow_registration){
    return next();
  }

  // otherwise create error and redirect to login page
  req.flash('error', 'Error.Login.Disabled');
  return res.redirect('/login');
};
