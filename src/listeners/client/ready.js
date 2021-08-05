const figlet = require('figlet');
const mongoose = require('mongoose');
const Sentry = require('@sentry/node');
const chalk = require('chalk');
const Statcord = require('statcord.js');
const Discord = require('discord.js');
// const axios = require('axios');

const Event = require('../../structures/Event');
const createManager = require('../../player/createManager.js');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Sentry.init({
  dsn: process.env.SENTRY_URL,
  environment: process.env.SENTRY_ENVIRONMENT,
});

module.exports = class Ready extends Event {
  constructor(...args) {
    super(...args);
  }

  async run() {
    createManager(this.client);
    this.client.music.init(this.client.user.id);

    const Guilds = this.client.guilds.cache.map((guild) => guild.name);
    console.log(Guilds, 'Connected!');

    if (this.client.shard.ids[0] == this.client.shard.count - 1) {
      const guildNum = await this.client.shard.fetchClientValues(
        'guilds.cache.size',
      );
      const memberNum = await this.client.shard.broadcastEval(
        'this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)',
      );
      const totalMembers = memberNum.reduce(
        (prev, memberCount) => prev + memberCount,
        0,
      );
      const totalGuilds = guildNum.reduce((total, shard) => total + shard, 0);

      figlet(this.client.user.username, function(err, data) {
        if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
        }
        console.log(chalk.magenta.bold(data));
      });

      const activities = [
        { name: '🎶MUSICS FOR RELAX🎶', type: 'PLAYING' },
        { name: `@${this.client.user.tag}help to Help You`, type: 'LISTENING' },
      ];

      // Update presence
      this.client.user.setPresence({ status: 'dnd', activity: activities[0] });

      let activity = 1;

      // Update activity every 30 seconds
      setInterval(() => {
        activities[2] = {
          name: '🎶MUSICS FOR ENJOY🎶',
          type: 'STREAMING',
          url: 'https://www.twitch.tv/koushikpuppala',
        };
        activities[3] = {
          name: `Development of Bot in ${totalGuilds} servers`,
          type: 'COMPETING',
        };
        if (activity > 3) activity = 0;
        this.client.user.setActivity(activities[activity]);
        activity++;
      }, 30000);

      this.client.log(
        chalk.magenta.underline.bold(
          `Musics DJ is online: ${this.client.shard.count} shards, ${totalGuilds} servers and ${totalMembers} members.`,
        ),
      );
      const embed = new Discord.MessageEmbed()
        .setAuthor('Musicj_DJ', this.client.settings.avatar)
        .setColor(this.client.colors.main)
        .setDescription('Musicj_DJ is online.')
        .addField('Shards', `**${this.client.shard.count}** shards`, true)
        .addField('Servers', `**${totalGuilds}** servers`, true)
        .setTimestamp()
        .setFooter(`${totalMembers} users`);

      this.client.shardMessage(
        this.client,
        this.client.channelList.readyChannel,
        embed,
      );
      if (this.client.user.id == '775411681714503680') {
        Statcord.ShardingClient.post(this.client);
        setInterval(async function() {
          Statcord.ShardingClient.post(this.client);
        }, 1800000);

        require('../../webhooks/blsHook.js').startUp(this.client);
        require('../../webhooks/dblHook.js').startUp(this.client);
      }
    }
  }
};
