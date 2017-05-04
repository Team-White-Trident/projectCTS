$(document).on('click','button#submittest',function(){
    var answers= {};
    var ids= {};
    var length=$('button#submittest').data('length');
    //alert(length);
    for(var i=0;i<length;i++){
        var answer = $("input:radio[name='option"+i+"']:checked").val();
        // alert(answer);
        answers[i]=answer;
        ids[i]=$("label#question"+i).data("id");
    }
        $.post('/matchanswer',{answers:answers,ids:ids,numberofquestions:length},function(){ },"json")
        .done(function(data){
                    $('#feedback').modal('show');
                     $("#statusofsubmit").html(data.status);
        })
        .fail(function(){
          alert("Please attempt all questions");
        });

});
function redirect(){
  window.location.href = "/profile";
}
