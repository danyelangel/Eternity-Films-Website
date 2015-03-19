var callbacks = $.Callbacks('once');
$(document).ready(function () {
    callbacks.add(onDataReady);
    fireHelper.init();
});
$(window).resize(function () {
    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        setTimeout(function () {
            location.reload();
        }, 500);
    }
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
    $('select').material_select();
    //Check if what images have been loaded
    imagesLoaded($('#what'), function () {

        onImagesReady();
        //Go to url hash
        if (location.hash != '#about') {
            jumpToHash();
            $('body').addClass('pageReady');
        };
        if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
            setRoulette();
        }
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
    if ($(window).height() > 700) {
        var pushpinOffset = ($(window).height() / 2) - 250;
        $('[name=film]').css({
            'margin-top': -pushpinOffset + 50
        });
    } else {
        var pushpinOffset = 150;
        $('[name=film]').css({
            'margin-top': -60
        });
    }

    $('.roulette').pushpin({
        top: $('.roulette').offset().top,
        bottom: $('.marketing').offset().top + 50,
        offset: pushpinOffset
    });
}