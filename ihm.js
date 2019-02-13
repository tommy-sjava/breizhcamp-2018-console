var readline = require('readline');
var service = require('./service');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


/* FONCTION LISTER SESSIONS */

exports.start = function () {
    menu ();
}; 

/* FONCTION MENU GENERAL */

var menu = function () {
rl.question('1. Rafraichir les données\n2. Lister les sessions\n99. Quitter', function(saisie) {
    switch(saisie) {
        case('1'):

        break;

        case('2'):
        service.init(function(nb) {
            console.log('[init]', nb, 'sessions trouvées.')
            }); 
        break;

        case('99'):

        break;
        }
    });
};

rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible



    






