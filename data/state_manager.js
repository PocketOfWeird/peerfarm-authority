const reducer = require('./reducer');

let state = {};

const getState = top_level_property => {
  if (!top_level_property) return state;
  return state[top_level_property];
}

const dispatch = (action, fromPeer) => {
  if (fromPeer) action.type += '_FROM_PEER';
  const newState = reducer(state, action);
  state = newState;
  return;
}

module.exports = {
  getState,
  dispatch
};
