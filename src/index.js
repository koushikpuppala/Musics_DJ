require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/index.html');
});
const listener = app.listen(process.env.PORT, process.env.HOST, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});

const { ShardingManager } = require('discord.js');
const Sentry = require('@sentry/node');
const mongoose = require('mongoose');
process.env.NODE_ENV || (process.env.NODE_ENV = 'production');

const manager = new ShardingManager('./src/Musics_DJ.js', {
  token: process.env.DISCORD_TOKEN,
  totalShards: 'auto',
  shardList: 'auto',
  mode: 'process',
  respawn: 'true',
  timeout: 999999,
});

if (process.env.NODE_ENV == 'production') {
  const Statcord = require('statcord.js');
  // eslint-disable-next-line no-unused-vars
  const statcord = new Statcord.ShardingClient({
    key: process.env.STATCORD_TOKEN,
    manager,
  });
}

Sentry.init({
  dsn: process.env.SENTRY_URL,
  environment: process.env.SENTRY_ENVIRONMENT,
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

manager.spawn().catch((err) => console.log(err));
