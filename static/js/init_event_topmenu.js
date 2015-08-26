$(document).ready(function() {

// Activation and deactivation of the top-menu in the page
    $(".menu").mouseover(function () {
        $(".menu").animate({'opacity': '1'}, 800, 'swing')
    });
    $(".menu").mouseleave(function () {
        $(".menu").animate({'opacity': '0.0'}, 800, 'swing')
    });

});