const { SET_USER } = require('../actions');


const user = (state='', action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}

module.exports = user;
