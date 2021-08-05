const Command = require('../../structures/Command');
const Discord = require('discord.js');

module.exports = class Legal extends Command {
    constructor(client) {
        super(client, {
            name: 'legal',
            description: 'Privacy policy',
            aliases: ['privacy', 'policy', 'privacypolicy', 'privacy-policy', 'privacy policy'],
            enabled: true,
            cooldown: 4,
        });
    }
    async run(client, message) {
        const embed = new Discord.MessageEmbed()
            .setTitle('Privacy Policy')
            .setDescription('This Privacy Policy contains the data Musics_DJ collects and what its used for.')
            .addField('What We Collect', '• User IDs: Used to store profiles, voting rewards and premium/pro features.\n• Server IDs: Used to store server options such as custom prefixes, and ignored channels.\n• Submitted data. This includes user and server options, and stored playlists.')
            .addField('How We Use The Data', 'The data is used to make the bot functional and customizable. Without this data custom prefixes, profiles, playlists and more would not be supported. We will not share or sell user\'s data to any 3rd party companies or individuals.')
            .addField('Concerns', 'If you have concerns regarding the data we collect or you would like to delete your data please join the [support server](https://discord.gg/MsJ99j5Bcv) or contact `🌠┊𝑃𝑜𝑤𝑒𝑟𝑠𝑡𝑎𝑟™#4121` on Discord.')
            .setTimestamp();
        return message.channel.send(embed);
    }
};