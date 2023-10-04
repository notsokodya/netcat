import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder } from "discord.js";
import { IsOwnerCheck } from "../../modules/accessControl.js";
import { inspect } from "node:util";

async function cleanText(text, client) {
    if ( text && text.constructor.name == "Promise" )
        text = await text;

    if ( typeof text !== "string" )
        text = inspect(text, {depth: 1});

    return text.replaceAll(client.token, "[REDACTED]").replace(/(.+)\/?\\?netcat/gi, "netcat");
}
export default {
    data: new ContextMenuCommandBuilder()
        .setName("eval")
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        if ( !IsOwnerCheck(interaction) ) return;

        await interaction.deferReply();

        try {
            const content = interaction.targetMessage.content;
            let code = content.match(/^```[^\n]*\n(.+)\n```$/sm);
            code = code ? code[1] : content;
    
            const eval_func = eval(`async (interaction, here, mem, me) => {${code}}`);
            
            const result = await eval_func(interaction, interaction.channel, interaction.member, interaction.user);
            const clean = (await cleanText(result || "", interaction.client)).slice(0, 1990);

            const embed = new EmbedBuilder()
                .setTitle("Eval Result")
                .setDescription(`\`\`\`js\n${clean}\n\`\`\``)
                .setColor("Green");
            await interaction.editReply({
                embeds: [embed]
            });
        } catch (err) {
            const clean = (await cleanText(err, interaction.client)).slice(0, 1990);
            const embed = new EmbedBuilder()
                .setTitle("Eval Failed")
                .setDescription(`\`\`\`xl\n${clean}\n\`\`\``)
                .setColor("Red");

            await interaction.editReply({
                embeds: [embed]
            });
        }
    }
};