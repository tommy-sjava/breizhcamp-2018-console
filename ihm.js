let service = require('./service');
let readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = () => {

    console.log(`
    *************************
    1. Rafraichir les données
    2. Lister les sessions
    3. Lister les présentateurs
    4. Rechercher une session
    99. Quitter`);

    rl.question('Quel est votre choix ? ', saisie => {
        if (saisie == 1) {
            service.init()
                .then(nbSessions => console.log('[maj] Données mis-à-jour,', nbSessions, 'sessions trouvées.'))
                .catch(err => console.log('Oops', err))
        } else if (saisie == 2) {
            service.listerSessions()
                .then(talks => {
                    talks.forEach(e => {
                        console.log(e.name + " (" + e.speakers + ")");
                    })
                })
                .catch(err => console.log('Oops', err));
        } else if (saisie == 3) {
            service.listerSpeakers()
                .then(langs => langs.forEach(e => {
                    console.log(e.innerHTML);
                }))
                .catch(err => console.log('Oops', err));
        }
        else if (saisie == 4) {
            rl.question('Quel mot voulez vous rechercher ? ', word => {
                if (word === "") {
                    console.log("Aucune session trouvée");
                } else {
                    service.findByWord()
                        .then(talks => {
                            let count = 0;
                            let find = false;
                            talks.forEach(e => {
                                if (e.name.toLowerCase().indexOf(word) >= 0) {
                                    find = true;
                                    count++;
                                    console.log(count + ". " + e.name);
                                }
                            });
                            if (!find) {
                                console.log("Aucune session trouvée");
                            }
                        })
                        .catch(err => console.log('Oops', err));
                }
            });
        } else if (saisie == 99) {
            rl.close();
        }
    });
}
