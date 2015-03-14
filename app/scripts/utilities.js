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
        $('a.hash').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 120
                    }, 1000);
                    location.hash = this.hash;
                    return false;
                }
            }

        });
    }
}

function hashNavigation(hashItems, hashLinks) {
    $.each(hashItems, function (index, value) {
        if (value.visible() && $('body').hasClass('pageReady')) {
            location.hash = hashLinks[index];
        }
    });
}