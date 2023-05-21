$(document).ready(function() {

$('.btn-refresh').click(function() {
        location.reload();
    });

// Create a click event listener on anything with the class of card-pinning
$('.card-pinning').click(function(e) {
    e.preventDefault();
    e.target.classList.toggle('pinned');

    // Get the id of the card that was clicked by looking for data-pinid in the parent element that has the class of card-container
    var cardId = $(this).closest(".card-container").attr('data-pinid');

    // TODO Get the value of the data-pinned attribute


});
});