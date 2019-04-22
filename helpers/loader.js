global.loader = (type = 'dots', message, color = 'green') => {
    const cliSpinners = $REQUIRE('cli-spinners');
    const logUpdate = $REQUIRE('log-update');
    let i = 0;
    setInterval(() => {
        const frame = cliSpinners[type].frames[i = ++i % cliSpinners[type].frames.length];
        logUpdate(`${frame} ${message}`[color]);
    }, cliSpinners[type].interval);
}