const service = require('./service');
const readline = require('readline');
const lg = console.log;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = () => {
    menu();
};

function menu() {



    rl.question('*************************\n1. Rafraichir les données\n2. Lister les sessions\n3. Lister les présentateurs\n4. Rechercher une session\n99. Quitter\n\n', function (saisie) {

        //rl.close();
        return choice(saisie);
    });
};

function choice(saisie) {
    switch (saisie) {
        case '1':
            service.init(() => {
                lg('... Données mises à jour');
            });
            menu();
            break;
        case '2':
            service.listerSessions(val => {
                console.log(`${val.name} (${val.speakers} )`)
            });
            menu();
            break;
        case '3':
            service.listePres(val => {
                console.log(val);
            });
            menu();
            break;
        case '4':
            researchSession();
            break;
        case '99':
            lg('Kénavo');
            rl.close();
            break;
        default:
            lg('Veuillez saisir 1, 2 ou 99');
            menu();
            break;
    };
};

function researchSession() {
    // var rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });
    rl.question('Quel mot recherchez vous ? :', saisie => {



        let res = service.research(saisie)

        detail(res);
        //rl.close();
    });


}

function detail(res) {
    // var rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });

    if (res != null) {
        let i = 1;
        res.forEach(element => {
            console.log(i + ' ' + element.name);
            i++;
        });
    } else { console.log(`(aucune session)`) }
    console.log('98. Refaire une nouvelle recherche\n99. Retour au menu principal\n')

    rl.question('Souhaitez vous un détail ?\n', saisie => {
        if (saisie > 0 && saisie <= res.length) {
            console.log(`*Titre* : ${res[saisie - 1].name}**\n*Présentateurs* : ${res[saisie - 1].speakers}\n\n*Description*\n\n${res[saisie - 1].description}\n\n\n\n`);
            detail(res);
        } else if (saisie == 98) {
            researchSession();
        } else if (saisie == 99) {
            menu();
        } else {
            console.log('Desciption inexistante\n');
            detail(res);
        }
        //console.log('test');

    })


}
