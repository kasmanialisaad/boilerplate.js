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