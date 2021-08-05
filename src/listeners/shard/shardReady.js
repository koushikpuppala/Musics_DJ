const Event = require('../../structures/Event');
const chalk = require('chalk');
const Discord = require('discord.js');

module.exports = class ShardReady extends Event {
	constructor(...args) {
		super(...args);
	}

	async run() {
		const i = parseInt(this.client.shard.ids, 10) + 1;
		this.client.log(chalk.green.bold(`[Shard ${i}] Ready`));

		this.client.shard.fetchClientValues('guilds.cache.size').then(guilds => {
            const totalGuilds = guilds.reduce((prev, guildCount) => prev + guildCount, 0);

            const embed = new Discord.MessageEmbed()
                .setAuthor('Musicj_DJ', this.client.settings.avatar)
                .setColor(this.client.colors.added)
                .setDescription('Musicj_DJ Shards.')
                .addField('Shards', `**${this.client.shard.count}** shards are Ready`, true)
                .addField('Servers', `**${totalGuilds}** servers`, true)
                .setFooter(`${totalGuilds} guilds`)
                .setTimestamp();
            this.client.shardMessage(this.client, this.client.channelList.shardChannel, embed);

        });
	}
};