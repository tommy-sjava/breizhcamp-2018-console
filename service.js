// tableau qui contiendra toutes les sessions du BreizhCamp
let talks = [];
const request = require('request-promise');
const jsdom = require('jsdom');

exports.init = () => {

    talks = [];
    // Effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp

    let promise1 = request('http://2018.breizhcamp.org/json/talks.json', { json: true });
    let promise2 = request('http://2018.breizhcamp.org/json/others.json', { json: true });

    return Promise.all([promise1, promise2])
        .then(htmlString => {
            talks = talks.concat(htmlString[0]).concat(htmlString[1]);
            return (talks.length);
        })
    /*const request = require('request');

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
    });*/
};

exports.listerSessions = () => {

    return talks.length > 0 ? Promise.resolve(talks) : exports.init().then(nbSessions => talks);

    /*return new Promise((resolve, reject) => {
        if (talks.length == 0) {

            exports.init()                // init est fait
                .then(() => {
                    resolve(talks);
                }, errror => {
                    reject(error);
                }
                )
        }
        else {
            resolve(talks)
        }
    })*/
};

exports.listerPresentateurs = () => {

    return request('http://2018.breizhcamp.org/conference/speakers/', {})
        .then(htmlString => {
            let dom = new jsdom.JSDOM(htmlString);
            let langs = dom.window.document.querySelectorAll("h3.media-heading");
            return Array.prototype.slice.call(langs).map(htmlNode => htmlNode.innerHTML);
        })
    /*    if (err) { return console.log('Erreur', err); }
    
        let dom = new jsdom.JSDOM(body);
        let langs = dom.window.document.querySelectorAll("h3.media-heading");
        callback(langs);
    });*/
}