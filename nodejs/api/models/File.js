/**
 * File.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'text',
      required: true
    },
    version: {
      type: 'float',
      required: true
    },
    size: {
      type: 'integer',
      required: true
    },
    url: {
      type: 'string',
      required: true,
      unique: true
    },
  }
};

