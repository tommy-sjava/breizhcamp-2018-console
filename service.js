// tableau qui contiendra toutes les sessions du BreizhCamp
var request = require('request')
var jsdom = require('jsdom');
var talks = [];

exports.init = function (callback) {

    talks = [];
    // Envoie de la requête http
    request('http://2018.breizhcamp.org/json/talks.json', { json: true }, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }

        // body contient les données récupérées
        talks = talks.concat(body);
        console.log('OK talks');
        //console.log(talks);
        request('http://2018.breizhcamp.org/json/others.json', { json: true }, function (err, res, body) {
            if (err) { return console.log('Erreur', err); }

            // body contient les données récupérées
            console.log('Ok other');
            talks = talks.concat(body);
            //console.log(talks);

            // TODO     => une fois les données récupérées, alimenter la variable talks

            // TODO         => invoquer la callback avec le nombre de sessions récupérées
            callback(talks.length);
        });

    });

};

exports.listerSessions = function (callback) {
    if (talks == 0) exports.init(function (taille) {
        talks.forEach(element => {
            callback(element);
        });
    });

    talks.forEach(element => {
        callback(element);
    });

}

exports.listePres = function (callback) {
    request('http://2018.breizhcamp.org/conference/speakers/', {}, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }

        // récupération de la page HTML 
        var dom = new jsdom.JSDOM(body);
        var langs = dom.window.document.querySelectorAll("h3.media-heading");
        langs.forEach(element => {
            callback(element.innerHTML);
        });
    });
}