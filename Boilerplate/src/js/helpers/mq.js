/* How to Use

    mq('PHONE', function() {
        console.log('phone');
    });

    or 

    mq('PHONE') && console.log('phone');

    or

    if (mq('PHONE')) {
        console.log('phone');
    }


*/

function mq(screenSize, cb) {

    var confirm = false;

    var screen = {
        'phone':        [0, 480],
        'phone-wide':   [480, 560],
        'phablet':      [560, 640],
        'tablet-small': [640, 768],
        'tablet':       [768, 1024],
        'tablet-wide':  [1024, 1248],
        'desktop':      [1248, 1440],
        'desktop-wide': [1440, 4000],

        'PHONE':        [0, 640],
        'TABLET':       [640, 1247],
        'DESKTOP':      [1247, 4000]
    };

    try { window.innerWidth > screen[screenSize][0] && window.innerWidth <= screen[screenSize][1] ? (confirm = true) && (cb ? cb() : null) : null; } catch (err) {null;}
    
    return confirm;

}

