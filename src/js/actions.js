function popout(tab) {
    // console.log(tab);
    // chrome.tabs.create({url: tab.url, windowType: 'popup'})
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: action,
        },
        () => { });
    function action() {
        window.open(location.href, "detab", "toolbar=0"); 
        window.close();
    }
}