const fs = require('fs');
const Critpos = fs.readFileSync("./include/critpos.txt", "UTF-8");
const Critneg= fs.readFileSync("./include/critneg.txt", "UTF-8");
const Critmixte= fs.readFileSync("./include/critmixte.txt", "UTF-8");
const Chance = require('chance');
// Instanciations
new Chance();

const critique = {
    gen: function(min,max) {
        const instance = new Chance();
        const rng = instance.timestamp();
        const chance = new Chance(rng);
        //var result = chance.integer({min: min, max: max});
        return chance.integer({min: min, max: max})
    },
    // Fonction de génération de réponse personnalisé en cas de réussite critique
    reussiteCritique: function(){
        const phrase = Critpos.split('\n');
        //var aleat = aleatoire.gen(0,(phrase.length - 2));
        //console.log('nb possibilité : '+(phrase.length - 2));
        return phrase[critique.gen(0,(phrase.length - 2))]
    },
    // Fonction de génération de réponse personnalisé en cas d'échec critique
    echecCritique: function(){
        const phrase = Critneg.split('\n');
        //var aleat = aleatoire.gen(0,(phrase.length - 2));
        //console.log('nb possibilité : '+(phrase.length - 2));
        return phrase[critique.gen(0,(phrase.length - 2))]
    },
    // Fonction de génération de réponse personnalisé en cas de critique mixte
    mixteCritique: function(){
        const phrase = Critmixte.split('\n');
        //var aleat = aleatoire.gen(0,(phrase.length - 2));
        //console.log('nb possibilité : '+(phrase.length - 2));
        return phrase[critique.gen(0,(phrase.length - 2))]
    }
};

module.exports = critique;