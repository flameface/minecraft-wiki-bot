const { Client, CommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const AsciiTable = require('ascii-table')
const minecraftData = require('minecraft-data')
const mcData = minecraftData('1.19')

module.exports = {
    name: 'mcentityinfo',
    description: 'fetch information about minecraft entitys',
    options: [{
        name: 'entity',
        description: 'provide minecraft entity name',
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true
    }],
    /** 
    * @param {Client} client 
    * @param {CommandInteraction} interaction
    */
    run: async (client, interaction, args) => {
        const query = interaction.options.getString('entity')
        const lowercase = query.toLowerCase()
        const low = lowercase.replaceAll(' ', '_')
        try {
            const entity = mcData.entitiesByName[`${low}`]

            const table = new AsciiTable()
                .setHeading('Properties', 'Information')
                .addRow(`ID`, `${entity.id}`)
                .addRow(`Name`, `${entity.displayName}`)
                .addRow(`Category`, `${entity.category}`)
                .addRow(`Height`, `${entity.height}`)
                .addRow(`Width`, `${entity.width}`)
                .addRow(`Type`, `${entity.type}`)

            const embed = new EmbedBuilder()
                .setTitle(`Minecraft ${entity.displayName} #${entity.id}`)
                .setDescription(`\`\`\`${table.toString()}\`\`\``)
                .setColor('DarkGreen')
                .setThumbnail(`https://www.digminecraft.com/mobs/images/${low}.png`)
            interaction.reply({ embeds: [embed] })
        } catch (err) {
            console.log(err)
            interaction.reply({ content: `💢 **${interaction.member.displayName}** no result found of entity/item you provided (eg. cow)` })
        }
    }
}