const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const TOKEN = process.env.TOKEN

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.channel.send('pong');
  }
});

client.login(TOKEN);