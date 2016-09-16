/**
 * SimController
 *
 * @description :: Server-side logic for managing simulations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const fs = require('fs');
const parser = require('xml2json');

module.exports = {
  // renders the simulation
	render : function (req, res){

	  console.log(req.locals)

	  if(!req.param('id')){
	    req.flash('error', 'Error.NoID');
	    return res.redirect('/files');
	  }

	  File.findOne({id:req.param('id')}).exec(function(err, file){

	    // error handling
      if(err) req.flash('error', 'Error.LoadingFiles');
      if(!file) req.flash('error', 'Error.NoSimulation');
      if(err || !file) return res.redirect('/files');

      // get file content
      var xml = fs.readFileSync('/home/ubuntu/workspace/assets/'+file.url,
        'utf8', function (err, xml) {
        if (err) {
          req.flash('error', 'Error.SimulationReadError');
          return res.redirect('/files');
        }
      });

      // return a string containing the JSON structure
      var content =  parser.toJson(xml, {object: true});

      res.view({
        config : sails.config.simulation,
        layout : 'layouts/simulation',
        sim    : content
      });
	  });
	},
};

