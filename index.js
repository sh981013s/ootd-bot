require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));

const PREFIX = "!";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (message.channel.type == "dm") return;
  if (!message.content.startsWith(PREFIX)) return;

  if (message.content.startsWith(PREFIX + "define")) {
    const word = message.content.split(" ")[1];
    getWordMeaning(word).then((data) => {
      message.channel.send(data);
    });
  }
});

const getWordMeaning = async (word) => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const data = await response.json();
  return data[0].meanings[0].definitions[0].definition;
};

client.login(process.env.DISCORD_KEY);
