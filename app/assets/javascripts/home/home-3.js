jQuery(document).ready(function($) {
    "img." != cssTarget ? jQuery(cssTarget).each(function() {
        var t = jQuery(this),
            e = t.attr("id"),
            r = t.attr("class"),
            a = t.attr("src");
        jQuery.get(a, function(a) {
            var s = jQuery(a).find("svg");
            "undefined" != typeof e && (s = s.attr("id", e)), "undefined" != typeof r && (s = s.attr("class", r + " replaced-svg")), s = s.removeAttr("xmlns:a"), t.replaceWith(s)
        }, "xml")
    }) : jQuery("img.style-svg").each(function() {
        var t = jQuery(this),
            e = t.attr("id"),
            r = t.attr("class"),
            a = t.attr("src");
        jQuery.get(a, function(a) {
            var s = jQuery(a).find("svg");
            "undefined" != typeof e && (s = s.attr("id", e)), "undefined" != typeof r && (s = s.attr("class", r + " replaced-svg")), s = s.removeAttr("xmlns:a"), t.replaceWith(s)
        }, "xml")
    })
});