// forEach loop for IE 9+ for NodeList
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

// Takes in Array of Objs. Returns Array of values of the given Obj key
Array.prototype.pluck = function (name) {
    return this.map(obj => obj[name]);
};

/* Converts strings of array to lowercase

    ['Test', 'hello WORLD'].toLowerCase();

    //-> ['test', 'hello world']

*/
Array.prototype.toLowerCase = function () {
    return this.join('|').toLowerCase().split('|');
};

Array.prototype.last = function () {
    return this[this.length - 1];
};

String.prototype.toTitleCase = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};