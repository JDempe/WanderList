$(document).ready(function () {
  const pinnedIcon = "bi-pin-angle-fill";
  const unpinnedIcon = "bi-pin";

  // Get the user's pinned cards by looking up the session id
  $.ajax({
    url: "/api/user/session/lookup",
    method: "GET",
  }).then(function (response) {
    if (response.logged_in === false) {
      console.log("not logged in");
      return;
    }
    if (response.saved_pins === null) {
      console.log("no pins");
      return;
    }
    var pinnedCards = response.saved_pins.split(",");
    console.log(pinnedCards);
    checkPinnedCards(pinnedCards);
  });

  $(".btn-refresh").click(function () {
    location.reload();
  });

  // Create a click event listener on anything with the class of card-pinning
  $(".card-icon").click(function (e) {
    e.preventDefault();
    var pinIconEl = $(this);

    // if not logged in, do nothing except show a red popover that says "You must be logged in to pin a card"
    // if logged in, do the following:
    // Get the user's pinned cards by looking up the session id
    $.ajax({
      url: "/api/user/session/lookup",
      method: "GET",
    }).then(function (response) {
      if (response.logged_in === false) {
        console.log(this)
        pinIconEl.popover('show');
        return;
      } else {


        
        // Look at the pin, if it has a class of bi-pin-angle-fill, remove that class and add the class of bi-pin-angle, otherwise do the opposite
        console.log(this)
        if (pinIconEl.hasClass(pinnedIcon)) {
          pinIconEl.removeClass(pinnedIcon);
          pinIconEl.addClass(unpinnedIcon);
        } else {
          pinIconEl.addClass(pinnedIcon);
          pinIconEl.removeClass(unpinnedIcon);
        }

        // Get the id of the card that was clicked by looking for data-pinid in the parent element that has the class of card-container
        var cardId = pinIconEl.closest(".card-container").attr("data-pinid");

        // Add the card to the user's pinned cards
        $.ajax({
          url: "/api/user/savepin",
          method: "PUT",
          data: {
            cardId: cardId,
          },
        }).then(function (response) {
          // console.log(response);
        });
      }
    });
  });

  // Create a function to cycle through all .card-pinning elements and add the class of pinned if the card is in the user's pinned cards
  function checkPinnedCards(pinnedCards) {
    $(".card-icon").each(function () {
      var cardId = $(this).closest(".card-container").attr("data-pinid");
      if (pinnedCards.includes(cardId)) {
        $(this).addClass(pinnedIcon);
        $(this).removeClass(unpinnedIcon);
      }
    });
  }
});
