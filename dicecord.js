// Libraries
//persos
const db = require('./lib/bdd.js');
const message = require('./lib/message.js');
//officielles
const Discord = require('discord.js'); //npm install discord.js --save
const instance = require('commander'); //npm install commander --save
const Sentry = require('@sentry/node');
// Fichiers
const Include = require('./include/resource.priv.json');
// Instanciations
const Client = new Discord.Client();
Sentry.init({
    dsn: Include.sentry
});

//regex
const reSpec = /\W|_/g;
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
    //gestion du préfixe de commande
    if (msg.content.startsWith(prefix)) {
        var msgUnprefix = msg.content.replace(prefix, '');
        //test présence de nombre
        if (parseInt(msgUnprefix)) {
            msg.reply(message.gestionDe(msgUnprefix,msg.member.user.username,msg.guild.name,ServerName));
        } //sinon c'est que du texte
        else msg.reply(message.gestionText(msgUnprefix,msg.member.user.username,msg.guild.name,ServerName));
    }
});

//Arguments de lancement
instance
  .option('--nyria', 'Nyria')
  .option('--niven', 'Niven')
  .option('--test', 'Test')
  .parse(process.argv);

// connexion du bot aux salons
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
//Client.on("warn", (e) => console.warn(e));
//Client.on("debug", (e) => console.info(e));
