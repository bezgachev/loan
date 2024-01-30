import Slider from "./modules/slider";
import VideoPlayer from "./modules/playVideo";

window.addEventListener("DOMContentLoaded", () => {
    "use strict";

    new Slider('.page', '.next').render();
    new VideoPlayer('.showup .play', '.overlay').init();

});