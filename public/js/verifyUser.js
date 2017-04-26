var contentId,contentEmail;

$(document).on("click", ".open-verifyDialog", function () {
  contentId = $(this).data('id');
  contentEmail = $(this).data('email');

     $.post("/reviewuser", {email:contentEmail})
          .done(function(data) {
                  window.location.reload(true);
            })
          .fail(function(data) {
                      window.location.reload(true);
          }
      );
});


$(document).on("click", ".open-rejectDialog", function () {
      contentId = $(this).data('id');
      contentEmail = $(this).data('email');

     $.post("/rejectuser", {email:contentEmail})
          .done(function(data) {
                window.location.reload(true);
            })
          .fail(function(data) {
            window.location.reload(true);
          }
      );
});
