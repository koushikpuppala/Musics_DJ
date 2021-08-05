const Command = require('../../structures/Command');
const Discord = require('discord.js');

module.exports = class Donate extends Command {
    constructor(client) {
        super(client, {
            name: 'donate',
            description: 'Sends a link to Musics_DJ patreon page.',
            aliases: ['patreon'],
        });
    }
    async run(client, message) {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('Donation to Musics_DJ')
            .setColor('GREEN')
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ size: 64 }, { dynamic: true }))
            .setDescription('Hey, Thanks For using Musics_DJ')
            .addField('Donate', 'Donate me Patreon:\n[Donate](https://www.patreon.com/Koushik_5)')
            .addField('Perks', 'You can have lot of perks by Donating Check Perks in the channel <#790468939384750100>')
            .addField('Support', 'Join our Support server and contact <@735813371433058354> after Donating to active Premium/Pro Commands:\n[Join Avenger](https://discord.gg/MsJ99j5Bcv)')
            .setTimestamp(),
        );
    }
};