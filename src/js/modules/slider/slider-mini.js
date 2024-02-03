import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay, playing) {
        super(container, next, prev, activeClass, animate, autoplay, playing);
    }

    decorizeSlides() {
        Array.from(this.slides).forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        this.slides[0].classList.add(this.activeClass);

        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if (this.container.querySelector('button')) {
            this.container.insertBefore(this.slides[0], this.container.querySelector('button'));
        } else {
            this.container.appendChild(this.slides[0]);
        }
        this.decorizeSlides();
    }

    bindTriggers() {
        this.next.forEach(el => {
            el.addEventListener('click', (e) => this.nextSlide());
        });

        this.prev.forEach(el => {
            el.addEventListener('click', (e) => {

                for (let i = this.slides.length - 1; i > 0; i--) {
                    if (this.slides[i].tagName !== "BUTTON") {
                        let active = this.slides[i];
                        this.container.insertBefore(active, this.slides[0]);
                        this.decorizeSlides();
                        break;
                    }
                }
                
            });
        });
    }

    startPlay() {
        this.playing = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopPlay() {
        clearInterval(this.playing);
    }

    init() {
        try {
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSlides();

            if (this.autoplay) {
                this.startPlay();

                [this.container, ...this.next, ...this.prev].forEach(el => {
                    el.addEventListener('mouseenter', () => this.stopPlay());
                });

                [this.container, ...this.next, ...this.prev].forEach(el => {
                    el.addEventListener('mouseleave', () => this.startPlay());
                });

            }
        } catch(e){}
    }
}