/**
 * This file handles the environmental variable, Depending on what NODE_ENV was set.
 *
 * By default the development.json will be used
 *
 */
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
module.exports = require('./' + NODE_ENV + '.json');
