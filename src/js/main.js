import MainSlider from "./modules/slider/slider-main";
import MiniSlider from "./modules/slider/slider-mini";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import Form from "./modules/forms";
import ShowInfo from "./modules/showInfo";
import Download from "./modules/download";

window.addEventListener("DOMContentLoaded", () => {
    new MainSlider({btns: '.sidecontrol__controls .next', container: '.page'}).init();
    new MainSlider({
        btns: '.sidecontrol__controls .next',
        container: '.moduleapp',
        next: '.module__info-controls .nextmodule',
        prev: '.module__info-controls .prevmodule'
    }).init();

    const showUpSlider = new MiniSlider({
        container: '.showup__content-slider',
        prev: '.showup__prev',
        next: '.showup__next',
        activeClass: 'card-active',
        animate: true
    });
    showUpSlider.init();

    const modulesSlider = new MiniSlider({
        container: '.modules__content-slider',
        prev: '.modules__info-btns .slick-prev',
        next: '.modules__info-btns .slick-next',
        activeClass: 'card-active',
        animate: true,
        autoplay: true
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: '.feed__slider',
        prev: '.feed__slider .slick-prev',
        next: '.feed__slider .slick-next',
        activeClass: 'feed__item-active'
    });
    feedSlider.init();
    
    new VideoPlayer('.showup .play', '.overlay').init();
    new VideoPlayer('.module__video-item .play', '.overlay').init();
    new VideoPlayer('.feed .playvideo', '.overlay').init();
    new VideoPlayer('.schedule__info .play', '.overlay').init();
    
    new Difference('.officerold', '.officernew', '.officer__card-item').init();

    new Form('.form').init();

    new ShowInfo('.module .plus').init();

    new Download('.moduleapp .download').init();
});