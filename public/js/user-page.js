// Search function Javascript / Searches for date, title, and text
$(document).ready(function() {
    $('#search-input').on('input', function() {
      var searchText = $(this).val().toLowerCase();
      var noResultsContainer = $('.no-results-container');
  
      $('.pin').each(function() {
        var pin = $(this);
        var cardTitle = pin.find('.card-title').text().toLowerCase();
        var cardText = pin.find('.card-text').text().toLowerCase();
        var timestamp = pin.find('.timestamp').text().toLowerCase();
  
        if (
          cardTitle.includes(searchText) ||
          cardText.includes(searchText) ||
          timestamp.includes(searchText)
        ) {
          pin.css('display', 'block');
          pin.removeClass('no-results');
          noResultsContainer.addClass('no-results-container-noshow');
        } else {
          pin.css('display', 'none');
          pin.addClass('no-results');
          noResultsContainer.removeClass('no-results-container-noshow');
        }
      });
    });
});

// Card Expansion and Collapse Javascript 
$(document).ready(function() {
    $(".card").each(function() {
        var card = $(this);
        var cardHeight = card.outerHeight();
        if (cardHeight > 200) {
            card.find(".truncated-text").addClass("enable-truncation");
            card.find(".expand-button").show();
        }
    });

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
        card.find(".truncated-text").css("max-height", "200px");
        $(this).hide();
        card.find(".expand-button").show();
    });
});


