// Libraries
const Discord = require('discord.js'); //npm install discord.js --save
const Auth = require('./Include/auth.priv.json');
var Chance = require('chance');//npm install chance --save
// Instanciations
var chance = new Chance();
const client = new Discord.Client();

function gen(min,max) {
    var instance = new Chance();
    var rng = instance.timestamp();
    var chance = new Chance(rng);
	var result = chance.integer({min: min, max: max})
	return result
}

client.on('ready', () => {
	client.user.setAvatar('./Include/avatar.png');
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    switch (msg.content) {
        case '!1d100':
            var dice='1d100';
            console.log(dice+' asked');
            var resultat = gen(1,100)
            msg.reply(dice+'='+resultat);
            console.log(resultat+' provided');
            count++;
            console.log(count+'lancés faits');
            break;
        case '!1d10':
            var dice='1d10';
            console.log(dice+' asked');
            var resultat = gen(1,10)
            msg.reply(dice+'='+resultat);
            console.log(resultat+' provided');
            count++;
            console.log(count+'lancés faits');
            break;
        case '!1d12':
            var dice='1d12';
            console.log(dice+' asked');
            var resultat = gen(1,12)
            msg.reply(dice+'='+resultat);
            console.log(resultat+' provided');
            count++;
            console.log(count+'lancés faits');
            break;
        case '!1d2':
            var dice='1d2';
            console.log(dice+' asked');
            var resultat = gen(1,2)
            msg.reply(dice+'='+resultat);
            console.log(resultat+' provided');
            count++;
            console.log(count+'lancés faits');
            break;
        case '!1d3':
            var dice='1d3';
            console.log(dice+' asked');
            var resultat = gen(1,3)
            msg.reply(dice+'='+resultat);
            console.log(resultat+' provided');
            count++;
            console.log(count+'lancés faits');
            break;
        case '!1d4':
            var dice='1d4';
            console.log(dice+' asked');
            var resultat = gen(1,4)
            msg.reply(dice+'='+resultat);
            console.log(resultat+' provided');
            count++;
            console.log(count+'lancés faits');
            break;
        case '!1d6':
            var dice='1d6';
            console.log(dice+' asked');
            var resultat = gen(1,6)
            msg.reply(dice+'='+resultat);
            console.log(resultat+' provided');
            count++;
            console.log(count+'lancés faits');
            break;
        case '!1d8':
            var dice='1d8';
            console.log(dice+' asked');
            var resultat = gen(1,8)
            msg.reply(dice+'='+resultat);
            console.log(resultat+' provided');
            count++;
            console.log(count+'lancés faits');
            break;
        case '!1d20':
            var dice='1d20';
            console.log(dice+' asked');
            var resultat = gen(1,20)
            msg.reply(dice+'='+resultat);
            console.log(resultat+' provided');
            count++;
            console.log(count+'lancés faits');
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
});

client.login(Auth.token);
client.on('error', console.error);
var count= 0
