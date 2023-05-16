// Search function Javascript / Searches for date, title, and text
const pinSearch = function() {
    $('#search-input').on('input', function() {
      const searchText = $(this).val().toLowerCase();
      const noResultsContainer = $('.no-results-container');
  
      $('.pin').each(function() {
        const pin = $(this);
        const cardTitle = pin.find('.card-title').text().toLowerCase();
        const cardText = pin.find('.card-text').text().toLowerCase();
        const timestamp = pin.find('.timestamp').text().toLowerCase();
  
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
};

$(document).ready(function() {
  pinSearch();
});
