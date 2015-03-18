//First screen gifs
function startingScreen() {
    $('.introImgText').attr('src', 'images/intro1.gif');
    setTimeout(function () {
        $('.introImgLoader').attr('src', 'images/intro2.gif');
    }, 5000);
}


function smoothScrollInit() {
    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        //Smooth Scroll
        $('a.hash-noScroll').click(function () {
            var target = $('[name=' + this.hash.slice(1) + ']');
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').scrollTop(target.offset().top);
                location.hash = this.hash;
                return false;

            }

        });
        $('a.hash').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                var hash = this.hash;
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    if (!target.attr('data-hash-offset')) {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 120
                        }, 1000);
                        return false;
                    } else {
                        $('html,body').animate({
                            scrollTop: target.offset().top - 120 + ($(window).height() * target.attr('data-hash-offset') / 100)
                        }, 1000);
                        setTimeout(function () {
                            location.hash = hash;
                            return false;
                        }, 1000)

                    }
                }
            }

        });
    }
}



function hashNavigation(hashItems, hashLinks) {
    if ($('body').hasClass('pageReady')) {
        var range = -$(window).height() / 2;
        $.each(hashItems, function (index, value) {
            var top = window.pageYOffset;
            var distance = top - $(this).offset().top;
            var hash = hashLinks[index];
            if (distance < 0 && distance > range) {
                location.hash = hash;
            }
        });
    }
}

function jumpToHash() {
    target = $(location.hash);
    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        switch (location.hash) {
        case '#intro':
            $('html,body').scrollTop((target.offset().top - 64));
            break;
        case '#home':
            $('html,body').scrollTop($('.hash-home').offset().top + $(window).height());
            break;
        case '#portfolio':
            $('html,body').scrollTop(($('.hash-portfolio').offset().top - 180));
            break;
        case '#about':
            $('html,body').scrollTop(($('.hash-about').offset().top - 180));
            break;
        default:
            if (location.hash.length > 1) {
                target = $('[name=' + location.hash.slice(1) + ']');
                if (target.length > 0) {
                    $('html,body').scrollTop(target.offset().top);
                } else {
                    location.hash = '#intro';
                    $('html,body').scrollTop(0);
                }
            } else {
                location.hash = '#intro';
                $('html,body').scrollTop(0);
            }
        }


    }
}