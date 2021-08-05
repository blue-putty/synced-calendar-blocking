import syncHandler from './sync';
import actions from './actions';

console.log('popup script loaded');

const reloadButton = document.getElementById('reload');
const popButton = document.getElementById('pop-out');
const focusMode = document.getElementById('focus-toggle');

reloadButton.addEventListener('click', syncHandler.syncHandler);
popButton.addEventListener('click', popHandler);
focusMode.addEventListener('change', focusToggleHandler);

chrome.storage.local.get('zen', (result) => {
    focusMode.checked = result.zen;
})

function focusToggleHandler() {
    const state = this.checked;
    chrome.storage.local.set({ 'zen': state });
}


async function popHandler() {
    console.log('pop');
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab);
    actions.popout(tab);
    return tab;
}
