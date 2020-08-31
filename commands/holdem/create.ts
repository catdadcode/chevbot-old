import { Message } from "discord.js";
import { Table } from "@chevtek/poker-engine";
import { tables, gameLoop, renderTable } from "../../utilities/holdem";

export const command = ["create", "*"];

export const description = "Create a Hold'em table in this channel.";

export const builder = {
  "min-buy-in": {
    description: "Specify a minimum buy-in amount for the table.",
    default: 1000,
    type: "number"
  },
  "buy-in": {
    description: "Specify the amount to buy-in as the creator of the game. Default is the minimum buy-in.",
    type: "number"
  },
  "big-blind": {
    description: "Specify the amount of the big blind.",
    default: 20
  },
  "small-blind": {
    description: "Specify the amount of the small blind.",
    default: 10
  },
  "reset": {
    description: "Remove all players and reset the table.",
    type: "boolean"
  },
  "debug": {
    type: "boolean",
    hidden: true
  }
};

export async function handler (argv) {
  const {
    discord,
    minBuyIn,
    buyIn,
    bigBlind,
    smallBlind,
    reset,
    debug
  } = argv;
  const message = discord.message as Message;
  if (message.channel.type === "dm") {
    message.reply("This command can only be run from a channel on a server.");
    return;
  }
  let table = tables[message.channel.id];
  if (table) {
    if (!reset) {
      message.reply("There is already an active Hold'em game in this channel.");
      await message.channel.send(await renderTable(table, message));
      if (table.currentRound) {
        gameLoop(message);
      }
      return;
    }
    try {
      message.reply("Are you sure? Type `CONFIRM` to reset the table.");
      await message.channel.awaitMessages(
        response => {
          if (response.author.id !== message.author.id) return false;
          return response.content === "CONFIRM";
        },
        { max: 1, time: 20000, errors: ["time"] }
      );
    } catch (err) {
      message.reply("No confirmation received. The table was not reset.");
      return;
    }
  }
  table = tables[message.channel.id] = new Table(minBuyIn, smallBlind, bigBlind)
  table.debug = debug;
  table.sitDown(message.author.id, buyIn || table.buyIn);
  message.channel.send(await renderTable(table, message));
}