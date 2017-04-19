var contentId,contentLang,contentWhatever;

$(document).on("click", ".open-verifyDialog", function () {
      contentId = $(this).data('id');
      contentCode = $(this).data('code');
      contentLang = $(this).data('lang').trim();

     $.post("/review", {code:contentCode,language:contentLang,name:contentId})
          .done(function(data) {
                  window.location.reload(true);
            })
          .fail(function(data) {
                          alert("There was an error! Please retry.");
          }
      );
});


$(document).on("click", ".open-rejectDialog", function () {
      contentId = $(this).data('id');
      contentLang = $(this).data('lang').trim();

     $.post("/reject", {language:contentLang,name:contentId})
          .done(function(data) {
                window.location.reload(true);
            })
          .fail(function(data) {
              alert("There was an error! Please retry.");
          }
      );
});
