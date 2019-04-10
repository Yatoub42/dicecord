// Libraries
//persos
const jet = require('./lib/critique.js');
const db = require('./lib/bdd.js');
const cmd = require('./lib/command.js');
//officielles
const Discord = require('discord.js'); //npm install discord.js --save
const program = require('commander'); //npm install commander --save
const Sentry = require('@sentry/node');
// Fichiers
const Include = require('./include/resource.priv.json');
// Instanciation
const Client = new Discord.Client();
Sentry.init({ dsn: Include.sentry });


//variables
const reSpec = /\W|_/g;
const reNumber = /[0-9]/g;
const reText = /[a-z|A-Z]/g;
let dice;
let resultat;
let prefix = Include.prefix;

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

    /*if (msg.content === '!1d100') {
        dice = '1d100';
        console.info('1d100 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
        resultat = jet.gen(1,100);
        console.info(resultat+' généré');
        //resultat = 100
        if (resultat <= 5) {
          console.info('réussite critique');
            db.insert(msg.member.user.username,'100',resultat,'reussite',ServerName);
            msg.reply(dice+'='+resultat+'\n'+jet.reussiteCritique())
        } else if (resultat >= 95) {
          console.info('échec critique');
            db.insert(msg.member.user.username,'100',resultat,'echec',ServerName);
            msg.reply(dice+'='+resultat+'\n'+jet.echecCritique());
        } else if (resultat && (resultat === 42 || resultat === 69)) {
          console.info('critique mixte');
            db.insert(msg.member.user.username,'100',resultat,'mixte',ServerName);
            msg.reply(dice+'='+resultat+'\n'+jet.mixteCritique());
        } else {
            db.insert(msg.member.user.username,'100',resultat,null,ServerName);
            msg.reply(dice+'='+resultat);
        };
    }
    else */if (msg.content.startsWith(prefix)) {
            let msgUnprefix = msg.content.replace(prefix,'');
            console.log(msgUnprefix);
            if (reNumber.test(msgUnprefix)) {
                let arrayCommand = msgUnprefix.split('d');
                var number = arrayCommand[0];
                var value = arrayCommand[1];
                var resultArray = [];
                dice = number+'d'+value;
                console.info(dice+' demandé par '+msg.member.user.username+' sur '+msg.guild.name);
                for (let index = 0; index < number; index++) {
                    resultArray[index] = jet.gen(1,value);
                }
                if (value === 100) {
                    resultArray.forEach(result => {
                        if (result <=5) {
                            console.info('réussite critique');
                            db.insert(msg.member.user.username,'100',resultat,'reussite',ServerName);
                            msg.reply(dice+'='+resultat+'\n'+jet.reussiteCritique())
                        } else if (result >=95) {
                            console.info('échec critique');
                            db.insert(msg.member.user.username,'100',resultat,'echec',ServerName);
                            msg.reply(dice+'='+resultat+'\n'+jet.echecCritique());
                        } else if (resultat && (resultat === 42 || resultat === 69)) {
                            db.insert(msg.member.user.username,'100',resultat,'mixte',ServerName);
                            msg.reply(dice+'='+resultat+'\n'+jet.mixteCritique());
                        }
                        console.info(result+' généré');
                        db.insert(msg.member.user.username,value,result,null,ServerName);
                    });
                }
                else
                    resultArray.forEach(result => {
                        console.info(result+' généré');
                        db.insert(msg.member.user.username,value,result,null,ServerName);
                    });
                msg.reply(dice+' = '+resultArray.toString());
            }
            else if (reText.test(msgUnprefix)) {
                switch (msgUnprefix){
                    case 'help':
                        msg.reply("Dicecord usage : !xdy (ex: !1d100 ou !3d4) \nLes dés sont entre 1 et leur valeur");
                        break;
                    case 'ping':
                        console.info('Ping');
                        msg.reply('Pong!');
                        break;
                    case 'stat':
                        let reussite =  db.select(msg.member.user.username,'reussite',ServerName);
                        let echec = db.select(msg.member.user.username,'echec',ServerName);
                        let total = db.selectAll(msg.member.user.username,ServerName);
                        let percentReussite = (100 * reussite) / total ;
                        let percentEchec = (100 * echec) / total ;
                        percentReussite = percentReussite.toFixed(2);
                        percentEchec = percentEchec.toFixed(2);
                        console.info('Stats demandé par '+msg.member.user.username+' sur '+msg.guild.name);
                        console.info('reussite = '+reussite);
                        console.info('échec = '+echec);
                        console.info('total = '+total);
                        console.info('Pourcent réussite critique = '+percentReussite+'%');
                        console.info('Pourcent réussite critique = '+percentEchec+'%');
                        msg.reply('\nSalut, tu as fait '+total+' lancés de dés.'+
                            '\n'+'Tu a fait '+reussite+' réussite critiques soit '+percentReussite+'%\n' +
                            'Tu a fait '+echec+' échecs critiques soit '+percentEchec+'%\n' +
                            "Sinon, ta vie c'est la chance ou le sel ?");
                    break;
                    case 'statAll':
                        //db.creaTable();
                        console.info('StatsAll demandé par '+msg.member.user.username+' sur '+msg.guild.name);
                        let topTier= db.statAll(ServerName);
                        let top_user0 = topTier[0].USER;
                        let top_count0 = topTier[0].COUNT;
                        let top_user1 = topTier[1].USER;
                        let top_count1 = topTier[1].COUNT;
                        let top_user2 = topTier[2].USER;
                        let top_count2 = topTier[2].COUNT;
                        msg.reply('\nTu veux des stats ?'+
                            '\n'+"Alors accroche toi bien, c'est partit pour le top 3 des joueurs les plus actifs du serveur "+msg.guild.name+' :'+
                            '\n'+'1 - '+top_user0+' avec '+top_count0+' lancés !!'+
                            '\n'+'2 - '+top_user1+' avec '+top_count1+' lancés !!'+
                            '\n'+'3 - '+top_user2+' avec '+top_count2+' lancés !!'+
                            '\n'+'Tu as intérêt a faire rouler tes dés coco si tu veux être dans mon classement !!');
                    break;
                }
            }
    }
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
