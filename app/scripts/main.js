var callbacks = $.Callbacks('once');
$(document).ready(function () {
    callbacks.add(onDataReady);
    fireHelper.init();
});




function onDataReady() {
    callbacks.add(onPageReady);
    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        $('.nojs').addClass('hasjs').removeClass('nojs');
        $('.checkMobile').addClass('isDesktop').removeClass('checkMobile');
    }
    $(window).load(scrollFunctions());
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
            target = $('[name=' + location.hash.slice(1) + ']');
            if (target.length > 0) {
                $('html,body').scrollTop(target.offset().top);
            }
        }


    }
}

function onPageReady() {
    smoothScrollInit();
    $('.modal-trigger').leanModal();
    $('.slider').slider();
    //Check if what images have been loaded
    imagesLoaded($('#what'), function () {

        onImagesReady();
        //Go to url hash
        if (location.hash != '#about') {
            jumpToHash();
            $('body').addClass('pageReady');
        };
        $('.roulette').pushpin({
            top: $('#what>.section-card').offset().top,
            bottom: $('.marketing').offset().top - 0,
            offset: 120
        });
        startingScreen();
    });

    //Check if all images have been loaded
    imagesLoaded($('body'), function () {
        onImagesReady();
        jumpToHash();
        $('body').addClass('pageReady');

    });
}

function onImagesReady() {
    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        skrollr.init().refresh();
    }
}