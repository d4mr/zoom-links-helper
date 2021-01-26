window.addEventListener("load", () => {
    chrome.storage.local.get(["recordingDetails"], storage => {
        var container = document.getElementById('data');
        container.innerHTML = "";
        var hotSettings = {
            data: storage.recordingDetails,
            rowHeaders: true,
            colHeaders: [
                'Length',
                'Name',
                'Link',
            ],
            columnSorting: {
               indicator: true,
               initialConfig: {
                column: 1,
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

