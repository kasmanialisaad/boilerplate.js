const exec = require('child_process').execSync;

global.sitespeed = () => {

    var sitespeed = $REQUIRE('sitespeed.io');

    console.log('Starting Sitespeed...'.yellow);

    var command = `node ${path.resolve('./node_modules/boilerplate.js/node_modules/sitespeed.io/bin/sitespeed.js')} "${process.argv[3].replace('--', '')}"`;

    exec(command);

    console.log('Finished! Saved Result in ./sitespeed-result'.green);
};