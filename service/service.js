let talks2 = [];
let listeName = new Map();
const request = require(`request-promise-native`);

class Service {

    constructor() {
    }

    init() {

        const p1$ = request(`http://2018.breizhcamp.org/json/others.json`, { json: true });
        const p2$ = request(`http://2018.breizhcamp.org/json/talks.json`, { json: true });

        return Promise.all([p1$, p2$])
            .then(tabResults => {

                talks2 = tabResults[0].concat(tabResults[1]);
                for (let elem in talks2) {
                    if (talks2[elem][`name`] && talks2[elem][`speakers`]) {
                        listeName.set(talks2[elem][`name`], talks2[elem][`speakers`]);
                    }
                    else {
                        listeName.set(talks2[elem][`name`], `Pas de speakers`);
                    }
                }

                return talks2.length;
            });
    };


    listerSessions() {
        if (listeName.size === 0) {
            return this.init()
                .then(() => {
                    return listeName;
                });
        }
        return Promise.resolve(listeName);
    }

    listeSpeakers() {

        const p1$ = request(`http://2018.breizhcamp.org/conference/speakers/`, { json: true });

        return p1$
            .then((result) => {
                const jsdom = require(`jsdom`);

                let dom2 = new jsdom.JSDOM(result);

                let langs = dom2.window.document.querySelectorAll(`h3`);
                return langs;
            });
    }

    listeSessionVues(saisie2) {
        let res = [];
        let iterator1 = listeName.keys();
        let cpt = 1;
        while (cpt != listeName.size) {

            let elem = (iterator1.next().value).toUpperCase();
            if (elem.includes(saisie2.toUpperCase())) {
                res.push(elem);
            }
            cpt += 1;
        }
        return Promise.resolve(res);
    }

    descriptionSession(saisie2) {
        let res = [];
        for (let elem of talks2) {
            if (saisie2 === elem[`name`].toUpperCase()) {
                res.push(elem[`name`]);
                res.push(elem[`speakers`]);
                res.push(elem[`description`]);
            }
        }
        return Promise.resolve(res);
    }
}
exports.Service = Service;