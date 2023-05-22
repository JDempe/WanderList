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
    $('body, .navbar, .login-nav-Btn, #navbarNavAltMarkup, .navbar-brand, footer').toggleClass('darkmode', isNightMode);
  }
});

// Removes any empty script tags from html
$(document).ready(function() {
    $('script').each(function() {
      if (!$(this).attr('src') && !$(this).text().trim()) {
        $(this).remove();
      }
    });
});

console.log("script.js loaded");