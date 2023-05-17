$(document).ready(function () {

  // Save the current values in the form
  var currentUserInfo = {
    username: $("#editprofile-username").val(),
    firstName: $("#editprofile-firstname").val(),
    lastName: $("#editprofile-lastname").val(),
    aboutme: $("#editprofile-aboutme").val(),
    email: $("#editprofile-email").val(),    
  };

  // if you type in the form and the value is different than the current value, enable the submit button
  $("#editprofile-username, #editprofile-firstname, #editprofile-lastname, #editprofile-aboutme").on("input", function () {
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

  // If you submit the form, send a PUT request to update the user's info
  $("#editprofile-form").submit(function (event) {
    var form = $("#editprofile-form")[0];

    // If there is an invalid form, prevent the submit button from working and show the validation notes
    if (!form.checkValidity()) {
      console.log("check!")
      console.log($("#editprofile-lastname").val().trim())
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

      // Send the PUT request
      $.ajax({
        url: "/api/user/editprofile/4440b905-e4f8-4921-a404-fe1676e0df41",
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
