import discordClient from "../discord-client";
import { MessageEmbed, TextChannel } from "discord.js";
import config from "../config";

const {
  HALO_CHANNEL_ID
} = config;

export default async function () {
  const haloChannel = (discordClient.channels.cache.get(HALO_CHANNEL_ID)
    ?? await discordClient.channels.fetch(HALO_CHANNEL_ID)) as TextChannel;
  const haloImage = `00.jpg`;
  const haloMessage = new MessageEmbed()
    .setTitle(`HALO INFINITE CAMPAIGN IS LIVE!`)
    .setColor("#5F7550")
    .attachFiles(["./images/chevtek.png", `./images/halo-infinite/${haloImage}`])
    .setImage(`attachment://${haloImage}`)
    .setDescription(`PARTY TIME!`)
    .setFooter("Powered by Chevtek", "attachment://chevtek.png");

  await Promise.all([
    haloChannel.send(haloMessage)
  ]);
}