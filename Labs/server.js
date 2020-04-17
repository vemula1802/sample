require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();
const port = process.env.PORT || 4000;
const pusher = new Pusher({
  appId: '983579',
  key: 'fb35d9d9f4bf4d6552bf',
  secret: 'cf5e7bf412d44365229e',
  cluster: 'eu2',
  encrypted: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/vote', (req, res) => {
  const { body } = req;
  const { player } = body;

  pusher.trigger('vote-channel', 'vote', {
    player,
  });
  res.json({ player });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
