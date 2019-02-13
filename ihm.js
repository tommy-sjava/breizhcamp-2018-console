var service = require('./service');
var readline = require('readline');
var request = require('request');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = function () {
    service.init(function (nb) {
        console.log('[init]', nb, 'sessions trouvées.')
    });
    menu();
};
var menu = function () {
    rl.question("1. Rafraichir les données\n2. Lister les sessions\n99. Quitter\n", function (saisie) {
        switch (saisie) {
            case ('1'): console.log("blabla1\n")
               // service.init(callback);
                menu();
                break;
            case ('2'): console.log("blabla2\n")
                service.init(function (nb) {
                    console.log('[init]', nb, 'sessions trouvées.')
                });
                menu();
                break;
            case ('99'): console.log("blabla3\n")
                rl.close();
                break;
        }
    })
}



