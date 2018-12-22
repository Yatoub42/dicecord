var moment = require('moment'); //npm install moment --save
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose(); //npm install sqlite3 --save

    let db = new sqlite3.Database('./data/dicecord.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.info('Connecté à la base Dicecord');
    });

const bdd = {
    create: function(){
        const bddFile = './data/dicecord.db';
        fs.exists(bddFile, function (exists) {
            if(!exists){
                fs.writeFile(bddFile);
            }
        });
        const sql = `
        CREATE TABLE IF NOT EXISTS jet (
        USER      TEXT,
        VALEUR_DE NUMERIC,
        RESULTAT  NUMERIC,
        CRITIQUE  TEXT,
        DATE      DATETIME
        )`;
        db.run(sql,function(err) {
            if (err) {
                return console.error(err.message);
            }
            });
    },
    select: function() {
        let sql = `SELECT count(*) as value
        FROM jet
        WHERE CRITIQUE = ?`;
        const critique = 'reussite';
        /*db.all(select, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                return row;
            });
        });*/
        db.get(sql, [critique], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            return row.value
                //? console.info(row.value)
                //: console.info(`No playlist found with the id ${playlistId}`);

        });
    },
    insert: function(user,valeur_de,resultat,critique){
        let date = moment().format('YYYY-MM-DD HH:mm:ss');
        db.run("INSERT INTO jet VALUES(?,?,?,?,?)", [user,valeur_de,resultat,critique,date], function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.info(`Jet inséré en bdd`);
        });
    }
};

module.exports = bdd;