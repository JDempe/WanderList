$(document).ready(function () {
  defaultReadOnly();
  applyReadOnly();
  autoResizeText();

  // Prevent refresh on submission
  const preventDefault = (e) => {
    e.preventDefault();
  };

  $("form").submit(preventDefault);

  // make the discover something button invisible but maintain its place in the DOM
  $("#discover-something-button").css("visibility", "hidden");

  // EVENT LISTENERS //
  // ========================================================== //

  // Check mark button
  $(".card-icon-section .bi-check-square").click(async function (e) {
    if ($(this).hasClass("disabled")) {
      return;
    }

    const pin = $(this).closest(".card");
    const currentStatus = pin.data("pinCompletion");
    const newStatus = !currentStatus;
    try {
      const data = await fetchWrapper("/pins/:id", {
        method: "PUT",
        body: JSON.stringify({ pinCompletion: newStatus }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("public>>js>>personal-page.js", data);
    } catch (error) {
      console.log("public>>js>>personal-page.js", error);
    }
    e.stopPropagation();
  });

  // Edit Button
  $(".card-icon-section .bi-pencil").click(async function (e) {
    // Check if the button is already in a disabled state
    if ($(this).hasClass("disabled")) {
      return;
    }
    const pin = $(this).closest(".pin");
    const pinId = pin.data("id");
    console.log(pinId);

    const pinTextInput = pin.find(".card-text");
    const pinTitleInput = pin.find(".card-title");
    console.log("pin", pin, "oriText", pinTextInput, "oriTitle", pinTitleInput);

    try {
      const response = await fetch(`/api/pins/${pinId}`);

      if (response.ok) {
        // const pinData = await response.json();
        enablePinEditing(pin);

        // Toggles the buttons for the clicked pin
        pin.find(".save-btn, .discard-btn").slideToggle(200);

        // Checks if the clicked pin is the active pin
        if (activePin && activePin[0] === pin[0]) {
          // Set the textarea to readonly
          pinTextInput.prop("readonly", true);
          applyReadOnly();

          // Hides the buttons of the active pin
          pin.find(".save-btn, .discard-btn").slideUp(200);

          // Resets the active pin
          activePin = null;
        } else {
          // Sets the active pin
          activePin = pin;
        }

        // Disables the button temporarily to prevent spamming and let buttons slide back up
        $(this).addClass("disabled");
        setTimeout(() => {
          $(this).removeClass("disabled");
        }, 200);

        pin.find(".save-btn").click(async function () {
          try {
            // Send the PUT request to the backend
            const updatedTitle = pinTitleInput.val();
            const updatedText = pinTextInput.val();
            console.log(updatedTitle, updatedText);
            const putResponse = await fetch(`/api/pins/${pinId}`, {
              method: "PUT",
              body: JSON.stringify({
                pinTitle: updatedTitle,
                pinDescription: updatedText,
              }), // Pass the updated text in the request body
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (putResponse.ok) {
              // The update was successful
              const updatedPin = await putResponse.json();
              // Handle any further actions or UI updates after successful update
              console.log("Pin updated:", updatedPin);
            } else {
              // The update was not successful
              console.error("Failed to update the pin.");
            }
          } catch (error) {
            console.log("failed to update the pin:", error.message);
          }
        });
      } else {
        console.log("Pin not found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    // Attaches click event listener to the document
    $(document).on("click", function (e) {
      const target = $(e.target);
      const isPin = target.closest(".card").length > 0;

      // Checks if the click event occurred outside of the pin elements
      if (!isPin) {
        $(".card-title, .card-text").prop("readonly", true);
        applyReadOnly();

        // Hides the buttons of the active pin
        activePin.find(".save-btn, .discard-btn").slideUp(200);

        // Resets the active pin
        activePin = null;

        // Removes the click event listener from the document
        $(document).off("click");
      }
    });

    // Prevent event bubbling to avoid immediate closing of the card
    e.stopPropagation();
  });

  // delete post
  $(".card-icon-section .bi-trash").click(async function (e) {
    // Check if the button is already in a disabled state
    if ($(this).hasClass("disabled")) {
      return;
    }
    const pin = $(this).closest(".pin");
    const pinId = pin.data("id");
    console.log(pinId);

    try {
      const response = await fetch(`/api/pins/${pinId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // const pinData = await response.json();
        pin.remove();
        console.log("Pin deleted");
      } else {
        console.error("Failed to delete the pin.");
      }
    } catch (error) {
      console.error("Error occurred while deleting the pin:", error);
    }
    e.stopPropagation();
  });

  // On input, resize the textarea so it fits the text
  $("textarea").on("input", autoResizeText);

  // add event listener to the new card button
  $("#create-new-pin").click(function () {
    // disabled the create new pin button
    $("#create-new-pin").addClass("disabled");

    const newPinEl = $("#template-card-hidden").clone(true, true);
    newPinEl.removeAttr("id");
    // remove the hidden attr
    newPinEl.removeAttr("hidden");

    newPinEl.addClass("create-pin-flag");
    newPinEl.find(".card-title").prop("readonly", false);
    newPinEl.find(".card-text").prop("readonly", false);
    newPinEl.find(".save-btn").css("display", "block");
    newPinEl.find(".discard-btn").css("display", "block");
    newPinEl.find(".card-title").removeClass("no-visibility");
    newPinEl.find(".card-text").removeClass("no-visibility");
    newPinEl.find(".card-title").val("");
    newPinEl.find(".card-text").val("");
    newPinEl.find(".card-title").attr("placeholder", "Title");
    newPinEl.find(".card-text").attr("placeholder", "Description");
    newPinEl.find(".card-title").focus();

    // add the pin ID to the new pin in the data-id attribute
    newPinEl.data("id", "");

    console.log(newPinEl);
    console.log(newPinEl.find(".card-title"));

    // insert the new element to the page after the no results container
    $(".no-results-container").after(newPinEl);
  });

  // save button event listener
  //   TODO need to only get the new pin one
  $(document).on("click", ".save-btn", function (event) {

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var form = $(".needs-validation")[0];


    // If there is an invalid form, prevent the submit button from working and show the validation notes
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
    }
    // Otherwise, if the form is valid, send a PUT request with the info
    else {

    const pinEl = $(this).closest(".pin");
    const titleEl = pinEl.find(".card-title");
    const textEl = pinEl.find(".card-text");
    const title = titleEl.val();
    const text = textEl.val();
    const saveBtn = $(this);
    const discardBtn = pinEl.find(".discard-btn");
    // hide the noPinPage
    $("#personal-no-pin").css("display", "none");

    $.ajax({
      url: "/api/user/session/lookup",
      type: "GET",
    }).then(function (response) {
      console.log(response);
      var id = response.id;
      const pinId = pinEl.data("id"); // Get pin id

      // based on whether pin exists or not set the method and url(put or post)
      const method = pinId ? "PUT" : "POST";
      const url = pinId ? `/api/pins/${pinId}` : `/api/pins/user/${id}`;

      // Send request to the server
      $.ajax({
        url: url,
        type: method,
        data: {
          pinTitle: title,
          pinDescription: text,
        },
      }).then(function (response) {
        console.log(response);
        $("#create-new-pin").removeClass("disabled");
        pinEl.removeClass("create-pin-flag");
        titleEl.prop("readonly", true);
        titleEl.addClass("no-visibility");
        textEl.prop("readonly", true);
        textEl.addClass("no-visibility");
        saveBtn.removeAttr("style");
        discardBtn.removeAttr("style");

        if (!pinId) {
          // If it was a new pin
          pinEl.data("id", response.id); // Set the received id to the pin
        }
      });
    });
  }
  });

  // discard button event listener
  // if discard is clicked, read the id from the data-id attribute, if it doesnt exist remove the element, if it does exist send a request to get pinTitle and pinDescription and set the values of the title and text to those values
  $(document).on("click", ".discard-btn", function () {
    const pinEl = $(this).closest(".pin");
    const titleEl = pinEl.find(".card-title");
    const textEl = pinEl.find(".card-text");
    const saveBtn = $(this).siblings(".save-btn");
    const discardBtn = $(this);

    // get the id from the data-id attribute
    const id = pinEl.data("id");
    console.log(id);

    // if the id is empty, remove the element
    if (id === "") {
      pinEl.remove();
      // make the create new pin button not disabled
      $("#create-new-pin").removeClass("disabled");
    } else {
      // if the id is not empty, send a request to get the pinTitle and pinDescription
      $.ajax({
        url: `/api/pins/${id}`,
        type: "GET",
      }).then(function (response) {
        console.log(response);
        // set the values of the title and text to the pinTitle and pinDescription
        titleEl.val(response.pinTitle);
        textEl.val(response.pinDescription);
        // reset the form to the original state
        titleEl.prop("readonly", true);
        titleEl.addClass("no-visibility");
        textEl.prop("readonly", true);
        textEl.addClass("no-visibility");
        saveBtn.removeAttr("style");
        discardBtn.removeAttr("style");
      });
    }
  });

  // ========================================================== //
  // END EVENT LISTENERS //
});

// FUNCTIONS //
// ========================================================== //

// variables to make code cleaner later
let pinTitle = $(".card-title");
let pinText = $(".card-text");
let activePin = null;

// Sets all text areas to readonly by default
const defaultReadOnly = () => {
  pinTitle.prop("readonly", true);
  pinText.prop("readonly", true);
};

// Iterates over every pin body and runs next function
const applyReadOnly = () => {
  pinText.each((index, element) => {
    readOnlyAppearance($(element));
  });
};

// If an area is readonly, removes textarea appearance
const readOnlyAppearance = (pinText) => {
  if (pinText.prop("readonly")) {
    pinText.addClass("no-visibility");
  } else {
    pinText.removeClass("no-visibility");
  }
};

// resizes textarea/card based on text height inside
const autoResizeText = function () {
  $("textarea").each(function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
};

function enablePinEditing(pin) {
  // Disable editing on all pins
  pinTitle.prop("readonly", true);
  pinText.prop("readonly", true);

  // Enables editing on the clicked pin
  const pinTitleInput = pin.find(".card-title");
  const pinTextInput = pin.find(".card-text");

  pinTitleInput.prop("readonly", false);
  pinTextInput.prop("readonly", false);
  applyReadOnly();
}
//wrapper function to handle 404 errors from server and redirect to home page.
function fetchWrapper(url, options) {
  return $.ajax({
    url: url,
    type: options.method || "GET", // default method is GET
    data: options.body ? JSON.parse(options.body) : {},
    dataType: "json", // expected data sent from server
    contentType: options.headers
      ? options.headers["Content-Type"]
      : "application/json", // content type sent to server
  })
    .done((response) => {
      return response;
    })
    .fail((jqXHR) => {
      if (jqXHR.status === 404) {
        // Redirect to the home page
        window.location.href = "/";
      }

      throw new Error(jqXHR.statusText);
    });
}

// ========================================================== //
// END FUNCTIONS //
