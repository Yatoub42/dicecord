const fs = require("fs");
const Critpos = fs.readFileSync("./include/critpos.txt", "UTF-8");
const Critneg = fs.readFileSync("./include/critneg.txt", "UTF-8");
const Critmixte = fs.readFileSync("./include/critmixte.txt", "UTF-8");
const Chance = require("chance");

const critique = {
    gen(min, max) {
        const instance = new Chance();
        const rng = instance.timestamp();
        const instance2 = new Chance(rng);
        const seed = instance2.timestamp();
        const chance = new Chance(seed);
        return chance.integer({
            min,
            max
        });
    },
    reussiteCritique() {
        const phrase = Critpos.split("\n");
        return phrase[critique.gen(0, (phrase.length - 1))];
    },
    echecCritique() {
        const phrase = Critneg.split("\n");
        return phrase[critique.gen(0, (phrase.length - 1))];
    },
    mixteCritique() {
        const phrase = Critmixte.split("\n");
        return phrase[critique.gen(0, (phrase.length - 1))];
    }
};

module.exports = critique;
