$(document).ready(function () {
  // set up the modal show and hide
  $("#changeAvatarBtn").click(function (e) {
    e.preventDefault();
    // show the modal
    $("#avatarChoiceModal").modal("show");
  });

  // Save the current values in the form
  var currentUserInfo = {
    username: $("#editprofile-username").val(),
    firstName: $("#editprofile-firstname").val(),
    lastName: $("#editprofile-lastname").val(),
    aboutme: $("#editprofile-aboutme").val(),
    email: $("#editprofile-email").val(),
  };

  // if you type in the form and the value is different than the current value, enable the submit button
  $(
    "#editprofile-username, #editprofile-firstname, #editprofile-lastname, #editprofile-aboutme"
  ).on("input", function () {
    if (
      $("#editprofile-username").val() !== currentUserInfo.username ||
      $("#editprofile-firstname").val() !== currentUserInfo.firstName ||
      $("#editprofile-lastname").val() !== currentUserInfo.lastName ||
      $("#editprofile-aboutme").val() !== currentUserInfo.aboutme
    ) {
      $("#editprofile-submitBtn").removeAttr("disabled");
    } else {
      $("#editprofile-submitBtn").attr("disabled", true);
    }
  });

  // when you click on an avatar image option, change the avatar image and reload the page
  $(".avatar-image-option").on("click", function () {
    // Get the avatar id from the image
    const avatarId = $(this).attr("data-avatar-id");
    console.log(avatarId);

    // Send a PUT request to change the user's avatar id
    $.ajax({
      url: "/api/user/editprofile/027bd7de-8836-411e-9e81-c9b134bde984",
      data: {
        avatar_id: avatarId,
      },
      type: "PUT",
      success: function (response) {
        console.log("updated user");
        location.reload();
      },
      error: function (xhr) {
        console.log(xhr);
      },
    });
  });

  // If you submit the form, send a PUT request to update the user's info
  $("#editprofile-form").submit(function (event) {
    var form = $("#editprofile-form")[0];

    // If there is an invalid form, prevent the submit button from working and show the validation notes
    if (!form.checkValidity()) {
      console.log("check!");
      console.log($("#editprofile-lastname").val().trim());
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
    }
    // Otherwise, if the form is valid, send a PUT request with the info
    else {
      // Prevent default behavior
      event.preventDefault();

      // Collect the new information to send in the PUT request
      const user = {
        username: $("#editprofile-username").val().trim(),
        firstName: $("#editprofile-firstname").val().trim(),
        lastName: $("#editprofile-lastname").val().trim(),
        aboutme: $("#editprofile-aboutme").val().trim(),
      };

      // Send the PUT request to change user profile info
      $.ajax({
        url: "/api/user/editprofile/027bd7de-8836-411e-9e81-c9b134bde984",
        data: {
          first_name: user.firstName,
          last_name: user.lastName,
          username: user.username,
          about_me: user.aboutme,
        },
        type: "PUT",
        success: function (response) {
          console.log("updated user");
          location.reload();
        },
        error: function (xhr) {
          console.log("error updating user");
        },
      });
    }
  });
});

// If you click the cancel button reload the page
$("#editprofile-cancelBtn").on("click", function () {
  location.reload();
});
