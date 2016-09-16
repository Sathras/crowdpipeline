/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user access
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // user not authentificated
  if (!req.session.authenticated) {
    if(req.isSocket) {
      return res.forbidden('You are not permitted to perform this action.');
    } else {
      req.addFlash('error', 'You must login first!');
      return res.redirect('/login?next='+req.url);
    }
  }

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  return next();
};
