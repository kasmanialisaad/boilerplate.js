function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function toCamelCase(string) {
    string = string[0] === '/' ? string.substring(1) : string;
    if (string.length === 0) return 'home';
    return string.replace(/(-|\_)([a-z])/g, function (g) { return g[1].toUpperCase(); });
}