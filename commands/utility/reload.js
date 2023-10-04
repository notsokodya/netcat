import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { ReloadCommand, ReloadCommands } from "../../modules/commandsHandler.js";
import { IsOwnerCheck } from "../../modules/accessControl.js";

export default {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reloads bot's commands (owner only)")
        .addStringOption(option => 
            option
            .setName("command")
            .setDescription("Command's name to reload")
        ),
    async execute(interaction) {
        if ( !IsOwnerCheck(interaction) ) return;

        const command_name = interaction.options.getString("command");

        const embed = new EmbedBuilder()
            .setTitle(command_name ? `Reloading \`${command_name}\`...` : "Reloading commands...")
            .setDescription("Please wait a bit")
            .setColor("Yellow");

        const response = await interaction.reply({
            embeds: [embed]
        });

        try {
            let count = 0;
            
            if ( command_name ) {
                await ReloadCommand(command_name, interaction.client)
            } else {
                count = await ReloadCommands(interaction.client);
            }

            const embed = new EmbedBuilder()
                .setTitle("Finished reloading")
                .setDescription(command_name ? `Reloaded ${command_name}` : `Reloaded ${count} (/) commands`)
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