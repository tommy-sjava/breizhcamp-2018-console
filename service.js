// tableau qui contiendra toutes les sessions du BreizhCamp
let talks = [];

exports.init = callback => {

    talks = [];
    // Effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp

    const request = require('request');

    request('http://2018.breizhcamp.org/json/talks.json', { json: true }, (err, res, body) => {
        if (err) {
            return console.log(`Erreur ${err}`);
        }

        talks = talks.concat(body); // => une fois les données récupérées, alimenter la variable talks

        request('http://2018.breizhcamp.org/json/others.json', { json: true }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }

            talks = talks.concat(body); // => une fois les données récupérées, alimenter la variable talks

            console.log('Données mise à jour');
            callback(talks.length);        // => invoquer la callback avec le nombre de sessions récupérées
        });
    });
};

exports.listerSessions = callback => {

    if (talks.length == 0) {

        exports.init(taille => {
            // init est fait
            callback(talks)
        });
    }
    else {
        callback(talks)
    }
};

exports.listerPresentateurs = callback => {
    let request = require('request');
    let jsdom = require('jsdom');

    request('http://2018.breizhcamp.org/conference/speakers/', {}, (err, res, body) => {
        if (err) { return console.log('Erreur', err); }

        let dom = new jsdom.JSDOM(body);
        let langs = dom.window.document.querySelectorAll("h3.media-heading");
        callback(langs);
    });
}