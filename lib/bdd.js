const sqlite3 = require('sqlite3').verbose();

    let db = new sqlite3.Database('./data/dicecord.db', (err) => {
        if (err) {
            console.error(err.message);
            logger.error(err.message);
        }
        console.log('Connecté à la base Dicecord');
    });

const bdd = {
    select: function() {
        let select = `SELECT * FROM jet`;
        db.all(select, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                return row;
            });
        });
    },
    insert: function(user,valeur_de,resultat){
        let date= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        db.run("INSERT INTO jet VALUES(?,?,?,?)", [user,valeur_de,resultat,date], function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Jet inséré en bdd`);
        });
    }
};

module.exports = bdd;