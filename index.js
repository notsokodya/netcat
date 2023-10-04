import { Client, GatewayIntentBits } from "discord.js";
import { InitCommands } from "./modules/commandsHandler.js";
import { Logger } from "./modules/logger.js";
import config from "./config.js";

const logger = new Logger("Bot");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
	    GatewayIntentBits.GuildMessages,
	    GatewayIntentBits.GuildMembers,
	    GatewayIntentBits.GuildPresences,
	    GatewayIntentBits.MessageContent
    ]
});

client.on("ready", () => {
	logger.Info(`Ready! Logged in as ${client.user.tag}`);
    client.user.setActivity({
		name: "network packets",
		type: 3
	});
    client.user.setStatus("online");

	InitCommands(client);

	const dev_guild = client.guilds.cache.get(config.devGuild.id);
	if ( dev_guild ) {
		const logs = dev_guild.channels.cache.get(config.devGuild.logs);
		const errors = dev_guild.channels.cache.get(config.devGuild.errors);

		client._devGuild = dev_guild;
		client._devLogs = logs;
		client._devErrors = errors;
	}
});

client.login(config.token);


/*------------- Fuck Errors -------------*/

process.on("unhandledException", err => {
	logger.Error(err);

	if (client._devErrors)
		client._devErrors.send("```xl\n" + err + "\n```");
});
process.on("uncaughtException", err => {
	logger.Error(err);

	if (client._devErrors)
		client._devErrors.send("```xl\n" + `${err.message}\n\n${err.stack}` + "\n```");
});