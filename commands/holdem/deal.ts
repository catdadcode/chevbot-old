import { Message } from "discord.js";
import { gameLoop } from "../../utilities/holdem";
import { ChannelTable } from "../../models/holdem";

export const command = ["deal", "d", "start", "begin"];

export const description = "Deal the cards!";

export async function handler ({ discord }) {
  const message = discord.message as Message;
  let table = await ChannelTable.findByChannelId(message.channel.id);
  if (!table) {
    table = await ChannelTable.findByCreatorId(message.author.id);
    if (!table) {
      if (message.channel.type === "dm") {
        message.reply("You do not have an active Hold'em table.");
      } else {
        message.reply("There is no active Hold'em game in this channel.");
      }
      return;
    }
  }
  if (![table.creatorId, table.dealer?.id].includes(message.author.id)){
    message.reply("Only the current dealer or table creator can deal the cards.")
    return;
  }

  try {
    table.dealCards();
    await table.saveToDb();
    (async () => {
      for (let index = 0; index < table.activePlayers.length * 2; index++) {
        await table.playRandomSound("./sounds/holdem/deal");
      }
    })();
    gameLoop(table);
  } catch (err) {
    await message.reply(err.message);
  }
}
