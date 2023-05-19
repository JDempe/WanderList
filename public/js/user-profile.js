$(document).ready(function () {
  // Get the current user's info
  // Save the current values in the form
  var currentUserInfo = {
    username: $("#editprofile-username").val(),
    firstName: $("#editprofile-firstname").val(),
    lastName: $("#editprofile-lastname").val(),
    aboutme: $("#editprofile-aboutme").val(),
    email: $("#editsecurity-email").val(),
  };

  // AVATAR MODAL //
  // set up the modal show and hide
  $("#changeAvatarBtn").click(function (e) {
    e.preventDefault();
    // show the modal
    $("#avatarChoiceModal").modal("show");
  });

  // when you click on an avatar image option, change the avatar image and reload the page
  $(".avatar-image-option").on("click", function () {
    // Get the avatar id from the image
    const avatarId = $(this).attr("data-avatar-id");
    console.log(avatarId);

    // Send a PUT request to change the user's avatar id
    $.ajax({
      url: `/api/user/editprofile/${currentUserInfo.username}`,
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
  // END AVATAR MODAL //

  // USER PROFILE //

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
      // if active, enable the submit button and change its color
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
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
    }
    // Otherwise, if the form is valid, send a PUT request with the info
    else {
      // Prevent default behavior
      event.preventDefault();

      // Collect the new information to validate uniqueness and send in the PUT request
      const user = {
        username: $("#editprofile-username").val().trim(),
        firstName: $("#editprofile-firstname").val().trim(),
        lastName: $("#editprofile-lastname").val().trim(),
        aboutme: $("#editprofile-aboutme").val().trim(),
      };

      // Check the username to make sure it is unique in the DB
      // if the username was editted, check to make sure it is unique
      // Check the username to make sure it is unique in the DB
      if (user.username !== currentUserInfo.username) {
        // Send a GET request to check the username
        $.ajax({
          url: `/api/user/checkusername/${user.username}`,
          type: "GET",
          success: function (response) {
            // If the username is not unique, show an error message
            // If the username doesnt exist or is mine, send the PUT request to change user profile info
            if (response) {
              addAlertToPage(
                "alert-danger",
                "Username already exists!",
                " Please choose a different username.",
                "#editprofile-submitBtn"
              );
            } else {
              $.ajax({
                url: `/api/user/editprofile/${currentUserInfo.username}`,
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
                  console.log(xhr);
                },
              });
            }
          },
          error: function (xhr) {
            console.log(xhr);
            console.log("error checking username");
          },
        });
      }
    }
  });
  // END USER PROFILE //

  // ACCOUNT SECURITY //

  //Enable the confirm button if the passwords are equal length and greater than 7 characters
  $("#editsecurity-password, #editsecurity-confirmpassword").on(
    "input",
    function () {
      if (
        $("#editsecurity-password").val().length > 7 &&
        $("#editsecurity-confirmpassword").val().length > 7 &&
        $("#editsecurity-password").val().length ===
          $("#editsecurity-confirmpassword").val().length
      ) {
        // if active, enable the submit button and change its color
        $("#editsecurity-submitBtn").removeAttr("disabled");
      } else {
        $("#editsecurity-submitBtn").attr("disabled", true);
      }
    }
  );

  // if you submit the form, first check to make sure the passwords match and are valid.  Don't let the user submit the form if they don't match or are invalid.
  $("#editsecurity-form").submit(function (event) {
    var password = $("#editsecurity-password").val().trim();
    var confirmPassword = $("#editsecurity-confirmpassword").val().trim();

    if (
      password !== confirmPassword ||
      !validatePassword(password) ||
      !validatePassword(confirmPassword)
    ) {
      event.preventDefault();
      event.stopPropagation();
      if (password !== confirmPassword) {
        addAlertToPage(
          "alert-danger",
          "Passwords do not match!",
          " Please enter matching passwords.",
          "#editsecurity-submitBtn"
        );
      }
      if (!validatePassword(password)) {
        addAlertToPage(
          "alert-danger",
          "Password is invalid!",
          " Please enter a valid password.",
          "#editsecurity-submitBtn"
        );
      }
    } else {
      // if the passwords match, send a PUT request to update the user's password
      $.ajax({
        url: `/api/user/editsecurity/${currentUserInfo.id}`,
        data: {
          password: password,
        },
        type: "PUT",
        success: function (response) {
          console.log("updated user");
        },
        error: function (xhr) {
          console.log(xhr);
          console.log("error updating user");
        },
      });
    }
  });

  // if the user clicks the delete button, it pulls up a confirmation modal
  $("#editsecurity-deleteBtn").click(function (e) {
    e.preventDefault();
    // show the modal
    $("#deleteAccountModal").modal("show");
  });

  // if the user clicks the deleteAccountModal confirm button, it sends a DELETE request to delete the user
  $("#deleteAccountModal-confirmBtn").click(function (e) {
    e.preventDefault();
    // send a DELETE request to delete the user
    $.ajax({
      url: `/api/user/delete/${currentUserInfo.username}`,
      type: "DELETE",
      success: function (response) {
        console.log("deleted user");
        // redirect to the homepage
        window.location.href = "/";
      },
      error: function (xhr) {
        console.log(xhr);
        console.log("error deleting user");
      },
    });
  });

  // END ACCOUNT SECURITY //

  // FUNCTIONS //

  // TODO Add to helper functions and import to this .js
  // create the alert element
  function addAlertToPage(
    alertClass,
    alertBoldMessage,
    alertMessage,
    disableButtonID
  ) {
    var myAlert = document.createElement("div");
    myAlert.className = `alert ${alertClass} alert-dismissible fade show`;
    myAlert.setAttribute("role", "alert");
    myAlert.innerHTML = `
            <strong>${alertBoldMessage}</strong> ${alertMessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
    // append the alert to the page
    $("#editprofile-alert-area").append(myAlert);
    // disable the confirm button
    $(`${disableButtonID}`).attr("disabled", true);

    // create a timer to fade out the alert
    // TODO Figure out why this is throwing an uncaught type error
    setTimeout(function () {
      $(".alert").alert("close");
    }, 5000);
  }

  // TODO Learn how to import from helpers.js
  // validate the password
  function validatePassword(password) {
    const userPassword = password.trim();
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[~`!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*[a-z]).{8,128}$/;

    if (!passwordRegex.test(userPassword)) {
      return false;
    } else {
      return true;
    }
  }

  // END FUNCTIONS //
});
