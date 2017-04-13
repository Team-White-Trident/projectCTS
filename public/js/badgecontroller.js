$(function(){

    var count=  $('#notificationsBadge').text();

    if(count==0){
        $('#notificationsBadge').hide();
    }
    else{
      $("#notificationsBadge").show();
      $("#notificationsBadge").html(count);
    }
});
