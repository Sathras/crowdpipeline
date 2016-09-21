/**
 * Sim.js
 *
 * @description :: Every Simulation has its own Process chain. This links to
 * files, videos, everything
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */



module.exports = {

  attributes: {
    name          : { type: 'string', unique:true, required: true },
    file_source   : { type: 'string', defaultsTo: '' }, // .txt file from universities
    file_xml_base : { type: 'string', defaultsTo: '' }, // .xml file for steersuite and unity renderer (real)
    file_xml_sim  : { type: 'string', defaultsTo: '' }, // .xml file from steersuite for unity renderer (sim)
    file_output   : { type: 'string', defaultsTo: '' }, // .csu file from pairing algorithm
    vurl_original : { type: 'string', defaultsTo: '' }, // video link to original
    vurl_real     : { type: 'string', defaultsTo: '' }, // video link to unity renderer output (real)
    vurl_sim      : { type: 'string', defaultsTo: '' }, // video link to unity renderer output (sim)
    vurl_merged   : { type: 'string', defaultsTo: '' }, // video link to pairing algorithm output (merged)
  },

  uploadFile : function (type, file, simID){

    file.upload({
      dirname: require('path').resolve(sails.config.appPath, '.assets/data/'+type)
    }, function (err, file) {

      if (err || typeof(file[0]) == 'undefined') return false;

      var data={}
      var url = file[0].fd.substring(37);

      switch(type) {
        case 'source':  data.file_source = url; break;
        case 'xmlbase': data.file_xml_base = url; break;
        case 'xmlsim':  data.file_xml_sim = url; break;
        case 'output':  data.file_output = url; break;
      }

      // file was uploaded, now create database entry
      Sim.update(simID, data).exec(function(err, file){
        if(err) return sails.log(err);
      });
    });
  }
};