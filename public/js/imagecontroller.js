
$(function(){
  var name = $('#ausername').text();
//  alert("Name is :" + name);
  var intials = name.charAt(0).toUpperCase();
  //alert(intials);
  var profileImage = $('#profilepic-small').text(intials);
});
