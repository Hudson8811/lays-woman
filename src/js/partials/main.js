$(document).ready(function() {
    var swiper = new Swiper('.swiper-container.recepts', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        mousewheel: true
    });

    $('.first-slide .arrow-right').click(function () {
        swiper.slideNext();
    });

});