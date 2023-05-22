$(document).ready(function() {
  const isNightMode = localStorage.getItem('nightMode');

  if (isNightMode !== null) {
    $('#flexSwitchCheckDefault').prop('checked', isNightMode === 'true');

    if (isNightMode === 'true') {
      toggleNightMode(true);
    }
  }

  $('#flexSwitchCheckDefault').on('change', function() {
    const isNightMode = $(this).prop('checked');

    localStorage.setItem('nightMode', isNightMode);

    toggleNightMode(isNightMode);
  });

  function toggleNightMode(isNightMode) {
    const elementsToToggle = [
      // main.handlebars
      'body',
      '.navbar',
      '.login-nav-Btn',
      '#navbarNavAltMarkup',
      '.navbar-brand',
      'footer',
      // disover.handlebars
      '.discover',
      '.btn-refresh',
      '.bi-plus-square-fill',
      '.create-text',
      '.card-text-color',
      '.card-color',
      '.card-icon',
      '.card-pin-color',
      '.card-text',
      '.date-hr',
      '.card-hr',
      '.card-title',
      '.card-username',
      '.card-location',
      '.bi-pin',
      '.form-control',
      '.bi-search',
      '.timestamp',
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

    elementsToToggle.forEach(function(element) {
      $(element).toggleClass('darkmode', isNightMode);
    });
  }
});

// Removes any empty script tags from html
$(document).ready(function () {
  $("script").each(function () {
    if (!$(this).attr("src") && !$(this).text().trim()) {
      $(this).remove();
    }
  });

  // use the session lookup api to check if the user is logged in
  $.get("/api/user/session/lookup", function (data) {
    if (data) {
      // get the avatar info for the users avatar_id
      $.get(`/api/avatars/${data.avatar_id}`, function (avatarData) {
        // if the user is logged in, make the text in the logout dropdown your username and your avatar picture src
        $("#user-profile-pic").attr("src", avatarData.avatarsImage);
        $("#user-username").text(`Hi, ${data.username}`);
      });
    }
  });
});
