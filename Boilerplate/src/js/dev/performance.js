// Measure Individual Function
function functionPerformance(functionName, param, repeat) {
    var i;
    var total = 0;
    repeat = repeat || 3;
    param = param || '';

    for (i = 1; i <= repeat; i++) {
        var startTime = performance.now();
        functionName(...param);
        var endTime = performance.now();
        var time = endTime - startTime;
        console.log('Test ' + i + ' ->', time + ' ms To Finish');
        total += time;
    }
    console.log('  ');
    console.log('Average Time', total / repeat + ' ms');
}

function test() {
    var i;

    for (i = 0; i < 1000; i++) {
        console.log('test');
    }
}

function jquerySelect() {
    Defer.js('https://code.jquery.com/jquery-3.3.1.min.js', function () {
        var i;

        // Vanilla JavaScript
        var startTime = performance.now();
        for (i = 1; i <= 500000; i++) {
            document.getElementById('target').style.fontSize = (0.000001 * i) + 'px';
        }
        var endTime = performance.now();
        var vanillaTime = endTime - startTime;
        console.log('Vanilla JavaScript ' + i + ' ->', vanillaTime + ' ms To Finish');
        // ./Vanilla JavaScript

        // JQuery
        $('#target').css({
            fontSize: 1
        });
        var startTime = performance.now();
        for (i = 1; i <= 500000; i++) {
            $('#target').css({
                fontSize: (0.001 * i) + 'px'
            });
        }
        var endTime = performance.now();
        var jqueryTime = endTime - startTime;
        console.log('JQuery ' + i + ' ->', jqueryTime + ' ms To Finish');
        // ./JQuery

        console.log('Vanila JavaScript is ', ((jqueryTime/vanillaTime)*100).toFixed() + '% Faster');
    });
}