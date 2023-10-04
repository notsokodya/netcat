import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Replies with user's avatar")
        .addUserOption(option => option
            .setName("user")
            .setDescription("The user who avatar you want")
            .setRequired(true)
        ),
    async execute(interaction) {
        const user = await interaction.options.getUser("user").fetch();

        const embed = new EmbedBuilder()
            .setTitle(`${user.displayName}'s profile picture`)
            .setImage(user.displayAvatarURL({size: 2048, dynamic: true}))
            .setColor(user.accentColor);

        await interaction.reply({
            embeds: [embed]
        });
    }
};