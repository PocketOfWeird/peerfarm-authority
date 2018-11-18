const {
  SUBMIT_RENDER, START_CHUNK, CANCEL_RENDER, COMPLETE_RENDER,
  DELETE_RENDER
} = require('../actions');


const renders = (state={}, action) => {
  switch (action.type) {
    case SUBMIT_RENDER:
    case SUBMIT_RENDER + '_FROM_PEER':
      return {
        ...state,
        [action.payload.settings.renderId]: action.payload.settings
      };
    case START_CHUNK:
    case START_CHUNK + '_FROM_PEER':
      return {
        ...state,
        [action.payload.renderId]: {
          ...state[action.payload.renderId],
          active: true,
          pending: false,
          canceled: false,
          done: false
        }
      };
    case CANCEL_RENDER:
    case CANCEL_RENDER + '_FROM_PEER':
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          active: false,
          pending: false,
          canceled: true,
          done: false
        }
      }
    case COMPLETE_RENDER:
    case COMPLETE_RENDER + '_FROM_PEER':
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          active: false,
          pending: false,
          canceled: false,
          done: true
        }
      };
    case DELETE_RENDER:
    case DELETE_RENDER + '_FROM_PEER':
      let newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}

module.exports = renders;
