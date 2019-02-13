var service = require('./service');
var readline = require('readline');
var request = require('request');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = function () {
    //service.init(function (nb) {
    //  console.log('[init]', nb, 'sessions trouvées.')
    //});
    menu();
};
var menu = function () {
    rl.question("1. Rafraichir les données\n2. Lister les sessions\n99. Quitter\n", function (saisie) {
        switch (saisie) {
            case ('1'):
                // service.init(callback);
                service.init(function (nb) {
                    console.log('[init]', nb, 'sessions trouvées.\n')
                });
                console.log("... Données mises à jour\n");
                menu();
                break;
            case ('2'): console.log("blabla2\n")
                service.listerSession(function (talks) {
                    talks.forEach(function (uneSession) {

                        var titre = '';
                        if (uneSession.name) {
                            titre += uneSession.name.toUpperCase()
                        } else {
                            console.log('Pas de titre')
                        }
                        var speakers = '';
                        if (uneSession.speakers) {
                            speakers += uneSession.speakers.toUpperCase()
                        } else {
                            console.log('Pas de Speakers associé à :' + uneSession.name)
                        }

                        console.log(titre + '  ' + '(' + speakers + ')')

                    })
                    menu();
                });
                break;
            case ('99'): console.log("Fermeture...\n")
                rl.close();
                break;
        }
    })
}



