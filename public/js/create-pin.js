$(document).ready(function () {
  $("#create-new-pin").click(function () {
    // disabled the create new pin button
    $("#create-new-pin").addClass("disabled");
    // use the jquery method to make the form like this:

    const newFormEl = document.createElement("div");
    newFormEl.classList.add("pin");
    newFormEl.classList.add("create-pin-flag");

    newFormEl.innerHTML = `
<div class="date-container">
<hr class="hr date-hr">
<div class="timestamp">MM/DD/YY</div>
<hr class="hr date-hr">
</div>
<div class="card-container">
<div class="card" data-id="" id="">
<form class="card-body was-validated">
<div class="card-top-section">
<input class="card-title" type="text" placeholder="Enter Title" aria-label="Pin Title" value="">
<div class="valid-feedback" style="display: none;">Great!</div>
<div class="invalid-feedback" style="display: none;">Please enter a title.</div>
<div class="card-icon-section">
<i class="bi bi-check-square card-icon"></i>
<i class="bi bi-pencil card-icon"></i>
<i class="bi bi-pin-angle card-icon"></i>
<i class="bi bi-share card-icon"></i>
<i class="bi bi-trash card-icon"></i>
</div>
</div>
<hr class="hr card-hr">
<textarea class="card-text form-control" placeholder="Enter Text" id="validationTextarea" aria-label="Pin Body Text" required=""></textarea>
<div class="changes-btn-container">
<button class="btn btn-primary save-btn" type="button" style="display:inline-block">Save Changes</button>
<button class="btn btn-outline-danger discard-btn" type="button" style="display:inline-block">Discard Changes</button>
</div>
</form>
</div>
</div>
`;

    $(".no-results-container").after(newFormEl);
  });

  // save button
  $(document).on("click", ".save-btn", function () {
    // get the value of the title and text
    const title = $(this).parent().parent().find(".card-title").val();
    const text = $(this).parent().parent().find(".card-text").val();

   //  get the session user id as the id by calling the /api/user/session/lookup route
      $.ajax({
         url: "/api/user/session/lookup",
         type: "GET",
      }).then(function (response) {
         console.log(response);
         const id = response.id;
         
         // send a post request to the server
         $.ajax({
            url: `/api/pins/user/${id}`,
            type: "POST",
            data: {
               title: title,
               text: text,
            },
         }).then(function (response) {
            console.log(response);
            // remove the disabled class from the create new pin button
            $("#create-new-pin").removeClass("disabled");
         });
      });
   });


    

    
  });
