const { Client, CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const AsciiTable = require('ascii-table')
const minecraftData = require('minecraft-data')
const mcData = minecraftData('1.19')

module.exports = {
    name: 'mcblockinfo',
    description: 'fetch information about minecraft blocks and stuffs',
    options: [{
        name: 'block',
        description: 'provide block or minecraft stuff name',
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true
    }],
    /** 
    * @param {Client} client 
    * @param {CommandInteraction} interaction
    */
    run: async (client, interaction, args) => {
        const query = interaction.options.getString('block')
        const lowercase = query.toLowerCase()
        const low = lowercase.replaceAll(' ', '_')
        const img = `https://raw.githubusercontent.com/FlameQuard/minecraft-assets/main/Engine/${low}.png`
        try {
            const block = mcData.blocksByName[`${low}`]

            const table = new AsciiTable()
                .setHeading('Properties', 'Information')
                .addRow(`ID`, `${block.id}`)
                .addRow(`Name`, `${block.displayName}`)
                .addRow(`Diggable`, `${block.diggable}`)
                .addRow(`Drops`, `${block.drops}`)
                .addRow(`Hardness`, `${block.hardness}`)
                .addRow(`Material`, `${block.material}`)
                .addRow(`Resistance`, `${block.resistance}`)
                .addRow(`Stack size`, `${block.stackSize}`)
                .addRow(`Transparent`, `${block.transparent}`)

            const embed = new EmbedBuilder()
                .setTitle(`${block.displayName} #${block.id}`)
                .setDescription(`\`\`\`${table.toString()}\`\`\``)
                .setColor('Blue')
                .setThumbnail(img)
            interaction.reply({ embeds: [embed] })
        } catch (err) {
            interaction.reply({ content: `💢 **${interaction.member.displayName}** no result found of block/item (eg. stone)`, components: [row] })
        }
    }
}