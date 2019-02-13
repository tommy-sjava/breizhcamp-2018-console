// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];
var talks2=[];
var listeName=new Map();

exports.init = function (callback) {

    var request = require('request');

    // Envoie de la requête http
    request('http://2018.breizhcamp.org/json/others.json', { json: true }, function(err, res, body) {
        if (err) { 
            return console.log('Erreur', err);
         }
    
        // body contient les données récupérées
     //   console.log('Ok', body);
        talks2=body;
        request('http://2018.breizhcamp.org/json/talks.json', { json: true }, function(err, res, body) {
            if (err) { 
                return console.log('Erreur', err);
             }
        
            // body contient les données récupérées
 
            for(var elem in body){
                listeName.set(body[elem]["name"],body[elem]["speakers"]);
            }
            talks=body;
            callback(Object.keys(talks).length+Object.keys(talks2).length);
        });
    });

};

exports.listerSessions = function(callback){
    if(listeName.size===0){
        this.init(callback);
        console.log("Chargement en cours des sessions.")
    } 
    else{
        console.log(listeName);
    }
}

exports.listeSpeakers = function(){
    var request = require('request');

    request('http://2018.breizhcamp.org/conference/speakers/', {}, function(err, res, body) {
    if (err) { return console.log('Erreur', err); }

    var jsdom = require('jsdom');

    var dom2 = new jsdom.JSDOM(body);

    var langs = dom2.window.document.querySelectorAll("h3");
    langs.forEach(function(lg) {
       console.log(lg.innerHTML);
    });   
});
}
