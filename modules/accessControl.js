import { EmbedBuilder } from "discord.js";
import config from "../config.js";

function IsOwnerCheck(interaction) {
    let isOwner = false;

    if ( typeof interaction === "object" ) {
        isOwner = interaction.user.id === config.owner;

        if ( !isOwner ) {
            const embed = new EmbedBuilder()
                .setTitle("No Access")
                .setDescription("You can't run this command")
                .setColor("Red");
            interaction.reply({
                embeds: [embed]
            });
        }
    } else {
        isOwner = id === config.owner;
    }

    return isOwner
}

export { IsOwnerCheck }