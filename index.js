require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const ip = require('ip');
const app = express();
const manager = require('./data/state_manager');
const actions = require('./data/actions');


manager.dispatch(actions.setKnownHosts({ ip: ip.address(), authority: true }));

app.use(helmet());

app.get('/knownhosts', (req, res) => {
  let token = req.headers['x-access-token'];
  try {
    let host = jwt.verify(token, process.env.JWT_SECRET);
    manager.dispatch(actions.setKnownHosts(host));
    let filteredState = { ...manager.getState() };
    console.log(filteredState);
    let filteredHosts = filteredState.known_hosts.filter(h => h.ip !== host.ip);
    console.log(filteredHosts);
    filteredState.known_hosts = filteredHosts;
    res.send({ data: filteredState });
  } catch (e) {
    console.error(e);
    res.status(401).send({ status: 401, message: 'Invalid Access Token'});
  }
});

app.post('/actionfrompeer', (req, res) => {
    let token = req.headers['x-access-token'];
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      manager.dispatch(req.body, true);
      res.send({ status: 200, message: 'Success' });
    } catch (e) {
      res.status(401).send({ status: 401, message: 'Invalid Access Token'});
    }
});



app.listen(process.env.PORT, () => console.log('Authority Server listening on', process.env.PORT));
