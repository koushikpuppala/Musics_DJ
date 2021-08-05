const Command = require('../../structures/Command');
const Discord = require('discord.js');

module.exports = class Invite extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            description: 'Sends the invite link for the bot.',
            usage: '',
            enabled: true,
            cooldown: 5,
            args: false,
        });
    }
    async run(client, message) {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("Invite Music_DJ to your server")
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL({ size: 64 }, { dynamic: true }))
            .setDescription(`Hey, Thanks For Inviting Musics_DJ`)
            .addField("Invite", `You can invite me to your server using the following link:\n\n[Invite Link](https://discord.com/oauth2/authorize?client_id=772133876813922314&permissions=305626464&redirect_uri=https%3A%2F%2Fdiscord.gg%2FMsJ99j5Bcv&response_type=code&scope=connections%20guilds.join%20identify%20bot)`)
            .addField("Support", `Need help Join Support Server:\n\n[Join Avenger](https://discord.gg/MsJ99j5Bcv)`)
            .addField("Vote", `Vote me in top.gg:\n\n[Vote](https://top.gg/bot/772133876813922314/votes)`)
            .addField("Donate", `Donate me Patreon:\n\n[Donate](https://www.patreon.com/Koushik_5)`)
            .setTimestamp()
        );
    }
};