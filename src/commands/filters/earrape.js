const Command = require('../../structures/Command');

const Discord = require('discord.js');

const { earrape } = require('../../../config/volume.js');

module.exports = class Earrape extends Command {
	constructor(client) {
		super(client, {
			name: 'earrape',
			description: 'Earrapes a song.',
			aliases: ['veryloud', 'hell', 'loud'],
			cooldown: '4',
			inVoiceChannel: true,
			sameVoiceChannel: true,
			playing: true,
		});
	}
	async run(client, message) {
		const player = client.music.players.get(message.guild.id);

		player.setVolume(earrape);
		player.setEQ(...Array(6).fill(0).map((n, i) => ({ band: i, gain: 0.5 })));

		const embed = new Discord.MessageEmbed()
			.setDescription('Musics_DJ set to **earrape**. To reset the Musics_DJ, type `+reset`.')
			.setColor(client.colors.main);
		return message.channel.send(embed);
	}
};
