// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];
var talks2=[];

exports.init = function (callback) {

    var request = require('request');

    // Envoie de la requête http
    request('http://2018.breizhcamp.org/json/others.json', { json: true }, function(err, res, body) {
        if (err) { 
            return console.log('Erreur', err);
         }
    
        // body contient les données récupérées
     //   console.log('Ok', body);
        talks2=body;
        request('http://2018.breizhcamp.org/json/talks.json', { json: true }, function(err, res, body) {
            if (err) { 
                return console.log('Erreur', err);
             }
        
            // body contient les données récupérées
         //   console.log('Ok', body);
            talks=body;
            callback(Object.keys(talks).length+Object.keys(talks2).length);
        });
    });
     //   console.log(talks);


   
   // console.log(Object.keys(talks.map).length);


    // TODO effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp

    // TODO     => une fois les données récupérées, alimenter la variable talks

    // TODO         => invoquer la callback avec le nombre de sessions récupérées

};