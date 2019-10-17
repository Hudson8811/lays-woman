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
                    $(this).removeClass("non-swiper-slide").addClass("swiper-slide");
                } else {
                    $(this).removeClass("swiper-slide").addClass("non-swiper-slide");
                }
            });

            swiper.destroy();
            swiper = new Swiper('.swiper-container.recepts', {
                slidesPerView: 'auto',
                spaceBetween: 0,
                mousewheel: true
            });
        }
    });


    function lockScroll(){
        $html = $('html');
        $body = $('body');
        var initWidth = $body.outerWidth();
        var initHeight = $body.outerHeight();

        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
        ];
        $html.data('scroll-position', scrollPosition);
        $html.data('previous-overflow', $html.css('overflow'));
        $html.css('overflow', 'hidden');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        var marginR = $body.outerWidth()-initWidth;
        var marginB = $body.outerHeight()-initHeight;
        $body.css({'margin-right': marginR,'margin-bottom': marginB});
    }

    function unlockScroll(){
        $html = $('html');
        $body = $('body');
        $html.css('overflow', $html.data('previous-overflow'));
        var scrollPosition = $html.data('scroll-position');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);


        $body.css({'margin-right': 0, 'margin-bottom': 0});
    }

    var $window = $( window );
    var $featuredImage = $( ".recept-block .left .img" );
    var offsetTo = 0;

    scrolled = 0;
    scrollLock = 0;

    if ($('.recept-page').hasClass('recept-page')){
        $(window).on('scroll', function() {
            var scrollTop = $(this).scrollTop();
            if (scrollTop > 0 && scrolled == 0 && scrollLock == 0){
                scrollLock = 1;
                scrolled = 1;
                lockScroll();
                $('.first-screen').slideUp(400);
                $('html,body').animate({
                    scrollTop: 1
                }, 410, 'linear');
                setTimeout(function () {
                    scrollLock = 0;
                    unlockScroll();
                }, 450);
            } else if (scrollTop == 0 && scrolled == 1 && scrollLock == 0){
                scrollLock = 1;
                scrolled = 0;
                $('.first-screen').slideDown(400);
                lockScroll();
                setTimeout(function () {
                    scrollLock = 0;
                    unlockScroll();
                }, 450);
            }
        });

        $('.first-screen .open .arrow-down').click(function () {
            if (scrolled == 0&& scrollLock == 0) {
                $('html,body').animate({
                    scrollTop: 1
                }, 100, 'linear');
            }
        });


        $window.on( "scroll", function() {
            $featuredImage.toggleClass( "is-sticky",
                $window.scrollTop() > offsetTo
            );
        } );

    }

});



