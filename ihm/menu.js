var readline = require('readline');
var ihm = require('../ihm/ihm.js');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function affichage(){
    console.log("**************************************");
    console.log("1. Rafraichir les données");
    console.log("2. Lister les sessions");
    console.log("3. Lister les présentateurs");
    console.log("99. Quitter");
    rl.question('', function(saisie2) {
        if(saisie2==="1"){
            ihm.start();
            console.log("... Données mises à jour");
            affichage();
        }else{
            if(saisie2==="2"){
                ihm.listeSession();
                affichage();
            }
            else{
                if(saisie2==="3"){
                    ihm.listeSpeakers();
                    affichage();
                }
                else{
                    if(saisie2==="99"){
                        rl.close();
                    }
                    else{
                        console.log("\n Erreur de saisie \n");
                        affichage();
                    }
                }
            }
        }
        });
}
affichage();