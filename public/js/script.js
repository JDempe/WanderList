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
      // if the user is logged in, make the text in the logout dropdown your username
      $("#user-username").text(`Hi, ${data.username}`);
    }
  });
});
