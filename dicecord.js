// Libraries
//persos
const jet = require('./lib/critique.js');
//officielles
const Discord = require('discord.js'); //npm install discord.js --save
const Fs = require('fs');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const Path = require('path');
const LogDir = 'log';
// Fichiers
const Auth = require('./include/auth.priv.json');
// Instanciations
const Client = new Discord.Client();

//variables
let dice;
let resultat;
let count = 0;

//logger
// Création du répertoire si il n'existe pas
if (!Fs.existsSync(LogDir)) {
  Fs.mkdirSync(LogDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${LogDir}/dicecord_%DATE%.log`,
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

// Validation de la connexion
Client.on('ready', () => {
	//client.user.setAvatar('./include/avatar.png');
  Client.user.setAvatar('./include/avatar.png')
  .then(user => logger.info(`Avatar setté !`))
  .catch(logger.error);
  logger.info('Bot Connected')
});

// Commandes et réponses
Client.on('message', msg => {
    switch (msg.content) {
        case '!1d100':
            dice = '1d100';
            logger.info('1d100 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(0,99);
            logger.info(resultat+' généré');
            //resultat = 100
            if (resultat <= 5) {
              logger.info('réussite critique');
              msg.reply(dice+'='+resultat+'\n'+jet.reussiteCritique())
            } else if (resultat >= 95) {
              logger.info('échec critique');
              msg.reply(dice+'='+resultat+'\n'+jet.echecCritique());
            } else if (resultat && (resultat === 42 || resultat === 69)) {
              logger.info('critique mixte');
              msg.reply(dice+'='+resultat+'\n'+jet.mixteCritique());
            } else {
              msg.reply(dice+'='+resultat);
            };
            count++;
            break;
        case '!1d10':
            dice='1d10';
            logger.info('1d10 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,10)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d12':
            dice='1d12';
            logger.info('1d12 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,12)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat)
            count++;
            break;
        case '!1d2':
            dice='1d2';
            logger.info('1d2 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,2)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d3':
            dice='1d3';
            logger.info('1d3 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,3)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d4':
            dice='1d4';
            logger.info('1d4 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,4)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d6':
            dice='1d6';
            logger.info('1d6 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,6)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d8':
            dice='1d8';
            logger.info('1d8 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,8)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d20':
            dice='1d20';
            logger.info('1d20 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,20)
            logger.info(resultat+' généré');
            msg.reply(dice+'='+resultat);
            count++;
            break;
		case '!debug':
            dice='DEBUG'
            let i;
            for (i = 0; i < 10; i++) {
                resultat = jet.gen(0, 99);
                //resultat = 100;
                if (resultat >= 95) {
                  msg.reply(dice+'='+resultat+'\n'+jet.echecCritique())
                } else if (resultat && (resultat <= 5 || resultat === 42)) {
                  msg.reply(dice+'='+resultat+'\n'+jet.reussiteCritique());
                } else {
                  msg.reply(dice+'='+resultat);
                }
            }
            break;
		case '!help':
			msg.reply("Dicecord usage : !1d100 ; !1d10 ; !1d4 ; !1d6 ; !1d12 ; !1d20 ; !1d8 ; !1d3 ; !1d2\nLes dés 100 sont entre 0 et 99 ; les autres entre 1 et leur valeur");
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
    //logger.info(count+' lancés faits');
});

// connexion du bot aux salons
Client.login(Auth.token);
Client.on('error', logger.error);
