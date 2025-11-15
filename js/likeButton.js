class LikeButton extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
                :host {
                    --particle-count: 14;
                    --angle-jitter: 0.08turn;
                    --radius-jitter: 15px;
                    --radius: 200px;
                    --initial-radius: 150px;
                    --animate-time: 800ms;
                    display: inline-block;
                }

                .likeButton {
                    cursor: pointer;
                    transform-origin: 250px 187.5px;
                    overflow: visible;
                }

                .likeButton .border {
                    fill: #fff;
                }

                .likeButton .explosion {
                    transform-origin: 250px 187.5px;
                    transform: scale(0.02);
                    stroke: #dd4688;
                    fill: none;
                    opacity: 0;
                    stroke-width: 1;
                }

                .likeButton .particleLayer {
                    opacity: 0;
                    transform-origin: 250px 187.5px;
                }

                .likeButton .particleLayer circle {
                    opacity: 0;
                    transform-origin: 250px 187.5px;
                }

                .heart {
                    fill: transparent;
                    stroke: #aaa;
                    stroke-width: 8;
                    cursor: pointer;
                    transition: stroke 0.2s, fill 0.2s;
                    transform-origin: 250px 187.5px;
                }

                .heart:hover {
                    stroke: #e2264d;
                }

                .likeButton.clicked .heart {
                    animation: heartAnime var(--animate-time) forwards;
                    fill: #e2264d;
                    stroke: #e2264d;
                }

                .likeButton.clicked .explosion {
                    animation: explosionAnime var(--animate-time) forwards;
                }

                .likeButton.clicked .particleLayer {
                    animation: particleLayerAnime var(--animate-time) forwards;
                }

                .likeButton.clicked .particleLayer circle {
                    animation-name: particleAnimate;
                    animation-duration: var(--animate-time);
                    animation-fill-mode: forwards;
                    --angle-seed: calc(mod(var(--particle-index) * 137, 360));
                    --radius-seed: calc(mod(var(--particle-index) * 161, 100));
                    --angle-offset: calc(((var(--angle-seed) / 360) - 0.5) * 2 * var(--angle-jitter));
                    --radius-offset: calc(((var(--radius-seed) / 100) - 0.5) * 2 * var(--radius-jitter));
                    --angle: calc((var(--particle-index) / var(--particle-count) * 1turn) + var(--angle-offset));
                    --eff-initial-r: calc(var(--initial-radius) + var(--radius-offset));
                    --eff-final-r: calc(var(--radius) + var(--radius-offset));
                    --initial-x: calc(var(--eff-initial-r) * cos(var(--angle)));
                    --initial-y: calc(var(--eff-initial-r) * sin(var(--angle)));
                    --target-x: calc(var(--eff-final-r) * cos(var(--angle)));
                    --target-y: calc(var(--eff-final-r) * sin(var(--angle)));
                }

                .particleLayer circle:nth-child(1){--particle-index:1;}
                .particleLayer circle:nth-child(2){--particle-index:2;}
                .particleLayer circle:nth-child(3){--particle-index:3;}
                .particleLayer circle:nth-child(4){--particle-index:4;}
                .particleLayer circle:nth-child(5){--particle-index:5;}
                .particleLayer circle:nth-child(6){--particle-index:6;}
                .particleLayer circle:nth-child(7){--particle-index:7;}
                .particleLayer circle:nth-child(8){--particle-index:8;}
                .particleLayer circle:nth-child(9){--particle-index:9;}
                .particleLayer circle:nth-child(10){--particle-index:10;}
                .particleLayer circle:nth-child(11){--particle-index:11;}
                .particleLayer circle:nth-child(12){--particle-index:12;}
                .particleLayer circle:nth-child(13){--particle-index:13;}
                .particleLayer circle:nth-child(14){--particle-index:14;}

                @keyframes explosionAnime {
                    0% {opacity: 0; transform: scale(0.01);}
                    1% {opacity: 1; transform: scale(0.01);}
                    5% {stroke-width: 200;}
                    20% {stroke-width: 300;}
                    50% {stroke: #cc8ef5; transform: scale(1.1); stroke-width: 1;}
                    50.1% {stroke-width: 0;}
                    100% {stroke: #cc8ef5; transform: scale(1.1); stroke-width: 0;}
                }

                @keyframes particleLayerAnime {
                    0% {transform: translate(0,0); opacity:0;}
                    30% {opacity:0;}
                    31% {opacity:1;}
                    60% {transform: translate(0,0);}
                    70% {opacity:1;}
                    100% {opacity:0; transform: translate(0,-20px);}
                }

                @keyframes particleAnimate {
                    0% {transform: translate(var(--initial-x), var(--initial-y));}
                    30% {opacity:1; transform: translate(var(--initial-x), var(--initial-y));}
                    80% {transform: translate(var(--target-x), var(--target-y));}
                    100% {opacity:1; transform: translate(var(--target-x), var(--target-y));}
                }

                @keyframes heartAnime {
                    0% {transform: scale(0); fill: #e2264d;}
                    39% {transform: scale(0);}
                    60% {transform: scale(1.2,1.2);}
                    70% {transform: scale(1,1) translate(0%,-10%);}
                    75% {transform: scale(1.1,0.9) translate(0%,5%);}
                    80% {transform: scale(0.95,1.05) translate(0%,-3%);}
                    100% {transform: scale(1,1) translate(0%,0%); fill:#e2264d;}
                }
            </style>

            <button type="button" class="js-fav">
                <svg class="likeButton" width="50px" height="50px" viewBox="155 140 190 125">
                    <circle class="explosion" cx="250" cy="250" r="150"></circle>
                    <g class="particleLayer">
                        <circle cx="250" cy="250" r="12" fill="#8CE8C3" />
                        <circle cx="250" cy="250" r="12" fill="#8CE8C3" />
                        <circle cx="250" cy="250" r="12" fill="#91D2FA" />
                        <circle cx="250" cy="250" r="12" fill="#91D2FA" />
                        <circle cx="250" cy="250" r="10" fill="#CC8EF5" />
                        <circle cx="250" cy="250" r="10" fill="#9BDFBA" />
                        <circle cx="250" cy="250" r="10" fill="#9BDFBA" />
                        <circle cx="250" cy="250" r="10" fill="#9FC7FA" />
                        <circle cx="250" cy="250" r="10" fill="#9FC7FA" />
                        <circle cx="250" cy="250" r="10" fill="#96D8E9" />
                        <circle cx="250" cy="250" r="13" fill="#CC8EF5" />
                        <circle cx="250" cy="250" r="10" fill="#DB92D0" />
                        <circle cx="250" cy="250" r="10" fill="#DB92D0" />
                        <circle cx="250" cy="250" r="10" fill="#DD99B8" />
                    </g>
                    <path class="heart" d="M250,187.4c-31.8-47.8-95.5-19.8-95.5,32.2c0,35.2,31.8,60.3,55.7,79.2c24.9,19.7,31.8,23.9,39.8,31.8
                    c7.9-7.9,14.6-12.6,39.8-31.8c24.3-18.5,55.7-44.4,55.7-79.6C345.5,167.6,281.8,139.7,250,187.4z"/>
                </svg>
            </button>
        `;

        const button = shadow.querySelector('.js-fav');

        heart.addEventListener('click', (e) => {
            e.stopPropagation();

            const svg = heart.closest('.js-fav');
            svg.classList.toggle('clicked');

            // ✔ 外へイベント発火
            this.dispatchEvent(
                new CustomEvent('favorite-click', {
                    bubbles: true, // 親要素まで届く
                })
            );
        });
    }
}

customElements.define('like-button', LikeButton);
