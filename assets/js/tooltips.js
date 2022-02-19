$('.inssetPopover').popover({
    html : true,
    content: function() {
        var elementId = $(this).attr("data-popover-content");
       return $(elementId).html();
    }
});