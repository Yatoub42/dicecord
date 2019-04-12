// Libraries
//persos
const jet = require('./lib/critique.js');
const db = require('./lib/bdd.js');
//officielles
const Discord = require('discord.js'); //npm install discord.js --save
const program = require('commander'); //npm install commander --save
const Sentry = require('@sentry/node');
const moment = require('moment');
// Fichiers
const Include = require('./include/resource.priv.json');
// Instanciation
const Client = new Discord.Client();
Sentry.init({
    dsn: Include.sentry
});


//constantes
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
}, error => console.error(new moment().format('YYYY-MM-DD HH:mm:ss'), error));

//Création de la bdd
db.createdb();

// Commandes et réponses
Client.on('message', msg => {
    let ServerName = msg.guild.name.replace(reSpec, "");
    db.createTable(ServerName);
    //Ignore messages sent by the bot
    if (msg.author.bot) return;

    if (msg.content.startsWith(prefix)) {
        let msgUnprefix = msg.content.replace(prefix, '');
        console.info(msgUnprefix);
        if (reNumber.test(msgUnprefix)) {
            let arrayCommand = msgUnprefix.split('d');
            var number = arrayCommand[0];
            var value = arrayCommand[1];
            var resultArray = [];
            var dice = number + 'd' + value;
            console.info(dice + ' demandé par ' + msg.member.user.username + ' sur ' + msg.guild.name);
            if (value == 100 && number > 1) {
                msg.reply("C'est mieux de demander les d100 un par un, je ne suis qu'un petit bot");
                console.info('Alerte xd100');
            } else if (number < 1) {
                msg.reply(number + " lancés ? Tu es sérieux ?");
                console.info('Alerte 0d');
            } else if (number > 10) {
                msg.reply("C'est pas tout a fait normal de demander plus de 10 jet d'un coup, tu veut que je meurt c'est ça ?");
                console.info('Alerte plus de 10 lancés');
            } else if (value > 100 || value < 1) {
                msg.reply("Je n'ai jamait vu de d" + value + " et pourtant j'en ai vu passer");
                console.info('Alerte d absurde');
            } else if (dice == '1d100') {
                console.info('1d100 demandé par ' + msg.member.user.username + ' sur ' + msg.guild.name);
                var resultat = jet.gen(1, value);
                console.info(resultat + ' généré');
                //resultat = 100
                if (resultat <= 5) {
                    console.info('réussite critique');
                    db.insert(msg.member.user.username, '100', resultat, 'reussite', ServerName);
                    msg.reply(dice + '=' + resultat + '\n' + jet.reussiteCritique())
                } else if (resultat >= 95) {
                    console.info('échec critique');
                    db.insert(msg.member.user.username, '100', resultat, 'echec', ServerName);
                    msg.reply(dice + '=' + resultat + '\n' + jet.echecCritique());
                } else if (resultat && (resultat === 42 || resultat === 69)) {
                    console.info('critique mixte');
                    db.insert(msg.member.user.username, '100', resultat, 'mixte', ServerName);
                    msg.reply(dice + '=' + resultat + '\n' + jet.mixteCritique());
                } else {
                    db.insert(msg.member.user.username, '100', resultat, null, ServerName);
                    msg.reply(dice + '=' + resultat);
                };
            } else {
                for (let index = 0; index < number; index++) {
                    resultArray[index] = jet.gen(1, value);
                }
                resultArray.forEach(result => {
                    console.info(result + ' généré');
                    db.insert(msg.member.user.username, value, result, null, ServerName);
                });
                msg.reply(dice + ' = ' + resultArray.toString());
            }
        } else if (reText.test(msgUnprefix)) {
            switch (msgUnprefix) {
                case 'help':
                    msg.reply("Dicecord usage : !xdy (ex: !1d100 ou !4d6) \nLes dés sont entre 1 et leur valeur");
                    break;
                case 'ping':
                    console.info('Ping');
                    msg.reply('Pong!');
                    break;
                case 'stat':
                    let reussite = db.select(msg.member.user.username, 'reussite', ServerName);
                    let echec = db.select(msg.member.user.username, 'echec', ServerName);
                    let total = db.selectAll(msg.member.user.username, ServerName);
                    let percentReussite = (100 * reussite) / total;
                    let percentEchec = (100 * echec) / total;
                    percentReussite = percentReussite.toFixed(2);
                    percentEchec = percentEchec.toFixed(2);
                    console.info('Stats demandé par ' + msg.member.user.username + ' sur ' + msg.guild.name);
                    console.info('reussite = ' + reussite);
                    console.info('échec = ' + echec);
                    console.info('total = ' + total);
                    console.info('Pourcent réussite critique = ' + percentReussite + '%');
                    console.info('Pourcent réussite critique = ' + percentEchec + '%');
                    msg.reply('\nSalut, tu as fait ' + total + ' lancés de dés.' +
                        '\n' + 'Tu a fait ' + reussite + ' réussite critiques soit ' + percentReussite + '%\n' +
                        'Tu a fait ' + echec + ' échecs critiques soit ' + percentEchec + '%\n' +
                        "Sinon, ta vie c'est la chance ou le sel ?");
                    break;
                case 'statAll':
                    //db.creaTable();
                    console.info('StatsAll demandé par ' + msg.member.user.username + ' sur ' + msg.guild.name);
                    let topTier = db.statAll(ServerName);
                    if (topTier.length == 3) {
                        msg.reply('\nTu veux des stats ?' +
                            '\n' + "Alors accroche toi bien, c'est partit pour le top 3 des joueurs les plus actifs du serveur " + msg.guild.name + ' :' +
                            '\n' + '1 - ' + topTier[0].USER + ' avec ' + topTier[0].COUNT + ' lancés !!' +
                            '\n' + '2 - ' + topTier[1].USER + ' avec ' + topTier[1].COUNT + ' lancés !!' +
                            '\n' + '3 - ' + topTier[2].USER + ' avec ' + topTier[2].COUNT + ' lancés !!' +
                            '\n' + 'Tu as intérêt a faire rouler tes dés coco si tu veux être dans mon classement !!');
                    } else {
                        msg.reply("Il n'y a pas eu suffisament de lancés pour sortir un top 3");
                        console.info('Alerte pas assez de joueur');
                    }
                    break;
            }
        }
    }

}, error => console.error(new moment().format('YYYY-MM-DD HH:mm:ss'), error));

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