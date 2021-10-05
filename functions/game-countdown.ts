import discordClient from "../discord-client";
import { MessageEmbed, TextChannel } from "discord.js";
import moment from "moment";
import config from "../config";

const {
  FORZA_CHANNEL_ID,
  HALO_CHANNEL_ID,
} = config;

export default async function () {
  const now = moment();

  const haloChannel = (discordClient.channels.cache.get(HALO_CHANNEL_ID)
    ?? await discordClient.channels.fetch(HALO_CHANNEL_ID)) as TextChannel;
  const haloDate = moment(new Date("12/8/2021 12:00:00 AM"));
  const haloDaysRemaining = Math.round(moment.duration(haloDate.diff(now)).asDays());
  const haloImage = `${haloDaysRemaining.toString().padStart(2, "0")}.jpg`;
  const haloMessage = new MessageEmbed()
    .setTitle(`${haloDaysRemaining} days until Halo Infinite!`)
    .setColor("#5F7550")
    .attachFiles(["./images/chevtek.png", `./images/halo-infinite/${haloImage}`])
    .setImage(`attachment://${haloImage}`)
    .setDescription(`December 8th, 2021`)
    .setFooter("Powered by Chevtek", "attachment://chevtek.png");

  
  const forzaChannel = (discordClient.channels.cache.get(FORZA_CHANNEL_ID)
    ?? await discordClient.channels.fetch(FORZA_CHANNEL_ID)) as TextChannel;
  const forzaDate = moment(new Date("11/9/2021 12:00:00 AM"));
  const forzaDaysRemaining = Math.round(moment.duration(forzaDate.diff(now)).asDays());
  const forzaMessage = new MessageEmbed()
    .setTitle(`${forzaDaysRemaining} days until Forza Horizon 5!`)
    .setColor("#D64D7F")
    .setDescription(`November 9th, 2021`)
    .setFooter("Powered by Chevtek", "attachment://chevtek.png");

  await Promise.all([
    haloChannel.send(haloMessage),
    forzaChannel.send(forzaMessage)
  ]);
}