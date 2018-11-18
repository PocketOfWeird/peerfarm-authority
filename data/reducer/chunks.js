const {
  SUBMIT_RENDER, START_CHUNK, CANCEL_CHUNK, ERROR_CHUNK,
  COMPLETE_CHUNK, SET_CHUNK_LOG
} = require('../actions');


const chunks = (state={}, action) => {
  switch (action.type) {
    case SUBMIT_RENDER:
    case SUBMIT_RENDER + '_FROM_PEER':
      let newState = { ...state };
      action.payload.chunks.forEach(chunk => {
        newState[chunk.chunkId] = chunk;
      });
      return newState;
    case START_CHUNK:
    case START_CHUNK + '_FROM_PEER':
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          active: true,
          pending: false,
          canceled: false,
          done: false,
          error: false
        }
      };
    case CANCEL_CHUNK:
    case CANCEL_CHUNK + '_FROM_PEER':
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          active: false,
          pending: false,
          canceled: true,
          done: false,
          error: false
        }
      };
    case ERROR_CHUNK:
    case ERROR_CHUNK + '_FROM_PEER':
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          active: false,
          pending: false,
          canceled: false,
          done: false,
          error: true,
          errInfo: action.payload.message
        }
      };
    case COMPLETE_CHUNK:
    case COMPLETE_CHUNK + '_FROM_PEER':
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          active: false,
          pending: false,
          canceled: false,
          done: true,
          error: false
        }
      };
    case SET_CHUNK_LOG:
    case SET_CHUNK_LOG + '_FROM_PEER':
      return {
        ...state,
        [action.payload.id]: {
            ...state[action.payload.id],
            log: state[action.payload.id].log += action.payload.log + '\n'
        }
      };
    default:
      return state;
  }
}

module.exports = chunks;
