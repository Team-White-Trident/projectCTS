var contentId ="",contentLang="",contentWhatever="";

$(document).on("click", ".open-verifyDialog", function () {
      contentId = $(this).data('id');
      contentCode = $(this).data('whatever');
      contentLang = $(this).data('lang').trim();





 alert(contentWhatever);


     $.post("/review", {code:contentCode,language:contentLang,name:contentId})
          .done(function(data) {
              console.log(data);
            })
          .fail(function(data) {
              console.log("Failed: "+data);

          }
      );

});
