const moment = require("moment");
const fs = require("fs");
const Database = require("better-sqlite3");
const dbFile = "./db/dicecord.db";


const bdd = {
    createdb() {
        fs.exists(dbFile, function (exists) {
            if (!exists) {
                fs.writeFile(dbFile);
            }
        });
    },
    createTable(ServerName) {
        let db = new Database(dbFile);
        let stmt = db.prepare("CREATE TABLE IF NOT EXISTS jet_" + ServerName + " (USER TEXT,VALEUR_DE NUMERIC,RESULTAT NUMERIC,CRITIQUE TEXT, DATE DATETIME)");
        stmt.run();
        db.close();
    },
    select(user, choix, ServerName) {
        let db = new Database(dbFile);
        let stmt = db.prepare("SELECT count(CRITIQUE) as value FROM jet_" + ServerName + " WHERE USER = ? AND CRITIQUE = ?");
        let data = stmt.get(user, choix);
        db.close();
        return (data.value);
    },
    selectAll(user, ServerName) {
        let db = new Database(dbFile);
        let stmt = db.prepare("SELECT count(*) as value FROM jet_" + ServerName + " WHERE VALEUR_DE = 100 AND USER = ?");
        let data = stmt.get(user);
        db.close();
        return (data.value);
    },
    insert(user, valeurDe, resultat, critique, ServerName) {
        let date = moment().format("YYYY-MM-DD HH:mm:ss");
        let db = new Database(dbFile);
        let stmt = db.prepare("INSERT INTO jet_" + ServerName + " VALUES(?,?,?,?,?)");
        stmt.run(user, valeurDe, resultat, critique, date);
        db.close();
    },
    statAll(ServerName) {
        let db = new Database(dbFile);
        let creaTable = db.prepare("CREATE TABLE IF NOT EXISTS stat_" + ServerName + " AS SELECT DISTINCT USER, count(*) as COUNT FROM jet_" + ServerName + " GROUP BY USER ORDER BY COUNT DESC");
        creaTable.run();
        let selectLim = db.prepare("SELECT * FROM stat_" + ServerName + " LIMIT 3");
        let data = selectLim.all();
        let dropTable = db.prepare("DROP TABLE IF EXISTS stat_" + ServerName);
        dropTable.run();
        db.close();
        return (data);
    }
};

module.exports = bdd;
