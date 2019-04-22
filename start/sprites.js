function init() {

    config.check('sprites', execute);
}

function execute() {
    console.log(`

/* How To Use

    Drop Image Files Inside Folders In -> ${config.sprites}
    Each Folder Will Generate A Sprite Image Based On Its Name

    Example: Folder[icons] -> bus.png, train.png, arrow.png
    Generated Class Name Structure is "folderName-fileNameWithoutExtension"

    [HTML] -> <i class="icons-train"></i>
    
    or
    
    [SASS] -> .exampleClass {
                    @extend .icons-train;
                }

    *Note: If you are using the provided sass boilerplate then you won't have to do any configuration.
          You can use it immediately              
*/

    `.grey);
    loader ('dots', `Watching ${config.sprites}...`, 'green');
    require('../sprites').watchSprites(config);
}


module.exports = { init };