import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(container, btns, next, prev) {
        super(container, btns, next, prev);
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.opacity = '0';

            if (n == 3) {
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1';
                    this.hanson.classList.add('slideInUp');
                }, 3000);
            } else {
                this.hanson.classList.remove('slideInUp');
            }

        } catch(e){}

        Array.from(this.slides).forEach(slide => {
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';

    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    BtnTriggers(itemsBtn, n) {
        itemsBtn.forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(n);
            });
        });
    }

    bindTriggers() {
        this.btns.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.plusSlides(1);
            });

            item.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });

        });

        if (this.prev && this.next) {
            this.BtnTriggers(this.next, 1);
            this.BtnTriggers(this.prev, -1);
        }
    }

    init() {
        if (this.container) {
            try {
                this.hanson = document.querySelector('.hanson');
            } catch(e){}
                
            this.showSlides(this.slideIndex);
            this.bindTriggers();
        }
    }
}