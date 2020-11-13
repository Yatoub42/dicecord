const db = require("./lib/bdd.js");
const message = require("./lib/message.js");
const Discord = require("discord.js");
const instance = require("commander"); 
const Include = require("./include/resource.priv.json");
const client = new Discord.client(/*{autoReconnect:true}*/);

const reSpec = /\W|_/g;
const prefix = Include.prefix;

client.on("ready", () => {
  client.user.setActivity("vous juger !");
  console.info("Bot Connected");
});

db.createdb();

client.on('error', console.error); // Afficher les erreurs

client.on("message", (msg) => {
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

switch (instance) {
    case instance.niven:
        client.login(Include.token1);
        //client.on("error", (e) => console.error(e));
    case instance.nyria:
        client.login(Include.token2);
        //client.on("error", (e) => console.error(e));
    case instance.test:
        client.login(Include.tokenTest);
        console.log(client.fetchApplication());
        //client.on("error", (e) => console.error(e));
    case instance.chernobyl:
        client.login(Include.token4);
        //client.on("error", (e) => console.error(e));
    case instance.tanai:
        client.login(Include.token5);
        //client.on("error", (e) => console.error(e));
      break;
    default:
      console.log("/!\\ TOKEN NOT FOUND /!\\");
      //client.on("error", (e) => console.error(e));
      /*console.log("Token list :\n"
      +"Include.token1="+Include.token1+"\n"
      +"Include.token2="+Include.token2+"\n"
      +"Include.tokenTest="+Include.tokenTest+"\n"
      +"Include.token4="+Include.token4+"\n"
      +"Include.token5="+Include.token5);*/
      client.destroy();
  }
  
