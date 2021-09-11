import discordClient from "../discord-client";
import { MessageEmbed, TextChannel } from "discord.js";
import moment from "moment";
import config from "../config";

const {
  HALO_CHANNEL_ID,
} = config;

export default async function () {
  const haloChannel = (discordClient.channels.cache.get(HALO_CHANNEL_ID)
    ?? await discordClient.channels.fetch(HALO_CHANNEL_ID)) as TextChannel;
  
  const haloDate = moment(new Date("12/8/2021 12:00:00 AM"));
  const now = moment();
  const daysRemaining = Math.round(moment.duration(haloDate.diff(now)).asDays());
  const message = new MessageEmbed()
    .setTitle(`${daysRemaining} days until Halo Infinite!`)
    .setColor("#5F7550")
    .attachFiles(["./images/chevtek.png", `./images/halo-infinite/${daysRemaining}.jpg`])
    .setImage(`attachment://${daysRemaining}.jpg`)
    .setDescription(`December 8th, 2021`)
    .setFooter("Powered by Chevtek", "attachment://chevtek.png");
  return haloChannel.send(message);
}