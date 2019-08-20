const jet = require("./critique.js");
const db = require("./bdd.js");
const Include = require("../include/resource.priv.json");
const regDeComplexe = /([+]+[\d])/g;

function splitDe(message) {
    var array1 = message.split("d");
    var array2 = array1[1].split("+");
    var argDe = [array1[0],array2[0],array2[1]];
    var x = argDe[0];
    var y = argDe[1];
    var z = argDe[2];
    console.info("x= "+x);
    console.info("y= "+y);
    console.info("z= "+z);
    return argDe;
}

function statUser(user,ServerName){
    var reussite =  db.select(user,"reussite",ServerName);
    var echec = db.select(user,"echec",ServerName);
    var total = db.selectAll(user,ServerName);
    var percentReussite = (100 * reussite) / total;
    var percentEchec = (100 * echec) / total;
    console.info("reussite = "+reussite);
    console.info("échec = "+echec);
    console.info("total = "+total);
    console.info("Pourcent réussite critique = "+percentReussite.toFixed(2)+"%");
    console.info("Pourcent réussite critique = "+percentEchec.toFixed(2)+"%");
    return "\nSalut, tu as fait "+total+" lancés de dés."+
        "\n"+"Tu a fait "+reussite+" réussite critiques soit "+percentReussite+"%\n" +
        "Tu a fait "+echec+" échecs critiques soit "+percentEchec+"%\n" +
        "Alors tu es chanceux ou pas ?";
}

function checkDe(x,y,z,server,user) {
    var dice = x + "d" + y;
    console.info(dice + " demandé par " + user + " sur " + server);
    if (parseInt(y,10) === 100 && z !== undefined) {
        console.info("Alerte d100+z");
        return "Alors toi tu t'ajoutes des bonus à tes d100 ? C'est pas très roleplay tout ça !";
    } else if (parseInt(x,10) < 1) {
        console.info("Alerte 0d");
        return x + " lancés ? Tu es sérieux ?";
    } else if (parseInt(x,10) > 10) {
        console.info("Alerte plus de 10 lancés");
        return "C'est pas tout a fait normal de demander plus de 10 jet d'un coup, tu veut que je meurt c'est ça ?";
    } else if (parseInt(y,10) > 100 || parseInt(y,10) < 1) {
        console.info("Alerte d absurde");
        return "Je n'ai jamait vu de d" + y + " et pourtant j'en ai vu passer";
    } else {return "OK";}
}

function gestionDe100(value,user,ServerName) {
    var resultat = jet.gen(1, value);
    console.info(resultat + " généré");
    if (resultat <= Include.borneReussite) {
        console.info("réussite critique");
        db.insert(user, "100", resultat, "reussite", ServerName);
        return resultat + "\n" + jet.reussiteCritique();
    } else if (resultat >= Include.borneEchec) {
        console.info("échec critique");
        db.insert(user, "100", resultat, "echec", ServerName);
        return resultat + "\n" + jet.echecCritique();
    } else if (resultat && (resultat === Include.context1 || resultat === Include.context2)) {
        console.info("critique mixte");
        db.insert(user, "100", resultat, "mixte", ServerName);
        return resultat + "\n" + jet.mixteCritique();
    } else {
        db.insert(user, "100", resultat, null, ServerName);
        return resultat;
    }
}

function gestionDeComplexe(message,user,server,ServerName) {
    var resultArray = [];
    var resultNonSum = [];
    var dice;
    var arg = splitDe(message);
    var check = checkDe(arg[0],arg[1],arg[2],server,user);
    dice = arg[0] + "d" + arg[1] + "+" + arg[2];
    if (check === "OK") {
        for (var i = 0; i < parseInt(arg[0],10); i++) {
            var gen = jet.gen(1, parseInt(arg[1],10));
            var sum = parseInt(gen,10) + parseInt(arg[2],10);
            resultNonSum[i] = gen+"+"+arg[2];
            resultArray[i] = sum;
        }
        resultArray.forEach((result) => {
            console.info(result + " généré");
            db.insert(user, arg[1], result, null, ServerName);
        });
        return dice + " = " + resultNonSum.toString() + " = " + resultArray.toString();
    }else {return check;}
}

function topTier(server,ServerName) {
    var topTier= db.statAll(ServerName);
    if (topTier.length === 3) {
        return "\nTu veux des stats ?" +
                "\n" + "Alors accroche toi bien, c'est partit pour le top 3 des joueurs les plus actifs du serveur " + server + " :" +
                "\n" + "1 - " + topTier[0].USER + " avec " + topTier[0].COUNT + " lancés !!" +
                "\n" + "2 - " + topTier[1].USER + " avec " + topTier[1].COUNT + " lancés !!" +
                "\n" + "3 - " + topTier[2].USER + " avec " + topTier[2].COUNT + " lancés !!" +
                "\n" + "Tu as intérêt a faire rouler tes dés coco si tu veux être dans mon classement !!";
        } else {
            console.info("Alerte pas assez de joueur");
            return "Il n'y a pas eu suffisament de lancés pour sortir un top 3";
        }
}

const message = {
    gestionDe(contenu,user,server,ServerName) {
        console.info("message = "+contenu);
        if (regDeComplexe.test(contenu) === true) {
            return gestionDeComplexe(contenu,user,server,ServerName);
        }else {
            var argDe = splitDe(contenu);
            var resultArray = [];
            var dice = argDe[0] + "d" + argDe[1];
            var check = checkDe(argDe[0],argDe[1],argDe[2],server,user);
            if (check === "OK") {
                if (parseInt(argDe[1],10) && (parseInt(argDe[0],10) >= 1 || (parseInt(argDe[1],10) === 100))) {
                    console.info("pass")
                    for (var index = 0; index < parseInt(argDe[0],10); index++) {
                        resultArray[index] = gestionDe100(argDe[1],user,ServerName) + '\n';
                    }
                    return dice + " = " + resultArray.toString();
                } else {
                    for (var index = 0; index < parseInt(argDe[0],10); index++) {
                        resultArray[index] = jet.gen(1, parseInt(argDe[1],10));
                    }
                    resultArray.forEach((result) => {
                        console.info(result + " généré");
                        db.insert(user, argDe[1], result, null, ServerName);
                    });
                    return dice + " = " + resultArray.toString();
                }
            }else {return check;}
        }
    },
    gestionText(messageText,user,server,ServerName) {
        var retour;
        console.info("message = "+messageText);
        switch (messageText) {
            case "help":
                retour="Usage : !xdy+z (ex: !1d100 ou !4d6 ou !1d10+3) \nLes dés sont entre 1 et leur valeur";
                break;    
            case "stat":
                retour= statUser(user,ServerName);
                break;
            case "statAll":
                retour= topTier(server,ServerName);
                break;
            default:
                retour="Tu n'a pas saisi de commande valide, je ne peux rien faire pour toi";
            }return retour;
    }
};
module.exports = message;
