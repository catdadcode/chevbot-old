export const command = "debug <action> [args..]";

export const description = false;

export async function handler ({ discord, action, args }) {
  const { message } = discord;
  switch (action) {
    case "emit-join-event":
      let user = message.member;
      if (args && args.length) {
        const mentionId = args[0].match(/^<@!?(\d+)>$/)[1];
        user = message.member.guild.members.cache.get(mentionId);
      }
      message.client.emit("guildMemberAdd", user);
      break;
    case "throw":
      throw new Error(args[0]);
    case "test":
      
      break;
  }
}
