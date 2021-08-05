const Command = require('../../structures/Command');
const Discord = require('discord.js');

module.exports = class Vote extends Command {
    constructor(client) {
        super(client, {
            name: 'vote',
            description: 'Vote link.',
        });
    }
    async run(client, message) {

        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Vote to Musics_DJ')
            .setColor('GREEN')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ size: 64 }, { dynamic: true }))
            .setDescription('Hey, Thanks For using Musics_DJ')
            .addField('Vote', 'Vote me in top.gg:\n[Vote](https://top.gg/bot/772133876813922314/votes)')
            .addField('Support', 'Need help Join Support Server:\n[Join Avenger](https://discord.gg/MsJ99j5Bcv)')
            .setTimestamp(),
        );
    }
};