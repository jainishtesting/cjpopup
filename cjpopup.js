$.get('cjpopup.html', function (data) {
    $('html').append('<div class="cjpopupcontainerdiv"></div>');
    $('.cjpopupcontainerdiv').html(data);
});
var gcallbackfun = [];
var currObj;
(function ($) {
    $.fn.cjpopup = function (options) {
        var settings = $.extend({
            overlay: true,
            title: 'Alert',
            message: 'Are you sure?',
            callbackfun: null
        }, options);
        return this.each(function () {
            gcallbackfun.push({ obj: this, fun: settings.callbackfun });
            $(this).click(function () {
                currObj = this;
                $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').show();
                if (settings.overlay == false) {
                    $('.cjpopupcontainerdiv .cjmodal-overlay').hide();
                }
                $('.cjpopupcontainerdiv #cjmodalTitle').html(settings.title);
                $('.cjpopupcontainerdiv #cjmodalDesc').html(settings.message);
                $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').removeClass('cjmodal-is-closed');
                $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').addClass('cjmodal-is-opening');
                setTimeout(function () {
                    $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').removeClass('cjmodal-is-opening');
                    $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').addClass('cjmodal-is-opened');
                }, 500);
            });
        });
    }
})(jQuery);
$(document).on('click', '.cjpopupcontainerdiv .cjmodal-cancel, .cjpopupcontainerdiv .cjmodal-close, .cjpopupcontainerdiv .cjmodal-overlay', function () {
    cjpopupclose();
});
$(document).on('click', '.cjpopupcontainerdiv .cjmodal-confirm', function () {
    $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').removeClass('cjmodal-is-opened');
    $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').addClass('cjmodal-is-closing');
    setTimeout(function () {
        $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').removeClass('cjmodal-is-closing');
        $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').addClass('cjmodal-is-closed');
        $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').hide();
        for (var iObjCB = 0; iObjCB < gcallbackfun.length; iObjCB++) {
            if (gcallbackfun[iObjCB].obj == currObj) {
                if (gcallbackfun[iObjCB].fun != null) {
                    gcallbackfun[iObjCB].fun();
                }
                break;
            }
        }
    }, 500);
});
function cjpopupclose() {
    $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').removeClass('cjmodal-is-opened');
    $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').addClass('cjmodal-is-closing');
    setTimeout(function () {
        $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').removeClass('cjmodal-is-closing');
        $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').addClass('cjmodal-is-closed');
        $('.cjpopupcontainerdiv .cjmodal-overlay,.cjpopupcontainerdiv .cjmodal-is-initialized').hide();
    }, 500);
}