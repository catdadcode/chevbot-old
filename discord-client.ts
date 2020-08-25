import { Client as DiscordClient } from "discord.js";

const { DISCORD_BOT_TOKEN } = process.env;

const client = new DiscordClient();

client.login(DISCORD_BOT_TOKEN);

export default client;