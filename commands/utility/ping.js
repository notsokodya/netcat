import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("🏓 Pong!")
            .setDescription(`API Latency is ${Math.round(interaction.client.ws.ping)}ms`)
            .setColor("Red");

        await interaction.reply({
            embeds: [embed]
        });
    }
};