// tableau qui contiendra toutes les sessions du BreizhCamp
// var talks = [];

// exports.init = function (callback) {

//    callback(12);

// };
// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (callback) {

    // TODO effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp

    request('https://jsonplaceholder.typicode.com/posts', { json: true }, function(err, res, body) {
    if (err) { return console.log('Erreur', err); }

    // body contient les données récupérées
    console.log(body);
});



    // TODO     => une fois les données récupérées, alimenter la variable talks

    // TODO         => invoquer la callback avec le nombre de sessions récupérées

};