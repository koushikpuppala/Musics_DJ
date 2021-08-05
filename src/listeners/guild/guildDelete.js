const Discord = require('discord.js');
const Event = require('../../structures/Event');
const post = require('../../handlers/post.js');

module.exports = class GuildDelete extends Event {
    constructor(...args) {
        super(...args);
    }

    async run(guild) {
        try {
            this.client.shard.fetchClientValues('guilds.cache.size').then(guilds => {
                const totalGuilds = guilds.reduce((prev, guildCount) => prev + guildCount, 0);

                const embed = new Discord.MessageEmbed()
                .setTitle('Musics_DJ left a server')
                .setDescription(guild.name)
                .setThumbnail(guild.iconURL())
                .setFooter(`${totalGuilds} servers`)
                .setTimestamp()
                .setColor(this.client.colors.removed);
            this.client.shardMessage(this.client, this.client.channelList.guildleftChannel, embed);

            return post(this.client, totalGuilds, guilds.length);
            });
        }
        catch (error) {
            return;
        }
    }
};