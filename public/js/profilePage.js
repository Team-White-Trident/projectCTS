// $(function() {
//   alert("hello");
//   var date= $("td#timestamp").value();
//   alert(date);
//
// });

$(document).on("click", ".open-profileDialog", function () {
     var contentId = $(this).data('id');
     var contentCode = $(this).data('code');
     var nCode = $(this).data('ncode');
    // var contentLang = $(this).data('lang').trim();

    $(".modal-header").html(contentId.bold());
  //  $("#codearea").attr("data-language",contentLang);

    //$(".modal-body #modalbody").html( contentWhatever );

     $("#codearea").html(contentCode);
     $("#codearea2").html(nCode);
     //$( "#test" ).load( "../../ #test" );


});



function changeprofile(){
  $.post("/changeprofile",{},function(){},"json")
       .done(function(data) {
              alert("Successfully Applied! Wait till approvement");
         })
       .fail(function(data) {
        // alert(data);
              alert("Successfully Applied! Wait till it is approved");
       }
   );
}
