var service = require('./service');
var readline = require('readline');
var lg = console.log;

exports.start = function () {
    menu();
};

function menu() {

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('*************************\n1. Rafraichir les données\n2. Lister les sessions\n3. Lister les présentateurs\n4. Rechercher une session\n99. Quitter\n\n', function (saisie) {

        rl.close();
        return choice(saisie);
    });
};

function choice(saisie) {
    switch (saisie) {
        case '1':
            service.init(function () {
                lg('... Données mises à jour');
            });
            menu();
            break;
        case '2':
            service.listerSessions(function (val) {
                console.log(val.name, " (", val.speakers, ")")
            });
            menu();
            break;
        case '3':
            service.listePres(function (val) {
                console.log(val);
            });
            menu();
            break;
        case '4':
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('Quel mot recherchez vous ? :', function (saisie) {


                rl.close();
                var res = service.research(saisie)
                var i = 1;
                res.forEach(element => {
                    console.log(i + ' ' + element.name);
                    i++;
                });

            });



            break;
        case '99':
            lg('Kénavo');
            break;
        default:
            lg('Veuillez saisir 1, 2 ou 99');
            menu();
            break;
    };
};