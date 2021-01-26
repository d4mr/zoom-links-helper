(function fetchMeetings() {
    var meetings = document.getElementsByClassName("meeting-detail")
    if (meetings.length < 1) {
        setTimeout(fetchMeetings, 500);
    } else {
        meetingLinks = [...meetings].map(meeting => meeting.querySelector('a').getAttribute('href'));
        chrome.runtime.sendMessage({ action: "openMeetingLinks", meetingLinks }, () =>{ 
            window.close();
        });
    }
})()
