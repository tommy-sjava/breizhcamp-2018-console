// tableau qui contiendra toutes les sessions du BreizhCamp
import rp from 'request-promise-native';
import jsdom from 'jsdom';
let talks: any[] = [];

export const init = () => {

    talks = [];
    let promise1$ = rp('http://2018.breizhcamp.org/json/talks.json', { json: true })
    let promise2$ = rp('http://2018.breizhcamp.org/json/others.json', { json: true })

    return Promise.all([promise1$, promise2$]).then(htmlString => {
        //console.log(htmlString);
        talks = talks.concat(htmlString[0]).concat(htmlString[1]);
        return talks.length;
    })


    // Envoie de la requête http
    /* request('http://2018.breizhcamp.org/json/talks.json', { json: true }, (err, res, body) => {
        if (err) { return console.log('Erreur', err); } 

        // body contient les données récupérées
        talks = talks.concat(body);
        console.log('OK talks');
        //console.log(talks);
        request('http://2018.breizhcamp.org/json/others.json', { json: true }, (err, res, body) => {
            if (err) { return console.log('Erreur', err); }

            // body contient les données récupérées
            console.log('Ok other');
            talks = talks.concat(body);
            //console.log(talks);

            // TODO     => une fois les données récupérées, alimenter la variable talks

            // TODO         => invoquer la callback avec le nombre de sessions récupérées
            callback(talks.length);
        });

    });*/ // befor promise

};

export const listerSessions = () => {

    return talks.length > 0 ? Promise.resolve(talks) : exports.init().then(() => talks);

    /*if (talks == 0) exports.init(() => {
        talks.forEach(element => {
            callback(element);
        });
    });

    talks.forEach(element => {
        callback(element);
    });*/

}

export const listePres = () => {
    return rp('http://2018.breizhcamp.org/conference/speakers/').then(innerHTML => {
        let dom = new jsdom.JSDOM(innerHTML);
        let langs = dom.window.document.querySelectorAll("h3.media-heading");
        return Array.prototype.slice.call(langs).map(htmlNode => htmlNode.innerHTML);
    })


    /*request('http://2018.breizhcamp.org/conference/speakers/', {}, (err, res, body) => {
        if (err) { return console.log('Erreur', err); }

        // récupération de la page HTML 
        let dom = new jsdom.JSDOM(body);
        let langs = dom.window.document.querySelectorAll("h3.media-heading");
        langs.forEach(element => {
            callback(element.innerHTML);
        });
    });*/
}

export const research = (saisie: any) => {

    if (talks.length == 0) exports.init(() => { });
    let res = [];
    res = talks.filter(val => {
        return (val.name.toUpperCase().includes(saisie.toUpperCase()))
    });
    return res;
}