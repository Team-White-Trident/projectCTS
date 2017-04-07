
$(document).on("click", ".open-AddBookDialog", function () {
     var myBookId = $(this).data('id');
     var myBookWhatever = $(this).data('whatever');
  
$(".modal-header").html(myBookId);
     $(".modal-body #modalbody").html( myBookWhatever );
});
