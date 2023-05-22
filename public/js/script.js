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
