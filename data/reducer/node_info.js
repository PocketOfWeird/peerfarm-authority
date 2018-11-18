const { SET_NODE_INFO } = require('../actions');


const node_info = (state={}, action) => {
    switch (action.type) {
      case SET_NODE_INFO:
        return action.payload;
      default:
        return state;
    }
};

module.exports = node_info;
