let upcoming = document.getElementById('upcoming');
let openRecordingsPage = document.getElementById('openRecordingsPage');
let recordings = document.getElementById('recordings');


upcoming.onclick = function (element) {
    chrome.runtime.sendMessage({ action: 'upcoming' });
}

openRecordingsPage.onclick = function (element) {
    chrome.runtime.sendMessage({ action: 'openRecordingsPage' });
}

recordings.onclick = function (element) {
    chrome.runtime.sendMessage({ action: 'recordings' });
}

window.onload = function () {
    chrome.runtime.sendMessage({ action: 'checkIfRecordingsDetailsPage' }, (res) => {
        if (res.activate) {
            recordings.removeAttribute("disabled")
        }
    })
}