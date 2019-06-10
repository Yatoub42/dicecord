// Libraries
//persos
//const jet = require('./lib/critique.js');
const db = require('./lib/bdd.js');
const message = require('./lib/message.js');
//officielles
const Discord = require('discord.js'); //npm install discord.js --save
const program = require('commander'); //npm install commander --save
// Fichiers
const Include = require('./include/resource.priv.json');
// Instanciations
const Client = new Discord.Client();

//regex
const reSpec = /\W|_/g;
const reNumber = /[0-9]/g;
const reText = /[a-z|A-Z]/g;
const prefix = Include.prefix;

// Validation de la connexion
Client.on('ready', () => {
  /*Client.user.setAvatar('./include/avatar.png')
  .then(user => console.info(`Avatar setté !`))
  .catch(console.error());*/
  Client.user.setActivity('vous juger !');
  console.info('Bot Connected');
});

//Création de la bdd
db.createdb();

// Commandes et réponses
Client.on('message', msg => {
    let ServerName = msg.guild.name.replace(reSpec,"");
    db.createTable(ServerName);
    //Ignore messages sent by the bot
    if (msg.author.bot) return;
    if (msg.content.startsWith(prefix)) {
        var msgUnprefix = msg.content.replace(prefix, '');
    }
    /*if (parseInt(msgUnprefix)) {
        msg.reply(message.gestionDe(msgUnprefix,msg.member.user.username,msg.guild.name,ServerName));
    }else
    msg.reply(message.gestionDe(msgUnprefix,msg.member.user.username,msg.guild.name,ServerName));
*/
    if (reText.test(msgUnprefix)) {
        msg.reply(message.gestionText(msgUnprefix,msg.member.user.username,msg.guild.name,ServerName));
    }else if (reNumber.test(msgUnprefix)) {
        msg.reply(message.gestionDe(msgUnprefix,msg.member.user.username,msg.guild.name,ServerName));
    }

    //msg.reply(message.gestionDe(msg.content,msg.member.user.username,msg.guild.name,ServerName));
});

//Arguments de lancement
program
  .option('--nyria', 'Nyria')
  .option('--niven', 'Niven')
  .option('--test', 'Test')
  .parse(process.argv);

// connexion du bot aux salons
if (program.niven) {
    Client.login(Include.token1);
    Client.on("error", (e) => console.error(e));
} else if (program.nyria) {
    Client.login(Include.token2);
    Client.on("error", (e) => console.error(e));    
} else if (program.test) {
    Client.login(Include.tokenTest);
    Client.on("error", (e) => console.error(e)); 
}
//Client.on("warn", (e) => console.warn(e));
//Client.on("debug", (e) => console.info(e));
