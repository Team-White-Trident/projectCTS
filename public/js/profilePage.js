// $(function() {
//   alert("hello");
//   var date= $("td#timestamp").value();
//   alert(date);
//
// });

$(document).on("click", ".open-profileDialog", function () {
     var contentId = $(this).data('id');
     var contentCode = $(this).data('code');
    // var contentLang = $(this).data('lang').trim();

    $(".modal-header").html(contentId.bold());
  //  $("#codearea").attr("data-language",contentLang);

    //$(".modal-body #modalbody").html( contentWhatever );

     $("#codearea").html(contentCode);
     //$( "#test" ).load( "../../ #test" );


});



function changeprofile(){
  $.post("/changeprofile",{})
       .done(function(data) {
              alert("Successfully Applied! Wait till approvement");
         })
       .fail(function(data) {
        // alert(data);
              alert("Successfully Applied! Wait till it is approved");
       }
   );
}
