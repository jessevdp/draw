var app = {};
var two;
app.go = function() {
  this.myTextArea = document.getElementById('editor');
  this.editor = CodeMirror.fromTextArea(this.myTextArea, {
    lineNumbers: true,
    lineWrapping: false,
    mode: "javascript",
    theme: "material",
    scrollbarStyle: "overlay",
    styleActiveLine: true,
    matchBrackets: true
  });

  var elem = document.getElementById('output');
  two = new Two({width: $('#output').width(), height: $('#output').height()}).appendTo(elem);
}

function play() {
  two.clear();
  var code = app.editor.getValue();
  eval(code);
  two.update();
}

$(document).ready(function() {
  app.go();
  $(document).on('click', '#play',  function() {
    play();
  })
});
