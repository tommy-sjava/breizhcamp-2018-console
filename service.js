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