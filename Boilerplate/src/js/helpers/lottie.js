/* How To Use ( Get JSON Animations From --> https://www.lottiefiles.com/popular )

    lottie({
        container: document.getElementById('animate'),
        path: '/heart.json',                                    // Local or Remote Location
        loop: false,
        autoplay: false,
        debug: false,                                           // Allows you to use keyborad to get frame by frame animation (Used to determine the start and stop frames)
        frame: 16, // Show this frame if autoplay is false

        onclick: {
            start: 22,                                          
            stop: 57,                                           
            speed: 1.5,                                         // Optional, Default is 1
            click: () => { console.log('On Clicked');},         // Executes before animation starts 
            complete: () => { console.log('On Completed');}     // Executes after the animation is complete
        },

        offclick: {
            start: 40,                                          
            stop: 16,                                           
            speed: 2,                                           // Optional, Default is 1
            click: () => { console.log('Off Clicked');},        // Executes before animation starts
            complete: () => { console.log('Off Completed');}    // Executes after the animation is complete
        },

        oncomplete: () => {console.log('onCompleted();');},     // Executes when animation is complete (usually used when autoplay = true)
        onmouseover: function (obj) { obj.play(); },
        callback: function (obj) { console.log('callback'); }   // Passes back the animation object back. See Lottie-Web Doc on how to use
    });

*/
function lottie(config) {
    var counter = 1;
    var jsonData;

    Defer('js', 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/4.13.0/bodymovin.min.js', function () {
        if (!counter) return init();
        counter--;
    });

    config.path && httpRequest.get(config.path, function (data) {
        jsonData = data;
        if (!counter) return init();
        counter--;
    });

    config.data && httpRequest.get('/public/lottie.json', function (data) {
        jsonData = data;
        if (!counter) return init();
        counter--;
    });

    var animate = config.container;

    function init() {

        var info = {
            container: animate,
            renderer: config.renderer || 'svg',
            loop: config.loop || false,
            autoplay: false,
            animationData: jsonData,
        };

        var lottie = bodymovin.loadAnimation(info);
        config.autoplay ? lottie.play() : lottie.goToAndStop(config.frame || 0, true);
        click('onclick');
        // mouseOver('onmouseover');

        function click(mode) {
            if (config[mode]) animate.onclick = () => {
                lottie.destroy();
                lottie = bodymovin.loadAnimation(info);
                lottie.setSpeed(config[mode].speed || 1);
                var startFrame = config[mode].start;
                var stopFrame = config[mode].stop;
                lottie.playSegments([startFrame, stopFrame], true);

                config[mode].click(lottie);

                lottie.onComplete = () => {
                    config[mode].complete(lottie);
                    click(mode === 'onclick' ? 'offclick' : 'onclick');
                };
            };
        }


        // function mouseOver(mode) {
        //     if (config[mode]) animate.onmouseover = () => {
        //         lottie.destroy();
        //         lottie = bodymovin.loadAnimation(info);
        //         lottie.setSpeed(config[mode].speed || 1);
        //         var startFrame = config[mode].start || 0;
        //         var stopFrame = config[mode].stop || lottie.totalFrames;
        //         lottie.playSegments([startFrame, stopFrame], true);

        //         config[mode].start(lottie);

        //         lottie.onComplete = () => {
        //             config[mode].complete(lottie);
        //             animate.onmouseout = () => {
        //                 lottie.playSegments([stopFrame, startFrame], true);
        //             };
        //         };
        //     };
        // }

        if (config.onmouseover) animate.onmouseover = () => config.onmouseover(lottie);
        if (config.callback) config.callback(lottie);
        if (config.oncomplete) lottie.onComplete = () => config.oncomplete(lottie);

        /* DEBUG */
        if (config.debug) {
            var counter = 0;
            animate.setAttribute('data-counter', 0);
            animate.className += ' lottie-debug';

            var css = `.lottie-debug::before {
                content: "Frame " attr(data-counter) " of ${lottie.totalFrames}";
                position: fixed;
                font-weight: bold;
                font-size: 20px
                background-color: white;
                color: red;
                bottom: 0;
                left: 50%;
            }`;


            animate.onclick = function () {
                console.log('Frame', counter);
                animate.setAttribute('data-counter', counter);
                lottie.goToAndStop(counter, true);
                counter < lottie.totalFrames ? counter++ : null;
            };


            window.onkeydown = function (e) {

                e = e || window.event;

                if (e.code === 'ArrowLeft') {
                    counter > 0 || counter === lottie.totalFrames ? counter-- : null;
                    console.log('Frame', counter);
                    animate.setAttribute('data-counter', counter);
                }
                if (e.code === 'ArrowRight') {
                    counter < lottie.totalFrames ? counter++ : null;
                    console.log('Frame', counter);
                    animate.setAttribute('data-counter', counter);
                }

                lottie.goToAndStop(counter, true);

            };

            var element = document.createElement('style');
            element.setAttribute('type', 'text/css');

            if ('textContent' in element) {
                element.textContent = css;
            } else {
                element.styleSheet.cssText = css;
            }

            document.getElementsByTagName('head')[0].appendChild(element);
        }

    }
}