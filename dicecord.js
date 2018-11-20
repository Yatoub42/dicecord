const Discord = require('discord.js'); //npm install discord.js --save
const Auth = require('./Include/auth.priv.json');
//var chance = require('chance').Chance(); //npm install chance --save
//var chance = require('chance').Chance(Date.now()); //npm install chance --save
// Load Chance
var Chance = require('chance');//npm install chance --save
// Instantiate Chance so it can be used
var chance = new Chance();
//var my_random_string = chance.string();
const client = new Discord.Client();

function gen(min,max) {
    var instance = new Chance();
    var rng = instance.timestamp();
    var chance = new Chance(rng);
	var result = chance.integer({min: min, max: max})
	return result
}

client.on('ready', () => {
  var server = client.guild.name();
  var name = client.user.tag();
	client.user.setAvatar('./Include/avatar.png');
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('Logged in '+server+' as '+name+' !');
});

client.on('message', msg => {
	/*if(responseObject[msg.content]){
		var date = Date.now();
        //console.log('Seed Rng='+date);
		msg.reply(responseObject[msg.content]);
	}*/
    switch (msg.content) {
        case '!1d100':
            var dice='1d100';
            var resultat = gen(1,100)
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d10':
            var dice='1d100';
            var resultat = gen(1,10)
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d12':
            var dice='1d12';
            var resultat = gen(1,12)
            msg.reply(dice+'='+resultat);
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
                msg.reply(dice + '=' + resultat);
            }
            break;*/
		case '!help':
			msg.reply("Dicecord usage : !1d100 ; !1d10 ; !1d4 ; !1d6 ; !1d12 ; !1d20 ; !1d8 ; !1d3 ; !1d2");
			break;
		case '!ping':
			msg.reply('Pong!');
			break;
		case '!stat':
			msg.reply('Il y a eu '+count+' lancés depuis le démarrage du bot');
    }
});

client.login(Auth.token);
var count= 0
//console.log('Seed='+Date.now());
