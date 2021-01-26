var loadingScreen = document.createElement("div");
var overlay = document.createElement("div");
var loadingNotice = document.createElement("div");
var body = document.getElementsByTagName('body')[0];

loadingNotice.textContent = "Please wait, your links are loading...";

loadingNoticeStyling = {
    zIndex: "10001",
    backgroundColor: "white",
    padding: "50px",
    margin: "auto",
    fontWeight: "bold",
    fontSize: "large",
    borderRadius: "12px"
}

loadingScreenStyling = {
    position: "fixed",
    top: "0",
    left: "0",
    height: "100%",
    width: "100%",
    display: "flex",
    zIndex: "10000",
}

overlayStyling = {
    position: "fixed",
    top: "0",
    left: "0",
    height: "100%",
    width: "100%",
    zIndex: "10000",
    backgroundColor: "black",
    opacity: "0.8",
}

bodyStyling = {
    maxHeight: "100vh",
    overflow: "hidden"
}

applyStyling(loadingNotice, loadingNoticeStyling);
applyStyling(overlay, overlayStyling);
applyStyling(loadingScreen, loadingScreenStyling);
applyStyling(body, bodyStyling);

function applyStyling(element, styles) {
    for (const key in styles) {
        element.style[key] = styles[key];
    }
}

loadingScreen.appendChild(overlay);
loadingScreen.appendChild(loadingNotice);
body.appendChild(loadingScreen);
