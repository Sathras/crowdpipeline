/**
 * SimController
 *
 * @description :: Server-side logic for managing simulations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const fs = require('fs');
const parser = require('xml2json');
var validator = require('validator');


module.exports = {

  // show form to create a new simulation
  add: function (req, res){
    res.view({edit : false, sim:{
    name          : '',
    file_source   : '',
    file_xml_base : '',
    file_xml_sim  : '',
    file_output   : '',
    vurl_original : '',
    vurl_real     : '',
    vurl_sim      : '',
    vurl_merged   : '',
    }});
  },

  // create a new simulation
  create: function (req, res){

    var data = {};

    // validation
    if(!req.param('name') || req.param('name')== '') return res.serverError();
    data.name = req.param('name');

    if(req.param('videooriginal') && validator.isURL(req.param('videooriginal')))
      data.vurl_original = req.param('videooriginal');
    if(req.param('videoreal') && validator.isURL(req.param('videoreal')))
      data.vurl_real = req.param('videoreal');
    if(req.param('videosim') && validator.isURL(req.param('videosim')))
      data.vurl_sim = req.param('videosim');
    if(req.param('videomerged') && validator.isURL(req.param('videomerged')))
      data.vurl_merged = req.param('videomerged');

    // create database entry
    Sim.create(data).exec(function(err, sim){

      if(err) return res.serverError();

      // attempt to upload files and link them
      Sim.uploadFile('source',  req.file('source'),  sim.id);
      Sim.uploadFile('xmlbase', req.file('xmlbase'), sim.id);
      Sim.uploadFile('xmlsim',  req.file('xmlsim'),  sim.id);
      Sim.uploadFile('output',  req.file('output'),  sim.id);

      res.redirect('/simulations');
    });
  },

  // delete simulations with all attachments
  destroy: function (req, res){
    if(!req.param('id')){
      req.flash('error', 'Error.MissingInput.ID');
      res.redirect('/simulations');
    }
    console.log(req.param('id'))

    // attempt to delete entry
    Sim.destroy(req.param('id')).exec(function(err, sim){
      if(err){
        req.flash('error', err);
        res.redirect('/simulations');
      }
      req.flash('message', "Simulation was successfully deleted.");
      res.redirect('/simulations');
    });
  },

  // show form to create a new simulation
  edit: function (req, res){
    if(!req.param('id')){
      req.flash('error', 'Error.MissingInput.ID');
      res.redirect('/simulations');
    }
    Sim.findOne(req.param('id')).exec(function (err, sim){

      if(err){
        req.flash('error', err);
        res.redirect('/simulations');
      }

      // view modified add form and include variables
      res.view('sim/add', {edit : true, sim:sim });
    });
  },

  // shows upload forms all simulations and associated files / videos
  // if user is authentificated, allows to manage them
  list: function (req, res){
    Sim.find({}).populateAll().exec(function(err, sims){
      if(err) req.flash('error', 'Error.LoadingFiles');
      if(!sims) req.flash('error', 'Error.NoFiles');

      return res.view({ simulations: sims });
    });
  },

  // renders the simulation
	render : function (req, res){

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
	}

};

