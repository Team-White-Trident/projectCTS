setTimeout(function ()
    {
        if (self.name != '_refreshed_'){
        self.name = '_refreshed_';
        self.location.reload(true);
    } else {
        self.name = '';
    }
  }, 4000);
$(document).on("click", ".open-profileDialog", function () {
     var contentId = $(this).data('id');
     var contentWhatever = $(this).data('whatever');
    // var contentLang = $(this).data('lang').trim();

    $(".modal-header").html(contentId.bold());
  //  $("#codearea").attr("data-language",contentLang);

    //$(".modal-body #modalbody").html( contentWhatever );

     $("#codearea").html( contentWhatever );
     //$( "#test" ).load( "../../ #test" );


});
