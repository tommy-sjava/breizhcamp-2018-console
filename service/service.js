var talks2 = [];
var listeName = new Map();

exports.init = function (callback) {

    var request = require('request');


    request('http://2018.breizhcamp.org/json/others.json', { json: true }, function (err, res, body) {
        if (err) {
            return console.log('Erreur', err);
        }

        talks2 = body;
        request('http://2018.breizhcamp.org/json/talks.json', { json: true }, function (err, res, body) {
            if (err) {
                return console.log('Erreur', err);
            }


            talks2 = talks2.concat(body);
            for (var elem in talks2) {
                if (talks2[elem]["name"] && talks2[elem]["speakers"]) {
                    listeName.set(talks2[elem]["name"], talks2[elem]["speakers"]);
                }
                else {
                    listeName.set(talks2[elem]["name"], "Pas de speakers");
                }
            }
            callback(Object.keys(talks2).length);
        });
    });

};

exports.listerSessions = function (callback) {
    if (listeName.size === 0) {
        this.init(function (taille) {
            callback(listeName)
        });
    }
    else {
        callback(listeName);
    }
}

exports.listeSpeakers = function (callback) {
    var request = require('request');

    request('http://2018.breizhcamp.org/conference/speakers/', {}, function (err, res, body) {
        if (err) { return console.log('Erreur', err); }

        var jsdom = require('jsdom');

        var dom2 = new jsdom.JSDOM(body);

        var langs = dom2.window.document.querySelectorAll("h3");
        callback(langs);

    });
}

exports.listeSessionVues = function (saisie2) {
    var res = [];
    var iterator1 = listeName.keys();
    var cpt = 1;
    while (cpt != listeName.size) {
        var elem = (iterator1.next().value).toUpperCase();
        if (elem.includes(saisie2.toUpperCase())) {
            res.push(elem);
        }
        cpt += 1;
    }
    return res;
}

exports.descriptionSession = function (saisie2) {
    var res = [];
    for (var elem of talks2) {
        if (saisie2 === elem["name"].toUpperCase()) {
            res.push(elem["name"]);
            res.push(elem["speakers"]);
            res.push(elem["description"]);
        }
    }
    return res;
}