var readline = require('readline');
var ihm = require('./ihm.js');

var listeSession = new Map();
var cpt;
var res;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.affichage = affichage;

function affichage() {
    console.log("**************************************");
    console.log("1. Rafraichir les données");
    console.log("2. Lister les sessions");
    console.log("3. Lister les présentateurs");
    console.log("4. Rechercher une session");
    console.log("99. Quitter");
    rl.question('', function (saisie2) {
        if (saisie2 === "1") {
            ihm.start();
            console.log("... Données mises à jour");
            affichage();
        } else {
            if (saisie2 === "2") {
                ihm.listeSession(function (listeName) {
                    console.log(listeName);
                    affichage();
                });

            }
            else {
                if (saisie2 === "3") {
                    ihm.listeSpeakers(function (langs) {
                        langs.forEach(function (lg) {
                            console.log(lg.innerHTML);
                        });
                        affichage();
                    });
                }
                else {
                    if (saisie2 === "4") {
                        afficheVue();
                    }
                    else {
                        if (saisie2 === "99") {
                            rl.close();
                        }
                        else {
                            console.log("\n Erreur de saisie \n");
                            affichage();
                        }
                    }
                }
            }
        }
    });
}

function afficheVue() {
    console.log("\nQuel mot rechechez-vous ? : ");
    rl.question('', function (saisie2) {
        res = ihm.listeSessionVue(saisie2);
        if (res.length === 0) {
            console.log("(aucune session)");
            afficheVueReset();
        }
        else {
            console.log("\n");
            for (cpt = 0; cpt < res.length; cpt++) {
                var liste = ihm.descriptSession(res[cpt]);
                listeSession.set(res[cpt], liste);
                console.log((cpt + 1) + ". " + res[cpt]);
            }
            afficheVueReset();
        }
    });
}

function afficheVueReset() {
    console.log("98. Refaire une nouvelle recherche");
    console.log("99. Retour au menu principal");
    rl.question('', function (saisie2) {
        if (parseInt(saisie2) <= cpt) {
            descriptAffiche(parseInt(saisie2));
        } else {

            if (saisie2 === "98") {
                afficheVue();
            }
            else {
                if (saisie2 === "99") {
                    affichage();
                }
                else {
                    console.log("\n Erreur de saisie \n");
                    afficheVueReset();
                }
            }
        }
    });
}

function descriptAffiche(saisie2) {
    for (var i = 0; i < listeSession.get(res[saisie2 - 1]).length; i++) {
        if (i === 0) {
            console.log("*Titre* : " + listeSession.get(res[saisie2 - 1])[i]);
        }
        else {
            if (i === 1) {
                console.log("*Présentateurs* : " + listeSession.get(res[saisie2 - 1])[i]);
            }
            else {
                console.log("*Description* : " + listeSession.get(res[saisie2 - 1])[i]);
            }
        }
    }
    afficheVueReset();
}