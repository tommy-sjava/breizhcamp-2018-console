let service = require('./service');
let readline = require('readline');


let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
exports.start = () => {
    // service.init(function(nb) {
    //     console.log('[init]', nb, 'sessions trouvées.')
    // });


    console.log(`*************************

    1. Rafraichir les données
    2. Lister les sessions"
    3. Lister les présentateurs"
    99. Quitter`);

    rl.question('Que voulez vous faire ? ', saisie => {
        if (saisie == 1) {
            service.init(info => {
                console.log(`${info} ... Données mises à jour`);
            })

        }
        else if (saisie == 2) {
            service.listerSessions(sessions => {
                sessions.forEach(unSession => {
                    console.log(`${unSession.name} (${unSession.speakers})`);
                })
            })
        }
        else if (saisie == 3) {
            service.listerPresentateur(pres => {
                pres.forEach(unPres => {
                    console.log(unPres);
                })
            })
        }
        rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
    });
};