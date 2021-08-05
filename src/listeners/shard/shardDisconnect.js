const Event = require('../../structures/Event');
const chalk = require('chalk');
const Discord = require('discord.js');

module.exports = class ShardReady extends Event {
	constructor(...args) {
		super(...args);
	}

	async run() {
		const i = parseInt(this.client.shard.ids, 10) + 1;
		this.client.log(chalk.red(`[Shard ${i}] Disconnecting...`));

		this.client.shard.fetchClientValues('guilds.cache.size').then(guilds => {
            const totalGuilds = guilds.reduce((prev, guildCount) => prev + guildCount, 0);

            const embed = new Discord.MessageEmbed()
                .setAuthor('Musicj_DJ', this.client.settings.avatar)
                .setColor(this.client.colors.removed)
                .setDescription('Musicj_DJ Shards Disconnect.')
                .addField('Disconnect', `[Shard ${i}] Disconnecting...`, true)
                .setFooter(`${totalGuilds} guilds`)
                .setTimestamp();
            this.client.shardMessage(this.client, this.client.channelList.disconnectChannel, embed);

        });
	}
};