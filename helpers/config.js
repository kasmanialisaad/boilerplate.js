const ConfigPATH = path.resolve('./config.json');
const browserSyncPATH = path.resolve('./config.browsersync.txt');
fs.ensureFileSync(ConfigPATH);
fs.ensureFileSync(browserSyncPATH);
if (fs.readFileSync(ConfigPATH).toString().length === 0) fs.writeFileSync(ConfigPATH, '{}');

global.config = require('../../../config.json');
       config.path = path.resolve('./config.json');
       try { config.js.dir = path.parse(config.js.input).dir; } catch (error) {} 
       try { config.js.base = path.parse(config.js.input).base; } catch (error) {} 
       try { config.js.init = path.resolve(path.parse(config.js.input).dir + '/init.js'); } catch (error) {} 
       try { config.css.dir = path.parse(config.css.input).dir; } catch (error) {} 
       try { config.css.base = path.parse(config.css.input).base; } catch (error) {} 
       try { config.browsersync = browserSyncPATH; } catch (error) {} 
       try { if(!config.js.public) config.js.public = /window\.PublicPathJS\s*?=\s*?['"](.*)['"];/.exec(fs.readFileSync(config.js.init))[1]; } catch (error) {} 
       try { if(!config.css.public) config.css.public = /window\.PublicPathCSS\s*?=\s*?['"](.*)['"];/.exec(fs.readFileSync(config.js.init))[1]; } catch (error) {} 

config.set = (option, path, cb) => {
    config[option] = path;
    config.update();
    cb && cb(false);
};

config.check = (option, cb, alt) => {

    if (config[option]) {
        cb && cb(true);
    } else {
        var title = toTitleCase(option);
        console.log(`${title} Path Is Not Set`.bgRed);
        ask.confirm('Would You Like To Set It Now?'.yellow, yes => {
            ask.input('Enter Path', (path) => {
                config.set(option, path, cb);
            }, alt || './Boilerplate/src/' + option);
        }, no => exit());
        
    }

};

config.update = () => {
    fs.writeFileSync(config.path, JSON.stringify(config, null, 2));
    console.log(`${config.path} Updated`.grey);
};

config.update();