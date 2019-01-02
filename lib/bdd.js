const moment = require('moment'); //npm install moment --save
const fs = require('fs');
const Database = require('better-sqlite3'); //npm install better-sqlite3 --save
const dbFile = './db/dicecord.db';


const bdd = {
    create: function(){
        fs.exists(dbFile, function (exists) {
            if(!exists){
                fs.writeFile(dbFile);
            }
        });
        let db = new Database(dbFile);
        let stmt = db.prepare('CREATE TABLE IF NOT EXISTS jet (USER TEXT,VALEUR_DE NUMERIC,RESULTAT  NUMERIC,CRITIQUE  TEXT, DATE      DATETIME)');
        stmt.run();
        db.close();
    },
    select: function(user,choix) {
        let db = new Database(dbFile);
        let stmt = db.prepare('SELECT count(CRITIQUE) as value FROM jet WHERE USER = ? AND CRITIQUE = ?');
        let select = stmt.get(user,choix);
        db.close();
        return(select.value);
    },
    selectAll: function(user){
        let db = new Database(dbFile);
        let sql = db.prepare('SELECT count(*) as value FROM jet WHERE USER = ?');
        let selectAll = sql.get(user);
        db.close();
        return (selectAll.value);
    },
    insert: function(user,valeur_de,resultat,critique){
        let date = moment.format('YYYY-MM-DD HH:mm:ss');
        //const db = connect();
        let db = new Database(dbFile);
        const stmt = db.prepare('INSERT INTO jet VALUES(?,?,?,?,?)');
        stmt.run(user,valeur_de,resultat,critique,date);
        db.close();
    }
};

module.exports = bdd;