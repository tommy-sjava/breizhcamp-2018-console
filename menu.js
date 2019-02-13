var readline = require('readline');
var service = require('../service');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


/* FONCTION MENU GENERAL */


rl.menuList('1. Rafraichir les données', '2. Lister les sessions', '99. Quitter', function(saisie) {
    console.log(`Vous avez saisi : ${saisie}`);


    rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
});


/* FONCTION RAFRAICHIR MENU */

    



/* FONCTION LISTER SESSIONS */