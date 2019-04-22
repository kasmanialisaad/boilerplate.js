

function statusCallback(error, result, latency) {
    console.log('----');
    console.log('Request elapsed milliseconds: ', result.requestElapsed);
    console.log('Request index: ', result.requestIndex);
}

function stressTest(url, concurrent, requestsPerSecond, maxSeconds) {

    const loadtest = $REQUIRE('loadtest');
    
    var options = {
        url: url,
        concurrent: concurrent,
        method: 'GET',
        requestsPerSecond: requestsPerSecond,
        maxSeconds: maxSeconds,
        secureProtocol: 'TLSv1_method',
        statusCallback: statusCallback
    };

    loadtest.loadTest(options, function (error, results) {
        if (error) {
            return console.error('Got an error: %s', error);
        }
        console.log('\nTests Run Successful\n');
        console.log(JSON.stringify(results, null, 4));

    });
}

module.exports = { stressTest };

