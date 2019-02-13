// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];
var sessionCount = 0;

exports.init = function (callback) {

    var request = require('request');
    request('http://2018.breizhcamp.org/json/talks.json', { json: true }, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }
        talks = talks.concat(body);
        sessionCount += body.length;

        request('http://2018.breizhcamp.org/json/others.json', { json: true }, function (err, res, body) {
            if (err) { return console.log('Erreur', err); }
            talks = talks.concat(body);
            sessionCount += body.length;
            callback(sessionCount);
        });
    });
};

exports.listerSessions = function (callback) {

    if (talks.length === 0) {
        exports.init(function (nb) {
            callback(talks);
        });
    } else {
        callback(talks);
    }
}

exports.listerSpeakers = function (callback) {
    var request = require('request');
    request('http://2018.breizhcamp.org/conference/speakers/', {}, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }

        var jsdom = require('jsdom');
        var dom = new jsdom.JSDOM(body);
        var langs = dom.window.document.querySelectorAll(".media-heading");
        callback(langs);
    });
}

// exports.findByWord = function (word, callback) {

//     request('http://2018.breizhcamp.org/json/talks.json', { json: true }, function (err, res, body) {
//         if (err) { return console.log('Erreur', err); }
//         talks = talks.concat(body);
//         sessionCount += body.length;

//         request('http://2018.breizhcamp.org/json/others.json', { json: true }, function (err, res, body) {
//             if (err) { return console.log('Erreur', err); }
//             talks = talks.concat(body);
//             sessionCount += body.length;
//         });

//         talks.forEach(function (e) {
//             if (e.name.toLowerCase().indexOf(word) >= 0) { 
//                 console.log(e.name);
//             }
//         });
//     });
// }

exports.findByWord = function (callback) {
    if (talks.length === 0) {
        exports.init(function (nb) {
            callback(talks);
        });
    } else {
        callback(talks);
    }
}