import { MessageEmbed } from "discord.js";
import ytdl from "ytdl-core";

export const description = "Run various tests.";

export async function exec (argv, { message, discord }) {
  const { channel, member } = message;
  const send = channel.send.bind(channel);
  const [testName] = argv._;
  switch (testName) {
    case "embed":
      // We can create embeds using the MessageEmbed constructor
      // Read more about all that you can do with the constructor
      // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
      const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle("A slick little embed")
        // Set the color of the embed
        .setColor(0xff0000)
        // Set the main content of the embed
        .setDescription("Hello, this is a slick embed!");
      // Send the embed to the same channel as the message
      send(embed);
      break;
    case "voice":
      if (member.voice.channel) {
        const connection = await member.voice.channel.join();
        connection.play("./ca-caw.wav");
      }
      break;
    default:
      send(`No test found named "${testName}".`);
  }
}