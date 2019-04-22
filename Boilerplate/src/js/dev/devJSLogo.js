// Adds the DEV JS Logo at the bottom right screen
window.dev = true;
DocumentReady(function () {
    var div = document.createElement("div");

    div.innerText = 'DEV JS';
    div.style.backgroundColor = 'yellow';
    div.style.fontWeight = 'bold';
    div.style.position = 'fixed';
    div.style.bottom = '0';
    div.style.right = '0';
    div.style.padding = '3px';

    try {
        document.body.appendChild(div);
    } catch (error) {
        null;
    }

});
