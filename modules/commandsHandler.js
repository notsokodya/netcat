import { REST, Routes, Events } from "discord.js";
import config from "../config.js";
import fs from "node:fs/promises";
import { Logger } from "./logger.js";


const logger = new Logger("Commands Handler");
let commands_json = [];

async function LoadCommands(commands) {
    commands.length = 0;
    commands_json = [];

    return new Promise(async resolve => {
        const files = await fs.readdir("./commands", {withFileTypes: true});

        logger.Info("Started loading application (/) commands");
        for await (const section of files) {
            if ( section.isDirectory() ) {
                const files = await fs.readdir(`./commands/${section.name}`, {withFileTypes: true});

                logger.Info(`\tLoading commands from ${section.name}`)
                for await (const cmd of files) {
                    if ( cmd.isFile() && cmd.name.match(/\.js$/g) ) {
                        const command = (await import(`../commands/${section.name}/${cmd.name}?version=${Number(new Date())}`)).default;
                        command.section = section.name;

                        commands[command.data.name] = command;
                        commands_json.push(command.data.toJSON());
                        logger.Info(`\t\tLoaded ${command.data.name}`);
                    }
                }
            }
        }
        logger.Info(`Successfully loaded ${commands_json.length} application (/) commands`)

        resolve();
    });
}
async function ReloadCommand(command_name, client, isPath) {
    if ( isPath ) {
        const section = command_name.match(/([^\/]+)\//g)[1];
        const command = (await import(`../commands/${command_name}?version=${Number(new Date())}`)).default;
        command.section = section;

        client.commands[command.data.name] = command;
        commands_json.push(command.data.toJSON());
        logger.Info(`Reloaded ${command.data.name}`);

        RefreshCommands(client);
    } else {
        if ( client.commands[command_name] ) {
            for (const data_id in commands_json) {
                const data = commands_json[data_id];
                if ( data.name == command_name ) {
                    commands_json.splice(data_id, 1)
                    break
                }
            }

            const section = client.commands[command_name].section;
            const command = (await import(`../commands/${section}/${command_name}.js?version=${Number(new Date())}`)).default;
            command.section = section;

            client.commands[command.data.name] = command;
            commands_json.push(command.data.toJSON());
            logger.Info(`Reloaded ${command.data.name}`);

            RefreshCommands(client);
        }
    }
}
async function RefreshCommands(client) {
    const rest = new REST({version: 10}).setToken(config.token);

    try {
        logger.Info(`Started refreshing ${commands_json.length} application (/) commands`);
        const data = await rest.put(
            Routes.applicationCommands(client.user.id),
            {body: commands_json}
        );
        logger.Info(`Successfully refreshed ${data.length} application (/) commands`);
    } catch (err) {

    }
}
async function ReloadCommands(client) {
    client.commands = [];

    await LoadCommands(client.commands);
    await RefreshCommands(client);

    return commands_json.length
}
async function InitCommands(client) {
    client.commands = [];

    await LoadCommands(client.commands);
    await RefreshCommands(client);

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand() && !interaction.isMessageContextMenuCommand()) return;
    
        const command = interaction.client.commands[interaction.commandName];
    
        if (!command) {
            logger.Warn(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    
        try {
            await command.execute(interaction);
        } catch (err) {
            logger.Error(err.message);
            await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
        }
    });
}

export { InitCommands, LoadCommands, RefreshCommands, ReloadCommands, ReloadCommand };