export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                'onStateChange': this.onPlayerStateChange
            }
        });

        this.overlay.style.cssText = `
            display: flex;
            z-index: 999;
        `;
    }

    onPlayerStateChange(state) {
        try {
            const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling,
                playSvg = this.activeBtn.querySelector('svg').cloneNode(true),
                playBtn = blockedElem.querySelector('.play__circle'),
                platText = blockedElem.querySelector('.play__text');

            if (state.data === 0) {
                if (playBtn.classList.contains('closed')) {
                    playBtn.classList.remove('closed');
                    blockedElem.querySelector('svg').remove();
                    playBtn.appendChild(playSvg);
                    platText.textContent = 'play video';
                    platText.classList.remove('attention');
                    blockedElem.setAttribute('data-disabled', 'false');
                    blockedElem.style.cssText = `
                        opacity: 1;
                        filter: none;
                    `;
                }
            }
        } catch(e){}
    }

    bindTriggers() {
        this.btns.forEach((btn, i) => {
            try {
                const blockedElem = btn.closest('.module__video-item').nextElementSibling;
                if (i % 2 == 0) {
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            } catch(e){}

            btn.addEventListener('click', () => {
                if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
                    this.activeBtn = btn;

                    if (document.querySelector('iframe#frame')) {
                        this.overlay.style.display = 'flex';
                        // this.player.playVideo();
                        if (this.path !== btn.getAttribute('data-url')) {
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({videoId: this.path});
                        }
                    } else {
                        this.path = btn.getAttribute('data-url');
                        this.createPlayer(this.path);
                    }
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = 'none';
            this.player.pauseVideo();
        });
    }

    init() {
        if (this.btns.length > 0) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
            this.bindTriggers();
            this.bindCloseBtn();
        }
    }

}