
$(document).on("click", ".open-profileDialog", function () {
     var contentId = $(this).data('id');
     var contentCode = $(this).data('whatever');
    // var contentLang = $(this).data('lang').trim();

    $(".modal-header").html(contentId.bold());
  //  $("#codearea").attr("data-language",contentLang);

    //$(".modal-body #modalbody").html( contentWhatever );

     $("#codearea").html(contentCode);
     //$( "#test" ).load( "../../ #test" );


});
