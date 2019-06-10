// Libraries
//persos
//const jet = require('./lib/critique.js');
const db = require('./lib/bdd.js');
const message = require('./lib/message.js');
//officielles
const Discord = require('discord.js'); //npm install discord.js --save
const program = require('commander'); //npm install commander --save
// Fichiers
const Auth = require('./include/auth.priv.json');
// Instanciations
const Client = new Discord.Client();

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
    const regex =/\W|_/g;
    let ServerName = msg.guild.name.replace(regex,"");
    db.createTable(ServerName);
    msg.reply(message.gestion(msg.content,msg.member.user.username,msg.guild.name,ServerName));
});

//Arguments de lancement
program
  .option('--nyria', 'Nyria')
  .option('--niven', 'Niven')
  .option('--test', 'Test')
  .parse(process.argv);

// connexion du bot aux salons
if (program.niven) {
    Client.login(Auth.token1);
    Client.on("error", (e) => console.error(e));
} else if (program.nyria) {
    Client.login(Auth.token2);
    Client.on("error", (e) => console.error(e));    
} else if (program.test) {
    Client.login(Auth.tokenTest);
    Client.on("error", (e) => console.error(e)); 
}
//Client.on("warn", (e) => console.warn(e));
//Client.on("debug", (e) => console.info(e));
