var service = require('./service');
var readline = require('readline');
var lg = console.log;

exports.start = function () {
    
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    var quest = rl.question('*************************\n1. Rafraichir les données\n2. Lister les sessions\n99. Quitter\n', function (saisie) {
        switch (`${saisie}`) {
            case '1':
                service.init(function (nb) {
                    lg('[init]', nb, 'sessions trouvées.');
                });
                quest;
                break;
            case '2':
                lg('liste des sessions : ');
                quest;
                break;
            case '99':
                lg('Kénavo');
                break;
            default:
                lg('Veuillez saisir 1, 2 ou 99');
                quest;
                break;
        }
        rl.close();
    });

};

// exports.start = function () {
//     service.init(function (nb) {
//         console.log('[init]', nb, 'sessions trouvées.')
//     });
// };