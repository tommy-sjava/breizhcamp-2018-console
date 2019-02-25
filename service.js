// tableau qui contiendra toutes les sessions du BreizhCamp
var request = require('request');
var talks = [];


exports.init = function (callback) {

   request('http://2018.breizhcamp.org/json/talks.json', {
      json : true
   }, function (err, res, tab1) {

         talks = talks.concat(tab1);
         request('http://2018.breizhcamp.org/json/others.json', { 
            json: true
      }, function (err, res, tab2) {
            talks = talks.concat(tab2);

            callback(talks.length);
         });
      });
};


