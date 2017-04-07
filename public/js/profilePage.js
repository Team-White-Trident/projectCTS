
$(document).on("click", ".open-profileDialog", function () {
     var contentId = $(this).data('id');
     var contentWhatever = $(this).data('whatever');

$(".modal-header").html(contentId);
     $(".modal-body #modalbody").html( contentWhatever );
});
