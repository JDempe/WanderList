$(document).ready(function() {
    $(".expand-button").click(function() {
        var card = $(this).closest(".card");
        card.removeClass("collapsing");
        card.addClass("expanded");
        card.find(".truncated-text").css("max-height", card.find(".truncated-text")[0].scrollHeight + "px");
        $(this).hide();
        card.find(".collapse-button").show();
    });

    $(".collapse-button").click(function() {
        var card = $(this).closest(".card");
        card.removeClass("expanded");
        card.addClass("collapsing");
        card.find(".truncated-text").css("max-height", "100px");
        $(this).hide();
        card.find(".expand-button").show();
    });
});