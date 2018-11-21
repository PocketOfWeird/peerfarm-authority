const known_hosts = require('./known_hosts');
const chunks = require('./chunks');
const renders = require('./renders');


const reducer = (state={}, action) => ({
  known_hosts: known_hosts(state.known_hosts, action),
  chunks: chunks(state.chunks, action),
  renders: renders(state.renders, action)
});

module.exports = reducer;
