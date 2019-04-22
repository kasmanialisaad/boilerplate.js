/* Same as console.log but will only show up in development or when URL has query ?dev=true.

    log('hello world');

    //-> hello world

*/

function log() {

    try {

        if (checkParameterByName('dev', 'true')) {
            console.log.call(this, ...arguments);
            return true;
        }

        window.dev = window.dev || false;

        if (!window.dev) return false;

        console.log.call(this, ...arguments);

        return true;

    } catch (error) {
        null;
    }
}