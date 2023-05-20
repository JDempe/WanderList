const $signupBtn = $("#signup-btn");
const $signupUsername = $("#signup-username");
const $signupEmail = $("#signup-email");
const $signupPassword = $("#signup-password");
const $loginBtn = $("#login-btn");
const $logoutBnt = $("#logout-btn");

// invoked when the 'Create Account' button is clicked and sends the user information to the server for saving.
async function handleSignUpClick(e) {
  e.preventDefault();

  const userData = {
    username: $signupUsername.val().trim(),
    email: $signupEmail.val().trim().toLowerCase(),
    password: $signupPassword.val().trim(),
  };

  const response = await fetch("/api/user/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    $(".body-modal").removeAttr("cd-signin-modal--is-visible");
    document.location.replace("/");
    alert(`Welcome aboard, ${userData.username}! Enjoy your journey with us!`);
  } else {
    alert("Failed to sign up!");
  }
}

// invoked when the 'Log-in' button is clicked and sends the user information to the server for validation.
async function handleLogInClick(e) {
  e.preventDefault();

  const userData = {
    email: $("#signin-email").val().trim().toLowerCase(),
    password: $("#signin-password").val().trim(),
  };

  const response = await fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const responseData = await response.json();
    console.log("responseData", responseData);
    const userId = responseData.userId; // Extract additional user data
    console.log("userId", userId);
    $(".body-modal").removeAttr("cd-signin-modal--is-visible");
    document.location.replace(`api//pins/user/${userId}`);
    // alert(`You are logged in successfully!`); // to be removed. needed for testing purpose

    // $(".body-modal").removeAttr("cd-signin-modal--is-visible");
    // document.location.replace(`/`);
    // alert(`You are logged in successfully!`); // to be removed. needed for testing purpose
  } else if (response.status === 400) {
    $("#signin-password")
      .siblings(".error-400")
      .addClass("cd-signin-modal__error--is-visible");
  } else {
    $("#signin-password")
      .siblings(".error-500")
      .addClass("cd-signin-modal__error--is-visible");
  }
}

//
async function handleLogOutClick(e) {
  e.preventDefault();

  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else if (response.status === 404) {
    alert("User was not found");
  } else {
    alert(
      "We apologize for the inconvenience. We have encountered an issue on our end, but rest assured that we are actively working to resolve it. We appreciate your understanding."
    );
  }
}

// function tracks username input validation success and calls another function to display a custom error if validation fails.
function validateSignUpUsernameField() {
  const bool = validateUsername(); // invoke the validate function to verify if the validation has been successful.

  if (!bool) {
    showErrorMessage($signupUsername);
  }
}

// validate that the username value is composed of 3 to 20 alphanumeric characters.
function validateUsername() {
  const username = $signupUsername.val().trim();
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;

  if (
    username.length < 3 ||
    username.length > 20 ||
    !alphanumericRegex.test(username)
  ) {
    return false;
  } else {
    return true;
  }
}

// function tracks user's email input validation success and calls another function to display a custom error if validation fails.
function validateSignUpEmailField() {
  const bool = validateEmail(); // true or false

  if (!bool) {
    showErrorMessage($signupEmail);
  }
}

// validate that the email value is in a valid email format.
function validateEmail() {
  const userEmail = $signupEmail.val().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(userEmail)) {
    return false;
  } else {
    return true;
  }
}

// function tracks user's password input validation success and calls another function to display a custom error if validation fails.
function validateSignUpPasswordField() {
  const bool = validatePassword(); // true or false

  if (!bool) {
    showErrorMessage($signupPassword);
  }
}

// verify that the password value consists of 8 to 128 characters and includes at least one numerical digit, one special symbol, and one uppercase letter.
function validatePassword() {
  const userPassword = $signupPassword.val().trim();
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[~`!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*[a-z]).{8,128}$/;

  if (!passwordRegex.test(userPassword)) {
    return false;
  } else {
    return true;
  }
}

// displayss a custom error message if any of the sign-up inputs fail to pass the validation.
function showErrorMessage(element) {
  element
    .siblings(".cd-signin-modal__error")
    .addClass("cd-signin-modal__error--is-visible");

  element.on("focus", () => {
    element
      .siblings(".cd-signin-modal__error")
      .removeClass("cd-signin-modal__error--is-visible");
  });
}

// function disables or enables "create account" button based on the sign-up fields input validation
function checkSignUpFormCompletion() {
  const username = validateUsername();
  const userEmail = validateEmail();
  const userPassword = validatePassword();

  // if all sign-up field inputs have successfully passed the validation, remove the 'disabled' attribute from the 'Create Account' button.
  if (username && userEmail && userPassword) {
    $signupBtn.removeAttr("disabled");
  }

  // if any of the sign-up field inputs haven't passed the validation, add the 'disabled' attribute to the 'Create Account' button.
  if (!username || !userEmail || !userPassword) {
    $signupBtn.attr("disabled", "disabled");
  }
}

// event listeners
$loginBtn.on("click", (e) => handleLogInClick(e));
$signupBtn.on("click", (e) => handleSignUpClick(e));
$logoutBnt.on("click", (e) => handleLogOutClick(e));
$signupUsername.on("blur", validateSignUpUsernameField);
$signupEmail.on("blur", validateSignUpEmailField);
$signupPassword.on("blur", validateSignUpPasswordField);
$(".signup-input").on("keyup", checkSignUpFormCompletion); // ".signup-input" is a class assigned to all the input fields in the sign-up form.
