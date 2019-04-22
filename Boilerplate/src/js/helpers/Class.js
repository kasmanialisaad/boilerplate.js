// className: swap, replace, add, remove, check or toggle
function  Class(action, obj, class1, class2, cb) {
    try {
        if (obj.length > 0) {
            let i;
            for (i = 0; i < obj.length; i++) {
                Class(action, obj[i], class1, class2, cb);
            }
            return;
        }
        obj.className;
    } catch (error) {
        return;
    }

    // obj.length > 0 ? [...obj].map(obj => Class(action, obj, class1, class2, cb) ) : '';
    var rep;
    switch (action) {
        case 'swap':
            obj.className = !check() ? obj.className.replace(class2, class1) : obj.className.replace(class1, class2);
            cb ? cb() : null;
            break;
        case 'add': add(obj, class1); break;
        case 'replace': replace(obj, class1); break;
        case 'remove': remove(obj, class1); break;
        case 'check': if (check()) {cb ? cb() : null; return true;} return false;
        case 'toggle':
            check() ? Class('remove', obj, class1) : Class('add', obj, class1);
            cb ? cb() : null;
            break;
    }
    function replace(obj, class1) {
        obj.className = class1;
        cb ? cb() : null;
    }
    function add(obj, class1) {
        if( !check() ) { obj.className += obj.className ? ' ' + class1 : class1; }
        cb ? cb() : null;
    }
    function remove(obj, class1) {
        rep = obj.className.match(' ' + class1) ? ' ' + class1 : class1;
        obj.className = obj.className.replace(rep, '');
        cb ? cb() : null;
    }
    function check() {
        return new RegExp('\\b' + class1 + '\\b').test(obj.className);
    }
}

Class.add     = (obj, class1, callback) => Class('add', obj, class1, null, callback);
Class.remove  = (obj, class1, callback) => Class('remove', obj, class1, null, callback);
Class.check   = (obj, class1, callback) => Class('check', obj, class1, null, callback);
Class.replace = (obj, class1, class2, callback) => Class('replace', obj, class1, class2, callback);
Class.toggle  = (obj, class1, class2, callback) => Class('toggle', obj, class1, class2, callback);
Class.swap    = (obj, class1, class2, callback) => Class('swap', obj, class1, class2, callback);
