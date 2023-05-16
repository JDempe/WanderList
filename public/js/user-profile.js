  // Fetch all the forms we want to apply custom Bootstrap validation styles to, Loop over them and prevent submission
$(document).ready(function () {
  $(".needs-validation").submit(function (event) {
    var form = $(".needs-validation")[0];
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add("was-validated");
  });
});