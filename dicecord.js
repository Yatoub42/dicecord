const db = require("./lib/bdd.js");
const message = require("./lib/message.js");
const Discord = require("discord.js");
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv
const Include = require("./include/resource.priv.json");
//const client = new Discord.client({autoReconnect:true});
const client = new Discord.Client();

const reSpec = /\W|_/g;
const prefix = Include.prefix;

client.on("ready", () => {
  client.user.setActivity("vous juger !");
  console.info("Bot Connected");
});

db.createdb();

client.on('error', console.error); // Afficher les erreurs

client.on('message', msg => {
    let ServerName = msg.guild.name.replace(reSpec,"");
    db.createTable(ServerName);
    if (msg.author.bot) {
        return;
    }
    if (msg.content.startsWith(prefix)) {
        var msgUnprefix = msg.content.replace(prefix, "");
        if (parseInt(msgUnprefix, 10)) {
            msg.reply(message.gestionDe(msgUnprefix,msg.member.user.username,msg.guild.name,ServerName));
        }
        else {
            msg.reply(message.gestionText(msgUnprefix,msg.member.user.username,msg.guild.name,ServerName));
        }
    }
});
/*if (instance.niven) {
    client.login(Include.token1);
    //client.on("error", (e) => console.error(e));
} else if (instance.nyria) {
    client.login(Include.token2);
    //client.on("error", (e) => console.error(e));
} else if (instance.test) {
    client.login(Include.tokenTest);
    //client.on("error", (e) => console.error(e));
} else if (instance.chernobyl) {
    client.login(Include.token4);
    //client.on("error", (e) => console.error(e));
} else if (instance.tanai) {
    client.login(Include.token5);
    //client.on("error", (e) => console.error(e));
}*/

switch (argv) {
    case argv.niven:
        console.log(Include.token1);
        client.login(Include.token1);
        client.on("error", (e) => console.error(e));
    case argv.nyria:
        console.log(Include.token2);
        client.login(Include.token2);
        client.on("error", (e) => console.error(e));
    case argv.test:
        console.log(Include.tokenTest);
        client.login(Include.tokenTest);
        client.on("error", (e) => console.error(e));
    case argv.chernobyl:
        console.log(Include.token4);
        client.login(Include.token4);
        client.on("error", (e) => console.error(e));
    case argv.tanai:
        console.log(Include.token5);
        client.login(Include.token5);
        client.on("error", (e) => console.error(e));
      break;
    default:
      console.log("/!\\ TOKEN NOT FOUND /!\\");
      client.on("error", (e) => console.error(e));
      client.destroy();
  }