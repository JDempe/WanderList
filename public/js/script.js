$(document).ready(function () {
  // NIGHT MODE //
  const isNightMode = localStorage.getItem("nightMode");

  // check if the user has a night mode preference saved in local storage
  if (isNightMode !== null) {
    $("#flexSwitchCheckDefault").prop("checked", isNightMode === "true");

    if (isNightMode === "true") {
      toggleNightMode(true);
    }
  }

  // toggle night mode when the switch is clicked
  $("#flexSwitchCheckDefault").on("change", function () {
    const isNightMode = $(this).prop("checked");

    localStorage.setItem("nightMode", isNightMode);

    toggleNightMode(isNightMode);
  });

  // toggle night mode when the switch is clicked
  function toggleNightMode(isNightMode) {
    const elementsToToggle = [
      // main.handlebars
      "body",
      "dropdown-item",
      ".navbar",
      ".login-nav-Btn",
      "#navbarNavAltMarkup",
      ".navbar-brand",
      "footer",
      // discover.handlebars
      ".discover",
      ".btn-refresh",
      ".bi-plus-square-fill",
      ".create-text",
      ".card-text-color",
      ".card-color",
      ".card-icon",
      ".card-pin-color",
      ".card-text",
      ".date-hr",
      ".card-hr",
      ".card-title",
      ".card-username",
      ".card-location",
      ".bi-pin",
      ".form-control",
      ".bi-search",
      ".timestamp",
      "#user-profile",
      "#editprofile-form",
      "#editsecurity-form",
      "h2",
      "h3",
      ".form-label",
      "h6",
      ".nav-color",
      ".nav-tabs",

      // sign in modal
      // // '.body-modal',
      // '.cd-signin-modal__block',
      // '.cd-main-header',
      // '.cd-main-nav__item',
      // '.cd-signin-modal__switcher a',
      // '.cd-signin-modal__input.cd-signin-modal__input--has-border',
      // '.cd-signin-modal__input.cd-signin-modal__input--has-border:focus',
      // '.cd-signin-modal__input.cd-signin-modal__input--has-error',
      // '.cd-signin-modal__input[type=submit]',
      // '.cd-signin-modal__input[type=submit]:hover, .cd-signin-modal__input[type=submit]:focus',
      // '.cd-signin-modal__hide-password',
    ];

    elementsToToggle.forEach(function (element) {
      $(element).toggleClass("darkmode", isNightMode);
    });
  }
  // END NIGHT MODE //

  // Load the username and avatar to the navbar.  Only do this if the element is loaded
  if ($("#nav-user-dropdown").length) {
    // get the user's session data
    $.ajax({
      url: "/api/user/session/lookup",
      method: "GET",
    }).then(function (data) {
      if (data) {
        // get the avatar info for the users avatar_id
        $.ajax({
          url: `/api/avatars/${data.avatar_id}`,
          method: "GET",
        }).then(function (avatarData) {
          // if the user is logged in, make the text in the logout dropdown your username and your avatar picture src
          $("#user-profile-pic").attr("src", avatarData.avatarsImage);
          $("#user-username").text(`Hi, ${data.username}`);
        });
      }
    });
  }
});
