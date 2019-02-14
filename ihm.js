let service = require('./service');

let readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



// version synchrone
//var resultat =  service.init();

// version asynchrone
//service.init(function(resultat) {})

const menu = function () {
    console.log('************************');
    console.log('1. Rafraichir les données');
    console.log('2. Lister les sessions');
    console.log('3. Lister les présentateurs');
    console.log('99. Quitter');

    rl.question('', (saisie) => {
        console.log(`Vous avez saisi : ${saisie}`);
        if (saisie === '1') {
            service.init(nb => {
                console.log('[init]', nb, 'sessions trouvées.')
                console.log('... Données mises à jour');
                menu();
            });
        } else if (saisie === '2') {
            service.listerSession(talks => {
                talks.forEach(uneSession => {
                    let titre = '';
                    if (uneSession.name) {
                        titre += uneSession.name.toUpperCase()
                    } else {
                        console.log('Pas de titre')
                    }
                    let speakers = '';
                    if (uneSession.speakers) {
                        speakers += uneSession.speakers.toUpperCase()
                    } else {
                        console.log('Pas de Speakers associé à :' + uneSession.name)
                    }
                    let affichage = `${titre} (${speakers})`
                    console.log(affichage);

                })

            })
            menu();
        } else if (saisie === '99') {
            rl.close();
        } else if (saisie != '1' || saisie != '2' || saisie != '99') {
            console.log('Saisie non valide')
            menu();
        }

    });
}

exports.menu = menu;