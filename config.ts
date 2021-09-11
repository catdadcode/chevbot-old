enum ConfigProperties { 
  AWESOME_EMOJI_ID,
  CAMPAIGN_INDEX_CHANNEL_ID,
  CHEVCAST_GUILD_ID,
  COMMAND_PREFIX,
  DEBUG_CHANNEL_ID,
  DISCORD_BOT_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  HALO_CHANNEL_ID,
  MAYBE_EMOJI_ID,
  MONGODB_CONNECTION_STRING,
  PORT,
  TWC_GUILD_ID,
  YES_EMOJI_ID
};

export default Object.keys(ConfigProperties).reduce((config, key) => {
  if (!isNaN(parseInt(key))) return config;
  if (!process.env[key]) throw new Error(`Environment variable ${key} is not defined but is required for Chevbot to run.`);
  config[key] = process.env[key];
  return config;
}, {} as {[key in keyof typeof ConfigProperties]: string});