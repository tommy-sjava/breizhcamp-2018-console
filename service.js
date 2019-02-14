

let request = require('request-promise-native')


// tableau qui contiendra toutes les sessions du BreizhCamp
let talks = [];

exports.init = function () {

    const p1$ = request('http://2018.breizhcamp.org/json/talks.json', { json: true });
    const p2$ = request('http://2018.breizhcamp.org/json/others.json', { json: true });

    Promise.all([p1$, p2$])
        .then(res => {
            talks = res[0].concat(res[1]);
        }

    })
function (err, res, tab2) {
    if (err) { return console.log('Erreur', err); }

    callback(talks.length);
};
}

exports.listerSession = (callback) => {

    if (talks.length === 0) {
        exports.init(nb => {
            callback(talks)
        })
    } else {
        callback(talks)
    }

}
