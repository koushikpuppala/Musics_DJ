const Discord = require('discord.js');

module.exports = async (client, player) => {
	const embed = new Discord.MessageEmbed()
	.setDescription('Queue ended. Enjoying Musics_DJ? Consider reviewing it **[here](https://top.gg/bot/772133876813922314#reviews)**.')
	.setColor(client.colors.main);
	player.textChannel.send(embed);
	if (player.twentyFourSeven == true) {
		return;
	}
	else {
		return player.destroy();
	}
};