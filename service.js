var request = require('request')
var talks = [];

exports.init = function (callback) {
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

exports.listerSessions = function(callback) {
    if(talks.length === 0) {
        exports.init(function(nb){
            callback(talks)
        })
    } else {
        callback(talks)
    }
}
exports.listerPresentateur = function (callback) {


    request('http://2018.breizhcamp.org/conference/speakers/', {}, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }
        var jsdom = require('jsdom');

        // récupération de la page HTML exemple
               
        var dom = new jsdom.JSDOM(body);
        var langs = dom.window.document.querySelectorAll(".media-heading");
        langs.forEach(function(lg) {
            console.log(lg.innerHTML);
        });
    });
}
