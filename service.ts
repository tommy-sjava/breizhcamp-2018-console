const request = require('request-promise-native');
let talks = [];

exports.init = () => {
    let promise$1 = request('http://2018.breizhcamp.org/json/talks.json', { json: true })
    let promise$2 = request('http://2018.breizhcamp.org/json/others.json', { json: true })
    return Promise.all([promise$1, promise$2]).then(result => {
        talks = talks.concat(result[0]).concat(result[1]);
        return talks.length;
    })
};

exports.listerSessions = () => {
    if (talks.length === 0) {
        return exports.init().then(nb => {
            return talks;
        });
    } else {
        return Promise.resolve(talks);
    }
}

exports.listerSpeakers = () => {

    return new Promise((resolve, reject) => {
        request('http://2018.breizhcamp.org/conference/speakers/', {}, (err, res, body) => {
            if (err) { return console.log('Erreur', err); }
            let jsdom = require('jsdom');
            let dom = new jsdom.JSDOM(body);
            let langs = dom.window.document.querySelectorAll(".media-heading");
            resolve(langs);
        })
    })
}

exports.findByWord = () => {
    if (talks.length === 0) {
        return exports.init().then(nb => {
            return talks;
        });
    } else {
        return new Promise.resolve(talks);
    }
}