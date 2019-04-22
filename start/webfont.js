function init() {

    config.check('webfonts', execute);
}

function execute() {
    console.log(`

/* How To Use

    Drop .svg Font Icons to ${config.webfonts}
    This watches all sub folders as well so feel free to orangize your fonts

    Example: train.svg

    [HTML] -> <i class="icon-train"></i>
    
    or
    
    [SASS] -> .exampleClass {
                    @include icon(train);
                }

    *Note: If you are using the provided sass boilerplate then you won't have to do any configuration.
    You can use it immediately 
*/

    `.grey);
    loader ('dots', `Watching ${config.webfonts}...`, 'green');
    watcher.webfonts();
}


module.exports = { init };