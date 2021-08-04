require('./js/rules.js')
require('./js/tabHandler.js')
require('./js/sync.js')
require('./js/actions.js')

chrome.alarms.onAlarm.addListener(function (alarm) {
    switch (alarm.name) {
        case 'sync':
            syncHandler();
            break;
        case 'stop':

            break;
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const url = changeInfo.url;
    if (!url) {
        return;
    }

    chrome.storage.local.get('mode', (result) => {
        tabHandler(tabId, url, result.mode);
    });
});

chrome.tabs.onCreated.addListener((tab)=>{
    chrome.storage.local.get('zen', (result) => {
        if (result.zen) {
            console.log(tab);
            block(tab.id);
        }
    });
})

chrome.contextMenus.onClicked.addListener(popoutContextHandler);

const CONTEXT_MENU_ID = "POPOUT";

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        title: "Pop-out window",
        contexts: ["all"],
        id: CONTEXT_MENU_ID
    });
});

function popoutContextHandler(info, tab) {
    if (info.menuItemId !== CONTEXT_MENU_ID) {
        return;
    }
    console.log(info, tab);
    popout(tab);
}

chrome.alarms.create('sync', {
    periodInMinutes: 5,
    when: Date.now()
});