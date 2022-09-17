const { Client, CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const AsciiTable = require('ascii-table')
const minecraftData = require('minecraft-data')
const mcData = minecraftData('1.19')

module.exports = {
    name: 'mcenchantinfo',
    description: 'fetch information about minecraft enchantments',
    options: [{
        name: 'enchantment',
        description: 'provide minecraft enchantment name',
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true
    }],
    /** 
    * @param {Client} client 
    * @param {CommandInteraction} interaction
    */
    run: async (client, interaction, args) => {
        const query = interaction.options.getString('enchantment')
        const lowercase = query.toLowerCase()
        const low = lowercase.replaceAll(' ', '_')
        try {
            const enchantment = mcData.enchantmentsByName[`${low}`]

            const table = new AsciiTable()
                .setHeading('Properties', 'Information')
                .addRow(`ID`, `${enchantment.id}`)
                .addRow(`Name`, `${enchantment.displayName}`)
                .addRow(`Category`, `${enchantment.category}`)
                .addRow(`Curse`, `${enchantment.curse}`)
                .addRow(`Discoverable`, `${enchantment.discoverable}`)
                .addRow(`Tradeable`, `${enchantment.tradeable}`)
                .addRow(`Treasure Only`, `${enchantment.treasureOnly}`)
                .addRow(`Weight`, `${enchantment.weight}`)
                .addRow(`Max Level`, `${enchantment.maxLevel}`)

            const embed = new EmbedBuilder()
                .setTitle(`${enchantment.displayName} #${enchantment.id}`)
                .setDescription(`\`\`\`${table.toString()}\`\`\`\n\`\`\`\nExclude : \n${enchantment.exclude.join('\n')}\n\`\`\``)
                .setColor('Purple')
            interaction.reply({ embeds: [embed] })
        } catch (err) {
            console.log(err)
            interaction.reply({ content: `💢 **${interaction.member.displayName}** no result found of enchantment/item (eg. protection)` })
        }
    }
}