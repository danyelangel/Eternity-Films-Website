//Define objects
var fireHelper = {},
    //String replace helpers
    escapeRegExp = function (string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    },
    replaceAll = function (string, find, replace) {
        return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    },
    replaceBetween = function (template, data) {
        $.each(data, function (key, value) {
            template = replaceAll(template, "{{" + key + "}}", data[key]);
        });
        return template;
    };

//Firebase fill list of items

fireHelper.fillList = function (data, options) {
    var defaults = {},
        settings = $.extend({}, defaults, options),

        $element = settings.element;
    $element.html('');
    $template = $('#' + $element.data('firebaseTemplate')).html();


    $.each(data, function (key, value) {

        $rendered = replaceBetween($template, {
            id: key
        });
        $element.append($rendered);
        $('[data-firebase-id="' + key + '"]')
            .find('[data-firebase-child]')
            .attr('data-firebase-parent', settings.url + '/' + key);

    });
    $element.find('[data-firebase-child]').each(function () {
        $(this).fireHelper({
            url: $(this).data('firebaseParent') + '/' + $(this).data('firebaseChild')
        });
    });


    //var output = Mustache.render("{{title}} spends {{calc}}", view);
    //$element.html(output);
};
//jQuery Firebase fireHelper
fireHelper.renderView = function (data, options) {
    $element = options.element;
    $element.html(data);
};
fireHelper.init = function () {
    /* This method fetches data providing a url and a callback, which is called when the data is fetched */
    $.fn.fireHelper = function (options) {
        var defaults = {
                baseUrl: "https://danyelangel.firebaseio.com/eternity/",
                callback: fireHelper.renderView,
                element: $(this),
                url: $(this).data('firebase')
            },
            settings = $.extend({}, defaults, options);

        settings.fullUrl = settings.baseUrl + settings.url;
        ref = new Firebase(settings.fullUrl);
        console.log(settings.fullUrl);

        // Attach an asynchronous callback to read the data
        ref.on("value", function (snapshot) {

                settings.callback(snapshot.val(), settings);
            },
            function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
    }
    $('[data-firebase]').each(function () {
        $(this).fireHelper();
    });
    $('[data-firebase-child]').each(function () {
        $(this).fireHelper({
            url: $(this).data('firebaseParent') + '/' + $(this).data('firebaseChild')
        });
    });
    $('[data-firebase-list]').each(function () {
        $(this).fireHelper({
            url: $(this).data('firebaseList'),
            callback: fireHelper.fillList
        });
    });
};