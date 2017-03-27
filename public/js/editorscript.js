var identifier = null;
var session;
var tracker = {
               ansic:"#include<stdio.h>\nvoid main(){\n\n}",
               cpp11:"#include<iostream>\nusing namespace std;\nint main(){\nreturn 0;\n}",
               java:"import java.util.*;\nclass template{\npublic static void main(String arg[]){\n\n\t}\n}",
               python:"var x =raw_input();\n print x;"};


var editor = ace.edit("editor");
document.getElementById('editor').style.fontSize='12px';

 editor.setTheme("ace/theme/textmate");
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

	}
	if(btn.id=="cpp_11"){
	//alert("hello");
	editor.setValue(tracker.cpp11);
       editor.getSession().setMode("ace/mode/c_cpp");
	}

	if(btn.id=="java__"){
	editor.setValue(tracker.java);
	editor.getSession().setMode("ace/mode/java");
	}
	if(btn.id=="python__"){
	editor.setValue(tracker.python);
       editor.getSession().setMode("ace/mode/java");
	}
}



function compile() {
var value = $('.nav-tabs .active').text().trim();
        $.post("/compile", {code: session.getValue(), language:value})
            .done(function(data) {
                console.log("hell");
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



function onChangeTabs(identifier) {

    if(identifier == "ansi_c")
        {

            editor.setValue(tracker.ansic);
            editor.getSession().setMode("ace/mode/c_cpp");
        }

    else if(identifier == "cpp_11")
        {
            editor.setValue(tracker.cpp11);
            editor.getSession().setMode("ace/mode/c_cpp");
        }
    else if(identifier == "java__")
        {
            editor.setValue(tracker.java);
            editor.getSession().setMode("ace/mode/java");
        }
    else if(identifier == "python__")
        {
            editor.setValue(tracker.python);
            editor.getSession().setMode("ace/mode/python");
        }

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

      var idee = ($('.nav-tabs .active').text()).toLowerCase();
    //  alert(idee);
      var madeid = (idee+"language").trim();

      var templateSelect = document.getElementById((madeid));
      var selectedText = templateSelect.options[templateSelect.selectedIndex].text;
      var selectedValue = templateSelect.options[templateSelect.selectedIndex].value;
      // alert(selectedText);
      // alert(selectedValue);
      if (selectedValue=="") return;
      editor.insert(selectedValue);

      $.post("/savehistory", {codename: selectedText , language: idee})
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

/*
function swap_values(current_tab,last_tab) {
     //alert("Yaha tk chal rha h iska matlb.");
   // alert("ggggggg");
    identifier = current_tab;
    onChangeTabs(identifier);

}
*/
