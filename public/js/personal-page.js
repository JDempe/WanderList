// Prevent refresh on submission
const preventDefault = (e) => {
  e.preventDefault();
};

// variables to make code cleaner later

let pinTitle = $(".card-title");
let pinText = $(".card-text");
let activePin = null;

$("form").submit(preventDefault);

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

$(".card-icon-section .bi-check-square").click(async function (e) {
  if ($(this).hasClass("disabled")) {
    return;
  }

  const pin = $(this).closest(".card");
  const currentStatus = pin.data("pinCompletion");
  const newStatus = !currentStatus;

  try {
    const response = await fetch("/pins/:id", {
      method: "PUT",
      body: JSON.stringify({ pinCompletion: newStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("public>>js>>personal-page.js", data);
  } catch (error) {
    console.log("public>>js>>personal-page.js", error);
  }
  e.stopPropagation();
});

// $(".card-icon-section .bi-pencil").click(function (e) {
//   // Check if the button is already in a disabled state
//   if ($(this).hasClass("disabled")) {
//     return;
//   }

//   const pin = $(this).closest(".card");
//   const pinTextInput = pin.find(".card-text");
//   // const pinTextValue = pinTextInput.val();
//   enablePinEditing(pin);

//   // $('.discard-btn').click(function() {
//   //   pinTextInput.val(pinTextValue);
//   // });

//   // Checks if there is an active pin
//   if (activePin && activePin[0] !== pin[0]) {
//     // Hides the active pin's buttons
//     activePin.find(".save-btn, .discard-btn").slideUp(200);
//   }

//   // Toggles the buttons for the clicked pin
//   pin.find(".save-btn, .discard-btn").slideToggle(200);

//   // Checks if the clicked pin is the active pin
//   if (activePin && activePin[0] === pin[0]) {
//     // Set the textarea to readonly
//     pinTextInput.prop("readonly", true);
//     applyReadOnly();

//     // Hides the buttons of the active pin
//     pin.find(".save-btn, .discard-btn").slideUp(200);

//     // Resets the active pin
//     activePin = null;
//   } else {
//     // Sets the active pin
//     activePin = pin;
//   }

//   // Disables the button temporarily to prevent spamming and let buttons slide back up
//   $(this).addClass("disabled");
//   setTimeout(() => {
//     $(this).removeClass("disabled");
//   }, 200);

//   // Attaches click event listener to the document
//   $(document).on("click", function (e) {
//     const target = $(e.target);
//     const isPin = target.closest(".card").length > 0;

//     // Checks if the click event occurred outside of the pin elements
//     if (!isPin) {
//       $(".card-title, .card-text").prop("readonly", true);
//       applyReadOnly();

//       // Hides the buttons of the active pin
//       activePin.find(".save-btn, .discard-btn").slideUp(200);

//       // Resets the active pin
//       activePin = null;

//       // Removes the click event listener from the document
//       $(document).off("click");
//     }
//   });

//   // Prevent event bubbling to avoid immediate closing of the card
//   e.stopPropagation();
// });

$(".card-icon-section .bi-pencil").click(async function (e) {
  // Check if the button is already in a disabled state
  if ($(this).hasClass("disabled")) {
    return;
  }
  const pin = $(this).closest(".card");
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

//create new post
$(".create-text").click(async function (e) {
  e.preventDefault();
  console.log("Button clicked");

  const newPinData = {
    pinTitle: pinTitle,
    pinDescription: pinText,
    pinLocation: "",
  };
  const id = "8e0d5611-380d-400e-a51a-b79916df61d8";
  const response = await fetch(`/api/pins/user/${id}`, {
    method: "POST",
    body: JSON.stringify(newPinData),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const newPin = await response.json();
    console.log("New Pin:", newPin);
  } else {
    // The pin creation was not successful
    console.error("Failed to create a new pin.");
  }
});

// $(".create-text").click(async function (e) {
//   e.preventDefault();
//   console.log("Button clicked");
//   // const pinTempSource = await $.get(
//   //   "../../../views/partials/personal-pin.handlebars"
//   // );
//   // const emptyCardTemp = Handlebars.compile(pinTempSource);
//   // const emptyCard = emptyCardTemp({});

//   // const emptyCardHTML = $(".pin").prop("outerHTML");

//   console.log(id);

//   const emptyCardHTML = $(".pin").html();
//   console.log(emptyCardHTML);
//   const firstExistingPin = $(".pin:eq(1)");
//   console.log(firstExistingPin);
//   // $(emptyCard).insertBefore(firstExistingPin);
//   $(emptyCardHTML).insertBefore(firstExistingPin);
//   console.log("New pin card inserted");
//   const newPinCard = $(".pin:first");

//   newPinCard.find(".save-btn").click(async function () {
//     console.log("Save button clicked");
//     const pinTitle = newPinCard.find(".card-title").val();
//     const pinText = newPinCard.find(".card-text").val();

//     const newPinData = {
//       pinTitle: pinTitle.trim(),
//       pinDescription: pinText.trim(),
//       id: "jennifer",
//     };
//     // console.log("userId", userId);
//     try {
//       const response = await fetch("/api/pins/:id", {
//         method: "POST",
//         body: JSON.stringify(newPinData),
//         headers: { "Content-Type": "application/json" },
//       });
//       if (response.ok) {
//         // The pin was created successfully
//         const newPin = await response.json();
//         // Code to insert the new pin card into the DOM
//       } else {
//         // The pin creation was not successful
//         console.error("Failed to create a new pin.");
//       }
//     } catch (error) {
//       console.error("catch: Failed to create pin:", error);
//     }
//   });
// });

$("textarea").on("input", autoResizeText);

$(document).ready(function () {
  defaultReadOnly();
  applyReadOnly();
  autoResizeText();
});
