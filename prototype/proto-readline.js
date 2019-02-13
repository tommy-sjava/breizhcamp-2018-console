var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var r2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('************************', function (saisie) {
    rl.close();
})

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

r2.question('2. Lister les sessions', function (saisie) {
    console.log(`Vous avez saisi : ${saisie}`);
    if (saisie == 2) {
        service.listerSession(callback);
    } else {
        console.log("Saisie non valide");
    }
    r2.close();
})
r1.question('99. Quitter', function (saisie) {
    console.log(`Vous avez saisi : ${saisie}`);

    rl.close();
})