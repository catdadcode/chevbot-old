import discordClient from "../discord-client";
import { MessageEmbed, TextChannel } from "discord.js";
import moment from "moment";
import config from "../config";

const {
  HALO_CHANNEL_ID
} = config;

export default async function () {
  const haloChannel = (discordClient.channels.cache.get(HALO_CHANNEL_ID)
    ?? await discordClient.channels.fetch(HALO_CHANNEL_ID)) as TextChannel;
  const now = moment();
  const haloDate = moment(new Date("12/8/2021 11:00:00 AM"));
  if (now > haloDate) return;
  const haloDaysRemaining = Math.round(moment.duration(haloDate.diff(now)).asDays());
  const timeUntil = now.to(haloDate);
  const haloImage = `${haloDaysRemaining.toString().padStart(2, "0")}.jpg`;
  const haloMessage = new MessageEmbed()
    .setTitle(`Halo Infinite campaign ${timeUntil}!`)
    .setColor("#5F7550")
    .attachFiles(["./images/chevtek.png", `./images/halo-infinite/${haloImage}`])
    .setImage(`attachment://${haloImage}`)
    .setDescription(`December 8th, 2021 at 10am PST`)
    .setFooter("Powered by Chevtek", "attachment://chevtek.png");

  await Promise.all([
    haloChannel.send(haloMessage)
  ]);
}