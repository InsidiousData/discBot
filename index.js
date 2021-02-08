const Discord = require("discord.js");

/**
 * Import Discord token, command prefix, and Osu access token
 */
const { token, prefix, osu_access_token } = require("./config.json");
const client = new Discord.Client();

/**
 * node-fetch library used to get API requests
 */
const fetch = require("node-fetch");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  console.log("test");

  if (command === "map") {
    const mapID = args[0];
    const url = new URL(`https://osu.ppy.sh/api/v2/beatmaps/${mapID}/scores`);

    /**
     * Optional params to include
     */
    // let params = {
    //   country: "JP",
    //   filter: "all",
    //   variant: "4k",
    // };

    // Object.keys(params).forEach((key) =>
    //   url.searchParams.append(key, params[key])
    // );

    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + osu_access_token,
    };

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((json) => {
        json.scores.forEach((score) => {
          message.channel.send(score.id);
        });
      });
  }
});

client.login(token);
