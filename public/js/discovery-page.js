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
    if (response.saved_pins === null || response.saved_pins === "") {
      console.log("no pins");
      return;
    }
    // take the string and JSON parse it
    var pinnedCards = JSON.parse(response.saved_pins);
    console.log(pinnedCards);
    checkPinnedCards(pinnedCards);
  });

  $(".btn-refresh").click(function () {
    location.reload();
  });

  // Create a click event listener on anything with the class of card-pinning
  $(".card-icon-pin").click(function (e) {
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
            pinId: cardId,
          },
        }).then(function (response) {
          // console.log(response);
        });
      }
    });
  });

  // function to check each key in the pinnedCards array against the cardId
  function checkPinnedCards(pinnedCards) {
    $(".card-icon-pin").each(function () {
      var cardId = $(this).closest(".card-container").attr("data-pinid");
      // if the pinnedCards JSON array includes the cardId, add the class of pinned to the card
      if (pinnedCards.some((e) => e.pinId === cardId)) {
        $(this).addClass(pinnedIcon);
        $(this).removeClass(unpinnedIcon);
      }
    });
  }
});
