const insomniaClientId = '716305301317615657';
const startTimestamp = Date.now();

const RPC = require('discord-urpc');

const client = new RPC({ clientID: insomniaClientId, debug: true });

function setActivity(activity) {
    console.log('setActivity(', activity, ')');

    client.send('SET_ACTIVITY', {
        pid: process.pid,
        activity
    });
}

client.on('ready', () => {
    setActivity({
        details: 'Playing with APIs',
        state: 'No requests made... yet!',
        timestamps: {
            start: startTimestamp
        },
        assets: {
            large_image: 'insomnia',
            large_text: 'https://insomnia.rest/'
        }
    });
});

let requestName = null;
let method = null;

module.exports.requestHooks = [];
module.exports.responseHooks = [];

// request hook to get some extra information
module.exports.requestHooks.push((ctx) => {
    requestName = ctx.request.getName();
    method = ctx.request.getMethod();
});

// response hook to set the activity and sprinkle some extra info as well
module.exports.responseHooks.push((ctx) => {
    setActivity({
        state: requestName,
        details: `${method} returned ${ctx.response.getStatusCode()}`,
        timestamps: {
            start: startTimestamp
        },
        assets: {
            large_image: 'insomnia',
            large_text: 'https://insomnia.rest/'
        }
    });
});