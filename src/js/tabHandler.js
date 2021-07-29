function tabHandler(tabId, url, mode) {
    //check mode extension should be in
    for (let i = 0; i < mode.length; i++) {
        const rule = mode[i];
        console.log(rule);

        if (rule.title === 'youtube') {
            youtube(url, tabId)
        } else {
            rule.sites.forEach(site => {
                if (url.indexOf(site) > -1) {
                    block(tabId);
                }
            });
        }
    }
}

function youtube(url, tabId) {
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
                block(tabId);
            }
        }
    }
}

function block(tabId, mode) {
    console.log('running');
    switch (mode) {
        case 'rem':
            console.log('bruh');
            chrome.tabs.remove(tabId);
            break;
        case 'college':
            chrome.tabs.update(tabId, { url: 'https://www.cmu.edu/' });
            break;
        case 'rickRoll':
            chrome.tabs.update(tabId, { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' });
            break;
        default:
            console.log(tabId);
            chrome.tabs.remove(tabId);
    }
}