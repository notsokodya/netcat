import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Get user's or guild's avatar")
        .addSubcommand(subcommand => 
            subcommand
                .setName("user")
                .setDescription("User's avatar")
                .addUserOption(option => option
                    .setName("user")
                    .setDescription("The user who avatar you want")
                    .setRequired(true)
                )
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName("guild")
                .setDescription("Guild's avatar")
        ),
    async execute(interaction) {
        if ( interaction.options.getSubcommand() === "user" ) {
            const user = await interaction.options.getUser("user").fetch();

            const embed = new EmbedBuilder()
                .setTitle(`${user.displayName}'s profile picture`)
                .setImage(user.displayAvatarURL({size: 2048, dynamic: true}))
                .setColor(user.accentColor);

            const button_png = new ButtonBuilder()
                .setLabel("PNG").setStyle(ButtonStyle.Link)
                .setURL(user.displayAvatarURL({extension: "png", size: 2048, dynamic: true}));

            const button_jpg = new ButtonBuilder()
                .setLabel("JPG").setStyle(ButtonStyle.Link)
                .setURL(user.displayAvatarURL({extension: "jpg", size: 2048, dynamic: true}));

            const button_webp = new ButtonBuilder()
                .setLabel("WEBP").setStyle(ButtonStyle.Link)
                .setURL(user.displayAvatarURL({extension: "webp", size: 2048, dynamic: true}));

            const row = new ActionRowBuilder()
                .addComponents(button_png, button_jpg, button_webp);

            await interaction.reply({
                embeds: [embed],
                components: [row]
            });
        } else if ( interaction.options.getSubcommand() === "guild" ) {
            const embed = new EmbedBuilder()
                .setTitle("Guild icon")
                .setImage(interaction.guild.iconURL({extension: "png", size: 2048, dynamic: true}))
                .setColor("Purple");

            const button_png = new ButtonBuilder()
                .setLabel("PNG").setStyle(ButtonStyle.Link)
                .setURL(interaction.guild.iconURL({extension: "png", size: 2048, dynamic: true}));

            const button_jpg = new ButtonBuilder()
                .setLabel("JPG").setStyle(ButtonStyle.Link)
                .setURL(interaction.guild.iconURL({extension: "jpg", size: 2048, dynamic: true}));

            const button_webp = new ButtonBuilder()
                .setLabel("WEBP").setStyle(ButtonStyle.Link)
                .setURL(interaction.guild.iconURL({extension: "webp", size: 2048, dynamic: true}));

            const row = new ActionRowBuilder()
                .addComponents(button_png, button_jpg, button_webp);

            await interaction.reply({
                embeds: [embed],
                components: [row]
            });
        }
    }
};