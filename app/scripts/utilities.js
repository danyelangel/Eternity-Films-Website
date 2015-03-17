//First screen gifs
function startingScreen() {
    $('#intro .intro-image').css('background-image', 'url(images/intro1.gif)');
    setTimeout(function () {
        $('#intro .intro-text img').attr('src', 'images/intro2.gif');
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
            console.log(top + ' ' + distance + ' ' + hash)
            console.log(location.hash + ' ' + hash);
            if (distance < 0 && distance > range) {
                location.hash = hash;
            }




        });
    }
}