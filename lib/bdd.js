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
        let data = stmt.get(user,choix);
        db.close();
        return(data.value);
    },
    selectAll: function(user){
        let db = new Database(dbFile);
        let stmt = db.prepare('SELECT count(*) as value FROM jet WHERE VALEUR_DE = 100 AND USER = ?');
        let data = stmt.get(user);
        db.close();
        return (data.value);
    },
    insert: function(user,valeur_de,resultat,critique){
        let date = moment().format('YYYY-MM-DD HH:mm:ss');
        let db = new Database(dbFile);
        let stmt = db.prepare('INSERT INTO jet VALUES(?,?,?,?,?)');
        stmt.run(user,valeur_de,resultat,critique,date);
        db.close();
    },
    creaTable: function(){
        fs.exists(dbFile, function (exists) {
            if(!exists){
                fs.writeFile(dbFile);
            }
        });
        let db = new Database(dbFile);
        let creaTable = db.prepare('CREATE TABLE IF NOT EXISTS stat AS SELECT DISTINCT USER, count(*) as COUNT FROM jet GROUP BY USER ORDER BY COUNT DESC');
        creaTable.run();
        db.close();
    },
    dropTable: function(){
        let db = new Database(dbFile);
        let dropTable = db.prepare('DROP TABLE IF EXISTS stat');
        dropTable.run();
        db.close();
    },
    statAll: function(){
        let db = new Database(dbFile);
        let selectLim = db.prepare('SELECT * FROM stat LIMIT 3');
        let data = selectLim.all();
        db.close();
        console.info(data.length);
        console.info(data[0]);
        console.info(data[1]);
        console.info(data[2]);
        //let dataParsed = JSON.parse(data);
        //console.info('Parsed');
        //console.info(dataParsed);
        /*data.forEach((row) => {
            console.info(row);
          });*/
        //return (data);
    }
};
//select distinct user, count(*) as count from jet group by user order by count desc;

module.exports = bdd;
