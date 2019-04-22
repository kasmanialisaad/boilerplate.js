function csvJSON(csv, group) {

    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }

    if (group) return groupBy(result, group);

    return result;
}

function groupBy(data, key) {
    var object = {};

    data.forEach(line => {
        if (!object[line[key]]) object[line[key]] = [];
        object[line[key]].push(line);
    });

    return object;
}