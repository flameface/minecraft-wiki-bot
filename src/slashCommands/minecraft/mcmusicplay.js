const voiceDiscord = require('@discordjs/voice');
const tracks = require('../../sounds/minecraft.json')
const { Client, CommandInteraction, ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    name: 'mcmusicplay',
    description: 'plays minecraft music',
    options: [{
        name: 'music',
        description: 'provide minecraft music to play',
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true
    }],
    /** 
    * @param {Client} client 
    * @param {CommandInteraction} interaction
    */
    run: async (client, interaction, args) => {
        try {
            const track = interaction.options.getString('music')
            const mc = tracks[`${track}`]

            const channel = interaction.member.voice.channel;
            if (!channel) return interaction.reply(`🔉 **${interaction.member.displayName}** join any voice channel to play minecraft track`);

            const player = voiceDiscord.createAudioPlayer();
            const resource = await voiceDiscord.createAudioResource(mc);
            await interaction.reply(`🎶 **${interaction.member.displayName}** the minecraft track ${track} has been started`)

            const connection = voiceDiscord.joinVoiceChannel({
                channelId: channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            player.play(resource);
            connection.subscribe(player);

            player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
                connection.destroy();
                const t = `${track}`.toLowerCase()
                interaction.channel.send(`🎶 **${interaction.member.displayName}** the track **\`${t}\`** has been completed`)
            });
        } catch {
            await interaction.reply(`💢 **${interaction.member.displayName}** the track is not in our minecraft database`)
        }
    },
};