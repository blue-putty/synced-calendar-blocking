export default class TabHandler {
    static handler(tabId, url, mode) {
        //check mode extension should be in
        for (let i = 0; i < mode.length; i++) {
            const rule = mode[i];
            console.log(rule);

            if (rule.title === 'youtube') {
                this.#youtube(url, tabId)
            } else {
                rule.sites.forEach(site => {
                    if (url.indexOf(site) > -1) {
                        this.#block(tabId);
                    }
                });
            }
        }
    }

    static #youtube(url, tabId) {
        if (url.indexOf('youtube.com') > -1) {
            if (url.indexOf('embed') == -1) {
                const whiteList = [
                    "UwPLWazvD7I",
                    "DK3jRo6aTbQ"
                ]
                for (const wUrl of whiteList) {
                    console.log(wUrl);
                    console.log(url);
                    if (url.indexOf(wUrl) > -1) {
                        console.log(true);
                        return;
                    }
                }
                if (url.indexOf('/watch?v=') > -1) {
                    let newUrl = url.replace('/watch?v=', '/embed/');
                    newUrl = newUrl.replace(/&.*/g, '');
                    console.log(newUrl);
                    chrome.tabs.update(tabId, { url: newUrl });
                } else {
                    this.#block(tabId);
                }
            }
        }
    }

    static #block(tabId, mode) {
        console.log('running');
        switch (mode) {
            case 'rem':
                console.log('bruh');
                chrome.tabs.remove(tabId);
                break;
            case 'custom':
                chrome.tabs.update(tabId, { url: '' });
                break;
            default:
                console.log(tabId);
                chrome.tabs.remove(tabId);
        }
    }
}