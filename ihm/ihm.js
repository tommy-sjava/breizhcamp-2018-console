const service = require(`../service/service.js`);
const menu = require(`./menu.js`);

// exports.start = () => {
//     console.log("testeeeeee");
//     service.init()
//         .then(() => {
//             console.log("test");
//         })
// };

exports.listeSession = callback => {
    service.listerSessions(listeName => {
        callback(listeName);

    });
};

exports.listeSpeakers = callback => {
    service.listeSpeakers(langs => {
        callback(langs);

    });
};

exports.listeSessionVue = saisie2 => {
    let res = service.listeSessionVues(saisie2);

    return res;
};

exports.descriptSession = saisie2 => {
    let res = service.descriptionSession(saisie2);
    return res;
};
