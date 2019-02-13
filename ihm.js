var service = require('./service');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = function () {

    menu();
}

var menu = function () {

    rl.question('*************************\n1. Rafraichir les données\n2. Lister les sessions\n3. Lister les présentateurs\n4. Rechercher une session\n99. Quitter\n', function (saisie) {

        switch (saisie) {

            case ('1'):
                service.init(function (nb) {
                    console.log(nb, 'sessions trouvées.');
                    menu();
                });
                break;

            case ('2'):
                service.listerSessions(function (tab) {
                    tab.forEach(element => {
                        str = element.name + ' (' + element.speakers + ')';
                        console.log(str);
                    });
                    menu();
                });
                break;

            case ('3'):
                service.listerPresentateurs(function (nb) {
                    nb.forEach(element => {
                        console.log(element.innerHTML);
                    })
                    menu();
                })
                break;

            case ('4'):
                detailSession();
                menu();
                break;
            case ('99'):

                rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
                console.log('A bientôt');
                break;
        }
    });
}

var detailSession = function () {
    rl.question('Quel mot recherchez-vous ? : \n', function (saisie) {
        service.listerSessions(function (tab) {
            var tabRet = [];
            if (tab.some(function (val) {
                return val.name.toUpperCase().includes(saisie.toUpperCase());
            })) {

                tabRet = tab.filter(function (val) {
                    return (val.name.toUpperCase().includes(saisie.toUpperCase()));
                })
                menuSession(tabRet);
            }
            else {
                rl.question('(aucune session)\n98. Refaire une nouvelle recherche\n99. Retour au menu principal\n', function (saisie) {
                    switch (saisie) {
                        case ('98'):
                            detailSession();
                            break;
                        case ('99'):
                            menu();
                            break;
                    }
                });
            }
        });
    });
}

var menuSession = function (tab) {

    var i = 1;
    tab.forEach(element => {
        console.log(i + '. ' + element.name);
        i++;
    });
    rl.question('98. Refaire une nouvelle recherche\n99. Retour au menu principal\n', function (saisie) {
        if (saisie > 0 && saisie < tab.length) {
            console.log('*Titre* : ' + tab[saisie].name + '\n*Présentateur* : ' + tab[saisie].speakers + '\n\n*Description*\n\n' + tab[saisie].description + '\n');
            menuSession(tab);
        }
        else if (saisie == 98) {
            detailSession();
        }
        else if (saisie == 99) {
            menu();
        }
    });
}