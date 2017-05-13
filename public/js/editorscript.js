var identifier = null;
var session;
var tracker = {
               ansic:"#include<stdio.h>\nvoid main(){\n\n}",
               cpp11:"#include<iostream>\nusing namespace std;\nint main(){\nreturn 0;\n}",
               java:"import java.util.*;\nclass Template{\npublic static void main(String arg[]){\n\n\t}\n}",
               python:"x = 5\ny = 4\nz=x+y\nprint \"Sum=\",z"};


var editor = ace.edit("editor");
editor.$blockScrolling = Infinity;
document.getElementById('editor').style.fontSize='16px';

 editor.setTheme("ace/theme/monokai");
        session = editor.getSession();
        session.setUseWrapMode(true);
        session.setUseWorker(false);
        session.setMode("ace/mode/javascript");

session.setValue(tracker.ansic);
session.setMode("ace/mode/c_cpp");



function myfunc(){

   var e= window.event,
	btn=e.target;
//alert("workinghere");
	if(btn.id=="ansi_c"){
	editor.setValue(tracker.ansic);
   // session=editor.getSession();
	editor.getSession().setMode("ace/mode/c_cpp");
  editor.gotoLine(editor.session.getLength());

	}
	if(btn.id=="cpp_11"){
	//alert("hello");
	editor.setValue(tracker.cpp11);
  editor.getSession().setMode("ace/mode/c_cpp");
  editor.gotoLine(editor.session.getLength());

	}

	if(btn.id=="java__"){
	editor.setValue(tracker.java);
	editor.getSession().setMode("ace/mode/java");
  editor.gotoLine(editor.session.getLength());

  }
	if(btn.id=="python__"){
	editor.setValue(tracker.python);
  editor.getSession().setMode("ace/mode/python");
  editor.gotoLine(editor.session.getLength());

  }
}



function compile() {
var value = $('.nav-tabs .active').text().trim();
        $.post("/compile", {code: session.getValue(), language:value})
            .done(function(data) {
                $("#output-container").text("Compile status: " + JSON.parse(data).compile_status);
            })
            .fail(function(data) {
                console.log(data);
                $("#output-container").text("Compilatiion failed!");
            }
        );
    }




function run() {
var value = $('.nav-tabs .active').text().trim();
        $.post("/run", {code: session.getValue(), language: value})
            .done(function(data) {
                console.log(data);
                data = JSON.parse(data);
                if(data.run_status.status === "AC") {
                    $("#output-container").html(data.run_status.output_html);
                } else if(data.run_status.status === "CE") {
                    $("#output-container").text("Compile Error: " + data.run_status.status_detail);
                } else {
                    $("#output-container").html(data.run_status.output_html);
                }
            })
            .fail(function(data) {
                console.log(data);
                $("#output-container").text("Run operation failed!");
            }
        );
    }

function saveTextAsFile()
{


var value = $('.nav-tabs .active').text().trim();
    var textToSave = editor.getValue();
    var textToSaveAsBlob = new Blob([textToSave], {type:""});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    if(value=="C")
    var fileNameToSaveAs = "CCode.c";
    if(value=="CPP")
    var fileNameToSaveAs = "C++Code.cpp";
    if(value=="JAVA")
    var fileNameToSaveAs = "JavaCode.java";
    if(value=="PYTHON")
    var fileNameToSaveAs = "PythonCode.py";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}



function handleDD(){

      var idee = ($('.nav-tabs .active').text()).toLowerCase().trim();
      var madeid = (idee+"language").trim();

      var templateSelect = document.getElementById((madeid));
      var selectedValue = templateSelect.options[templateSelect.selectedIndex].value;
      var selectedId = templateSelect.options[templateSelect.selectedIndex].id;

      // alert(selectedValue);
      if (selectedValue=="") return;
      editor.insert(selectedValue);

      $.post("/savehistory", {code:selectedId})
           .done(function(data) {
               console.log(data);
             })
           .fail(function(data) {
               console.log("Failed: "+data);

           }
       );
}
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

function reset(){
  var value = $('.nav-tabs .active').text().trim();
  if(value=="C"){
    editor.setValue(tracker.ansic);
      editor.gotoLine(editor.session.getLength());
    }
  if(value=="CPP"){
    editor.setValue(tracker.cpp11);
      editor.gotoLine(editor.session.getLength());
  }
  if(value=="JAVA"){
    editor.setValue(tracker.java);
      editor.gotoLine(editor.session.getLength());
  }
  if(value=="PYTHON"){
        editor.setValue(tracker.python);
        editor.gotoLine(editor.session.getLength());
  }

}

$(document).on("click", "#giveSuggestion", function () {


          var idee = ($('.nav-tabs .active').text()).toLowerCase().trim();
          var madeid = (idee+"language").trim();

          var templateSelect = document.getElementById((madeid));
          var selectedText = templateSelect.options[templateSelect.selectedIndex].text;
        //  alert(selectedText);
          localStorage.setItem('selectedText',selectedText);

});
$(document).on("click","button#checkmissing",function(){
    $('#checkmissingmodal').modal("show");
});
