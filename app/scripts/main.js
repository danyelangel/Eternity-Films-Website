var callbacks = $.Callbacks('once');
$(document).ready(function () {
    callbacks.add(onDataReady);
    fireHelper.init();
});
$(window).resize(function () {
    setTimeout(function () {
        location.reload();
    }, 500);
});




function onDataReady() {
    callbacks.add(onPageReady);
    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        $('.nojs').addClass('hasjs').removeClass('nojs');
        $('.checkMobile').addClass('isDesktop').removeClass('checkMobile');
    }
    $(window).load(scrollFunctions());
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
        setRoulette();
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

function setRoulette() {
    var pushpinOffset = ($(window).height() / 2) - 250;
    $('[name=film]').css('margin-top', -pushpinOffset);

    $('.roulette').pushpin({
        top: $('.roulette').offset().top,
        bottom: $('.marketing').offset().top + 50,
        offset: pushpinOffset
    });
}