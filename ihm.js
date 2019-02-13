var service = require('./service');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = function () {
    console.log('*************************');
    console.log('1. Rafraichir les données');
    console.log('2. Lister les sessions');
    console.log('3. Lister les présentateurs');
    console.log('4. Rechercher une session');
    console.log('99. Quitter');

    rl.question('Quel est votre choix ? ', function (saisie) {
        if (saisie == 1) {
            service.init(function (nb) {
                console.log('[maj] Données mis-à-jour,', nb, 'sessions trouvées.')
            });
        } else if (saisie == 2) {
            service.listerSessions(function (talks) {
                var str;
                talks.forEach(function (e) {
                    str = e.name + " (" + e.speakers + ")";
                    console.log(str);
                });
            });
        } else if (saisie == 3) {
            service.listerSpeakers(function (langs) {
                langs.forEach(function (lg) {
                    console.log(lg.innerHTML);
                });
            })
        }
        else if (saisie == 4) {
            rl.question('Quel mot voulez vous rechercher ? ', function (word) {
                if(word === ""){
                    console.log("Aucune session trouvée");
                    console.log("98. Refaire une nouvelle recherche");
                    console.log("99. Retour au menu principal");
                }else{
                    service.findByWord(function (talks) {
                        var count = 0;
                        var find = false;
                        talks.forEach(function (e) {
                            if (e.name.toLowerCase().indexOf(word) >= 0) {
                                find = true;
                                count++;
                                console.log(count + ". " + e.name);
                            }
                        });
                        if(!find){
                            console.log("Aucune session trouvée");
                        }
                        console.log("98. Refaire une nouvelle recherche");
                        console.log("99. Retour au menu principal");
                    });
                }
                
            });

        }
        //rl.close();
    });
}
