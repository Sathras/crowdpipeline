/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /** this function decides which page is shown at root:
    * normal: show uploaded file list
    * if GET parameter 'next' --> redirect to the url
    */
  start : function (req, res){
    res.redirect('/files');
  },

  functions : function (req, res){
    res.view();
  }
};

