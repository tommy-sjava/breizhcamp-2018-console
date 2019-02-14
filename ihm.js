const service = require('./service');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = () => {

    menu();
}

const menu = () => {

    rl.question('*************************\n1. Rafraichir les données\n2. Lister les sessions\n3. Lister les présentateurs\n4. Rechercher une session\n99. Quitter\n', function (saisie) {

        switch (saisie) {

            case ('1'):
                service.init()
                    .then(nb => {
                        console.log(`${nb} sessions trouvées.`);
                        menu();
                    }, error => {
                        console.log(error);
                    }
                    );
                break;

            case ('2'):
                service.listerSessions()
                    .then(tab => {
                        tab.forEach(element => {
                            str = `${element.name} (${element.speakers})`;
                            console.log(str);
                        })
                        menu();
                    }, error => {
                        console.log(error);
                    }
                    );
                break;

            case ('3'):
                service.listerPresentateurs()
                    .then(nb => {
                        nb.forEach(el => console.log(el))
                        menu();
                    }, error => {
                        console.log(error);
                    }
                    );
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

const detailSession = () => {
    rl.question('Quel mot recherchez-vous ? : \n', saisie => {
        service.listerSessions()
            .then(tab => {
                let tabRet = [];
                if (tab.some(val => {
                    return val.name.toUpperCase().includes(saisie.toUpperCase());
                })) {

                    tabRet = tab.filter(val => {
                        return (val.name.toUpperCase().includes(saisie.toUpperCase()));
                    })
                    menuSession(tabRet);
                }
                else {
                    rl.question('(aucune session)\n98. Refaire une nouvelle recherche\n99. Retour au menu principal\n', saisie => {
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
            })
    })
}

const menuSession = tab => {

    let i = 1;
    tab.forEach(element => {
        console.log(i + '. ' + element.name);
        i++;
    });
    rl.question('98. Refaire une nouvelle recherche\n99. Retour au menu principal\n', saisie => {
        if (saisie > 0 && saisie <= tab.length) {
            console.log(`* Titre * : ${tab[saisie - 1].name} \n* Présentateur * : ${tab[saisie - 1].speakers} \n\n* Description *\n\n${tab[saisie - 1].description} \n`);
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