import Rules from './rules.js';
// const browserType = __BROWSER__;
// import browser from `${browserType}Identity.js`;
import(`${browserType}Identity.js`);

function syncHandler() {
    
    chrome.identity.getAuthToken({ interactive: true }, (token) => parseData(token));

    const parseData = async (token) => {
        console.log(token);
        chrome.storage.local.get('mode', async (result) => {
            const mode = result.mode;

            const data = await getData(token);
            const items = data.items;

            console.log('All items:');
            console.log(items);

            const concurrent = getConcurrentEvents(items);

            console.log('Concurrent events:');
            console.log(concurrent);


            if (typeof mode === "undefined") {
                chrome.storage.local.set({ 'mode': Rules.rules })
                return;
            }

            let stop = false;
            //match each event to a rule
            let update = Rules.rules.map((x) => x);

            concurrent.forEach(event => {
                const eventTitle = event.summary;

                for (let i = 0; i < Rules.rulesLookup.length; i++) {
                    const eventMatch = Rules.rulesLookup[i];
                    if (eventTitle === eventMatch.title) {
                        console.log('disabled');
                        eventMatch.disable.forEach(rule => {
                            for (let j = 0; j < update.length; j++) {
                                const u = update[j];
                                if (u.title === rule) {
                                    update.splice(j, 1);
                                }
                            }
                        });
                        stop = true;
                    }
                }
            });
            //possible error because not true array comparison  
            if (mode.length !== update.length) {
                console.log('not equal');
                chrome.storage.local.set({ 'mode': update });

                if (mode.length < update.length) {
                    console.log('more restrictive');
                    const [tab] = await chrome.tabs.query({
                        currentWindow: true,
                        active: true
                    });
                    tabHandler(tab.id, tab.url, update);
                }
            }
        });
    }

    const getConcurrentEvents = (events) => {
        const currentTime = Date.now();
        let concurrentEvents = [];
        events.forEach(event => {
            const start = Date.parse(event.start.dateTime);
            if (currentTime > start) {
                const end = Date.parse(event.end.dateTime);
                if (currentTime < end) {
                    concurrentEvents.push(event);
                }
            }
        });
        return concurrentEvents;
    }

    const getData = async (token) => {
        let url = new URL('https://www.googleapis.com/calendar/v3/');
        url.pathname += 'calendars/primary/events';

        const morning = new Date();
        morning.setHours(0);
        const evening = new Date();
        evening.setHours(24);
        const params = {
            singleEvents: true,
            orderBy: 'startTime',
            timeZone: 'UTC',
            timeMin: morning.toISOString(),
            timeMax: evening.toISOString(),
        }
        url.search = new URLSearchParams(params).toString();
        console.log(token);
        console.log(url.href);
        const init = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, init);

        console.log(response);

        if (response.ok) { //200-209 HTTP stat
            const json = await response.json();
            return json;
        } else {
            alert(`HTTP Error: ${response.status}`);
        }
    }
}

export default { syncHandler };