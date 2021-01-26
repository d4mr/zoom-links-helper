(function fetchRecordings() {
    var appContainer = document.getElementById("app");

    if (!appContainer) {
        setTimeout(fetchRecordings, 500);
        return;
    }

    var recordings = document.getElementById("app").getElementsByClassName("clips_container");
    
    if (recordings.length < 1) {
        setTimeout(fetchRecordings, 500);
        return;

    } else {
        recordingDetails = [...recordings].map(recording => {
            return {
                recordingName: recording.getElementsByClassName('clip_title')[0].innerText,
                recordingShareLink: recording.querySelector('input.input-copysharedclipurl').getAttribute('value'),
                recordingLength: recording.getElementsByClassName('video_bottom')[0].innerText
            }
        });

        console.log(recordingDetails);
        chrome.runtime.sendMessage({ action: "displayRecordingDetails", recordingDetails }, () => {
            window.close();
        });
    }
})()
