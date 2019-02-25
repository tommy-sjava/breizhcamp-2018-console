// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (callback) {

    // TODO effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp
    var request = require('request')

    // Envoie de la requête http
    request('http://2018.breizhcamp.org/json/talks.json', { json: true }, function (err, res, tab1) {
        if (err) { return console.log('Erreur', err); }

        //console.log('Ok', tab1);
        talks = talks.concat(tab1);
        request('http://2018.breizhcamp.org/json/others.json', { json: true }, function (err, res, tab2) {
            if (err) { return console.log('Erreur', err); }

            //console.log('Ok', tab2);
            talks = talks.concat(tab2);
            callback(talks.length);
        });
    })
}
exports.listerSession = function (callback) {

    if (talks.length === 0) {
        exports.init(function (nb) {
            callback(talks)
        })
    } else {
        callback(talks)
    }

}