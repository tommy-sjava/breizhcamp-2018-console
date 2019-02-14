// tableau qui contiendra toutes les sessions du BreizhCamp
const request = require('request')
const jsdom = require('jsdom');
let talks = [];

exports.init = callback => {

    talks = [];
    // Envoie de la requête http
    request('http://2018.breizhcamp.org/json/talks.json', { json: true }, (err, res, body) => {
        if (err) { return console.log('Erreur', err); }

        // body contient les données récupérées
        talks = talks.concat(body);
        console.log('OK talks');
        //console.log(talks);
        request('http://2018.breizhcamp.org/json/others.json', { json: true }, (err, res, body) => {
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

exports.listerSessions = callback => {
    if (talks == 0) exports.init(() => {
        talks.forEach(element => {
            callback(element);
        });
    });

    talks.forEach(element => {
        callback(element);
    });

}

exports.listePres = callback => {
    request('http://2018.breizhcamp.org/conference/speakers/', {}, (err, res, body) => {
        if (err) { return console.log('Erreur', err); }

        // récupération de la page HTML 
        let dom = new jsdom.JSDOM(body);
        let langs = dom.window.document.querySelectorAll("h3.media-heading");
        langs.forEach(element => {
            callback(element.innerHTML);
        });
    });
}

exports.research = saisie => {

    if (talks == 0) exports.init(() => { });
    let res = [];
    res = talks.filter(val => {
        return (val.name.toUpperCase().includes(saisie.toUpperCase()))
    });
    return res;
}