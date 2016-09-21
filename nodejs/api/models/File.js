/**
 * File.js
 *
 * @description :: Every file uploaded to the server is referenced in this model
 * and linked to a simulation process
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    url      : { type: 'string', required: true, unique: true },
    source   : { type: 'string', unique:true }, // .txt file from universities
    xml_base : { type: 'string', unique:true }, // .xml file for steersuite and unity renderer (real)
    xml_sim  : { type: 'string', unique:true }, // .xml file from steersuite for unity renderer (sim)
    output   : { type: 'string', unique:true }, // .csu file from pairing algorithm
  },


};

