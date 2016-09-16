/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const fs = require('fs');
const parser = require('xml2json');

module.exports = {

  // Delete File action (Blueprint overwrite)
  delete : function (req, res){
    if(!req.param('id')){
      req.flash('error', 'A File ID has to be specified for deletion.');
      res.redirect('/files');
    }

    // first delete file

    // afterwards delete database entry
    File.destroy({id:req.param('id')}).exec(function (err, file){
      if (err) res.flash('error', 'An error occured while removing file from database.');
      req.flash('message', 'File was deleted.');
      res.redirect('/files');
    });
  },

  // shows all uploaded files, if user is authentificated, allows to manage them
  list: function (req, res){
    File.find({}).exec(function(err, files){
      if(err) req.flash('error', 'Error.LoadingFiles');
      if(!files) req.flash('error', 'Error.NoFiles');

      return res.view({ files: files });
    });
  },

  // shows upload form
  upload: function (req, res){
    res.view();
  },

  // uploads files, creates database entry and then deletes
	uploadFile: function (req, res) {
    req.file('xml').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/uploads/xml'),
    },
    function (err, upload) {

      if (err) return res.serverError(err);

      var files = [];
      // for each file read metadata
      for (var i in upload){

        // some basic validation and delete wrong files (asynchronously)
        var error_notxml = 0;
        var error_readerror = 0;

        if(upload[i].type != 'text/xml'){
          error_notxml ++;
          fs.unlink(upload[i].fd, (err) => { if (err) throw err; });
          continue;
        }

        // get file content
        var xml = fs.readFileSync(upload[i].fd, 'utf8', function (err, xml) {
          if (err) error_readerror++;
        });
        //return a string containing the JSON structure
        var content =  parser.toJson(xml, {object: true});

        // get objects
        // var obstacles = agents = 0;
        // var objects = Object.keys(content.SteerBenchTestCase);
        // for (var j in objects){
        //   if(objects[j] == 'obstacle' || objects[j] == 'obstacle')
        // }

        // add finished object to file array (ready for insertation to database)
        files.push({
          name      : content.SteerBenchTestCase.header.name,
          version   : content.SteerBenchTestCase.header.version,
          size      : upload[i].size,
          url       : upload[i].fd.substring(30)
        });
      }

      // create error messages if any
      if(error_notxml > 0) req.flash('error', 'Error.File.noXML');
      if(error_readerror > 0) req.flash('error', 'Error.File.readError');

      // create database entries
      File.create(files).exec(function(err, files){
        if(err) req.flash('error', 'Error.File.createFail');
        else req.flash('message', files.length + ' files were successfully uploaded!');

        console.log(files)
        // redirect to file list
        return res.redirect('/files');
      });
    });
  }
};

