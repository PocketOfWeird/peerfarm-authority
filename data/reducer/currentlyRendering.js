const { START_CHUNK, CANCEL_CHUNK, ERROR_CHUNK, COMPLETE_CHUNK } = require('../actions');


const currentlyRendering = (state=false, action) => {
  switch (action.type) {
    case START_CHUNK:
      return true;
    case CANCEL_CHUNK:
    case ERROR_CHUNK:
    case COMPLETE_CHUNK:
      return false;
    default:
      return state;
  }
}

module.exports = currentlyRendering;
