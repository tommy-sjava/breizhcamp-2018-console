import readline from 'readline';
import * as service from './service';

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export const start = () => {

    console.log(`
    *************************
    1. Rafraichir les données
    2. Lister les sessions
    3. Lister les présentateurs
    4. Rechercher une session
    99. Quitter`);

    rl.question('Quel est votre choix ? ', (saisie: any) => {
        if (saisie == 1) {
            refreshData();
        } else if (saisie == 2) {
            getConferences();
        } else if (saisie == 3) {
            getSpeakers();
        } else if (saisie == 4) {
            searchForConference();
        } else if (saisie == 99) {
            rl.close();
        } else {
            start();
        }
    });
}

function refreshData() {
    service.init()
        .then(nbSessions => console.log('[maj] Données mis-à-jour,', nbSessions, 'sessions trouvées.'))
        .catch(err => console.log('Oops', err))
}

function getConferences() {
    service.listerSessions()
        .then(talks => {
            talks.forEach(e => {
                console.log(e.name + " (" + e.speakers + ")");
            })
        })
        .catch(err => console.log('Oops', err));
}

function getSpeakers() {
    service.listerSpeakers()
        .then(langs => langs.forEach(e => {
            console.log(e.innerHTML);
        }))
        .catch(err => console.log('Oops', err));
}

function searchForConference() {
    rl.question('Quel mot voulez vous rechercher ? ', word => {
        if (word === "") {
            searchForConference();
        } else {
            service.findByWord()
                .then(talks => {
                    let count = 0;
                    let find = false;
                    //let conferencesFound: Array<any> = new Array<any>();
                    let conferencesFound = new Map();
                    talks.forEach(e => {
                        if (e.name.toLowerCase().indexOf(word) >= 0) {
                            find = true;
                            count++;
                            console.log(count + ". " + e.name);
                            conferencesFound.set(count, e);
                        }
                    });
                    if (find) {
                        conferenceFound(conferencesFound);
                    } else {
                        console.log("Aucune session trouvée");
                        newSearch();
                    }
                })
                .catch(err => console.log('Oops', err));
        }
    });
}

function conferenceFound(conferencesFound: any) {
    console.log(`
98. Refaire une nouvelle recherche
99. Retour au menu principal
        `);
    rl.question('Quel est votre choix ? ', (choice: any) => {
        for (let [id, conf] of conferencesFound) {
            if (id == choice) {
                console.log(`
                *Titre* : `+ conf.name + ` **
                *Présentateurs* : `+ conf.speakers + `
                
                *Description*
                
                `+ conf.description);
                newSearch();
            }
        }
        if (choice === 98) {
            searchForConference();
        } else if (choice === 99) {
            start();
        } else {
            console.log("test");
            newSearch();
        }
    })
}

function newSearch() {
    console.log(`
        98. Refaire une nouvelle recherche
        99. Retour au menu principal
        `);
    rl.question('Quel est votre choix ? ', choice => {
        if (choice === '98') {
            searchForConference();
        } else if (choice === '99') {
            start();
        } else {
            newSearch();
        }
    })
}