import jsdom from 'jsdom';
import request from 'request-promise-native';

export class Service {

    public talks: Array<any>;

    constructor() {
        this.talks = [];
    }

    init(): Promise<number> {
        let promise$1 = request('http://2018.breizhcamp.org/json/talks.json', { json: true })
        let promise$2 = request('http://2018.breizhcamp.org/json/others.json', { json: true })
        return Promise.all([promise$1, promise$2]).then(result => {
            this.talks = this.talks.concat(result[0]).concat(result[1]);
            return this.talks.length;
        })
    };

    listerSessions(): Promise<Array<any>> {
        if (this.talks.length === 0) {
            return this.init().then((nb: number) => {
                return this.talks;
            });
        } else {
            return Promise.resolve(this.talks);
        }
    }

    listerSpeakers(): Promise<NodeListOf<Element>> {
        return new Promise((resolve, reject) => {
            request('http://2018.breizhcamp.org/conference/speakers/', {}, (err, res, body) => {
                if (err) { return console.log('Erreur', err); }
                let dom = new jsdom.JSDOM(body);
                let langs = dom.window.document.querySelectorAll(".media-heading");
                resolve(langs);
            })
        })
    }

    findByWord(): Promise<Array<any>> {
        if (this.talks.length === 0) {
            return this.init().then((nb: number) => {
                return this.talks;
            });
        } else {
            return Promise.resolve(this.talks);
        }
    }
}

