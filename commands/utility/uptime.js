import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

function getStringTime(secs) {
    const weeks = Math.floor(secs / 60 / 60 / 24 / 7);
    const days = Math.floor(secs / 60 / 60 / 24) % 7;
    const hours = Math.floor(secs / 60 / 60) % 24;
    const mintues = Math.floor(secs / 60) % 60;
    const seconds = Math.floor(secs) % 60;

    if ( weeks > 0 ) {
        return `${weeks}w ${days}d ${hours}h ${mintues}m ${seconds}s`;
    } else if (days > 0) {
        return `${days}d ${hours}h ${mintues}m ${seconds}s`;
    } else if (hours > 0) {
        return `${hours}h ${mintues}m ${seconds}s`;
    } else if (mintues > 0) {
        return `${mintues}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
}

export default {
    data: new SlashCommandBuilder()
        .setName("uptime")
        .setDescription("Replies with bot's uptime"),
    async execute(interaction) {
        const uptime = process.uptime();
        const embed = new EmbedBuilder()
            .setTitle("⌚ Uptime")
            .setDescription(`Bot's uptime is \`${getStringTime(uptime)}\`.`)
            .setColor("Aqua");

        await interaction.reply({
            embeds: [embed]
        });
    }
};