let request = require('request')
let talks = [];

exports.init = callback => {
    request('http://2018.breizhcamp.org/json/talks.json', { json: true }, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }
    
        talks = talks.concat(body);
        // console.log('Ok', body.length);

        request('http://2018.breizhcamp.org/json/others.json', { json: true }, function(err, res, body) {
            if (err) { return console.log('Erreur', err); }
        
            talks = talks.concat(body);
            callback(talks.length);
        });
    });
};

exports.listerSessions = callback => {
    if(talks.length === 0) {
        exports.init(nb => {
            callback(talks)
        })
    } else {
        callback(talks)
    }
}
exports.listerPresentateur = callback => {


    request('http://2018.breizhcamp.org/conference/speakers/', {}, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }
        let jsdom = require('jsdom');

        // récupération de la page HTML exemple
               
        let dom = new jsdom.JSDOM(body);
        let langs = dom.window.document.querySelectorAll(".media-heading");
        langs.forEach(lg => {
            console.log(lg.innerHTML);
        });
    });
}
