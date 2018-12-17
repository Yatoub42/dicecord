// Libraries
const Discord = require('discord.js'); //npm install discord.js --save
const Chance = require('chance');//npm install chance --save
const fs = require('fs');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const logDir = 'log';
// Fichiers
const Auth = require('./Include/auth.priv.json');
const Critpos = fs.readFileSync("./Include/critpos.txt", "UTF-8");
const Critneg= fs.readFileSync("./Include/critneg.txt", "UTF-8");
const Critmixte= fs.readFileSync("./Include/critmixte.txt", "UTF-8");
// Instanciations
var chance = new Chance();
const client = new Discord.Client();
//logger
// Création du répertoire si il n'existe pas
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/dicecord_%DATE%.log`,
  zippedArchive: true,
  maxFiles: '365d',
  datePattern: 'YYYY-MM-DD'
});

const logger = createLogger({
  // Setting du format de log
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      //level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    dailyRotateFileTransport
  ]
});

// Fonction de génération de réponse personnalisé en cas de réussite critique
function reussiteCritique(){
  var phrase = Critpos.split('\n');
  var aleat = gen(0,(phrase.length - 2));
  //console.log('nb possibilité : '+(phrase.length - 2));
  return phrase[aleat]
}

// Fonction de génération de réponse personnalisé en cas d'échec critique
function echecCritique(){
  var phrase = Critneg.split('\n');
  var aleat = gen(0,(phrase.length - 2));
  //console.log('nb possibilité : '+(phrase.length - 2));
  return phrase[aleat]
}

// Fonction de génération de réponse personnalisé en cas de réussite critique
function mixteCritique(){
  var phrase = Critmixte.split('\n');
  var aleat = gen(0,(phrase.length - 2));
  //console.log('nb possibilité : '+(phrase.length - 2));
  return phrase[aleat]
}

// Fonction de génération de jet aléatoire
function gen(min,max) {
    var instance = new Chance();
    var rng = instance.timestamp();
    var chance = new Chance(rng);
	var result = chance.integer({min: min, max: max})
	return result
}

// Validation de la connexion
client.on('ready', () => {
	//client.user.setAvatar('./Include/avatar.png');
  client.user.setAvatar('./Include/avatar.png')
  .then(user => logger.info(`Avatar setté !`))
  .catch(logger.error);
  logger.info('Bot Connected')
});

// Commandes et réponses
client.on('message', msg => {
    switch (msg.content) {
        case '!1d100':
            var dice='1d100';
            logger.info('1d100 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            var resultat = gen(0,99)
            logger.info(resultat+' généré');
            //resultat = 100
            if (resultat <= 5) {
              logger.info('réussite critique');
              msg.reply(dice+'='+resultat+'\n'+reussiteCritique())
            } else if (resultat >= 95) {
              logger.info('échec critique');
              msg.reply(dice+'='+resultat+'\n'+echecCritique());
            } else if (resultat && (resultat === 42 || resultat === 69)) {
              logger.info('critique mixte');
              msg.reply(dice+'='+resultat+'\n'+mixteCritique());
            } else {
              msg.reply(dice+'='+resultat);
            };
            count++;
            break;
        case '!1d10':
            var dice='1d10';
            logger.info('1d10 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            var resultat = gen(1,10)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d12':
            var dice='1d12';
            logger.info('1d12 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            var resultat = gen(1,12)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat)
            count++;
            break;
        case '!1d2':
            var dice='1d2';
            logger.info('1d2 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            var resultat = gen(1,2)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d3':
            var dice='1d3';
            logger.info('1d3 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            var resultat = gen(1,3)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d4':
            var dice='1d4';
            logger.info('1d4 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            var resultat = gen(1,4)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d6':
            var dice='1d6';
            logger.info('1d6 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            var resultat = gen(1,6)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d8':
            var dice='1d8';
            logger.info('1d8 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            var resultat = gen(1,8)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d20':
            var dice='1d20';
            logger.info('1d20 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            var resultat = gen(1,20)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
		/*case '!debug':
            var dice='DEBUG'
            var i;
            for (i = 0; i < 10; i++) {
                var resultat = gen(1, 100);
                resultat = 100;
                if (resultat >= 95) {
                  msg.reply(dice+'='+resultat+'\n'+echecCritique())
                } else if (resultat && (resultat <= 5 || resultat == 42)) {
                  msg.reply(dice+'='+resultat+'\n'+reussiteCritique());
                } else {
                  msg.reply(dice+'='+resultat);
                }
            }
            break;*/
		case '!help':
			msg.reply("Dicecord usage : !1d100 ; !1d10 ; !1d4 ; !1d6 ; !1d12 ; !1d20 ; !1d8 ; !1d3 ; !1d2");
			break;
		case '!ping':
    logger.info('Ping');
			msg.reply('Pong!');
			break;
		case '!stat':
      logger.info('Statistiques');
			msg.reply('Il y a eu '+count+' lancés depuis mon démarrage');
      logger.info('Il y a eu '+count+' lancés');
    }
    logger.info(count+' lancés faits');
});

// connexion du bot aux salons
client.login(Auth.token);
client.on('error', logger.error);
var count= 0
