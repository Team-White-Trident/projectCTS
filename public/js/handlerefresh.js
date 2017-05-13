
$(window).on('beforeunload', function(){
        console.log("beforeUnload event!");
        sessionStorage.setItem('lastwork',session.getValue());
          return confirm("Confirm refresh");
    });
window.setInterval(function(){
    sessionStorage.setItem('lastwork',session.getValue());
        // alert("Hello Timeout"+ sessionStorage.getItem('lastwork'));
  }, 60*1000);


$(function() {
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            sessionStorage.setItem('lastTab', $(this).attr('href'));

        });

        // go to the latest tab, if it exists:
        var lastTab = sessionStorage.getItem('lastTab');
        if (lastTab) {
            $('[href="' + lastTab + '"]').tab('show');
            if(lastTab=="#c"){
              editor.getSession().setMode("ace/mode/c_cpp");
            }else if(lastTab=="#cpp"){
              editor.getSession().setMode("ace/mode/c_cpp");
            }else if(lastTab=="#java"){
              editor.getSession().setMode("ace/mode/java");
            }else if(lastTab=="#python"){
              editor.getSession().setMode("ace/mode/python");

            }
            if(sessionStorage.getItem('lastwork')){
              // alert(sessionStorage.getItem('lastwork'));
              editor.setValue(sessionStorage.getItem('lastwork'));
              editor.gotoLine(editor.session.getLength());

            }
        }

    });
