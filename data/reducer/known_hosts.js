const { SET_KNOWN_HOSTS } = require('../actions');


const known_hosts = (state=[], action) => {
  switch (action.type) {
    case SET_KNOWN_HOSTS:
      let newState = state.filter(host => host.ip !== action.payload.ip);
      newState.push(action.payload);
      return newState;
    default:
      return state;
  }
}

module.exports = known_hosts;
