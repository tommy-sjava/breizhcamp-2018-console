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
            researchSession();
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

function researchSession() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Quel mot recherchez vous ? :', function (saisie) {



        var res = service.research(saisie)
        if (res != null) {
            var i = 1;
            res.forEach(element => {
                console.log(i + ' ' + element.name);
                i++;
            });
        } else { console.log("(aucune session") }
        console.log('98. Refaire une nouvelle recherche\n99. Retour au menu principal\n')
        detail();
        rl.close();
    });


}

function detail() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Souhaitez vous un détail ?\n', function (saisie) {
        if (saisie > 0 && saisie <= res.length) {
            console.log("*Titre* : ", res[saisie].name, "**\n*Présentateurs* : ", res[saisie].speakers, "\n\n*Description*\n\n", res[saisie].description);
        } else if (saisie == 98) {
            researchSession();
        } else if (saisie == 99) {
            rl.close();
            menu();
        } else {
            console.log("Desciption inexistante\n");
            detail();
        }
        console.log('test');
        rl.close();
    })


}