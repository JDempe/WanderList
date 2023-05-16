// // Card Expansion and Collapse Javascript 
// const pinTransition = function() {
//     $(".card").each(function() {
//       const card = $(this);
//       const cardHeight = card.outerHeight();
//       if (cardHeight > 200) {
//         card.find(".truncated-text").addClass("enable-truncation");
//         card.find(".expand-button").show();
//       }
//     });
  
//     $(".expand-button").click(function() {
//       const card = $(this).closest(".card");
//       card.removeClass("collapsing");
//       card.addClass("expanded");
//       card.find(".truncated-text").css("max-height", card.find(".truncated-text")[0].scrollHeight + "px");
//       $(this).hide();
//       card.find(".collapse-button").show();
//     });
  
//     $(".collapse-button").click(function() {
//       const card = $(this).closest(".card");
//       card.removeClass("expanded");
//       card.addClass("collapsing");
//       card.find(".truncated-text").css("max-height", "200px");
//       $(this).hide();
//       card.find(".expand-button").show();
//     });
// };

// // Hide textareas by default
// $('.title-textarea').hide();
// $('.card-textarea').hide();

// // Function to handle click outside of .card-container
// function handleClickOutside(event) {
//   const cardContainers = $('.card-container');

//   cardContainers.each(function() {
//     const cardContainer = $(this);

//     const titleTextarea = cardContainer.find('.title-textarea');
//     const cardTextarea = cardContainer.find('.card-textarea');
//     const displayText = cardContainer.find('.display-text');

//     if (
//       !cardContainer.is(event.target) &&
//       cardContainer.has(event.target).length === 0
//     ) {
//       // Hide textareas and show display elements
//       titleTextarea.hide();
//       cardTextarea.hide();
//       displayText.show();
//     }
//   });
// }

// // Allows editing of card when the pencil icon is clicked
// $('.card-icon-section .bi-pencil').click(function() {
//   // Disable editing on all cards
//   $('.title-textarea').prop('readonly', true);
//   $('.card-textarea').prop('readonly', true);

//   // Enables editing on the clicked card
//   const cardTitleInput = $(this).closest('.card-top-section').find('.card-title');
//   const cardTextInput = $(this).closest('.card-body').find('.card-text');
//   const displayText = $(this).closest('.card-body').find('.display-text');

//   // Hide display elements and show textareas
//   cardTitleInput.hide();
//   cardTextInput.hide();
//   displayText.hide();
//   cardTitleInput.siblings('.title-textarea').show();
//   cardTextInput.siblings('.card-textarea').show();

//   // Enable editing
//   cardTitleInput.prop('readonly', false);
//   cardTextInput.prop('readonly', false);

//   // Set the initial value of textareas to the display text content
//   cardTitleInput.siblings('.title-textarea').val(cardTitleInput.text().trim());
//   cardTextInput.siblings('.card-textarea').val(cardTextInput.text().trim());

//   // Focus on the title textarea
//   cardTitleInput.siblings('.title-textarea').focus();
// });

// // Update display content when textarea value changes
// $('.card-container').on('input', '.title-textarea, .card-textarea', function() {
//     const textareaValue = $(this).val();
//     const displayText = $(this).siblings('.display-text');
  
//     // Replace line breaks with <br> tags for display
//     const formattedContent = textareaValue.replace(/\n/g, '<br>');
//     displayText.html(formattedContent);
  
//     // Update textarea value with preserved line breaks
//     $(this).val(textareaValue.replace(/\n/g, '\r\n'));
//   });

// // Bind click event to the document
// $(document).on('click', handleClickOutside);

// Prevent refresh on submission
const preventDefault = (event) => {
    event.preventDefault();
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
  
// Edditing function when clicking on card
$('.card-icon-section .bi-pencil').click(function() {
    // Disable editing on all cards
    $('.card-title').prop('readonly', true);
    $('.card-text').prop('readonly', true);
  
    // Enables editing on the clicked card
    const cardTitleInput = $(this).closest('.card-top-section').find('.card-title');
    const cardTextInput = $(this).closest('.card-body').find('.card-text');
  
    cardTitleInput.prop('readonly', false);
    cardTextInput.prop('readonly', false);
    applyReadOnly();
});



$('textarea').on('input', autoResizeText);

$(document).ready(function() {
  pinSearch();
  defaultReadOnly();
  applyReadOnly();
  autoResizeText();
});
