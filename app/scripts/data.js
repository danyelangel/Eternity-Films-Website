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
            fireHelper.uploadForm();
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
        },
        uploadForm: function () {
            var url = "https://danyelangel.firebaseio.com/eternityContact";
            var firebaseRef = new Firebase(url);

            function funct1(evt) {
                var firstName = $('#contact_firstName').val();
                var lastName = $('#contact_lastName').val();
                var telephone = $('#contact_telephone').val();
                var email = $('#contact_email').val();
                var film = $('#contact_film').is(':checked');
                var web = $('#contact_web').is(':checked');
                var photo = $('#contact_photo').is(':checked');
                var design = $('#contact_design').is(':checked');
                var marketing = $('#contact_marketing').is(':checked');
                var time = $('#contact_time').val();

                if (firstName != '' && lastName != '' && telephone != '' && email != '' && time != '') {

                    var postRef = firebaseRef.push(); // create a new post
                    postRef.set({
                        firstName: firstName,
                        lastName: lastName,
                        telephone: telephone,
                        email: email,
                        interests: {
                            film: film,
                            web: web,
                            photo: photo,
                            design: design,
                            marketing: marketing
                        },
                        time: time
                    });

                    evt.preventDefault();
                    $('#contactForm').slideUp();
                    $('#contactReady').slideDown();
                    $(this).html('Sent').addClass('disabled');
                }
            }

            var submit = $('#contact_submit');
            $('#contactReady').slideUp();
            submit.click(funct1);
        }
    };