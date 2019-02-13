var request = require('request');
// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (callback) {
    request('http://2018.breizhcamp.org/json/talks.json', {
        json : true
    }, function (err, res, tab1){

        talks = talks.concat(tab1);
        request('http://2018.breizhcamp.org/json/others.json', {
            json : true
        }, function (err,res,tab2){

            talks = talks.concat(tab2);

            callback(talks.length);
        });
    });
    
    
    // TODO effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp

    // TODO     => une fois les données récupérées, alimenter la variable talks

    // TODO         => invoquer la callback avec le nombre de sessions récupérées

};