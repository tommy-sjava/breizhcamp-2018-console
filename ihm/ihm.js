var service = require('../service/service.js');
var menu = require('./menu.js');

exports.start = function () {
    menu.affichage(function () {

    });
};

exports.listeSession = function (callback) {
    service.listerSessions(function (listeName) {
        callback(listeName);

    });
};

exports.listeSpeakers = function (callback) {
    service.listeSpeakers(function (langs) {
        callback(langs);

    });
};

exports.listeSessionVue = function (saisie2) {
    var res = service.listeSessionVues(saisie2);

    return res;
};

exports.descriptSession = function (saisie2) {
    var res = service.descriptionSession(saisie2);
    return res;
};
