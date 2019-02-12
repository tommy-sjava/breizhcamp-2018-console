// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (callback) {

    // Effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp

    const request = require('request');

    request('http://2018.breizhcamp.org/json/talks.json', { json: true }, (err, res, body) => {
        if (err) {
            return console.log('Erreur', err);
        }
        
        talks = talks.concat(body); // => une fois les données récupérées, alimenter la variable talks
        //console.log(talks);

        request('http://2018.breizhcamp.org/json/others.json', { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
        
            talks = talks.concat(body); // => une fois les données récupérées, alimenter la variable talks
            //console.log(talks);

            callback(talks.length);
    });
    
    });

    

        // => invoquer la callback avec le nombre de sessions récupérées

};
