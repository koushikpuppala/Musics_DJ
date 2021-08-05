const Command = require('../../structures/Command');
const Discord = require('discord.js');

module.exports = class Support extends Command {
    constructor(client) {
        super(client, {
            name: 'Support',
            description: 'Sends the support server for the bot.',
            aliases: ['server'],
            usage: '',
            enabled: true,
            cooldown: 5,
            args: false,
        });
    }
    async run(client, message) {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Vote to Musics_DJ')
            .setColor('GREEN')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ size: 64 }, { dynamic: true }))
            .setDescription('Hey, Thanks For using Musics_DJ')
            .addField('Support', 'Need help Join Support Server:\n[Join Avenger](https://discord.gg/MsJ99j5Bcv)')
            .addField('Vote', 'Vote me in top.gg:\n[Vote](https://top.gg/bot/772133876813922314/votes)')
            .addField('Donate', 'Donate me Patreon:\n[Donate](https://www.patreon.com/Koushik_5)')
            .setTimestamp(),
        );
    }
};