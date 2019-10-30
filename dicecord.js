const db = require("./lib/bdd.js");
const message = require("./lib/message.js");
const Discord = require("discord.js");
const instance = require("commander"); 
const Include = require("./include/resource.priv.json");
const Client = new Discord.Client({autoReconnect:true});

const reSpec = /\W|_/g;
const prefix = Include.prefix;

Client.on("ready", () => {
  Client.user.setActivity("vous juger !");
  console.info("Bot Connected");
});

db.createdb();

Client.on("message", (msg) => {
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

instance
  .option("--nyria", "Nyria")
  .option("--niven", "Niven")
  .option("--test", "Test")
  .parse(process.argv);

if (instance.niven) {
    Client.login(Include.token1);
    Client.on("error", (e) => console.error(e));
} else if (instance.nyria) {
    Client.login(Include.token2);
    Client.on("error", (e) => console.error(e));
} else if (instance.test) {
    Client.login(Include.tokenTest);
    Client.on("error", (e) => console.error(e));
}
