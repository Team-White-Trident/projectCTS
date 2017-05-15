var contentId,contentEmail;

$(document).on("click", ".open-verifyDialog", function () {
  contentId = $(this).data('id');
  contentEmail = $(this).data('email');
  $('#verifyUserfeedback').modal({backdrop: 'static', keyboard: false});
 $("#modal-footer").hide();
  $('#verifyUserfeedback').modal('show');
   $("#statusofApprovement").html("Wait...");
     $.post("/reviewuser", {email:contentEmail},function(){},"json")
          .done(function(data) {
            $("#modal-footer").show();
            $('#verifyUserfeedback').modal('show');
            $("#statusofApprovement").html(data.status);
            })
          .fail(function(data) {

              $("#modal-footer").show();
              $('#verifyUserfeedback').modal('show');
              $("#statusofApprovement").html("Error Occured");
          }
      );
});


$(document).on("click", ".open-rejectDialog", function () {
      contentId = $(this).data('id');
      contentEmail = $(this).data('email');
      $('#verifyUserfeedback').modal({backdrop: 'static', keyboard: false});
     $("#modal-footer").hide();
      $('#verifyUserfeedback').modal('show');
       $("#statusofApprovement").html("Wait...");


     $.post("/rejectuser", {email:contentEmail})
          .done(function(data) {
            $("#modal-footer").show();
            $('#verifyUserfeedback').modal('show');
            $("#statusofApprovement").html(data.status);
            })
          .fail(function(data) {
            $("#modal-footer").show();
            $('#verifyUserfeedback').modal('show');
            $("#statusofApprovement").html("Error Occured");
          }
      );
});
function redirect(){
    window.location.href = "/reviewuser";
}
