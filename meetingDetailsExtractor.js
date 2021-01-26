let meetingDetails = {
    "meeting id": "",
    "time": "",
    "invite link": ""
};

function fetchMeetingDetails() {
    var fields = document.getElementById("info_form").querySelectorAll(".form-group")
    if (fields.length < 1) {
        setTimeout(fetchMeetingDetails, 500);
    } else {
        [...fields].forEach(detail => {
            label = detail.querySelector('label');
            let key = label.innerText.trim().toLowerCase();
            if (label && Object.keys(meetingDetails).includes(key)) {
                switch (key) {
                    case 'meeting id':
                        meetingDetails[key] = detail.querySelector('.control').innerText;
                        break;
                    case 'time':
                        meetingDetails[key] = detail.querySelector('.controls').firstElementChild.innerText;
                        break;
                    case 'invite link':
                        meetingDetails[key] = detail.querySelector('.controls').firstElementChild.innerText == "" ? detail.querySelector('.controls').querySelector('a').innerText : detail.querySelector('.controls').firstElementChild.innerText;
                        break;
                }
            }
        });
        chrome.runtime.sendMessage({ action: "collectMeetingLink", meetingDetails }, () => {
            window.close();
        });
    };
}

fetchMeetingDetails();