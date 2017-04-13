var contentId,contentLang,contentWhatever;

$(document).on("click", ".open-profileDialog", function () {
     var contentId = $(this).data('id');
     var contentWhatever = $(this).data('whatever');
    var contentLang = $(this).data('lang').trim();

    $(".modal-header").html(contentId.bold());
  //  $("#codearea").attr("data-language",contentLang);

    //$(".modal-body #modalbody").html( contentWhatever );

     $("#codearea").html( contentWhatever );
     //$( "#test" ).load( "../../ #test" );
     });
     function reviewCode()
     {
     $.post("/review", {code:contentWhatever,language:contentLang,name:contentId})
          .done(function(data) {
              console.log(data);
            })
          .fail(function(data) {
              console.log("Failed: "+data);

          }
      );
    }
