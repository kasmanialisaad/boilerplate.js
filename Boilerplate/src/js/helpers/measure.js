/* How To Use

    measure('start', 'Calculate Stuff');
    or
    measure.start('Calculate Stuff');

    var counter = 0;

    data.forEach(item => {
        // Logic
        counter++;
    });

    measure('stop', 'Calculate Stuff');
    or
    measure.stop('Calculate Stuff');


    //=> 'Calculate Stuff: 4929.200000013225 ms'

*/

function measure(status, name) {

    try {

        if (status === 'start') {
            measure[name] = {};
            measure[name].start = performance.now();
        }

        if (status === 'stop') {
            measure[name].stop = performance.now();
            const time = measure[name].stop - measure[name].start + ' ms';
            log('%c' + name + ':', 'color: blue;', time);
        }

    } catch (error) {

        log('Measure Error');

    }

}

measure.start = (name) => measure('start', name);
measure.stop = (name) => measure('stop', name);