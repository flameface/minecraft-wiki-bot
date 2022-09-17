const { Client, CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const AsciiTable = require('ascii-table')
const minecraftData = require('minecraft-data')
const mcData = minecraftData('1.19')

module.exports = {
    name: 'mceffectinfo',
    description: 'fetch information about minecraft effects',
    options: [{
        name: 'effect',
        description: 'provide minecraft effect name',
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true
    }],
    /** 
    * @param {Client} client 
    * @param {CommandInteraction} interaction
    */
    run: async (client, interaction, args) => {
        const query = interaction.options.getString('effect')
        const low = query.toLowerCase()
        const img = `https://raw.githubusercontent.com/FlameQuard/minecraft-assets/main/Effects/${low}.png`
        try {
            const effect = mcData.effectsByName[`${query}`]

            const table = new AsciiTable()
                .setHeading('Properties', 'Information')
                .addRow(`ID`, `${effect.id}`)
                .addRow(`Name`, `${effect.displayName}`)
                .addRow(`Type`, `${effect.type}`)

            const embed = new EmbedBuilder()
                .setTitle(`${effect.displayName} #${effect.id}`)
                .setDescription(`\`\`\`${table.toString()}\`\`\``)
                .setColor('Blue')
                .setThumbnail(img)
            interaction.reply({ embeds: [embed] })
        } catch (err) {
            console.log(err)
            interaction.reply({ content: `💢 **${interaction.member.displayName}** no result found of effect (eg. speed)` })
        }
    }
}