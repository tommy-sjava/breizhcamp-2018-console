var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var r2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var r3 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('************************', function(saisie) {
    console.log(`Vous avez saisi : ${saisie}`);
r2.question('1. Rafraichir les données', function(saisie) {
    console.log(`Vous avez saisi : ${saisie}`);
r3.question(``)
})


    rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
});