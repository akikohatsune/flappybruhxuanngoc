// ==UserScript==
// @name         flappybruhxuanngoc
// @namespace    flappy-control
// @version      1.0
// @author       akikohatsune
// @match        https://flappybird-3bwbqx4q.manus.space/*
// @icon         https://ayanomi.io.vn/img-source/img/airi/airimomoi%20(4).png
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
    'use strict';

    const GOD_KEY   = 'fp-god';
    const AUTO_KEY  = 'fp-auto';
    const SPEED_KEY = 'fp-speed';

    let god =
        localStorage.getItem(GOD_KEY) !== 'false';

    let auto =
        localStorage.getItem(AUTO_KEY) === 'true';

    let speed =
        Number(localStorage.getItem(SPEED_KEY) || 1);

    speed = Math.max(1, Math.min(20, speed));

    function sync() {
        const html =
            document.documentElement;

        if (!html)
            return;

        html.dataset.fpGod =
            god ? '1' : '0';

        html.dataset.fpAuto =
            auto ? '1' : '0';

        html.dataset.fpSpeed =
            String(speed);
    }

    sync();

    function createUI() {

        if (
            document.getElementById(
                'fp-panel'
            )
        ) return;


        const style =
            document.createElement('style');


        style.textContent = `

        #fp-panel {
            position: fixed;
            top: 15px;
            right: 15px;

            z-index: 2147483647;

            width: 220px;

            padding: 12px;

            background: rgba(18,18,20,.94);
            border: 1px solid #333;
            border-radius: 8px;

            color: #eee;

            font-family:
                Arial,
                sans-serif;

            font-size: 13px;

            box-shadow:
                0 5px 20px rgba(0,0,0,.35);

            user-select: none;
        }


        #fp-panel * {
            box-sizing: border-box;
        }


        #fp-panel .title {
            display: flex;
            justify-content: space-between;
            align-items: center;

            font-weight: bold;

            margin-bottom: 8px;
        }


        #fp-panel .close {
            border: 0;
            background: transparent;
            color: #aaa;

            cursor: pointer;

            font-size: 16px;
        }


        #fp-panel .row {
            display: flex;
            align-items: center;
            justify-content: space-between;

            height: 34px;

            border-top:
                1px solid #292929;
        }


        #fp-panel .row:first-of-type {
            border-top: 0;
        }


        /* switch */

        #fp-panel .switch {
            width: 34px;
            height: 18px;

            position: relative;
        }


        #fp-panel .switch input {
            display: none;
        }


        #fp-panel .slider {
            position: absolute;
            inset: 0;

            background: #444;

            border-radius: 20px;

            cursor: pointer;
        }


        #fp-panel .slider:before {
            content: "";

            position: absolute;

            width: 14px;
            height: 14px;

            left: 2px;
            top: 2px;

            background: white;

            border-radius: 50%;

            transition: .15s;
        }


        #fp-panel input:checked + .slider {
            background: #38a169;
        }


        #fp-panel input:checked + .slider:before {
            transform: translateX(16px);
        }


        /* speed */

        #fp-speed {
            width: 115px;
        }


        #fp-speed-value {
            min-width: 32px;
            text-align: right;

            font-weight: bold;
        }


        #fp-panel .speed-control {
            display: flex;
            align-items: center;
            gap: 6px;
        }


        #fp-panel .footer {
            margin-top: 6px;
            padding-top: 7px;

            border-top:
                1px solid #292929;

            color: #777;

            font-size: 10px;

            text-align: center;
        }

        `;


        document.documentElement
            .appendChild(style);



        const panel =
            document.createElement('div');


        panel.id =
            'fp-panel';


        panel.innerHTML = `

        <div class="title">

            <span>
                Flappy Control
            </span>

            <button
                class="close"
            >
                ×
            </button>

        </div>


        <div class="row">

            <span>
                God Mode
            </span>

            <label class="switch">

                <input
                    id="fp-god"
                    type="checkbox"
                >

                <span
                    class="slider"
                ></span>

            </label>

        </div>


        <div class="row">

            <span>
                Autopilot
            </span>

            <label class="switch">

                <input
                    id="fp-auto"
                    type="checkbox"
                >

                <span
                    class="slider"
                ></span>

            </label>

        </div>


        <div class="row">

            <span>
                Speed
            </span>

            <div class="speed-control">

                <input
                    id="fp-speed"
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                >

                <span
                    id="fp-speed-value"
                >
                    1x
                </span>

            </div>

        </div>


        <div class="footer">
            F2: Menu &nbsp; G: God &nbsp; P: Auto
        </div>

        `;


        document.documentElement
            .appendChild(panel);



        const godInput =
            panel.querySelector(
                '#fp-god'
            );


        const autoInput =
            panel.querySelector(
                '#fp-auto'
            );


        const speedInput =
            panel.querySelector(
                '#fp-speed'
            );


        const speedValue =
            panel.querySelector(
                '#fp-speed-value'
            );


        function update() {

            godInput.checked =
                god;

            autoInput.checked =
                auto;

            speedInput.value =
                speed;

            speedValue.textContent =
                speed + 'x';

            sync();
        }

        godInput.addEventListener(
            'change',
            () => {

                god =
                    godInput.checked;

                localStorage.setItem(
                    GOD_KEY,
                    god
                );

                update();
            }
        );

        autoInput.addEventListener(
            'change',
            () => {

                auto =
                    autoInput.checked;

                localStorage.setItem(
                    AUTO_KEY,
                    auto
                );

                update();
            }
        );

        speedInput.addEventListener(
            'input',
            () => {

                speed =
                    Number(
                        speedInput.value
                    );

                localStorage.setItem(
                    SPEED_KEY,
                    speed
                );

                update();
            }
        );

        panel
            .querySelector('.close')
            .addEventListener(
                'click',
                () => {

                    panel.style.display =
                        'none';
                }
            );

        window.addEventListener(
            'keydown',
            e => {

                if (
                    e.code === 'F2'
                ) {

                    e.preventDefault();

                    panel.style.display =
                        panel.style.display === 'none'
                            ? ''
                            : 'none';

                }


                else if (
                    e.code === 'KeyG'
                ) {

                    god = !god;

                    localStorage.setItem(
                        GOD_KEY,
                        god
                    );

                    update();

                }


                else if (
                    e.code === 'KeyP'
                ) {

                    auto = !auto;

                    localStorage.setItem(
                        AUTO_KEY,
                        auto
                    );

                    update();

                }

            },

            true
        );


        update();
    }

    const BUNDLE =
        /\/assets\/index-[^/]+\.js(?:\?.*)?$/;


    let patchedAlready =
        false;

    function patch(
        code,
        from,
        to,
        name
    ) {

        if (
            !code.includes(from)
        ) {

            console.warn(
                '[Flappy] Missing:',
                name
            );

            return code;
        }


        console.log(
            '[Flappy] Patched:',
            name
        );


        return code.replace(
            from,
            to
        );
    }

    async function patchBundle(
        script
    ) {

        if (
            patchedAlready ||
            !script?.src ||
            !BUNDLE.test(script.src)
        ) {

            return;
        }


        patchedAlready = true;


        const src =
            script.src;

        script.type =
            'application/x-blocked';

        script.removeAttribute(
            'src'
        );

        script.remove();

        const response =
            await fetch(
                src,
                {
                    cache: 'no-store'
                }
            );


        let code =
            await response.text();

        code = patch(

            code,

            'else if(Il>=5)return;',

            'else if(Il>=5&&document.documentElement.dataset.fpGod!=="1"&&document.documentElement.dataset.fpAuto!=="1")return;',

            '5 point flap lock'

        );

        code = patch(

            code,

            'Il===5&&(P.x=.38,P.gapY=Math.max(.18,Math.min(.82,(Ol*fl-sl)/(I-sl))))',

            'Il===5&&document.documentElement.dataset.fpGod!=="1"&&document.documentElement.dataset.fpAuto!=="1"&&(P.x=.38,P.gapY=Math.max(.18,Math.min(.82,(Ol*fl-sl)/(I-sl))))',

            '5 point trap'

        );

        code = patch(

            code,

            'rl==="playing"&&Math.abs(Ga-Bt)<34&&(Ol*fl<ja-va/2+20||Ol*fl>ja+va/2-20)&&eu()',

            'rl==="playing"&&Math.abs(Ga-Bt)<34&&(Ol*fl<ja-va/2+20||Ol*fl>ja+va/2-20)&&document.documentElement.dataset.fpGod!=="1"&&eu()',

            'pipe collision'

        );

        code = patch(

            code,

            '(Ol*fl<sl+22||Ol*fl>I-22)&&eu()',

            '(Ol*fl<sl+22||Ol*fl>I-22)&&(document.documentElement.dataset.fpGod==="1"?(Ol=Math.max((sl+22)/fl,Math.min((I-22)/fl,Ol)),S=0):eu())',

            'bounds'

        );

        code = patch(

            code,

            'P.x-=X*kl.speed',

            'P.x-=X*kl.speed*Number(document.documentElement.dataset.fpSpeed||1)',

            'speed'

        );

        const loop =

            'const J=innerWidth,fl=innerHeight,El=fl*.9,sl=fl*.12,I=fl*.88,jl=Math.min(1,J/1280),Bt=J*.42;A.clearRect(0,0,J,fl)';


        const autoCode = `

const J=innerWidth,
fl=innerHeight,
El=fl*.9,
sl=fl*.12,
I=fl*.88,
jl=Math.min(1,J/1280),
Bt=J*.42;

if(
    document.documentElement.dataset.fpAuto==="1"
){

    window.__FP_LAST_FLAP__ ??=
        -999;


    if(
        rl==="ready"
    ){

        rl="playing";

        S=kl.flap;

        G();

        xt("playing");

        window.__FP_LAST_FLAP__=
            p;

    }


    if(
        rl==="playing"
    ){

        const targetPipe =
            cl
            .filter(
                pipe =>
                    pipe.x > .34
            )
            .sort(
                (a,b) =>
                    a.x-b.x
            )[0];


        const targetY =
            targetPipe
                ? sl +
                  targetPipe.gapY *
                  (I-sl)
                : (sl+I)/2;


        const birdY =
            Ol*fl;


        const speedMult =
            Number(
                document.documentElement
                .dataset.fpSpeed || 1
            );


        const tolerance =
            Math.max(
                3,
                14 -
                speedMult * .4
            );


        if(
            birdY >
            targetY +
            tolerance
        ){

            if(
                p -
                window.__FP_LAST_FLAP__
                >
                .075
            ){

                S =
                    kl.flap;

                window.__FP_LAST_FLAP__ =
                    p;

            }

        }

    }

}

A.clearRect(0,0,J,fl)

        `.replace(
            /\n\s*/g,
            ''
        );


        code = patch(

            code,

            loop,

            autoCode,

            'autopilot'

        );

        if (
            document.readyState ===
            'loading'
        ) {

            await new Promise(
                resolve => {

                    document.addEventListener(
                        'DOMContentLoaded',
                        resolve,
                        {
                            once: true
                        }
                    );

                }
            );

        }

        sync();

        createUI();

        const newScript =
            document.createElement(
                'script'
            );


        newScript.type =
            'module';


        newScript.textContent =
            code +
            '\n//# sourceURL=flappy-control-patched.js';


        (
            document.head ||
            document.documentElement
        ).appendChild(
            newScript
        );


        console.log(
            '[Flappy] Ready'
        );
    }

    function inspect(
        node
    ) {

        if (
            !(node instanceof Element)
        ) return;


        if (
            node.tagName ===
            'SCRIPT'
        ) {

            patchBundle(
                node
            ).catch(
                console.error
            );

        }

        node
            .querySelectorAll?.(
                'script[src]'
            )
            .forEach(
                script => {

                    patchBundle(
                        script
                    ).catch(
                        console.error
                    );

                }
            );
    }

    document
        .querySelectorAll?.(
            'script[src]'
        )
        .forEach(
            inspect
        );

    const observer =
        new MutationObserver(
            records => {

                for (
                    const record
                    of records
                ) {

                    for (
                        const node
                        of record.addedNodes
                    ) {

                        inspect(
                            node
                        );

                    }

                }


                if (
                    patchedAlready
                ) {

                    observer.disconnect();

                }

            }
        );

    observer.observe(
        document.documentElement,
        {
            childList: true,
            subtree: true
        }
    );

})();
