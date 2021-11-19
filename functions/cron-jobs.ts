import moment from "moment-timezone";
import gameCountdown from "./game-countdown";
import haloIsHere from "./halo-is-here";
import onThisDay from "./on-this-day";
import sloganChecker from "./slogan-checker";
// import eventReminders from "./event-reminders";

export default async function () {
  setInterval(async () => {
    try {

      const now = moment().tz("America/Denver");

      // 6am MST
      if (now.hour() === 6 && now.minute() === 0) {
        await Promise.all([
          onThisDay(),
          sloganChecker()
        ]);
      }

      // 8am MST
      if (now.hour() === 8 && now.minute() === 0) {
        await Promise.all([
          gameCountdown()
        ]);
      }

      if (moment.duration(now.diff(moment(new Date("12/8/2021 11:00:00 AM")))).asMinutes() === 0) {
        await haloIsHere();
      }


    } catch (err) {
      console.log(err);
    }
  }, 60 * 1000);
}