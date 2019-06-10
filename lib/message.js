const jet = require('./critique.js');
const db = require('./bdd.js');

//variables
var dice;
var resultat;

const message = {
    gestion: function gestion(contenu,user,server,ServerName) {
        switch (contenu) {
            case '!1d100':
                dice = '1d100';
                console.info('1d100 demandé par '+user+' sur '+server);
                resultat = jet.gen(0,99);
                console.info(resultat+' généré');
                //resultat = 100
                if (resultat <= 5) {
                  console.info('réussite critique');
                    db.insert(user,'100',resultat,'reussite',ServerName);
                    var retour=dice+'='+resultat+'\n'+jet.reussiteCritique();
                } else if (resultat >= 95) {
                  console.info('échec critique');
                    db.insert(user,'100',resultat,'echec',ServerName);
                    var retour=dice+'='+resultat+'\n'+jet.echecCritique();
                } else if (resultat && (resultat === 42 || resultat === 69)) {
                  console.info('critique mixte');
                    db.insert(user,'100',resultat,'mixte',ServerName);
                    var retour=dice+'='+resultat+'\n'+jet.mixteCritique();
                } else {
                    db.insert(user,'100',resultat,null,ServerName);
                    var retour=dice+'='+resultat;
                };
                break;
                
            case '!1d10':
                dice='1d10';
                console.info('1d10 demandé par '+user+' sur '+server);
                resultat = jet.gen(1,10);
                console.info(resultat+' généré');
                db.insert(user,'10',resultat,null,ServerName);
                var retour=dice+'='+resultat;
                break;

            case '!1d12':
                dice='1d12';
                console.info('1d12 demandé par '+user+' sur '+server);
                resultat = jet.gen(1,12);
                console.info(resultat+' généré');
                db.insert(user,'12',resultat,null,ServerName);
                var retour=dice+'='+resultat;
                break;

            case '!1d2':
                dice='1d2';
                console.info('1d2 demandé par '+user+' sur '+server);
                resultat = jet.gen(1,2);
                console.info(resultat+' généré');
                db.insert(user,'2',resultat,null,ServerName);
                var retour=dice+'='+resultat;
                break;

            case '!1d3':
                dice='1d3';
                console.info('1d3 demandé par '+user+' sur '+server);
                resultat = jet.gen(1,3);
                console.info(resultat+' généré');
                db.insert(user,'3',resultat,null,ServerName);
                var retour=dice+'='+resultat;
                break;

            case '!1d4':
                dice='1d4';
                console.info('1d4 demandé par '+user+' sur '+server);
                resultat = jet.gen(1,4);
                console.info(resultat+' généré');
                db.insert(user,'4',resultat,null,ServerName);
                var retour=dice+'='+resultat;
                break;

            case '!2d4':
                dice='2d4';
                console.info('2d4 demandé par '+user+' sur '+server);
                var result1 = jet.gen(1,4);
                var result2 = jet.gen(1,4);
                console.info(result1+' et '+result2+' généré');
                db.insert(user,'4',result1,null,ServerName);
                db.insert(user,'4',result2,null,ServerName);
                var retour=dice+'='+result1+' et '+result2;
                break;

            case '!1d6':
                dice='1d6';
                console.info('1d6 demandé par '+user+' sur '+server);
                resultat = jet.gen(1,6);
                console.info(resultat+' généré');
                db.insert(user,'6',resultat,null,ServerName);
                var retour=dice+'='+resultat;
                break;

            case '!1d8':
                dice='1d8';
                console.info('1d8 demandé par '+user+' sur '+server);
                resultat = jet.gen(1,8);
                console.info(resultat+' généré');
                db.insert(user,'8',resultat,null,ServerName);
                var retour=dice+'='+resultat;
                break;

            case '!1d20':
                dice='1d20';
                console.info('1d20 demandé par '+user+' sur '+server);
                resultat = jet.gen(1,20);
                console.info(resultat+' généré');
                db.insert(user,'20',resultat,null,ServerName);
                var retour=dice+'='+resultat;
                break;

            case '!debug':
                dice='DEBUG';
                var i;
                for (i = 0; i < 10; i++) {
                    resultat = jet.gen(0, 99);
                    //resultat = 100;
                    if (resultat >= 95) {
                      var retour=dice+'='+resultat+'\n'+jet.echecCritique()
                    } else if (resultat && (resultat <= 5 || resultat === 42)) {
                      var retour=dice+'='+resultat+'\n'+jet.reussiteCritique();
                    } else {
                      var retour=dice+'='+resultat;
                    }
                }
                break;

            case '!help':
                var retour="Dicecord usage : !1d100 ; !1d10 ; !1d4 ; !1d6 ; !1d12 ; !1d20 ; !1d8 ; !1d3 ; !1d2\nLes dés 100 sont entre 0 et 99 ; les autres entre 1 et leur valeur";
                break;

            case '!ping':
                console.info('Ping');
                var retour='Pong!';
                break;

            case '!stat':
                var reussite =  db.select(user,'reussite',ServerName);
                var echec = db.select(user,'echec',ServerName);
                var total = db.selectAll(user,ServerName);
                var percentReussite = (100 * reussite) / total ;
                var percentEchec = (100 * echec) / total ;
                percentReussite = percentReussite.toFixed(2);
                percentEchec = percentEchec.toFixed(2);
                console.info('reussite = '+reussite);
                console.info('échec = '+echec);
                console.info('total = '+total);
                console.info('Pourcent réussite critique = '+percentReussite+'%');
                console.info('Pourcent réussite critique = '+percentEchec+'%');
                var retour='\nSalut, tu as fait '+total+' lancés de dés.'+
                    '\n'+'Tu a fait '+reussite+' réussite critiques soit '+percentReussite+'%\n' +
                    'Tu a fait '+echec+' échecs critiques soit '+percentEchec+'%\n' +
                    'Alors tu es chanceux ou pas ?';
                break;

            case '!statAll':
                var topTier= db.statAll(ServerName);
                if (topTier.length == 3) {
                    var retour='\nTu veux des stats ?' +
                        '\n' + "Alors accroche toi bien, c'est partit pour le top 3 des joueurs les plus actifs du serveur " + server + ' :' +
                        '\n' + '1 - ' + topTier[0].USER + ' avec ' + topTier[0].COUNT + ' lancés !!' +
                        '\n' + '2 - ' + topTier[1].USER + ' avec ' + topTier[1].COUNT + ' lancés !!' +
                        '\n' + '3 - ' + topTier[2].USER + ' avec ' + topTier[2].COUNT + ' lancés !!' +
                        '\n' + 'Tu as intérêt a faire rouler tes dés coco si tu veux être dans mon classement !!';
                } else {
                    var retour="Il n'y a pas eu suffisament de lancés pour sortir un top 3";
                    console.info('Alerte pas assez de joueur');
                }
                break;
        }return retour;
    }
}
module.exports = message;