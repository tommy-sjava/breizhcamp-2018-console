var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question('Vous allez bien ? : ', function (saisie) {
//     console.log(`Vous avez saisi : ${saisie}`);
//     rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
// });

// *************************
// 1. Rafraichir les données
// 2. Lister les sessions
// 99. Quitter

console.log('*************************');
console.log('1. Rafraichir les données');
console.log('2. Lister les sessions');
console.log('99. Quitter');

rl.question('Quel est votre choix ? : ', function (saisie) {
        console.log(`Vous avez saisi : ${saisie}`);
        rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
    });