// Libraries
const Discord = require('discord.js'); //npm install discord.js --save
var Chance = require('chance');//npm install chance --save
var Fs = require('fs');
// Fichiers JSON
const Auth = require('./Include/auth.priv.json');
var Critpos = Fs.readFileSync("./Include/critpos.json");
var Critneg= Fs.readFileSync("./Include/critneg.json");
// Parser les fichiers JSON
var contentCritpos = JSON.parse(Critpos);
var contentCritneg = JSON.parse(Critneg);
// Instanciations
var chance = new Chance();
const client = new Discord.Client();

// Fonction de génération de réponse personnalisé en cas de réussite critique
function reussiteCritique(){
  var aleat = gen(1,2);
  console.log('aleat reussite critique='+aleat)
  switch (aleat) {
    case 1:
      message = contentCritpos.key1;
      break;
    case 2:
      message = contentCritpos.key2;
      break;
  }
  return message
}

// Fonction de génération de réponse personnalisé en cas d'échec critique
function echecCritique(){
  var aleat = gen(1,2);
  console.log('aleat echec critique='+aleat)
  switch (aleat) {
    case 1:
      message = contentCritneg.key1;
      break;
    case 2:
      message = contentCritneg.key2;
      break;
  }
  return message
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
	client.user.setAvatar('./Include/avatar.png');
  console.log(`Logged in as ${client.user.tag}!`);
});

// Commandes et réponses
client.on('message', msg => {
    switch (msg.content) {
        case '!1d100':
            var dice='1d100';
            var resultat = gen(0,100)
            if (resultat >= 95) {
              msg.reply(dice+'='+resultat+'\n'+echecCritique())
            } else if (resultat && (resultat <= 5 || resultat == 42)) {
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
                var resultat = gen(1, 100)
                msg.reply(dice+'='+resultat);
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
    console.log(count+' lancés faits');
});

// connexion du bot aux salons
client.login(Auth.token);
client.on('error', console.error);
var count= 0
