// Placeholder for when needed

// Removes any empty script tags from html
$(document).ready(function() {
    $('script').each(function() {
      if (!$(this).attr('src') && !$(this).text().trim()) {
        $(this).remove();
      }
    });
});

