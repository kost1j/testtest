jQuery.fn.center = function () {
    this.css('position', 'absolute');
    this.css('top', (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + 'px');
    this.css('left', (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + 'px');
    this.css('display', 'block');
    return this;
}
$(document).ready(function() {
    $('.load-block').center();
});