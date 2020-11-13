const db = require("./lib/bdd.js");
const message = require("./lib/message.js");
const Discord = require("discord.js");
const instance = require("commander"); 
const Include = require("./include/resource.priv.json");
const Client = new Discord.Client(/*{autoReconnect:true}*/);

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
  .option("--chernobyl", "Chernobyl")
  .option("--tanai", "Tanai")
  .option("--test", "Test")
  .parse(process.argv);

/*if (instance.niven) {
    Client.login(Include.token1);
    Client.on("error", (e) => console.error(e));
} else if (instance.nyria) {
    Client.login(Include.token2);
    Client.on("error", (e) => console.error(e));
} else if (instance.test) {
    Client.login(Include.tokenTest);
    Client.on("error", (e) => console.error(e));
} else if (instance.chernobyl) {
    Client.login(Include.token4);
    Client.on("error", (e) => console.error(e));
} else if (instance.tanai) {
    Client.login(Include.token5);
    Client.on("error", (e) => console.error(e));
}*/

switch (instance) {
    case instance.niven:
        Client.login(Include.token1);
        Client.on("error", (e) => console.error(e));
    case instance.nyria:
        Client.login(Include.token2);
        Client.on("error", (e) => console.error(e));
    case instance.test:
        Client.login(Include.tokenTest);
        console.log(Client.fetchApplication());
        Client.on("error", (e) => console.error(e));
    case instance.chernobyl:
        Client.login(Include.token4);
        Client.on("error", (e) => console.error(e));
    case instance.tanai:
        Client.login(Include.token5);
        Client.on("error", (e) => console.error(e));
      break;
    default:
      console.log("/!\\ TOKEN NOT FOUND /!\\");
      /*console.log("Token list :\n"
      +"Include.token1="+Include.token1+"\n"
      +"Include.token2="+Include.token2+"\n"
      +"Include.tokenTest="+Include.tokenTest+"\n"
      +"Include.token4="+Include.token4+"\n"
      +"Include.token5="+Include.token5);*/
      Client.destroy();
  }
  
