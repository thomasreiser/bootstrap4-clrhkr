/*
 Bootstrap Colorhacker V0.2 (compatible to Bootstrap 4.4)

 Copyright (c) 2017-2020 Thomas Reiser

 Released under the MIT license
*/
window.HackBootstrapColors = function (colors) {
    if (!window.HACK_BOOTSTRAP_COLOR_RANDOM_ID) {
        window.HACK_BOOTSTRAP_COLOR_RANDOM_ID = 'bsclrhkr-' + Date.now();
    }

    colors = colors || {};

    // Define default colors taken from Bootstrap CSS
    var defaultColors = {
        primary: '#0275d8',
        info: '#5bc0de'
    };
    var newColors = JSON.parse(JSON.stringify(defaultColors));

    // Merge pre-defined colors with colors given by the user
    var RGB_REGEX = /^#[0-9A-F]{6}$/i;
    Object.keys(colors).forEach(function (type) {
        // Check if it is a valid color code
        if (RGB_REGEX.test(colors[type])) {
            newColors[type] = colors[type].toLowerCase();
        }
    });

    var hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    var rgbToHex = function (rgb) {
        return '#' + ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1);
    };
    var luminance = function (r, g, b) {
        var a = [r, g, b].map(function (v) {
            v /= 255;
            return (v <= 0.03928) ? v / 12.92 : Math.pow(((v + 0.055) / 1.055), 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    var darkerColor = function (hex1, hex2, diff) {
        var base = hexToRgb(hex1);
        var lum = luminance(base.r, base.g, base.b) + 0.05;
        var darkened = hexToRgb(hex2);
        var i = 0;
        while ((lum / (luminance(darkened.r, darkened.g, darkened.b) + 0.05) <= diff) && i++ < 100) {
            darkened.r = Math.round((0 - darkened.r) * 0.05) + darkened.r;
            darkened.g = Math.round((0 - darkened.g) * 0.05) + darkened.g;
            darkened.b = Math.round((0 - darkened.b) * 0.05) + darkened.b;
        }
        var darkLum = luminance(darkened.r, darkened.g, darkened.b);
        if (darkLum > 0.12) {
            return rgbToHex(darkened);
        } else {
            return '#000000';
        }
    };
    var whiteText = function (hex) {
        var rgb = hexToRgb(hex);
        return (1.05 /* (luminance(255, 255, 255) + 0.05) */ / (luminance(rgb.r, rgb.g, rgb.b) + 0.05)) > 1.5;
    };

    var CSS_TEMPLATE_PRIMARY = '\
    .primary-color { \
        color: %primary%; \
    } \
    a { \
    	color: #464a4c; \
    } \
    .btn-link { \
        color: %primary_text%; \
    } \
    a:focus, \
    a:hover, \
    .btn-link:focus, \
    .btn-link:hover, \
    .page-link:focus, \
    .page-link:hover { \
        color: %primary_text_dark%; \
    } \
    button:focus { \
        outline: 5px auto %primary%; \
    } \
    a.breadcrumb-item, \
    a.nav-link { \
        color: %primary_link%; \
    } \
    a.nav-link.active:hover { \
        color: #464a4c; \
    } \
    a.nav-link:not(.active):hover { \
        background-color: %primary_link_bg%; \
        color: %primary_link%; \
    } \
    .btn-primary { \
        background-color: %primary%; \
        border-color: %primary%; \
        color: %primary_text% !important; \
    } \
    .btn-primary:active, .btn-primary.active, \
    .show > .btn-primary.dropdown-toggle, \
    .btn-primary:hover, \
    .btn-outline-primary:active, \
    .btn-outline-primary.active, \
    .show > .btn-outline-primary.dropdown-toggle { \
        background-color: %primary_dark% !important; \
        border-color: %primary_dark% !important; \
        color: %primary_text% !important; \
    } \
    .btn-outline-primary:hover, \
    .btn-primary.disabled, \
    .btn-primary:disabled, \
    .card-primary, \
    .page-item.active .page-link { \
        background-color: %primary%; \
        border-color: %primary%; \
    } \
    .btn-outline-primary.disabled, \
    .btn-outline-primary:disabled, \
    .btn-primary.disabled:hover, \
    .btn-primary:disabled:hover { \
        color: %primary_text%; \
    } \
    .btn-outline-primary { \
        color: %primary%; \
        border-color: %primary%; \
    } \
    .btn-primary:focus:not(.disabled), .btn-primary.focus:not(.disabled), .btn-outline-primary:focus:not(.disabled), .btn-outline-primary.focus:not(.disabled), .btn:focus:not(.disabled), .btn.focus:not(.disabled) { \
        -webkit-box-shadow: 0 0 0 2px %primary_light%; \
        box-shadow: 0 0 0 0.2rem rgba(%primary_rgb%, 0.25) !important; \
        background-color: %primary% !important; \
        border-color: %primary_light% !important; \
        color: %primary_text%; \
    } \
    .dropdown-item.active, \
    .dropdown-item:active, \
    .custom-control-input:checked ~ .custom-control-indicator, \
    .custom-checkbox .custom-control-input:indeterminate ~ .custom-control-indicator { \
        background-color: %primary%; \
    } \
        .custom-control-input:focus ~ .custom-control-indicator { \
        -webkit-box-shadow: 0 0 0 1px #fff, 0 0 0 3px %primary%; \
        box-shadow: 0 0 0 1px #fff, 0 0 0 3px %primary%; \
    } \
    .custom-control-input:active:not(:disabled) ~ .custom-control-indicator { \
        background-color: %primary_light%; \
    } \
    .nav-pills .nav-item.show .nav-link, \
    .nav-pills .nav-link.active, \
    .badge-primary, \
    .progress-bar { \
        background-color: %primary%; \
        color: %primary_text%; \
    } \
    .tiresearch .nav-pills a.nav-link.active{ \
    	border: 1px solid %primary%; \
    } \
    .card-inverse.card-primary .card-blockquote, \
    .text-primary { \
        color: %primary_text% !important; \
    } \
    .card-outline-primary, \
    .form-control:focus, \
    .custom-select:focus { \
        border-color: %primary%; \
        box-shadow: 0 0 0 0.2rem rgba(%primary_rgb%, 0.25) !important; \
    } \
    .page-link { \
        color: %primary%; \
    } \
    .badge-primary[href]:focus, .badge-primary[href]:hover { \
        background-color: %primary_dark%; \
    } \
    .list-group-item.active { \
        background-color: %primary%; \
        border-color: %primary%; \
        color: %primary_text% !important; \
    } \
    .list-group-item.active .text-muted { \
        color: %primary_text% !important; \
    } \
    .bg-primary { \
        background-color: %primary% !important; \
        color: %primary_text%; \
    } \
    a.bg-primary:focus, a.bg-primary:hover { \
        background-color: %primary_dark% !important; \
    } \
    a.text-primary:focus, a.text-primary:hover { \
        color: %primary_dark% !important; \
    } \
    ';

    var CSS_TEMPLATE_INFO = '\
    .btn-info { \
        background-color: %info%; \
        border-color: %info%; \
        color: %info_text%; \
    } \
    .btn-info.disabled, \
    .btn-info:disabled, \
    .btn-outline-info:hover, \
    .btn-outline-info:active, \
    .btn-outline-info.active, \
    .show > .btn-outline-info.dropdown-toggle, \
    .card-info { \
        background-color: %info%; \
        border-color: %info%; \
    } \
    .btn-outline-info { \
        color: %info%; \
        border-color: %info%; \
    } \
    .btn-outline-info.disabled, .btn-outline-info:disabled { \
        color: %info%; \
    } \
    .btn-info:focus, btn-info.focus { \
        -webkit-box-shadow: 0 0 0 2px %info_light%; \
        box-shadow: 0 0 0 2px %info_light%; \
    } \
    .btn-info:hover, \
    .btn-info:active, \
    .btn-info.active, \
    .show > .btn-info.dropdown-toggle { \
        background-color: %info_dark%; \
        border-color: %info_dark%; \
    } \
    .card-outline-info { \
        border-color: %info%; \
    } \
    .card-inverse.card-info .card-blockquote { \
        color: %info_text% !important; \
    } \
    .badge-info { \
        background-color: %info%; \
        color: %info_text%; \
    } \
    .badge-info[href]:focus, .badge-info[href]:hover { \
        background-color: %info_dark%; \
    } \
    .bg-info { \
        background-color: %info% !important; \
        color: %info_text%; \
    } \
    .text-info { \
        color: %info% !important; \
    } \
    .list-group-item-info, a.list-group-item-info { \
        background-color: %info_light%; \
        color: %info_text%; \
    } \
    a.list-group-item-info:hover { \
        background-color: %info_medium%; \
        color: %info_text%; \
    } \
    ';

    var css = '';

    var storageGet = function (key) {
        try {
            return localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    };

    var storageSet = function (key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
        }
    };

    if (newColors.primary !== defaultColors.primary) {
        // Calculate optimal color shades for primary color
        newColors.primaryText = storageGet('bootstrap-clrhkr-pt-' + newColors.primary);
        if (!newColors.primaryText) {
            if (whiteText(newColors.primary)) {
                newColors.primaryText = '#ffffff';
            } else {
                newColors.primaryText = darkerColor(newColors.primary, newColors.primary, 5);
            }
            storageSet('bootstrap-clrhkr-pt-' + newColors.primary, newColors.primaryText);
        }
        newColors.primaryTextDark = storageGet('bootstrap-clrhkr-ptd-' + newColors.primary);
        if (!newColors.primaryTextDark) {
            if (whiteText(newColors.primary)) {
                newColors.primaryTextDark = '#cccccc';
            } else {
                newColors.primaryTextDark = darkerColor('#ffffff', newColors.primary, 15);
            }
            storageSet('bootstrap-clrhkr-ptd-' + newColors.primary, newColors.primaryTextDark);
        }
        newColors.primaryDark = storageGet('bootstrap-clrhkr-pd-' + newColors.primary);
        if (!newColors.primaryDark) {
            newColors.primaryDark = darkerColor(newColors.primary, newColors.primary, 1.2);
            storageSet('bootstrap-clrhkr-pd-' + newColors.primary, newColors.primaryDark);
        }
        newColors.primaryLight = storageGet('bootstrap-clrhkr-pl-' + newColors.primary);
        if (!newColors.primaryLight) {
            var rgb = hexToRgb(newColors.primary);
            newColors.primaryLight = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.4)';
            storageSet('bootstrap-clrhkr-pl-' + newColors.primary, newColors.primaryLight);
        }
        newColors.primaryRgb = storageGet('bootstrap-clrhkr-prgb-' + newColors.primary);
        if (!newColors.primaryRgb) {
            var rgb = hexToRgb(newColors.primary);
            newColors.primaryRgb = rgb.r + ',' + rgb.g + ',' + rgb.b;
            storageSet('bootstrap-clrhkr-prgb-' + newColors.primary, newColors.primaryRgb);
        }
        newColors.primaryLinkBg = storageGet('bootstrap-clrhkr-plb-' + newColors.primary);
        if (!newColors.primaryLinkBg) {
            if (!whiteText(newColors.primary)) {
                var rgb = hexToRgb(newColors.primary);
                newColors.primaryLinkBg = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.2)';
            } else {
                newColors.primaryLinkBg = 'transparent';
            }
            storageSet('bootstrap-clrhkr-plb-' + newColors.primary, newColors.primaryLinkBg);
        }
        newColors.primaryLink = storageGet('bootstrap-clrhkr-plk-' + newColors.primary);
        if (!newColors.primaryLink) {
            if (!whiteText(newColors.primary)) {
                newColors.primaryLink = newColors.primaryText;
            } else {
                newColors.primaryLink = newColors.primary;
            }
            storageSet('bootstrap-clrhkr-plk-' + newColors.primary, newColors.primaryLink);
        }

        css += CSS_TEMPLATE_PRIMARY.replace(/%primary%/g, newColors.primary)
            .replace(/%primary_text%/g, newColors.primaryText)
            .replace(/%primary_link_bg%/g, newColors.primaryLinkBg)
            .replace(/%primary_link%/g, newColors.primaryLink)
            .replace(/%primary_dark%/g, newColors.primaryDark)
            .replace(/%primary_text_dark%/g, newColors.primaryTextDark)
            .replace(/%primary_light%/g, newColors.primaryLight)
            .replace(/%primary_rgb%/g, newColors.primaryRgb);
    }

    if (newColors.info !== defaultColors.info) {
        // Calculate optimal color shades for info color
        newColors.infoText = storageGet('bootstrap-clrhkr-it-' + newColors.info);
        if (!newColors.infoText) {
            if (whiteText(newColors.info)) {
                newColors.infoText = '#ffffff';
            } else {
                newColors.infoText = darkerColor('#ffffff', newColors.info, 5);
            }
            storageSet('bootstrap-clrhkr-it-' + newColors.info, newColors.infoText);
        }
        newColors.infoDark = storageGet('bootstrap-clrhkr-id-' + newColors.info);
        if (!newColors.infoDark) {
            newColors.infoDark = darkerColor(newColors.info, newColors.info, 1);
            storageSet('bootstrap-clrhkr-id-' + newColors.info, newColors.infoDark);
        }
        newColors.infoMedium = storageGet('bootstrap-clrhkr-im-' + newColors.info);
        if (!newColors.infoMedium) {
            var rgb = hexToRgb(newColors.info);
            newColors.infoMedium = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.6)';
            storageSet('bootstrap-clrhkr-im-' + newColors.info, newColors.infoMedium);
        }
        newColors.infoLight = storageGet('bootstrap-clrhkr-il-' + newColors.info);
        if (!newColors.infoLight) {
            var rgb = hexToRgb(newColors.info);
            newColors.infoLight = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.4)';
            storageSet('bootstrap-clrhkr-il-' + newColors.info, newColors.infoLight);
        }

        css += CSS_TEMPLATE_INFO.replace(/%info%/g, newColors.info)
            .replace(/%info_text%/g, newColors.infoText)
            .replace(/%info_dark%/g, newColors.infoDark)
            .replace(/%info_medium%/g, newColors.infoMedium)
            .replace(/%info_light%/g, newColors.infoLight);
    }

    if (css.length > 0) {
        var style = document.querySelector('style#' + HACK_BOOTSTRAP_COLOR_RANDOM_ID);
        if (!style) {
            style = document.createElement('style');
            style.setAttribute('id', HACK_BOOTSTRAP_COLOR_RANDOM_ID);
            style.type = 'text/css';
            document.querySelector('head').appendChild(style);
        }
        style.innerHTML = css.replace(/\s+/g, ' ');
    }
};

// Try to automatically hack colors
var scriptElem = document.querySelector('script#bootstrap-clrhkr');
if (scriptElem) {
    var newColors = {};

    var primaryColor = scriptElem.getAttribute('data-primary-color');
    if (primaryColor) {
        newColors.primary = primaryColor;
    }

    var infoColor = scriptElem.getAttribute('data-info-color');
    if (infoColor) {
        newColors.info = infoColor;
    }

    if (Object.keys(newColors).length > 0) {
        HackBootstrapColors(newColors);
    }
}
