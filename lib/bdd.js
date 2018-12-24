var moment = require('moment'); //npm install moment --save
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose(); //npm install sqlite3 --save

function connect(){
    let db = new sqlite3.Database('./data/dicecord.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.info('Connecté à la base Dicecord');
        return db;
    });
}

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
        );`;
        //const db = connect();
        db.run(sql,function(err) {
            if (err) {
                return console.error(err.message);
            }
            });
        //db.close();
    },
    select: function(user,choix) {
        let sql = `SELECT count(CRITIQUE) as value
        FROM jet
        WHERE USER = ?
        AND CRITIQUE = ?;`;
        db.all(sql, [user,choix], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                console.info(row.value);
                return row.value;
            });
        });

        /*db.get(sql, [user, choix], function(err, row) {
            if (err) {
                console.error(err.message);
            } else {
                console.info('retour = '+row.value);
            }
        });*/

        //db.close();
    },
    selectAll: function(user){
        let sql = `SELECT count(*) as value
        FROM jet
        WHERE USER = ?;`;
        //const db = connect();
        db.get(sql, [user], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            return row
            //? console.info(row.value)
            //: console.info(`No playlist found with the id ${playlistId}`);

        });
        //db.close();
    },
    insert: function(user,valeur_de,resultat,critique){
        let date = moment().format('YYYY-MM-DD HH:mm:ss');
        //const db = connect();
        db.run("INSERT INTO jet VALUES(?,?,?,?,?);", [user,valeur_de,resultat,critique,date], function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.info(`Jet inséré en bdd`);
        });
        //db.close();
    }
};

module.exports = bdd;