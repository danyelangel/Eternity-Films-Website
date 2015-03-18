/*
Please use callbacks!!! You can do this:

$(firebase selector).each {
    callbacks.add(someFunction($(this)))
    $(this).fireHelper();  <- This fires the callback when data is obtained and refreshed.
}


*/


//Define objects
var escapeRegExp = function (string) {
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
    },

    //Firebase fill list of items

    fireHelper = {
        init: function () {
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

                // Attach an asynchronous callback to read the data
                ref.on("value", function (snapshot) {
                        settings.callback(snapshot.val(), settings);
                        if (fireHelper.templates == 0 && !fireHelper.outerTemplatesRendered) {
                            //Fire callbacks when all templates have been rendered
                            fireHelper.outerTemplatesRendered = true;
                            fireHelper.templates = $('template[data-firebase-child-template]').length
                            fireHelper.outerTemplatesFinished();


                        } else {
                            fireHelper.templatesFinished();
                        }
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
        },
        fillList: function (data, options) {
            var defaults = {},
                settings = $.extend({}, defaults, options),

                $element = settings.element;
            $element.html('');
            $template = $('#' + $element.data('firebaseTemplateId')).html();

            //Iterate over firebase array and render the template once per child
            $.each(data, function (key, value) {
                if (value.visible) {
                    $rendered = replaceBetween($template, {
                        id: key
                    });
                    $element.append($rendered);
                    $('[data-firebase-id="' + key + '"]')
                        .find('[data-firebase-child], [data-firebase-child-src]')
                        .attr('data-firebase-parent', settings.url + '/' + key);
                }

            });

            //Inject data inside template
            $element.find('[data-firebase-child]').each(function () {
                $(this).fireHelper({
                    url: $(this).data('firebaseParent') + '/' + $(this).data('firebaseChild')
                });
            });
            $element.find('[data-firebase-child-src]').each(function () {
                $(this).fireHelper({
                    url: $(this).data('firebaseParent') + '/' + $(this).data('firebaseChildSrc'),
                    callback: fireHelper.renderUrl
                });
            });

            //Check if all templates have been rendered and fire callback afterwards
            fireHelper.templateCheck();

        },
        //jQuery Firebase fireHelper
        renderView: function (data, options) {
            $element = options.element;
            $element.html(data);
        },
        renderUrl: function (data, options) {
            $element = options.element;
            $element.attr('src', data);
        },
        outerTemplatesFinished: function () {
            if ($('[data-firebase-child-list]').length > 0) {
                $('[data-firebase-child-list]').each(function () {
                    $(this).fireHelper({
                        url: $(this).data('firebaseParent') + '/' + $(this).data('firebaseChild'),
                        callback: fireHelper.fillList
                    });
                });
            } else {
                callbacks.fire();
            }
        },
        templates: $('template[data-firebase-template]').length,
        outerTemplatesRendered: false,
        templateCheck: function () {
            fireHelper.templates--;
        },
        templatesFinished: function () {
            if (fireHelper.templates == 0) {
                callbacks.fire();
            }
        }
    };