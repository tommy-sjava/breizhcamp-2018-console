import jsdom from 'jsdom';
import request from 'request-promise-native';

let talks: Array<any> = [];

export const init = (): Promise<number> => {
    let promise$1 = request('http://2018.breizhcamp.org/json/talks.json', { json: true })
    let promise$2 = request('http://2018.breizhcamp.org/json/others.json', { json: true })
    return Promise.all([promise$1, promise$2]).then(result => {
        talks = talks.concat(result[0]).concat(result[1]);
        return talks.length;
    })
};

export const listerSessions = (): Promise<Array<any>> => {
    if (talks.length === 0) {
        return exports.init().then((nb: number) => {
            return talks;
        });
    } else {
        return Promise.resolve(talks);
    }
}

export const listerSpeakers = (): Promise<NodeListOf<Element>> => {
    return new Promise((resolve, reject) => {
        request('http://2018.breizhcamp.org/conference/speakers/', {}, (err, res, body) => {
            if (err) { return console.log('Erreur', err); }
            let dom = new jsdom.JSDOM(body);
            let langs = dom.window.document.querySelectorAll(".media-heading");
            resolve(langs);
        })
    })
}

export const findByWord = (): Promise<Array<any>> => {
    if (talks.length === 0) {
        return exports.init().then((nb: number) => {
            return talks;
        });
    } else {
        return Promise.resolve(talks);
    }
}