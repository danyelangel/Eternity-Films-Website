if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {

    $(document).ready(function () {
        $('.nojs').show().addClass('hasjs').removeClass('nojs');
        fireHelper.init();
        onReadyScroll();

    });
    $(window).load(function () {
        onLoadScroll();

    });
}