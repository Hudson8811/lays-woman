$(document).ready(function() {
    swiper = new Swiper('.swiper-container.recepts', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        mousewheel: true
    });

    $('.first-slide .arrow-right').click(function () {
        swiper.slideNext();
    });


    $(".home-page .tabs .tab").on("click", function(){
        var filter = $(this).data('filter');
        $(".home-page .tabs .tab").removeClass("active");
        $(this).addClass("active");

        if(filter=="all"){
            $(".recepts [data-filter]").removeClass("non-swiper-slide").addClass("swiper-slide");

            swiper.destroy();
            swiper = new Swiper('.swiper-container.recepts', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                mousewheel: true
            });
        }
        else {
            $(".recepts [data-filter]").each(function () {
                var tags = $(this).data('filter');
                if ($.inArray(filter, tags) > -1) {
                    $(this).not("[data-filter='all']").removeClass("non-swiper-slide").addClass("swiper-slide");
                } else {
                    $(this).not("[data-filter='all']").removeClass("swiper-slide").addClass("non-swiper-slide");
                }
            });

            swiper.destroy();
            swiper = new Swiper('.swiper-container.recepts', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                mousewheel: true
            });
        }
    })
});