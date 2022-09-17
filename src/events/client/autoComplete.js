const { InteractionType } = require('discord.js');
const minecraftData = require('minecraft-data')
const mcData = minecraftData('1.19')
const client = require('../../index')


module.exports = {
    name: "autoComplete",
};

client.on('interactionCreate', async interaction => {
    if (interaction.type !== InteractionType.ApplicationCommandAutocomplete) return;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //mcbiomeinfo command
    if (interaction.commandName === 'mcbiomeinfo') {
        const biome = mcData.biomesArray
        const focusedValue = interaction.options.getFocused(true).value;
        if (focusedValue.length == '0') return interaction.respond([])
        const choices = biome.map(item => item.name)
        const filtered = choices.filter(choice => choice.includes(focusedValue)).slice(0, 10);
        interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    }

    //mcblockinfo command
    if (interaction.commandName === 'mcblockinfo') {
        const block = mcData.blocksArray
        const focusedValue = interaction.options.getFocused(true).value;
        if (focusedValue.length == '0') return interaction.respond([])
        const choices = block.map(item => item.name)
        const filtered = choices.filter(choice => choice.includes(focusedValue)).slice(0, 10);
        interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    }

    //mceffectinfo command
    if (interaction.commandName === 'mceffectinfo') {
        const effect = mcData.effectsArray
        const focusedValue = interaction.options.getFocused(true).value;
        if (focusedValue.length == '0') return interaction.respond([])
        const choices = effect.map(item => item.name)
        const filtered = choices.filter(choice => choice.includes(capitalizeFirstLetter(`${focusedValue}`))).slice(0, 10);
        interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    }

    //mcenchantmentinfo command
    if (interaction.commandName === 'mcenchantinfo') {
        const enchantment = mcData.enchantmentsArray
        const focusedValue = interaction.options.getFocused(true).value;
        if (focusedValue.length == '0') return interaction.respond([])
        const choices = enchantment.map(item => item.name)
        const filtered = choices.filter(choice => choice.includes(focusedValue)).slice(0, 10);
        interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    }

    //mcentityinfo command
    if (interaction.commandName === 'mcentityinfo') {
        const entity = mcData.entitiesArray
        const focusedValue = interaction.options.getFocused(true).value;
        if (focusedValue.length == '0') return interaction.respond([])
        const choices = entity.map(item => item.name)
        const filtered = choices.filter(choice => choice.includes(focusedValue)).slice(0, 10);
        interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    }

    if (interaction.commandName === 'mcmusicplay') {
        function capitalizeFirstLetter(str) {
            const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
            return capitalized;
        }
        const focusedValue = interaction.options.getFocused(true).value
        if (focusedValue.length == '0') return interaction.respond([])
        const choices = [
            "Key",
            "Door",
            "Subwoofer Lullaby",
            "Death",
            "Living Mice",
            "Moog City",
            "Haggstrom",
            "Minecraft",
            "Oxygene",
            "Equinoxe",
            "Mice on Venus",
            "Dry Hands",
            "Wet Hands",
            "Clark",
            "Chris",
            "Thirteen",
            "Excuse",
            "Sweden",
            "Cat",
            "Dog",
            "Danny",
            "Beginning",
            "Droopy likes ricochet",
            "Droopy likes your face",
            "Ki",
            "Alpha",
            "Dead Voxel",
            "Blind Spots",
            "Flake",
            "Moog City 2",
            "Concrete Halls",
            "Biome Fest",
            "Mutation",
            "Haunt Muskie",
            "Warmth",
            "Floating trees",
            "Aria Math",
            "Kyoto",
            "Ballad of the Cats",
            "Taswell",
            "Beginning 2",
            "Dreiton",
            "The End",
            "Chirp",
            "Wait",
            "Mellohi",
            "Stal",
            "Strad",
            "Eleven",
            "Ward",
            "Mall",
            "Blocks",
            "Far",
            "Intro",
            "Chrysopoeia",
            "Rubedo",
            "Below",
            "Pigstep",
            "Axolotl",
            "Dragon Fish",
            "Shuniji",
            "Stand Tall",
            "Left to Bloom",
            "Ancestry",
            "Wending",
            "Infinite Amethyst",
            "One More Day",
            "Otherside",
            "Floating Dream",
            "Comforting Memoires",
            "Ordinart Day",
            "Firebugs",
            "Aerie",
            "Labyrinthine",
            "Five"
        ]
        const filtered = choices.filter(choice => choice.includes(capitalizeFirstLetter(focusedValue))).slice(0, 10);
        interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    }
});