const jet = require("./critique.js");
const db = require("./bdd.js");
const Include = require("../include/resource.priv.json");

const message = {
    gestionDe: function gestionDe(contenu,user,server,ServerName) {
        console.info("message = "+contenu);
        let arrayCommand = contenu.split("d");
        var number = arrayCommand[0];
        var value = arrayCommand[1];
        var resultArray = [];
        var dice = number + "d" + value;
        var retour;
        console.info(dice + " demandé par " + user + " sur " + server);
        if (value == 100 && number > 1) {
            retour="C'est mieux de demander les d100 un par un, je ne suis qu'un petit bot";
            console.info("Alerte xd100");
        } else if (number < 1) {
            retour=number + " lancés ? Tu es sérieux ?";
            console.info("Alerte 0d");
        } else if (number > 10) {
            retour="C'est pas tout a fait normal de demander plus de 10 jet d'un coup, tu veut que je meurt c'est ça ?";
            console.info("Alerte plus de 10 lancés");
        } else if (value > 100 || value < 1) {
            retour="Je n'ai jamait vu de d" + value + " et pourtant j'en ai vu passer";
            console.info("Alerte d absurde");
        } else if (dice == "1d100") {
            var resultat = jet.gen(1, value);
            console.info(resultat + " généré");
            //resultat = 100
            if (resultat <= Include.borneReussite) {
                console.info("réussite critique");
                db.insert(user, "100", resultat, "reussite", ServerName);
                retour=dice + "=" + resultat + "\n" + jet.reussiteCritique();
            } else if (resultat >= Include.borneEchec) {
                console.info("échec critique");
                db.insert(user, "100", resultat, "echec", ServerName);
                retour=dice + "=" + resultat + "\n" + jet.echecCritique();
            } else if (resultat && (resultat === Include.context1 || resultat === Include.context2)) {
                console.info("critique mixte");
                db.insert(user, "100", resultat, "mixte", ServerName);
                retour=dice + "=" + resultat + "\n" + jet.mixteCritique();
            } else {
                db.insert(user, "100", resultat, null, ServerName);
                retour=dice + "=" + resultat;
            }
        } else {
            for (let index = 0; index < number; index++) {
                resultArray[index] = jet.gen(1, value);
            }
            resultArray.forEach(result => {
                console.info(result + " généré");
                db.insert(user, value, result, null, ServerName);
            });
            retour=dice + " = " + resultArray.toString();
        }
        return retour;
    },
    gestionText: function gestionText(messageText,user,server,ServerName) {
        var retour;
        console.info("message = "+messageText);
        switch (messageText) {
            case "help":
                retour="Usage : !xdy (ex: !1d100 ou !4d6) \nLes dés sont entre 1 et leur valeur";
                break;
            case "ping":
                console.info("Ping");
                retour="Pong!";
                break;
    
            case "stat":
                var reussite =  db.select(user,"reussite",ServerName);
                var echec = db.select(user,"echec",ServerName);
                var total = db.selectAll(user,ServerName);
                var percentReussite = (100 * reussite) / total ;
                var percentEchec = (100 * echec) / total ;
                percentReussite = percentReussite.toFixed(2);
                percentEchec = percentEchec.toFixed(2);
                console.info("reussite = "+reussite);
                console.info("échec = "+echec);
                console.info("total = "+total);
                console.info("Pourcent réussite critique = "+percentReussite+"%");
                console.info("Pourcent réussite critique = "+percentEchec+"%");
                retour="\nSalut, tu as fait "+total+" lancés de dés."+
                    "\n"+"Tu a fait "+reussite+" réussite critiques soit "+percentReussite+"%\n" +
                    "Tu a fait "+echec+" échecs critiques soit "+percentEchec+"%\n" +
                    "Alors tu es chanceux ou pas ?";
                break;
    
            case "statAll":
                var topTier= db.statAll(ServerName);
                if (topTier.length == 3) {
                    retour="\nTu veux des stats ?" +
                        "\n" + "Alors accroche toi bien, c'est partit pour le top 3 des joueurs les plus actifs du serveur " + server + " :" +
                        "\n" + "1 - " + topTier[0].USER + " avec " + topTier[0].COUNT + " lancés !!" +
                        "\n" + "2 - " + topTier[1].USER + " avec " + topTier[1].COUNT + " lancés !!" +
                        "\n" + "3 - " + topTier[2].USER + " avec " + topTier[2].COUNT + " lancés !!" +
                        "\n" + "Tu as intérêt a faire rouler tes dés coco si tu veux être dans mon classement !!";
                } else {
                    retour="Il n'y a pas eu suffisament de lancés pour sortir un top 3";
                    console.info("Alerte pas assez de joueur");
                }
                break;
            }return retour;
    }
}
module.exports = message;
