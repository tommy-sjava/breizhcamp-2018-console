import * as service from './service'
import readline from 'readline'
const lg = console.log;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const start = () => {
    menu();
};

function menu() {



    rl.question('*************************\n1. Rafraichir les données\n2. Lister les sessions\n3. Lister les présentateurs\n4. Rechercher une session\n99. Quitter\n\n', function (saisie) {

        //rl.close();
        return choice(saisie);
    });
};

function choice(saisie: any) {
    switch (saisie) {
        case '1':
            service.init().then(() => {
                lg('... Données mises à jour');
            }).catch(err => {
                console.log('Erreur recupération');
            });
            /*service.init(() => {
                lg('... Données mises à jour');
            });*/
            menu();
            break;
        case '2':
            service.listerSessions().then((element: any) => {
                element.forEach((element: any) => { lg(`${element.name} (${element.speakers} )`) });
                menu();
            }, (error: any) => {
                lg(`recuperation des données impossible ${error}`);
                menu();
            });

            /*service.listerSessions(val => {
                console.log(`${ val.name }(${ val.speakers })`)
            });*/

            break;
        case '3':
            service.listePres().then(val => {
                val.forEach(element => lg(element));
                menu();
            }, error => { lg(error) });

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

function detail(res: any) {
    // var rl = readline.createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // });

    if (res != null) {
        let i = 1;
        res.forEach((element: any) => {
            console.log(i + ' ' + element.name);
            i++;
        });
    } else { console.log(`(aucune session)`) }
    console.log('98. Refaire une nouvelle recherche\n99. Retour au menu principal\n')

    rl.question('Souhaitez vous un détail ?\n', (saisie: any) => {
        if (saisie > 0 && saisie <= res.length) {
            console.log(`* Titre * : ${res[saisie - 1].name} **\n * Présentateurs * : ${res[saisie - 1].speakers}\n\n * Description *\n\n${res[saisie - 1].description}\n\n\n\n`);
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
