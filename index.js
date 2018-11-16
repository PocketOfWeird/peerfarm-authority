require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const ip = require('ip');
const app = express();

let knownhosts = [
  { ip: ip.address(), authority: true }
];

app.use(helmet());

app.get('/knownhosts', (req, res) => {
  let token = req.headers['x-access-token'];
  try {
    let host = jwt.verify(token, process.env.JWT_SECRET);
    let knownhostsWithoutThisHost = knownhosts.filter(h => h.ip !== host.ip);
    knownhosts = [...knownhostsWithoutThisHost];
    knownhosts.push(host);
    console.log('knownhosts:', knownhosts);
    res.send({ data: knownhostsWithoutThisHost });
  } catch (e) {
    res.status(401).send({ status: 401, message: 'Invalid Access Token'});
  }
});

app.listen(process.env.PORT, () => console.log('Authority Server listening on', process.env.PORT));
