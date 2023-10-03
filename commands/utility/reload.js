import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { ReloadCommands } from "../../modules/commandsHandler.js";
import { IsOwnerCheck } from "../../modules/accessControl.js";

export default {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reloads bot's commands (owner only)"),
    async execute(interaction) {
        if ( !IsOwnerCheck(interaction) ) return;

        const embed = new EmbedBuilder()
            .setTitle("Reloading commands...")
            .setDescription("Please wait a bit")
            .setColor("Yellow");

        const response = await interaction.reply({
            embeds: [embed]
        });

        try {
            const count = await ReloadCommands(interaction.client);

            const embed = new EmbedBuilder()
                .setTitle("Finished reloading")
                .setDescription(`Reloaded ${count} (/) commands`)
                .setColor("Green");

            response.edit({
                embeds: [embed]
            })
        } catch (err) {
            const embed = new EmbedBuilder()
                .setTitle("Failed reloading")
                .setDescription(`${err}`)
                .setColor("Red");

            response.edit({
                embeds: [embed]
            })
        }
        
    }
};