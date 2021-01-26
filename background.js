chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher()],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log("fired")
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");

        if (request.action == "upcoming") {
            chrome.storage.local.set({ meetings: null });
            chrome.tabs.create({
                active: false,
                url: "https://zoom.us/meeting#/upcoming"
            }, (upcomingMeetingsTab) => {
                chrome.tabs.executeScript(upcomingMeetingsTab.id, {
                    file: "loadingScreen.js"
                });
                chrome.tabs.executeScript(upcomingMeetingsTab.id, {
                    file: "upcomingMeetingsExtractor.js"
                })
            })
        }

        if (request.action == "openMeetingLinks") {
            sendResponse({ action: "shutdown" });
            chrome.storage.local.set({ numberOfMeetings: request.meetingLinks.length });
            for (const meetingLink of request.meetingLinks) {
                chrome.tabs.create({
                    active: false,
                    url: `https://zoom.us${meetingLink}`
                }, (meetingInfoTab) => {
                    chrome.tabs.executeScript(meetingInfoTab.id, {
                        file: "loadingScreen.js"
                    });
                    chrome.tabs.executeScript(meetingInfoTab.id, {
                        file: "meetingDetailsExtractor.js"
                    })
                })
            }
        }

        if (request.action == "collectMeetingLink") {
            chrome.storage.local.get(["meetings"], storage => {
                if (storage.meetings) {
                    chrome.storage.local.set({ meetings: [request.meetingDetails, ...storage.meetings] }, checkCompletion);
                }
                else {
                    chrome.storage.local.set({ meetings: [request.meetingDetails] }, checkCompletion);
                }
            });
            sendResponse({ action: "shutdown" });
        }

        if (request.action == "openRecordingsPage") {
            chrome.tabs.create({
                url: `https://zoom.us/recording`
            });
        }

        if (request.action == "checkIfRecordingsDetailsPage") {
            chrome.tabs.query({
                active: true,
                currentWindow: true,
                url: 'https://*.zoom.us/recording/detail*'
            }, (tabs) => {
                if (tabs.length < 1) {
                    sendResponse({ activate: false });
                } else {
                    sendResponse({ activate: true });
                }
            })

            return true;
        }

        if (request.action == "recordings") {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, ([tab]) => {
                chrome.tabs.executeScript(tab.id, {
                    file: "loadingScreen.js"
                })
                chrome.tabs.executeScript(tab.id, {
                    file: "recordingDetailsExtractor.js"
                })
            })
        }

        if (request.action == "displayRecordingDetails") {
            sendResponse({ action: "shutdown" });
            chrome.storage.local.set({ recordingDetails: request.recordingDetails }, () => {
                chrome.tabs.create({
                    url: "displayRecordingDetails.html"
                });
            })
        }
    }
);

function checkCompletion() {
    chrome.storage.local.get(["numberOfMeetings", "meetings"], storage => {
        if (storage.numberOfMeetings == storage.meetings.length) {
            console.log("DONE!");
            console.log(storage);
            chrome.tabs.create({
                url: "displayUpcomingMeetings.html"
            });
        }
    })
}