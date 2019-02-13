var service = require('../service/service.js');

exports.start = function() {
    service.init(function(nb) {
        //console.log('[init]', nb, 'sessions trouvées.')
    });
};

exports.listeSession = function() {
    service.listerSessions(function(init) {
        //console.log('[init]', nb, 'sessions trouvées.')
    });
};

exports.listeSpeakers = function() {
    service.listeSpeakers(function() {
        //console.log('[init]', nb, 'sessions trouvées.')
    });
};