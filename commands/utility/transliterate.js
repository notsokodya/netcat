import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

const en = "qwertyuiop[]asdfghjkl;'zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>?</>@#$^&`~";
const ru = "йцукенгшщзхъфывапролджэячсмитьбю.ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,\"№;:?ёЁ";
let toEN = {}, toRU = {};

for ( let i = 0; i < en.length; ++i ) {
    const ru_char = ru[i], 
          en_char = en[i];
    toEN[ru_char] = en_char;
    toRU[en_char] = ru_char;
}

export default {
    data: new SlashCommandBuilder()
        .setName("transliterate")
        .setDescription("Transliterates text")
        .addStringOption(option => 
            option
            .setName("text")
            .setDescription("Text to transliterate")
            .setRequired(true)
        )
        .addStringOption(option => 
            option
            .setName("lang")
            .setDescription("Language to transliterate text")
            .addChoices(
                {name: "to Russian", value: "ru"},
                {name: "to English", value: "en"}
            )
        ),
    async execute(interaction) {
        const lang = interaction.options.getString("lang") || "ru";
        const text = interaction.options.getString("text");
        let transliterated = "";

        const langTranslit = lang === "ru" ? toRU : toEN;
        for ( let i = 0; i < text.length; ++i ) {
            transliterated += langTranslit[text[i]] || text[i]
        }

        const embed = new EmbedBuilder()
            .setTitle("Transliterated text")
            .setDescription(`${transliterated}`)
            .setColor("Aqua");

        await interaction.reply({
            embeds: [embed]
        });
    }
};