var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('*************************');
console.log('1. Rafraichir les données');
console.log('2. Lister les sessions');
console.log('99. Quitter');

rl.question('Quel est votre choix ? ', function (saisie) {
    if(saisie==1){
        //
    }else if(saisie==2){
        //
    }
    //console.log(`Vous avez saisi : ${saisie}`);
    rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
});

// *************************
// 1. Rafraichir les données
// 2. Lister les sessions
// 99. Quitter
// Après l'exécution d'une action le menu est réaffiché sauf dans le cas de l'option 99
// L'option 99 permet de quitter le programme
// L'option 1 invoque la méthode service.init(callback) et affiche le message suivant après le raffraîchissement ... Données mises à jour.
// L'option 2 invoque une méthode service.listerSessions(callback) (à créer) et affiche la liste des sessions sous la forme TITRE (PRESENTATEURS).
// Le service service.listerSessions(callback) permet de retourner le tableau de sessions (données complètes).