// Libraries
const Discord = require('discord.js'); //npm install discord.js --save
const Chance = require('chance');//npm install chance --save
const Fs = require('fs');
// Fichiers
const Auth = require('./Include/auth.priv.json');
var Critpos = Fs.readFileSync("./Include/critpos.txt", "UTF-8");
var Critneg= Fs.readFileSync("./Include/critneg.txt", "UTF-8");
// Instanciations
var chance = new Chance();
const client = new Discord.Client();
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');
const logDir = 'log';
//logger
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/dicecord_%DATE%.log`,
  datePattern: 'YYYY-MM-DD'
});

const logger = createLogger({
  // change level if in dev environment versus production
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
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
            logger.debug('1d100 demandé');
            var resultat = gen(0,100)
            logger.debug(resultat+' généré');
            //resultat = 100
            if (resultat >= 95) {
              logger.debug('echec critique');
              msg.reply(dice+'='+resultat+'\n'+echecCritique())
            } else if (resultat && (resultat <= 5 || resultat == 42)) {
              logger.debug('réussite critique');
              msg.reply(dice+'='+resultat+'\n'+reussiteCritique());
            } else {
              msg.reply(dice+'='+resultat);
            }
            count++;
            break;
        case '!1d10':
            var dice='1d10';
            var resultat = gen(0,10)
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d12':
            var dice='1d12';
            var resultat = gen(1,12)
            msg.reply(dice+'='+resultat)
            count++;
            break;
        case '!1d2':
            var dice='1d2';
            var resultat = gen(1,2)
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d3':
            var dice='1d3';
            var resultat = gen(1,3)
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d4':
            var dice='1d4';
            var resultat = gen(1,4)
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d6':
            var dice='1d6';
            var resultat = gen(1,6)
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d8':
            var dice='1d8';
            var resultat = gen(1,8)
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d20':
            var dice='1d20';
            var resultat = gen(1,20)
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
			msg.reply('Pong!');
			break;
		case '!stat':
			msg.reply('Il y a eu '+count+' lancés depuis mon démarrage');
    }
    logger.debug(count+' lancés faits');
});

// connexion du bot aux salons
client.login(Auth.token);
client.on('error', logger.error);
var count= 0
