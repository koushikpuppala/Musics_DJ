const Event = require('../../structures/Event');
const chalk = require('chalk');
const Discord = require('discord.js');

module.exports = class ShardReady extends Event {
	constructor(...args) {
		super(...args);
	}

	async run(w) {
		const i = parseInt(this.client.shard.ids, 10) + 1;
		this.client.log(chalk.yellow(`[Shard ${i}] Warning: ${w}...`));

		this.client.shard.fetchClientValues('guilds.cache.size').then(guilds => {
            const totalGuilds = guilds.reduce((prev, guildCount) => prev + guildCount, 0);

            const embed = new Discord.MessageEmbed()
                .setAuthor('Musicj_DJ', this.client.settings.avatar)
                .setColor(this.client.colors.warn)
                .setDescription('Musicj_DJ Shards Warn.')
                .addField('Warn', `[Shard ${i}] Warning: ${w}...`, true)
                .setFooter(`${totalGuilds} guilds`)
                .setTimestamp();
            this.client.shardMessage(this.client, this.client.channelList.warnChannel, embed);

        });
	}
};