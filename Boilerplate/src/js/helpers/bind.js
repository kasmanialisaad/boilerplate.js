/* How To Use

    <div id="name">My name is {{name}} and i like to eat {{favorite.food}}</div>

    var data = {
        'id': 15,
        'name': 'joe'
        favorite: {
            'food': 'pizza',
            'color': 'red'
        }
    };

    bind(data, '#name'); // Output: <div id="name">My name is joe and i like to eat pizza</div>

    or

    var text = 'My name is {{name}} and i like to eat {{favorite.food}}';

    bind(data, text, function(response) {
        console.log(response);  // Output: My name is joe and i like to eat pizza
    });

*/

function bind(data, element, cb) {

    try {
        var element = document.querySelector(element);
        var html = element.innerHTML;
    } catch (error) {
        var html = element;
    }

    var regex = /\{\{\s*([\w+\.?\w+]+)\s*\}\}/;
    var match;

    while (match = regex.exec(html)) {

        var evalData;

        try { evalData = eval('data.' + match[1]); } catch (error) { evalData = `<span style="color:red;">Error!</span>`; }

        html = html.replace(match[0], evalData);

    }

    if (cb) cb(html);

    try { element.innerHTML = html; } catch (error) { return html; }

}