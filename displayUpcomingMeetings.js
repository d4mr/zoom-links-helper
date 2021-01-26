window.addEventListener("load", () => {
    chrome.storage.local.get(["numberOfMeetings", "meetings"], storage => {
        var container = document.getElementById('data');
        container.innerHTML = "";
        var hotSettings = {
            data: storage.meetings.map(meeting => {
                return {
                    time: meeting["time"],
                    invite: meeting["invite link"],
                    id: meeting["meeting id"],
                    pwd: meeting["invite link"].split("=")[1]
                }
            }),
            rowHeaders: true,
            colHeaders: [
                'Time',
                'Link',
                'ID',
                'Password'
            ],
            columnSorting: {
               indicator: true,
               initialConfig: {
                column: 0,
                sortOrder: 'asc'
              }
            },
            manualRowMove: true,
            manualColumnMove: true,
            language: 'en-US',
            licenseKey: 'non-commercial-and-evaluation'
        };

        var hot = new Handsontable(container, hotSettings);
    })
});

