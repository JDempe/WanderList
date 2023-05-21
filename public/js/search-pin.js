const pinSearch = function() {
  $('#search-input').on('input', function() {
    const searchText = $(this).val().toLowerCase();
    const noResultsContainer = $('.no-results-container');
    let hasMatchingResults = false; // Flag to track if any matching results are found

    $('.pin').each(function() {
      const pin = $(this);
      const cardTitle = pin.find('.card-title').text().toLowerCase();
      const cardText = pin.find('.card-text').text().toLowerCase() || pin.find('textarea').val().toLowerCase();
      const timestamp = pin.find('.timestamp').text().toLowerCase();

      if (
        cardTitle.includes(searchText) ||
        cardText.includes(searchText) ||
        timestamp.includes(searchText)
      ) {
        pin.css('display', 'block');
        pin.removeClass('no-results');
        hasMatchingResults = true; // Set flag to true if matching result is found
      } else {
        pin.css('display', 'none');
        pin.addClass('no-results');
      }
    });

    if (hasMatchingResults) {
      noResultsContainer.addClass('no-results-container-noshow');
    } else {
      noResultsContainer.removeClass('no-results-container-noshow');
    }
  });
};

$(document).ready(function() {
  pinSearch();
});