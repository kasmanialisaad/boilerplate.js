// List of Keys --> https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values

/* How To Use

    Keydown('s', function() {

        console.log('s key pressed anywhere on the page');

        if(e.ctrlKey) {

            console.log('Pressed Ctrl + S');

            runSaveFunction();
	    
            e.preventDefault();

        }

    });

    -- Or Target An Element --

    <input type="text" id="test" />

    Keydown(document.getElementById('test'), 'Escape', function() {

        console.log('Escape Key Pressed Inside Input');

        this.className += ' pressed';

    });

*/

function Keydown(element, key, cb) {

    if (arguments.length !== 3) { cb = key; key = element; element = document; }

    element.addEventListener('keydown', (e) => {
        if (e.key === key) cb.call(element, e);
    });

}

function Keypress(element, key, cb) {

    if (arguments.length !== 3) { cb = key; key = element; element = document; }

    element.addEventListener('keypress', (e) => {
        if (e.key === key) cb.call(element, e);
    });

}

function Keyup(element, key, cb) {

    if (arguments.length !== 3) { cb = key; key = element; element = document; }

    element.addEventListener('keyup', (e) => {
        if (e.key === key) cb.call(element, e);
    });

}