const node_info = require('./node_info');
const user = require('./user');
const known_hosts = require('./known_hosts');
const currentlyRendering = require('./currentlyRendering');
const chunks = require('./chunks');
const renders = require('./renders');


const reducer = (state={}, action) => ({
  node_info: node_info(state.node_info, action),
  user: user(state.user, action),
  known_hosts: known_hosts(state.known_hosts, action),
  currentlyRendering: currentlyRendering(state.currentlyRendering, action),
  chunks: chunks(state.chunks, action),
  renders: renders(state.renders, action)
});

module.exports = reducer;
