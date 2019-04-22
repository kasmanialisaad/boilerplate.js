// Same as document.getElementByID() but with cache"

/* How To Use

    var element = $id('menuButton');

*/

function $id(id) {
    if ($id.cache[id] === undefined) {
        $id.cache[id] = document.getElementById(id) || false;
    }
    return $id.cache[id];
}

$id.cache = {};