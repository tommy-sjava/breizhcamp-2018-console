const readline = require(`readline`);
const srv = require(`../service/service.js`);
const service = new srv.Service();

let listeSession = new Map();
let resTest;
let cpt;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


class Menu {

    constructor() {
        this.affichage();
    }

    affichage() {
        console.log(`**************************************`);
        console.log(`1. Rafraichir les données`);
        console.log(`2. Lister les sessions`);
        console.log(`3. Lister les présentateurs`);
        console.log(`4. Rechercher une session`);
        console.log(`99. Quitter`);
        rl.question(``, saisie2 => {
            if (saisie2 === `1`) {
                service.init()
                    .then(() => {
                        console.log(`... Données mises à jour`);
                        this.affichage();
                    });
            }
            else {
                if (saisie2 === `2`) {
                    service.listerSessions()
                        .then(listeName => {
                            for (let [cle, valeur] of listeName.entries()) {
                                console.log("nom de la session : " + cle + " || speakers : " + valeur);
                            }
                            this.affichage();
                        });

                }
                else {
                    if (saisie2 === `3`) {
                        service.listeSpeakers()
                            .then(listeSpeakers => {
                                listeSpeakers.forEach(lg => {
                                    console.log(lg.innerHTML);
                                });
                                this.affichage();
                            })
                    }
                    else {
                        if (saisie2 === `4`) {
                            this.afficheVue();
                        }
                        else {
                            if (saisie2 === `99`) {
                                rl.close();
                            }
                            else {
                                console.log(`\n Erreur de saisie \n`);
                                this.affichage();
                            }
                        }
                    }
                }
            }
        });
    }
    afficheVue() {
        console.log(`\nQuel mot rechechez-vous ? : `);
        rl.question(``, saisie2 => {
            service.listeSessionVues(saisie2)
                .then(res => {
                    resTest = res;
                    if (res.length === 0) {
                        console.log(`(aucune session)`);
                        this.afficheVueReset();
                    }
                    else {
                        console.log(`\n`);
                        for (let cpt2 = 0; cpt2 < res.length; cpt2++) {
                            service.descriptionSession(res[cpt2])
                                .then(liste => {
                                    listeSession.set(liste[0].toUpperCase(), liste);
                                    console.log((cpt2 + 1) + `. ` + liste[0]);
                                    if ((cpt2 + 1) == res.length) {
                                        this.afficheVueReset();
                                    }
                                });
                            cpt = cpt2;
                        }

                    }
                });

        });

    }

    afficheVueReset() {
        console.log(`98. Refaire une nouvelle recherche`);
        console.log(`99. Retour au menu principal`);
        rl.question(``, saisie2 => {
            if (parseInt(saisie2) <= cpt) {
                this.descriptAffiche(parseInt(saisie2));
            } else {

                if (saisie2 === `98`) {
                    this.afficheVue();
                }
                else {
                    if (saisie2 === `99`) {
                        this.affichage();
                    }
                    else {
                        console.log(`\n Erreur de saisie \n`);
                        this.afficheVueReset();
                    }
                }
            }
        });
    }

    descriptAffiche(saisie2) {

        for (let i = 0; i < (listeSession.get(resTest[saisie2 - 1])).length; i++) {
            if (i === 0) {
                console.log(`*Titre* : ` + listeSession.get(resTest[saisie2 - 1])[i]);
            }
            else {
                if (i === 1) {
                    console.log(`*Présentateurs* : ` + listeSession.get(resTest[saisie2 - 1])[i]);
                }
                else {
                    console.log(`*Description* : ` + listeSession.get(resTest[saisie2 - 1])[i]);
                }
            }
        }
        this.afficheVueReset();
    }
}
exports.Menu = Menu;