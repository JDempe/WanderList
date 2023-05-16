$(document).ready(function() {
    $('#search-input').on('input', function() {
      var searchText = $(this).val().toLowerCase();
      var noResultsContainer = $('.no-results-container');
  
      $('.card').each(function() {
        var cardTitle = $(this).find('.card-title').text().toLowerCase();
        var cardText = $(this).find('.card-text').text().toLowerCase();
  
        if (cardTitle.includes(searchText) || cardText.includes(searchText)) {
          $(this).css('display', 'block');
          $(this).parent('.card-container').css('padding', '');
          noResultsContainer.addClass('no-results-container-noshow');
        } else {
          $(this).css('display', 'none');
          $(this).parent('.card-container').css('padding', '0');
          noResultsContainer.removeClass('no-results-container-noshow');
        }
      });
    });
  });
  
// Card Javascript 
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
// End card javascript