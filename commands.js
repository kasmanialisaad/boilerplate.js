

function commands(args, config) {

    var jsInput = path.resolve(config.js.input); 
    var sassInput = path.resolve(config.css.input); 

    var jsLocation = path.parse(jsInput).dir;
    var sassLocation = path.parse(sassInput).dir;
    args = args.slice(2);

    // @Command --initPage
    args[0] === '--initPage' ? require('./commands/initPage.js').initPage(args[1], jsLocation) : '';
    args[0] === '--js' ? require('./commands/initPage.js').initPage(args[1], jsLocation) : '';

    // @command --sass
    args[0] === '--sass' ? require('./commands/sass.js').sass(args[1], sassLocation, config) : '';
    
}



module.exports = { commands };