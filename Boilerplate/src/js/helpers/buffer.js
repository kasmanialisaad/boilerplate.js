// function buffer(cb, time) {
//     time = time || 100;
//     clearTimeout(this.timeout);
//     this.timeout = setTimeout(() => {
//         cb();
//     }, time);
// }

function buffer(cb, time = 100, name = 'default') {

    clearTimeout(buffer[name]);
    buffer[name] = setTimeout(() => {
        cb();
    }, time);

}