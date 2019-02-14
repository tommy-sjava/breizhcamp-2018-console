let readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

r1.question('1. Rafraichir les données', function (saisie) {
    console.log(`Vous avez saisi : ${saisie}`);
    if (saisie == 1) {
        Service.init(callback);
        console.log('... Données mises à jour');
    } else {
        return r1;
    }
    rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
})
