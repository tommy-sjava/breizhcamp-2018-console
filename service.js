// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (callback) {

    talks = [];
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

            console.log('Données mise à jour');
            callback(talks.length);        // => invoquer la callback avec le nombre de sessions récupérées
        });
    });
};

exports.listerSessions = function (callback) {

    if (talks.length == 0) {

        exports.init(function (taille) {
            // init est fait

            callback(talks)
        });
    }
    else {
        callback(talks)
    }
};

exports.listerPresentateurs = function (callback) {
    var request = require('request');
    var jsdom = require('jsdom');

    request('http://2018.breizhcamp.org/conference/speakers/', {}, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }

        var dom = new jsdom.JSDOM(body);
        var langs = dom.window.document.querySelectorAll("h3.media-heading");
        callback(langs);
    });
}