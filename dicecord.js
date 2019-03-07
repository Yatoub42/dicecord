// Libraries
//persos
const jet = require('./lib/critique.js');
const db = require('./lib/bdd.js');
//officielles
const Discord = require('discord.js'); //npm install discord.js --save
const program = require('commander'); //npm install commander --save
// Fichiers
const Auth = require('./include/auth.priv.json');
// Instanciations
const Client = new Discord.Client();

//variables
let dice;
let resultat;

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
    switch (msg.content) {
        case '!1d100':
            dice = '1d100';
            console.info('1d100 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(0,99);
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
            count++;
            break;
        case '!1d10':
            dice='1d10';
            console.info('1d10 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,10);
            console.info(resultat+' généré');
            db.insert(msg.member.user.username,'10',resultat,null,ServerName);
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d12':
            dice='1d12';
            console.info('1d12 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,12);
            console.info(resultat+' généré');
            db.insert(msg.member.user.username,'12',resultat,null,ServerName);
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d2':
            dice='1d2';
            console.info('1d2 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,2);
            console.info(resultat+' généré');
            db.insert(msg.member.user.username,'2',resultat,null,ServerName);
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d3':
            dice='1d3';
            console.info('1d3 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,3);
            console.info(resultat+' généré');
            db.insert(msg.member.user.username,'3',resultat,null,ServerName);
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d4':
            dice='1d4';
            console.info('1d4 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,4);
            console.info(resultat+' généré');
            db.insert(msg.member.user.username,'4',resultat,null,ServerName);
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!2d4':
            dice='2d4';
            console.info('2d4 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            let result1 = jet.gen(1,4);
            let result2 = jet.gen(1,4);
            console.info(result1+' et '+result2+' généré');
            db.insert(msg.member.user.username,'4',result1,null,ServerName);
            db.insert(msg.member.user.username,'4',result2,null,ServerName);
            msg.reply(dice+'='+result1+' et '+result2);
            count++;
            break;
        case '!1d6':
            dice='1d6';
            console.info('1d6 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,6);
            console.info(resultat+' généré');
            db.insert(msg.member.user.username,'6',resultat,null,ServerName);
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d8':
            dice='1d8';
            console.info('1d8 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,8);
            console.info(resultat+' généré');
            db.insert(msg.member.user.username,'8',resultat,null,ServerName);
            msg.reply(dice+'='+resultat);
            count++;
            break;
        case '!1d20':
            dice='1d20';
            console.info('1d20 demandé par '+msg.member.user.username+' sur '+msg.guild.name);
            resultat = jet.gen(1,20);
            console.info(resultat+' généré');
            db.insert(msg.member.user.username,'20',resultat,null,ServerName);
            msg.reply(dice+'='+resultat);
            count++;
            break;
		case '!debug':
            dice='DEBUG';
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
            console.info('Ping');
			msg.reply('Pong!');
			break;
		case '!stat':
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
        case '!statAll':
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
