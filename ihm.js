var service = require('./service');
var readline = require('readline');


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
exports.start = function() {
    // service.init(function(nb) {
    //     console.log('[init]', nb, 'sessions trouvées.')
    // });



console.log("*************************")
console.log(" ");
console.log("1. Rafraichir les données");
console.log("2. Lister les sessions");
console.log("3. Lister les présentateurs");
console.log("99. Quitter");

rl.question('Que voulez vous faire ? ', function(saisie) {
    if(saisie == 1) {
        service.init(function(info){
            console.log(info + "... Données mises à jour");
        })

    }
    else if(saisie == 2) {
        service.listerSessions(function(sessions){
            sessions.forEach(function(unSession) {
                console.log(unSession.name + " (" + unSession.speakers + ")");
            })
        })
    }
    else if(saisie == 3) {
        service.listerPresentateur(function(pres){
            pres.forEach(function(unPres){
                console.log(unPres);
            })
        })
    }

    rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
});
};