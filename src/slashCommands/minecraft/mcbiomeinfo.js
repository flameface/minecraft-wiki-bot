const { Client, CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const AsciiTable = require('ascii-table')
const minecraftData = require('minecraft-data')
const mcData = minecraftData('1.19')

module.exports = {
    name: 'mcbiomeinfo',
    description: 'fetch information about minecraft bioms',
    options: [{
        name: 'biome',
        description: 'provide minecraft biome name (eg. ocean)',
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true
    }],
    /** 
    * @param {Client} client 
    * @param {CommandInteraction} interaction
    */
    run: async (client, interaction, args) => {
        const query = interaction.options.getString('biome')
        const lowercase = query.toLowerCase()
        const low = lowercase.replaceAll(' ', '_')

        try {
            const biome = mcData.biomesByName[`${low}`]
            const table = new AsciiTable()
                .setHeading('Properties', 'Information')
                .addRow(`ID`, `${biome.id}`)
                .addRow(`Name`, `${biome.displayName}`)
                .addRow(`Category`, `${biome.category}`)
                .addRow(`Dimension`, `${biome.dimension}`)
                .addRow(`Precipitation`, `${biome.precipitation}`)
                .addRow(`Rainfall`, `${biome.rainfall}`)
                .addRow(`Temperature`, `${biome.temperature}`)
                .addRow(`Color`, `${biome.color}`)

            const embed = new EmbedBuilder()
                .setTitle(`${biome.displayName} #${biome.id}`)
                .setDescription(`\`\`\`${table.toString()}\`\`\``)
                .setColor('DarkGreen')
                .setImage(`https://raw.githubusercontent.com/FlameQuard/minecraft-assets/main/Biome/${low}.png`)

            interaction.reply({ embeds: [embed] })
        } catch (err) {
            interaction.reply({ content: `💢 **${interaction.member.displayName}** no result found of minecraft (eg. ocean)` })
        }
    }
}