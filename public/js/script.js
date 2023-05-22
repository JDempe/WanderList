$(document).ready(function() {
  const isNightMode = localStorage.getItem('nightMode');

  if (isNightMode !== null) {
    $('#flexSwitchCheckDefault').prop('checked', isNightMode === 'true');

    if (isNightMode === 'true') {
      $('.navbar').addClass('darkmode');
    }
  }

  $('#flexSwitchCheckDefault').on('change', function() {
    const isNightMode = $(this).prop('checked');

    localStorage.setItem('nightMode', isNightMode);

    if (isNightMode) {
      $('.navbar').addClass('darkmode');
    } else {
      $('.navbar').removeClass('darkmode');
    }
  });
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