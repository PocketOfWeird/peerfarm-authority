const peers = require('./peers');
const node_info = require('./node_info');
const user = require('./user');
const renders = require('./renders');
const chunks = require('./chunks');


module.exports = {
  ...peers,
  ...node_info,
  ...user,
  ...renders,
  ...chunks
};
