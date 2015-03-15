function scrollFunctions() {
    var services = {
            film: 'FILM PRODUCTION',
            web: 'WEB',
            photo: 'PHOTOGRAPHY',
            design: 'DESIGN',
            marketing: 'MARKETING'
        },
        titles = {
            film: 'Show don\'t tell',
            web: 'Your customers are online, you should be too',
            photo: 'You don’t take a photograph, you make it',
            design: 'Your brand is a promise. Your brand is an asset',
            marketing: 'If your work is not online it does not exist'
        },
        images = {
            film: 'film',
            web: 'web',
            photo: 'photo',
            design: 'design',
            marketing: 'marketing'
        },
        colors = {
            film: 'amber',
            web: 'green',
            photo: 'blue',
            design: 'red',
            marketing: 'purple'
        };
    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        var hashLinks = ['#intro', '#home', '#film', '#web', '#photo', '#design', '#marketing', '#portfolio', '#about'];
        var hashLinkItems = ['.hash-intro', '.hash-home', '#film', '#web', '#photo', '#design', '#marketing', '.hash-portfolio', '.hash-about'];
        var hashItems = [];
        $.each(hashLinkItems, function (index, value) {
            hashItems.push($(value));
        });


        $(window).scroll(function () {
            checkServiceVisibility(services, titles, images, colors);
            hashNavigation(hashItems, hashLinks);
        });
        skrollr.init({
            forceHeight: false,
            render: skrollrReady
        });


    }


}

function skrollrReady() {
    callbacks.fire();
}

function checkServiceVisibility(services, titles, images, colors) {

    var scrollTop = $(window).scrollTop();

    function changeClasses(color) {
        $('nav, nav ul a').removeClass();
        if (color == 'white') {
            $('.brand-logo img').attr('src', 'images/eternitylogo_black.png');
            $('nav').addClass('grey lighten-5');
            $('nav ul a').addClass('valign grey-text text-darken-2 weight-300');
            return true;
        } else {
            if (color == 'grey') {
                $('nav').addClass('grey darken-3');
            } else {
                $('nav').addClass(color);
            }
        }
        $('.brand-logo img').attr('src', 'images/eternitylogo_white.png');
        $('nav ul a').addClass('valign white-text weight-300');
        $('nav').addClass('z-depth-1');
        return true;
    }
    for (service in services) {
        if ($('.' + service + '>p').visible(true)) {
            changeTitle(services[service], titles[service], images[service]);
            $('.' + service).css('opacity', 1);
            changeClasses(colors[service]);
            return true
        }

    }
    if (scrollTop > $('.hash-portfolio').offset().top - 650) {
        changeClasses('grey');
        return true;
    }
    if (scrollTop < $('.hash-about').offset().top) {
        changeClasses('white');
    }
}

function changeTitle(service, title, image) {
    $('.roulette>h4').html(service);
    $('.roulette>p>i').html(title);
    $('.roulette>.roulette-current').css('opacity', '0');
    $('.roulette>.roulette-' + image).css('opacity', '1');
}