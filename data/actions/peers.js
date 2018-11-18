const SET_KNOWN_HOSTS = 'SET_KNOWN_HOSTS';

const setKnownHosts = data => ({
  type: SET_KNOWN_HOSTS,
  payload: data
});

module.exports = {
  SET_KNOWN_HOSTS,
  setKnownHosts
};
