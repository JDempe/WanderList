// Prevent refresh on submission
const preventDefault = (e) => {
    e.preventDefault();
};

$('form').submit(preventDefault);

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

// Sets all text areas to readonly by default
const defaultReadOnly = () => {
    $('.card-text').prop('readonly', true);
    $('.card-title').prop('readonly', true);
}

// Iterates over every pin body and runs next function
const applyReadOnly = () => {
    $('.card-text').each((index, element) => {
      readOnlyAppearance($(element));
    });
};
  
// If an area is readonly, removes textarea appearance
const readOnlyAppearance = ($textarea) => {
    if ($textarea.prop('readonly')) {
        $textarea.addClass('no-visibility');
      } else {
        $textarea.removeClass('no-visibility');
      }
};
  
// resizes textarea/card based on text height inside
const autoResizeText = function() {
    $('textarea').each(function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
}
  
function enableCardEditing(card) {
    // Disable editing on all cards
    $('.card-title').prop('readonly', true);
    $('.card-text').prop('readonly', true);
  
    // Enables editing on the clicked card
    const cardTitleInput = card.find('.card-title');
    const cardTextInput = card.find('.card-text');
  
    cardTitleInput.prop('readonly', false);
    cardTextInput.prop('readonly', false);
    applyReadOnly();
}
  
// Function to handle click events on card icons
$('.card-icon-section .bi-pencil').click(function() {
    const card = $(this).closest('.card');
    enableCardEditing(card);
  
    // Attach click event listener to the document
    $(document).on('click', function(e) {
      const target = $(e.target);
      const isCard = target.closest('.card').length > 0;
  
      // Check if the click event occurred outside of the card elements
      if (!isCard) {
        $('.card-title').prop('readonly', true);
        $('.card-text').prop('readonly', true);
        applyReadOnly();
  
        // Remove the click event listener from the document
        $(document).off('click');
      }
    });
  
    // Prevent event bubbling to avoid immediate closing of the card
    e.stopPropagation();
});
  
// Function to disable editing when clicking outside of the card
function disableCardEditing() {
    $('.card-title').prop('readonly', true);
    $('.card-text').prop('readonly', true);
    applyReadOnly();
}
  
// Attach click event listener to the document
$(document).on('click', function(event) {
    const target = $(event.target);
    const isCard = target.closest('.card').length > 0;

    if (!isCard) {
        disableCardEditing();
    }
});

$('textarea').on('input', autoResizeText);

$(document).ready(function() {
  pinSearch();
  defaultReadOnly();
  applyReadOnly();
  autoResizeText();
});
